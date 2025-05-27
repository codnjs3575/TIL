function solution(board, skill) {
  const n = board.length
  const m = board[0].length

  // 0. effect 배열 생성하기 : 영향도 저장용 배열
  // 꼭짓점이 배열을 벗어나면 undefined이므로, 벗어나지 않도록 +1 만큼 생성
  const effect = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0))

  // 1. 각 스킬을 effect 배열에 저장하기
  // O(K) : K는 skil의 개수
  skill.map(([type, r1, c1, r2, c2, degree]) => {
    // effect에 효과 하나씩 저장하기
    if (type === 1) degree = -degree

    effect[r1][c1] += degree
    effect[r1][c2 + 1] -= degree
    effect[r2 + 1][c1] -= degree
    effect[r2 + 1][c2 + 1] += degree
  })

  // 2. 가로 누적합
  for (let i = 0; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      effect[i][j] += effect[i][j - 1]
    }
  }

  // 3. 세로 누적합
  for (let j = 0; j < m + 1; j++) {
    for (let i = 1; i < n + 1; i++) {
      effect[i][j] += effect[i - 1][j]
    }
  }

  // 4. 최종 board에 적용하고 0보다 큰 값 세기
  let count = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      board[i][j] += effect[i][j]
      if (board[i][j] > 0) count++
    }
  }

  return count
}

// solution(
//   [
//     [5, 5, 5, 5, 5],
//     [5, 5, 5, 5, 5],
//     [5, 5, 5, 5, 5],
//     [5, 5, 5, 5, 5],
//   ],
//   [
//     [1, 0, 0, 3, 4, 4],
//     [1, 2, 0, 2, 3, 2],
//     [2, 1, 0, 3, 1, 2],
//     [1, 0, 1, 3, 3, 1],
//   ]
// )
// 10

solution(
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  [
    [1, 1, 1, 2, 2, 4],
    [1, 0, 0, 1, 1, 2],
    [2, 2, 0, 2, 0, 100],
  ]
) // 6
