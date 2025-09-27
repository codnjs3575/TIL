// 내구도 저장해놓은 게임 맵
// N X M

// (0,0) ~ (3,4) -4 공격
// (1,0) ~ (3,1) +2 회복
// 공격, 회복 저장용 배열 -> 4개 모서리마다 저장하기
// (r1, c1) ~ (r2, c2)
// (r1,c1)+    (r1,c2)-
// (r2,c1)-    (r2,c2)+

function solution(board, skill) {
  const n = board.length
  const m = board[0].length
  // 0. effect : 공격/회복 저장용 배열
  const effect = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0))
  // 1. 각 스킬을 effect 배열에 저장하기
  skill.map(([type, r1, c1, r2, c2, degree]) => {
    if (type === 1) degree *= -1

    effect[r1][c1] += degree
    effect[r1][c2 + 1] -= degree
    effect[r2 + 1][c1] -= degree
    effect[r2 + 1][c2 + 1] += degree
  })

  // 2. 가로 누적합
  for (let c = 0; c < n + 1; c++) {
    for (let r = 1; r < m + 1; r++) {
      effect[c][r] += effect[c][r - 1]
    }
  }

  // 3. 세로 누적합
  for (let r = 0; r < m + 1; r++) {
    for (let c = 1; c < n + 1; c++) {
      effect[c][r] += effect[c - 1][r]
    }
  }

  // 4. board + effect => 0보다 큰 값 개수 세기
  let cnt = 0
  for (let c = 0; c < n; c++) {
    for (let r = 0; r < m; r++) {
      board[c][r] += effect[c][r]
      if (board[c][r] > 0) cnt++
    }
  }

  return cnt
}
solution(
  [
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
  ],
  [
    [1, 0, 0, 3, 4, 4],
    [1, 2, 0, 2, 3, 2],
    [2, 1, 0, 3, 1, 2],
    [1, 0, 1, 3, 3, 1],
  ]
)
