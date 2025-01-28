// 1번 노드부터 방문하면서 방문하지 않은 노드라면 dfs() 호출 -> dfs가 끝나면 네트워크 개수 + 1
function solution(n, computers) {
  // 0. 방문처리용 배열
  const visited = Array.from({ length: n }).fill(false)
  let answer = 0

  // 3. dfs 재귀 함수
  function dfs(node) {
    visited[node] = true // 3-1. 방문처리
    computers[node].map((isConnected, endNode) => {
      // 3-2. 만약 현재 node와 endNode가 연결되어있고(1), endNode가 방문하지 않은 노드라면 -> dfs() 재귀호출
      if (isConnected === 1 && !visited[endNode]) dfs(endNode)
    })
  }

  // 1. 1번 노드부터 방문하면서 네트워크 개수 확인하기
  for (let idx = 0; idx < n; idx++) {
    if (!visited[idx]) {
      // 2. 만약 해당 노드가 방문하지 않은 노드라면
      dfs(idx) // 2-1. dfs() 호출
      answer++ // 2-2. dfs()가 끝나면, 연결되어있는 네트워크들은 모두 방문처리되었으므로 answer++
    }
  }
  return answer
}

// prettier-ignore
solution(3,	[[1, 1, 0], [1, 1, 0], [0, 0, 1]]) // 2

// prettier-ignore
// solution(3,	[[1, 1, 0], [1, 1, 1], [0, 1, 1]]	) // 1

// prettier-ignore
// solution(4, [[1, 1, 0, 1], [1, 1, 0, 0], [0, 0, 1, 1], [1, 0, 1, 1]]) // 1

// prettier-ignore
// solution(3, [[1, 1, 0], [1, 1, 0], [0, 0, 1]]) // 2

// prettier-ignore
// solution(3, [[1, 1, 0], [1, 1, 1], [0, 1, 1]]) // 1

// prettier-ignore
// solution(3, [[1, 0, 1], [0, 1, 0], [1, 0, 1]]) // 2

// prettier-ignore
// solution(4, [[1, 1, 0, 1], [1, 1, 0, 0], [0, 0, 1, 1], [1, 0, 1, 1]]) // 1

// prettier-ignore
// solution(4, [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]) // 4
