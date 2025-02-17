function solution(land, height) {
  const N = land.length
  // prettier-ignore
  const directions = [[0, 1],[1, 0],[0, -1],[-1, 0]] // 상하좌우 방향
  const visited = Array.from({ length: N }, () => Array(N).fill(false))
  const region = Array.from({ length: N }, () => Array(N).fill(0))
  let regionCount = 0

  // BFS로 구역 나누기
  const bfs = (startX, startY, regionId) => {
    const queue = [[startX, startY]]
    visited[startY][startX] = true
    region[startY][startX] = regionId

    while (queue.length > 0) {
      const [x, y] = queue.shift()

      for (const [dx, dy] of directions) {
        const nx = x + dx
        const ny = y + dy

        if (nx >= 0 && ny >= 0 && nx < N && ny < N && !visited[ny][nx]) {
          const cost = Math.abs(land[y][x] - land[ny][nx])
          if (cost <= height) {
            // 같은 구역으로 묶을 수 있음
            visited[ny][nx] = true
            region[ny][nx] = regionId
            queue.push([nx, ny])
          }
        }
      }
    }
  }

  // 모든 칸에 대해 BFS로 구역 나누기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        regionCount++
        bfs(j, i, regionCount)
      }
    }
  }

  // 간선 리스트 생성
  const edges = []
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      for (const [dx, dy] of directions) {
        const nx = x + dx
        const ny = y + dy

        if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
          if (region[y][x] !== region[ny][nx]) {
            // 다른 구역 간의 간선만 추가
            const cost = Math.abs(land[y][x] - land[ny][nx])
            edges.push({
              from: region[y][x],
              to: region[ny][nx],
              cost,
            })
          }
        }
      }
    }
  }

  // 간선을 비용 기준으로 정렬
  edges.sort((a, b) => a.cost - b.cost)

  // 유니온-파인드 구조체
  const parent = Array(regionCount + 1)
    .fill(0)
    .map((_, index) => index)

  const find = (x) => {
    if (parent[x] === x) return x
    return (parent[x] = find(parent[x])) // 경로 압축
  }

  const union = (a, b) => {
    const rootA = find(a)
    const rootB = find(b)
    if (rootA !== rootB) parent[rootB] = rootA
  }

  // 크루스칼 알고리즘으로 최소 신장 트리 구성
  let totalCost = 0
  for (const { from, to, cost } of edges) {
    if (find(from) !== find(to)) {
      // 사이클이 생기지 않는 경우만 연결
      union(from, to)
      totalCost += cost
    }
  }

  return totalCost
}
