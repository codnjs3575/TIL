function solution(n, computers) {
  let visited = Array.from({ length: n }).fill(false)
  let answer = 0

  function dfs(idx) {
    // 3. 방문처리
    visited[idx] = true

    // 4. 연결되어있고, 방문하지 않은 노드라면 dfs 실행 -> 같은 네트워크
    for (let node = 0; node < computers[idx].length; node++) {
      if (computers[idx][node] && !visited[node]) {
        dfs(node)
      }
    }
  }

  // 1. 첫 번째 노드부터 마지막 노드까지 모두 방문할 수 있도록 for문
  for (let idx = 0; idx < n; idx++) {
    // 2. 방문하지 않았던 노드라면 dfs 실행
    if (!visited[idx]) {
      dfs(idx, visited, computers)
      answer++
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
