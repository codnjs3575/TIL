function solution(graph, start) {
  // 0. 필요한 변수들
  const result = []
  const graphTable = new Map()

  // prettier-ignore
  const unvisited = new Set(graph.join('').split('').filter((v) => v !== ',')) // Set(5) { 'A', 'B', 'C', 'D', 'E' }

  // 0. dfs 함수
  function dfs(node) {
    // 방문을 하지 않은 노드일 경우에만
    if (unvisited.has(node)) {
      // 1. 방문 처리
      result.push(node)
      unvisited.delete(node)

      // 2. dfs 재귀 호출
      graphTable.get(node)?.map((n) => dfs(n))
    }

    return result
  }

  // 1. 출발 -> 도착 해시테이블 초기화하기
  graph.map(([startNode, endNode]) => {
    graphTable.set(
      startNode,
      graphTable.get(startNode)
        ? [...graphTable.get(startNode), endNode]
        : [endNode]
    )
  })

  // 2. 시작노드로 재귀 함수 dfs 호출하기
  return dfs(start)
}

// prettier-ignore
// console.log(solution([['A', 'B'],['B', 'C'],['C', 'D'],['D', 'E']],'A')) // ['A', 'B', 'C', 'D', 'E']

// prettier-ignore
console.log( solution([['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['E', 'F']], 'A') )
