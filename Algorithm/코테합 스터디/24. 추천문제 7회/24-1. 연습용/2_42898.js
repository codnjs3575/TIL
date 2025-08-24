// 로직 1. dfs으로 돌면서 웅덩이를 피해 n,n에 도달할 경우에만 cnt++
//        m,n이 100까지 갈 수 있기에 dfs 탐색이 너무 많아짐
// 로직 2. dp를 통해 dp[y][x]로 해당 칸에 도달할 수 있는 방법의 수로 정의하기
//        위->아래, 왼->오로 이동함. 따라서 dp[y][x] = 위(dp[y-1][x]) + 왼(dp[y][x-1])
//        dp[1][1] = 0, dp[2][1] = 1(아래), dp[1][2] = 1(오른쪽), dp[2][2] = 2([2][1] + [1][2])
// m = x, dx/ n = y, dy
// return cnt%1,000,000,007

function solution(m, n, puddles) {
  const DP = Array.from({ length: n + 1 }, () => Array(m + 1).fill(null))
  DP[1][1] = 1 // DP init : 집 좌표
  puddles.map(([x, y]) => (DP[y][x] = -1)) // DP init : 웅덩이 좌표

  for (let dy = 1; dy <= n; dy++) {
    for (let dx = 1; dx <= m; dx++) {
      // 근처에 물 웅덩이가 있다면 pass
      if (DP[dy][dx] === -1) {
        DP[dy][dx] = 0
        continue
      }
      if (dy === 1 && dx === 1) continue // 현재 위치가 집이라면 pass

      DP[dy][dx] = (DP[dy - 1][dx] + DP[dy][dx - 1]) % 1000000007
    }
  }

  return DP[n][m] % 1000000007
}

solution(4, 3, [[2, 2]]) // 4
