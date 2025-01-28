function solution(N, road, K) {
  const distances = new Array(N + 1).fill(Infinity) // 최소거리 저장 배열
  distances[1] = 0 // 시작 노드인 1번 마을은 최소거리를 0으로 설정

  const queue = [] // 방문용 배열
  queue.push([0, 1]) // 0번 노드(1번 마을) 초기화 : 0(distance) , 0(node)

  const graph = Array.from({ length: N + 1 }, () => []) // 최소거리 저장 배열

  // 입력값 road를 graph로 형태 수정
  road.map(([node1, node2, weight]) => {
    graph[node1].push([node2, weight])
    graph[node2].push([node1, weight])
  })

  // 다익스트라 알고리즘
  while (queue.length > 0) {
    // 방문하지 않았던 가장 최소 거리의 노드를 방문한다.
    const [currentDistance, currentNode] = queue.shift()

    graph[currentNode].map(([nextNode, nextDistance]) => {
      const weight = currentDistance + nextDistance
      // 저장되어있는 값보다 작을 경우 = 최소 경로
      if (weight < distances[nextNode]) {
        distances[nextNode] = weight // 최소 경로 갱신
        queue.push([weight, nextNode]) // queue에 삽입
      }
      console.log(queue)
    })
  }

  return distances.filter((distance) => distance <= K).length
}

// prettier-ignore
solution(5,	[[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2]], 3) // 3

// prettier-ignore
// solution(6,	[[1,2,1],[1,3,2],[2,3,2],[3,4,3],[3,5,2],[3,5,3],[5,6,1]], 4) // 4
