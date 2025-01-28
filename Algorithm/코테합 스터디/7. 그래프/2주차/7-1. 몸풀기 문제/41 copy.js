function solution(graph, start) {
  const n = graph.length // 그래프의 노드 개수

  // 1. 최단 거리 배열 생성 및 초기화
  const distance = new Array(n).fill(Infinity)
  distance[start] = 0 // 시작 노드의 최단 거리는 0으로 초기화

  // 2. 직전 노드 배열 생성 및 초기화
  const predecessor = new Array(n).fill(null)

  // 3. 노드-1 만큼 반복하기
  for (let j = 0; j < n - 1; j++) {
    // 총 4번 반복
    for (let i = 0; i < n; i++) {
      // i = 0, 1, 2, 3, 4 노드 확인
      graph[i].map(([node, weight]) => {
        if (distance[node] > distance[i] + weight) {
          distance[node] = distance[i] + weight
          predecessor[node] = i
        }
      })
    }
  }

  // 4. 음의 순환 확인하기
  for (let i = 0; i < n; i++) {
    graph[i].map(([node, weight]) => {
      if (distance[node] > weight + distance[i]) {
        return [-1]
      }
    })
  }
  return [distance, predecessor]
}

// prettier-ignore
// console.log(solution([[[1, 4], [2, 3], [4, -6]], [[3, 5]], [[1, 2]], [[0, 7], [2, 4]], [[2, 2]]], 0))
// [[0, -2, -4, 3, -6], [null, 2, 4, 1, 0]]

// prettier-ignore
console.log(solution([[[1, 5], [2, -1]], [[2, 2]], [[3, -2]], [[0, 2], [1, 6]]], 0))
// [-1]

// [1, 5], [2, -1]
// [2, 2]
// [3, -2]
// [0, 2], [1, 6]
