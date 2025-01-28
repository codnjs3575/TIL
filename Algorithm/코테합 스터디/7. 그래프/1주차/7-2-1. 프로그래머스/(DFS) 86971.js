function solution(n, wires) {
  let minCnt = Infinity
  let cnt = 1

  // 1. 객체 형식으로 트리 연결하기 & 배열 형식으로 연결 개수 저장하기
  let graph = new Object() // 트리 객체
  wires.map(([node1, node2]) => {
    graph[node1] = graph[node1] ? [...graph[node1], node2] : [node2]
    graph[node2] = graph[node2] ? [...graph[node2], node1] : [node1]
  })

  function dfs(node, parent) {
    graph[node].map((endNode) => {
      if (endNode !== parent) {
        cnt++
        dfs(endNode, node)
      }
    })
    return cnt
  }

  wires.map(([node1, node2]) => {
    // 1. 연결 해제하기
    graph[node1] = graph[node1].filter((n) => n !== node2)
    graph[node2] = graph[node2].filter((n) => n !== node1)

    // 2. dfs()로 전력망 분할하기
    cnt = 1
    const count = Math.abs(n - 2 * dfs(node1, node1))

    // 2-1. 분할한 전력망이 최적인지 확인하기
    if (count < minCnt) {
      minCnt = count // 현재로서 가장 최적인 경우
      result = 1
    }

    // 3. 연결 복원하기
    graph[node1].push(node2)
    graph[node2].push(node1)
  })

  return minCnt
}

// prettier-ignore
// solution(9,[[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]]) // 3

// prettier-ignore
// solution(4,[[1,2],[2,3],[3,4]]) // 0

// prettier-ignore
// solution(7,[[1,2],[2,7],[3,7],[3,4],[4,5],[6,7]]) // 1
