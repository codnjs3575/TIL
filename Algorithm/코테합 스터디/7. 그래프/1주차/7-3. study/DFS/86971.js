function solution(n, wires) {
  let minCnt = Infinity
  let cnt = 1 // 전역 변수로 선언해야 dfs() 함수에서 접근 가능

  // 1. 객체 형식으로 트리 연결하기 (배열 형식으로 연결된 송전탑번호 저장하기)
  let graph = new Object()
  wires.map(([node1, node2]) => {
    graph[node1] = graph[node1] ? [...graph[node1], node2] : [node2]
    graph[node2] = graph[node2] ? [...graph[node2], node1] : [node1]
  })

  // 2. dfs()로 전력망 분할하기
  function dfs(node, parent) {
    graph[node].map((endNode) => {
      if (endNode !== parent) {
        cnt++
        dfs(endNode, node)
      }
    })
    return cnt
  }

  // 0. 전선 정보를 하나씩 돌면서 연결 해제 -> 전력망 분할 -> 연결 복원
  wires.map(([node1, node2]) => {
    // 1. 연결 해제
    graph[node1] = graph[node1].filter((n) => n !== node2)
    graph[node2] = graph[node2].filter((n) => n !== node1)

    // 2. dfs()로 전력망 분할하기
    cnt = 1 // 한 전력망 내에 있는 송전탑 개수 (일단 본인 포함 후 1로 시작)
    const diff = Math.abs(n - 2 * dfs(node1, node1)) // 두 전력망의 송전탑 개수 차이

    // 2-1. 현재 분할한 전력망의 경우가 최적의 경우인지 확인하기
    if (diff < minCnt) minCnt = diff

    // 3. 연결 복원
    graph[node1].push(node2)
    graph[node2].push(node1)
  })

  return minCnt
}

// prettier-ignore
solution(9,[[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]]) // 3

// prettier-ignore
// solution(4,[[1,2],[2,3],[3,4]]) // 0

// prettier-ignore
// solution(7,[[1,2],[2,7],[3,7],[3,4],[4,5],[6,7]]) // 1
