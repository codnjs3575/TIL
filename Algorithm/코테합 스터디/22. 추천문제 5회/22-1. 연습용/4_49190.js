// 로직 : 8방향으로 움직이는 move 설정 후 arrows를 하나씩 돌면서 위치 이동 후 정점/간선 방문 확인
// ? 방의 개수는 어떻게 셀 수 있을까?
//   ㄴ 어떤 정점을 이미 방문한 적이 있고, 그 정점으로 가는 간선을 처음 지나갈 때 간선이 생김.
//   ㄴ 만약 정점/간선이 첫 방문이라면 새로운 길임. 정점/간선 모두 방문한 곳이라면 이미 지나갔던 곳임
// ? 대각선은 어떻게 측정할 것인가?
//   ㄴ 대각선 이동을 확인하기 위해서는 반드시 그 중간 지점에 임의 정점을 하나 만들어야 한다.
//     예를 들어 (0, 0)에서 (1, 1)로 움직이는 1의 경우, 그 사이 (0.5, 0.5) 짜리 임의 정점을 만들어서 정점/간선 방문확인을 해야 함

function solution(arrows) {
  let answer = 0
  // 0. 총 8방향으로 움직이는 방향 설정(대각선 포함)
  // prettier-ignore
  const move = [[-1, 0],[-1, 1],[0, 1],[1, 1],[1, 0], [1, -1], [0, -1], [-1, -1]]
  let VertexVisited = new Map() // 0. 정점 방문확인용
  let EdgeVisited = new Map() // 0. 간선 방문확인용
  let [dx, dy] = [0, 0] // 0. 원점에서 출발
  VertexVisited.set(`${dx}_${dy}`, true) // 0. 원점에서 출발_정점 방문 확인 true

  for (const arrow of arrows) {
    // 무조건 임의 정점을 생성 후 두 번 이동 처리 (대각선 대비)
    for (let i = 0; i < 2; i++) {
      let nx = dx + move[arrow][0] / 2 // 이동할 x 좌표 (반만 이동)
      let ny = dy + move[arrow][1] / 2 // 이동할 y 좌표 (반만 이동)

      let isVertexVisited = VertexVisited.has(`${nx}_${ny}`)
      let isNotEdgeVisited = !EdgeVisited.has(`${dx}_${dy}_${nx}_${ny}`)
      if (isVertexVisited && isNotEdgeVisited) answer++ // 방의 개수 증가

      VertexVisited.set(`${nx}_${ny}`, true) // 다음 위치를 방문한 것으로 표시
      EdgeVisited.set(`${dx}_${dy}_${nx}_${ny}`, true) // 현재 위치 -> 다음 위치 방문한 것으로 표시
      EdgeVisited.set(`${nx}_${ny}_${dx}_${dy}`, true) // 다음 위치 -> 현재 위치 방문한 것으로 표시

      dx = nx
      dy = ny
    }
  }
  return answer
}
solution([6, 6, 6, 4, 4, 4, 2, 2, 2, 0, 0, 0, 1, 6, 5, 5, 3, 6, 0])
