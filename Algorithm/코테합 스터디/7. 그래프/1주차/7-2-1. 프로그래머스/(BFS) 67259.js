function solution(board) {
  const N = board.length
  // 0(하) 1(우) 2(상) 3(좌)
  const dy = [1, 0, -1, 0]
  const dx = [0, 1, 0, -1]
  const queue = []
  const cost = Array.from({ length: N }, () => Array(N).fill(-1))

  queue.push([0, 0, 0, 0], [0, 0, 0, 1])
  cost[0][0] = 0

  while (queue.length > 0) {
    const [y, x, prevCost, driveMode] = queue.shift()

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i]
      const nx = x + dx[i]
      // 유효한 좌표인지 확인 + 벽 확인 + 뒤로가는지 확인하기 : 0(하) - 2(상) | 1(우) - 3(좌)
      if (
        ny < 0 ||
        nx < 0 ||
        ny >= N ||
        nx >= N ||
        board[ny][nx] === 1 ||
        Math.abs(driveMode - i) === 2
      ) {
        continue
      }

      const currentCost = (driveMode === i ? 100 : 600) + prevCost
      if (cost[ny][nx] === -1 || cost[ny][nx] >= currentCost) {
        cost[ny][nx] = currentCost
        queue.push([ny, nx, currentCost, i])
      }
    }
  }

  return cost[N - 1][N - 1]
}

// prettier-ignore
// solution([[0,0,0],[0,0,0],[0,0,0]])
// 900

// prettier-ignore
solution([[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,1],[0,0,1,0,0,0,1,0],[0,1,0,0,0,1,0,0],[1,0,0,0,0,0,0,0]])
// 3800

// prettier-ignore
// solution([[0,0,1,0],[0,0,0,0],[0,1,0,1],[1,0,0,0]])
// 2100

// prettier-ignore
// solution([[0,0,0,0,0,0],[0,1,1,1,1,0],[0,0,1,0,0,0],[1,0,0,1,0,1],[0,1,0,0,0,1],[0,0,0,0,0,0]])
// 3200
