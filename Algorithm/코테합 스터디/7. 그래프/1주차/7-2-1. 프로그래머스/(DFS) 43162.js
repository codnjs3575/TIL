function solution(n, computers) {
  const visited = Array.from({ length: n }).fill(false) // 0. 방문처리용 배열
  let answer = 1 // 0. (반환값) 네트워크 개수

  // 3. dfs 재귀 함수
  function dfs(node) {
    visited[node] = true // 3-1. 방문처리

    computers[node].map((isConnected, endNode) => {
      // 3-2. 현재 node와 endNode가 연결(1)되어있고, endNode가 방문하지 않은 노드라면 -> dfs() 재귀 호출
      if (isConnected === 1 && !visited[endNode]) dfs(endNode)
    })
  }

  // 1. 1번 노드부터 방문을 확인하며
  for (let idx = 0; idx < n; idx++) {
    // 2. 만약 해당 노드가 방문하지 않은 노드라면
    if (!visited[idx]) {
      dfs(idx) // 2-1. dfs() 호출
      answer++ // 2-2. dfs()가 끝나면, 연결되어있는 네트워크들은 모두 방문처리 되었으므로 answer++
    }
  }
  return answer
}

// prettier-ignore
// solution(3,	[[1, 1, 0], [1, 1, 0], [0, 0, 1]]) // 2

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
solution(4, [[1, 1, 0, 1], [1, 1, 0, 0], [0, 0, 1, 1], [1, 0, 1, 1]]) // 1

// prettier-ignore
// solution(4, [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]) // 4
