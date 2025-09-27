function solution(n, computers) {
  const visited = new Array(n).fill(false)
  let answer = 0

  function dfs(node) {
    visited[node] = true // 방문처리

    computers[node].forEach((isConnect, nextNode) => {
      if (isConnect && !visited[nextNode]) dfs(nextNode)
    })
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i)
      answer++
    }
  }

  return answer
}

// prettier-ignore
solution(3,	[[1, 1, 0], [1, 1, 0], [0, 0, 1]]) // 2

// prettier-ignore
solution(3, [[1, 1, 0], [1, 1, 1], [0, 1, 1]]) // 1
