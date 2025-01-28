function solution(board) {
  const N = board.length
  const dy = [1, 0, -1, 0]
  const dx = [0, 1, 0, -1]
  const queue = []
  const cost = Array.from({ length: N }, () => Array(N).fill(-1)) // 비용 저장용 배열

  // 1. 시작위치 설정하기
  // y, x, cost, driveMode(0(하), 1(우))
  queue.push([0, 0, 0, 0], [0, 0, 0, 1])
  cost[0][0] = 0 // 시작위치 비용 저장하기

  // 2. bfs 탐색
  while (queue.length) {
    const [y, x, prevCost, driveMode] = queue.shift()

    // 2-1. 4방향으로 움직이며 비용 계산하기
    for (let i = 0; i < 4; i++) {
      // i = 0(하) 1(우) 2(상) 3(좌)
      const ny = y + dy[i]
      const nx = x + dx[i]

      // 2-1-1. 유효한 좌표인지 확인 + 벽인지 확인 + 뒤로 가는지 확인 -> 하나라도 있으면 반복문 continue
      if (
        ny < 0 ||
        nx < 0 ||
        ny >= N ||
        nx >= N ||
        board[ny][nx] === 1 ||
        Math.abs(driveMode - i) === 2
      )
        continue

      // 2-1-2. 비용 계산 후 queue와 cost update
      const currentCost = (driveMode === i ? 100 : 600) + prevCost
      // 만약에 비용(cost)이 -1이거나 현재비용이 최소비용일 경우 => 비용 업데이트 및 queue에 삽입
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
// solution([[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,1],[0,0,1,0,0,0,1,0],[0,1,0,0,0,1,0,0],[1,0,0,0,0,0,0,0]])
// 3800

// prettier-ignore
// solution([[0,0,1,0],[0,0,0,0],[0,1,0,1],[1,0,0,0]])
// 2100

// prettier-ignore
solution([[0,0,0,0,0,0],[0,1,1,1,1,0],[0,0,1,0,0,0],[1,0,0,1,0,1],[0,1,0,0,0,1],[0,0,0,0,0,0]])
// 3200
