// distance를 저장한 뒤, '중간값' 중의 최댓값을 반환하는 문제.
// 가장 긴 거리를 가진 두 노드를 구하고, 그 중간 지점 근처의 노드로 조합한다면, 가장 큰 중간값 반환.
// 가장 긴 거리를 d라고 한다면, 가장 큰 중간값은 Math.floor(d/2)
function solution(n, edges) {
  const graph = Array.from({ length: n + 1 }, () => [])
  for (const [a, b] of edges) {
    graph[a].push(b)
    graph[b].push(a)
  }

  const getDistance = (start) => {
    const dist = Array(n + 1).fill(-1)
    const queue = [start]
    dist[start] = 0
    let head = 0

    while (head < queue.length) {
      const node = queue[head++]
      for (const next of graph[node]) {
        if (dist[next] === -1) {
          dist[next] = dist[node] + 1
          queue.push(next)
        }
      }
    }
    return dist
  }

  // 모든 쌍 간 거리 미리 계산 (0번 인덱스는 빈 배열로 처리)
  const allDistances = Array.from({ length: n + 1 }, (_, i) =>
    i === 0 ? [] : getDistance(i)
  )

  let answer = 0
  for (let i = 1; i <= n; i++) {
    for (let j = i + 1; j <= n; j++) {
      for (let k = j + 1; k <= n; k++) {
        const dists = [
          allDistances[i][j],
          allDistances[j][k],
          allDistances[i][k],
        ].sort((a, b) => a - b)
        answer = Math.max(answer, dists[1]) // 중앙값
      }
    }
  }

  return answer
}

// prettier-ignore
solution(4, [[1,2],[2,3],[3,4]])

// prettier-ignore
solution(5, [[1,5],[2,5],[3,5],[4,5]])
