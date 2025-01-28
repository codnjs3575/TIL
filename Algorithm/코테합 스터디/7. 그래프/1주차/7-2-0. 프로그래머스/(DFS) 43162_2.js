function solution(n, computers) {
  let visited = new Array(n).fill(false)
  let answer = 0

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i)
      answer++
    }
  }

  function dfs(idx) {
    if (!visited[idx]) {
      visited[idx] = true
      computers[idx].map((computer, i) => {
        if (computer === 1 && !visited[i]) {
          dfs(i)
        }
      })
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
console.log(solution(4, [[1, 1, 0, 1], [1, 1, 0, 0], [0, 0, 1, 1], [1, 0, 1, 1]])) // 1

// prettier-ignore
console.log(solution(4, [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])) // 4
