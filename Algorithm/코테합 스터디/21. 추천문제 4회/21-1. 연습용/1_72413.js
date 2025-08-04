// 플로워드 워셜 알고리즘
// S -> A, S -> B를 최소 비용으로 가는 방법
// 도중에 합승해서 X에서 나눠지는 구조를 가정할 수 있음
// 모든 쌍에 대해 최단 거리를 구하기

// 노드 개수 n과 fares 배열을 통해 dist 행렬 초기화
// dist[a][b] = 요금 (양방향 주의하기)
// dist[i][i]는 0으로 초기화하기, 연결이 되지 않은 곳은 INF

function solution(n, s, a, b, fares) {
  const dist = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity))
  for (let i = 1; i <= n; i++) dist[i][i] = 0

  // fares 정보로 거리 행렬 채우기
  for (const [u, v, w] of fares) {
    dist[u][v] = w
    dist[v][u] = w
  }

  // 플로이드-워셜
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j]
        }
      }
    }
  }

  // 합승 분기점 k를 기준으로 최소 비용 계산
  let answer = Infinity
  for (let k = 1; k <= n; k++) {
    const totalCost = dist[s][k] + dist[k][a] + dist[k][b]
    answer = Math.min(answer, totalCost)
  }
  return answer
}

// prettier-ignore
solution(6, 4, 6, 2, [[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]])

// prettier-ignore
// solution(7, 3, 4, 1, [[5, 7, 9], [4, 6, 4], [3, 6, 1], [3, 2, 3], [2, 1, 6]])

// prettier-ignore
// solution(6, 4, 5, 6, [[2,6,6], [6,3,7], [4,6,7], [6,5,11], [2,5,12], [5,3,20], [2,4,8], [4,3,9]])
