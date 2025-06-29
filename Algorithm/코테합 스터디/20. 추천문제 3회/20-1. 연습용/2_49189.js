// 1번 노드에서 가장 멀리 떨어진 노드의 개수 구하기
// 가장 멀리 떨어진 : 최단경로로 이동했을 때 간선의 개수가 가장 많은 노드

// bfs로 탐색하면서 1번 노드로부터의 거리 저장하기
// Distance : [0, 0, 1, 1, 2, 2, 2] (index: 0은 도달x, 1은 시작, 2부터 저장)

// {
//   '1': [ 2, 3 ],
//   '2': [ 1, 3, 4, 5 ],
//   '3': [ 1, 2, 4, 6 ],
//   '4': [ 2, 3 ],
//   '5': [ 2 ],
//   '6': [ 3 ]
// }

function solution(n, edge) {
  // 1. graph init
  const graph = {}

  edge.map(([i, j]) => {
    graph[i] = [...(graph[i] || []), j]
    graph[j] = [...(graph[j] || []), i]
  })

  // 2. bfs 탐색하며 distance 저장하기
  const distance = Array(n + 1).fill(0)
  const queue = [1]
  let head = 0

  while (queue.length > head) {
    const node = queue[head++]

    // 현재 노드와 연결되어있는 모든 노드 탐색
    for (const next of graph[node]) {
      // 그 중 아직 방문하지 않은 노드일 경우에만 진행
      if (next !== 1 && distance[next] === 0) {
        distance[next] = distance[node] + 1
        queue.push(next)
      }
    }
  }

  const maxN = Math.max(...distance)
  return distance.filter((value) => value === maxN).length
}

// prettier-ignore
solution(6, [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]])
