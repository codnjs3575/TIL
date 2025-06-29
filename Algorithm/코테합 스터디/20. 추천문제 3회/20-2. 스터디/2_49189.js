// 양방향 그래프 저장해놓고
// 그래프 탐색하면서 distance(1번 노드에서의 거리)를 저장하기
// 모든 노드까지의 distance를 저장했다면, 최대 값 확인 후 해당하는 노드 개수 return.

function solution(n, edge) {
  const graph = {}

  // 1. graph init
  edge.map(([i, j]) => {
    graph[i] = [...(graph[i] || []), j]
    graph[j] = [...(graph[j] || []), i]
  })

  // 2. 그래프 탐색하면서 distance 저장하기
  //  ㄴ bfs : 형제노드까지 확인하면서 리프노드까지 확인 (선입선출이 되어야 하므로 Queue 사용)
  const distance = Array(n + 1).fill(0) // [0, 0, ...]
  const queue = [1]
  let head = 0 // shift의 성능 문제 대안으로 head 사용

  while (queue.length > head) {
    const node = queue[head++]

    for (const next of graph[node]) {
      // 방문하지 않은 1 이외의 노드일 경우에만 진행
      if (next !== 1 && distance[next] === 0) {
        distance[next] = distance[node] + 1
        queue.push(next)
      }
    }
  }

  const maxN = Math.max(...distance)
  return distance.filter((val) => val === maxN).length
}

console.log(
  solution(6, [
    [3, 6],
    [4, 3],
    [3, 2],
    [1, 3],
    [1, 2],
    [2, 4],
    [5, 2],
  ])
)
