function solution(N, road, K) {
  // 0. 최소경로 저장용 배열
  const distances = new Array(N + 1).fill(Infinity)
  distances[1] = 0

  // 0. 방문용 배열
  const queue = []
  queue.push([0, 1]) // 1번 마을 초기화 : 0(distance), 1(node)

  // 0. graph 저장
  //   ㄴ 각 마을마다 배열로 저장 [ [node, weight],... ]
  const graph = Array.from({ length: N + 1 }, () => [])
  road.map(([node1, node2, weight]) => {
    graph[node1].push([node2, weight])
    graph[node2].push([node1, weight])
  })

  // 다익스트라 알고리즘
  while (queue.length > 0) {
    const [currentDistance, currentNode] = queue.shift()

    graph[currentNode].map(([nextNode, nextDistance]) => {
      const weight = currentDistance + nextDistance // 이동할 때 드는 총 비용
      // 최소 경로라면!
      if (weight < distances[nextNode]) {
        distances[nextNode] = weight
        queue.push([weight, nextNode])
      }
    })
  }

  return distances.filter((distance) => distance <= K).length
}

// prettier-ignore
solution(5,	[[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2]], 3) // 3

// prettier-ignore
// solution(6,	[[1,2,1],[1,3,2],[2,3,2],[3,4,3],[3,5,2],[3,5,3],[5,6,1]], 4) // 4
