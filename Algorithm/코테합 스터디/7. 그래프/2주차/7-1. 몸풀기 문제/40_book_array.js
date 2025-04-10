function MinHeap() {
  this.items = []
}

function solution(graph, start) {
  // 1. 모든 노드의 거리 값을 무한대로 초기화
  const distances = {}
  for (const node in graph) {
    distances[node] = Infinity
  }

  // 2. 시작 노드의 거리 값은 0으로 초기화
  distances[start] = 0

  // 힙 생성
  const queue = new MinHeap()
  queue.push([distances[start], start]) // 3. 시작 노드를 큐에 삽입

  // 4. 시작 노드의 경로를 초기화
  const paths = { [start]: [start] }

  while (queue.size() > 0) {
    // 5. 현재 가장 거리 값이 작은 노드를 가져옴
    const [currentDistance, currentNode] = queue.pop()

    // 6. 만약 현재 노드의 거리 값이 큐에서 가져온 거리 값보다 크면, 해당 노드는 이미 처리한 것이므로 무시
    if (distances[currentNode] < currentDistance) continue

    // 7. 현재 노드와 인접한 노드들의 거리 값을 계산하여 업데이트
    for (const adjacentNode in graph[currentNode]) {
      const weight = graph[currentNode][adjacentNode]
      const distance = currentDistance + weight

      // 8. 현재 게산한 거리 값이 기존 거리 값보다 작으면 최소 비용 및 최단 경로 업데이트
      if (distance < distances[adjacentNode]) {
        distances[adjacentNode] = distance // 최소 비용 업데이트
        paths[adjacentNode] = { ...paths[(currentNode, adjacentNode)] } // 최단 경로 업데이트

        // 9. 최소 경로가 갱신된 노드를 비용과 함께 큐에 푸시
        queue.push([distance, adjacentNode])
      }
    }
  }

  // 10. path 배열을 노드 번호에 따라 오름차순으로 정렬하여 반환
  const sortedPaths = {}
  Object.keys(paths)
    .sort()
    .forEach((node) => (sortedPath[node] = paths[node]))

  return [distances, sortedPaths]
}

console.log(solution({ A: { B: 9, C: 3 }, B: { A: 5 }, C: { B: 1 } }, 'A'))
// [{'A': 0, 'B': 4, 'C': 3}, {'A': ['A'], 'B': ['A', 'C', 'B'], 'C': ['A', 'C']}]

// console.log(solution({ A: { B: 1 }, B: { C: 5 }, C: { D: 1 }, D: {} }, 'A'))
// [{'A': 0, 'B': 1, 'C': 6, 'D': 7}, {'A': ['A'], 'B': ['A', 'B'], 'C': ['A', 'B', 'C'], 'D': ['A', 'B', 'C', 'D']}]
