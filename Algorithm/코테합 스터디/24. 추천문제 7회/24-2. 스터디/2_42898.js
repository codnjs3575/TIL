// dfs는 탐색이 너무 많아짐! -> 각 칸마다 도달할 수 있는 방법의 수를 저장하는 DP로 풀기
// 위->아래, 왼쪽->오른쪽으로 이동, 따라서 DP[현재칸] = DP[위칸] + DP[왼쪽칸]
// m = x, dx  / n = y, dy
function solution(m, n, puddles) {
  const DP = Array.from({ length: n + 1 }, () => Array(m + 1).fill(null))
  DP[1][1] = 1 // init: 집
  puddles.map(([x, y]) => (DP[y][x] = -1))

  for (let dy = 1; dy <= n; dy++) {
    for (let dx = 1; dx <= m; dx++) {
      // 집일 경우 pass
      if (dy === 1 && dx === 1) continue

      // 물 웅덩이일 경우 0으로 변경 후 pass
      if (DP[dy][dx] === -1) {
        DP[dy][dx] = 0
        continue
      }

      DP[dy][dx] = (DP[dy - 1][dx] + DP[dy][dx - 1]) % 1000000007
    }
  }

  return DP[n][m]
}

solution(4, 3, [[2, 2]])
