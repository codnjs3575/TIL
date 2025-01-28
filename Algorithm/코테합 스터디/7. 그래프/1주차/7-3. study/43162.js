function solution(n, computers) {
  // 1. 방문처리용 배열 visited (길이 n)
  let visited = Array.from({ length: n }).fill(false)
  let answer = 0

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i)
      answer++
    }
  }

  // 2. dfs 함수
  function dfs(idx) {
    // 2-1. 방문 처리
    visited[idx] = true

    // 2-2. 연결된 컴퓨터에 한해서 dfs() 재귀 호출
    computers[idx].map((computer, i) => {
      if (computer === 1 && !visited[i]) dfs(i)
    })
  }

  console.log(answer)
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
// console.log(solution(4, [[1, 1, 0, 1], [1, 1, 0, 0], [0, 0, 1, 1], [1, 0, 1, 1]])) // 1

// prettier-ignore
// console.log(solution(4, [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])) // 4
