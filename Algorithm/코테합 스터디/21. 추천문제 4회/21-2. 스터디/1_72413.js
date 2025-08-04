// 플로이드 워셜 알고리즘을 사용하는 문제!
// 모든 쌍에 대해서 최단 거리를 구하기

// 노드 개수 n과 fares 배열로 dist 초기화하기
//  ㄴ dist[a][b] = 요금(a->b)
//  ㄴ dist[i][i] = 0으로 초기화, 연결이 되지 않은 곳은 INF(init)

function solution(n, s, a, b, fares) {
  // 0. init : dist 행렬 (자기자신은 0, 가보지 않은 곳은 INF)
  const dist = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity))
  for (let i = 0; i <= n; i++) dist[i][i] = 0

  // 1. fares 정보들로 dist 행렬 채우기
  for (const [a, b, w] of fares) {
    dist[a][b] = w
    dist[b][a] = w
  }

  // 2. 플로이드-워셜 알고리즘으로 최단 거리 채우기!
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (dist[i][j] > dist[i][k] + dist[k][j])
          dist[i][j] = dist[i][k] + dist[k][j]
      }
    }
  }

  // 3. 최소 비용 계산하기
  let answer = Infinity
  for (let k = 1; k <= n; k++) {
    const totalCost = dist[s][k] + dist[k][a] + dist[k][b]
    answer = Math.min(answer, totalCost)
  }

  return answer
}

// prettier-ignore
solution(6,4,6,2,	[[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]])
