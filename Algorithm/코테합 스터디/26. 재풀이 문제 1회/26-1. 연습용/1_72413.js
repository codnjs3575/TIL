// 합승 택시 요금
// 모두 귀가하는 데에 소요되는 예상 최저 택시요금

// s(출발지점) -> a/b까지 가는 총 이동 비용(공통비용 + 개인비용)
// 로직 1. s지점으로부터 각 지점으로 가는 가장 최소의 비용을 DP를 통해 저장하고 갱신하기!
// -> 다익스트라 방법은 어디서 갈라져야 할 지에 대한 분기점(k)에 대한 고려가 어려움
// 로직 2. 플로이드-워셜) s->k + k->a + k->b
//    설명) 모든 정점 쌍 간 최단 거리를 구하는 알고리즘
//    저장 방법) dist[i][j] : i에서 j까지의 최소 비용

function solution(n, s, a, b, fares) {
  var minCost = Infinity

  const dist = Array.from({ length: n + 1 }, () =>
    new Array(n + 1).fill(Infinity)
  )

  // 1. 자기 자신은 0, fares 정보대로 사전작업(양방향!)
  for (let self = 1; self <= n; self++) dist[self][self] = 0
  fares.forEach(([i, j, cost]) => {
    dist[i][j] = cost
    dist[j][i] = cost
  })

  // 2. 플로이드-워셜로 최소 비용 갱신
  // 중간지점(k)를 1로 둘 때 ~ n으로 둘 때
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j])
      }
    }
  }

  // 3. 가장 짧은 경로 찾기
  for (let k = 1; k <= n; k++) {
    const cost = dist[s][k] + dist[k][a] + dist[k][b]
    if (cost < minCost) minCost = cost
  }

  return minCost === Infinity ? -1 : minCost
}

// prettier-ignore
// n, s, a, b
console.log(
solution(6,4,6,2,[[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]])
)
