// 1. arrows에 입력된 값에 따라 지도에 그리기
// 2. 둘러쌓여있다? -> 새 정점에 도착할 때 이미 도착했던 적이 있는 정점인데, 간선은 처음이라면(새로운 곳에서 온 거라면?)
//   ㄴ visitsedEdge[i][j] = i에서 j로 가는 간선이 처음인지(true), 사용한 적이 있는지(false)
//   ㄴ visitedVertex[i] = 정점 i에 방문한 적이 있는지(has -> true)
// (0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1)

// 3. 대각선 이슈! (0,0) -> (1,1) 선 1개랑, (0, 1) -> (1,0) 선 1개가 만나면 교차점이 생기는 데 이럴 때도 방이 생길 수가 있음
//  [ ] 방법 1. 대각선 사이의 점을 만들어서 (0,0) -> (1,1) 이동을 (0,0) -> (0.5, 0.5) -> (1,1) 이동으로 바꾼다
//  [v] 방법 2. 지도를 2배 크기로 키워서 (0,0) -> (1,1) 이동을 (0,0) -> (2,2) 이동으로 바꾼다.

// isVisitedV
//  ㄴ isVisitedE : 사용했던 간선 (영향 x)
//  ㄴ !isVisitedE : 처음 왔던 간선 (방++)
// !isVisitedV : visitedVertext 추가

function solution(arrows) {
  let room = 0
  // prettier-ignore
  const MOVES = [[0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1], [-1,0], [-1,1]]

  const visitedVertex = new Set() // 0. 방문한 모든 정점 저장
  const visitsedEdge = new Set() // 0. 방문한 모든 간선 저장 (지도 크기를 모르므로 Set이 적합)
  let [nx, ny] = [0, 0]
  visitedVertex.add(`${nx}_${ny}`)

  // 1. arrow들을 지도에 그리기
  for (const arrow of arrows) {
    // 2. 2번 이동하기
    for (let i = 0; i < 2; i++) {
      const dx = nx + MOVES[arrow][0]
      const dy = ny + MOVES[arrow][1]

      const isVisitedV = visitedVertex.has(`${dx}_${dy}`)
      const isVisitedE = visitsedEdge.has(`${nx}_${ny}_${dx}_${dy}`)

      if (isVisitedV && !isVisitedE) room++

      visitedVertex.add(`${dx}_${dy}`)
      visitsedEdge.add(`${nx}_${ny}_${dx}_${dy}`)
      visitsedEdge.add(`${dx}_${dy}_${nx}_${ny}`)

      nx = dx
      ny = dy
    }
  }
  return room
}

solution([6, 6, 6, 4, 4, 4, 2, 2, 2, 0, 0, 0, 1, 6, 5, 5, 3, 6, 0]) // 3
