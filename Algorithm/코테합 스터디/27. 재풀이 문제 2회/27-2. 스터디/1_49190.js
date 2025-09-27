// 둘러쌓여있다? -> 어느 정점에 도착했을 때 이전에 사용했었던 간선이 아니라면, 방++

// 대각선 이슈 -> 우상향 대각선, 우하향 대각선처럼 대각선 2개가 만났을 때 크로스되며 중간지점 발생! 이 또한 확인해야 한다.
//  방법 1. 대각선 사이의 임의정점 만들어서 (0.5,0.5) 이동으로 할 것인지
//  방법 2. 2배 크기로 늘려서 2번 이동할 것인지 [채택 v]
function solution(arrows) {
  let room = 0
  // prettier-ignore
  const MOVES = [[0,1],[1,1], [1,0], [1,-1], [0,-1], [-1,-1], [-1,0], [-1,1]]

  const visitedVertex = new Set()
  const visitedEdge = new Set()

  let [nx, ny] = [0, 0]
  visitedVertex.add(`${nx}_${ny}`)

  // ------ 외. 워. 두. 기 ------
  // 현재 좌표 : x, y
  // 이동할 좌표: dx, dy
  // newX, nextX : 이동 후 다음 좌표

  for (const arrow of arrows) {
    // 2번씩 이동하기
    for (let i = 0; i < 2; i++) {
      const dx = nx + MOVES[arrow][0]
      const dy = ny + MOVES[arrow][1]

      const isVisitedV = visitedVertex.has(`${dx}_${dy}`)
      const isVisitedE = visitedEdge.has(`${nx}_${ny}_${dx}_${dy}`)

      // 만약에 이전에 도착했던 정점이고, 사용하지 않았던 간선이라면 room++
      if (isVisitedV && !isVisitedE) room++

      visitedVertex.add(`${dx}_${dy}`)
      visitedEdge.add(`${nx}_${ny}_${dx}_${dy}`)
      visitedEdge.add(`${dx}_${dy}_${nx}_${ny}`)

      nx = dx
      ny = dy
    }
  }

  return room
}

// jwt -> accessToken,                          refresh
// 저장방식  (local) <- ssr때문에,,'useClient'     (cookie)
//         (cookie) <- 보안, 제거일시?,
//                     path, sameSite (localhost, 도메인 다른가요?, 부모 도메인만 같고 아래 .자식도메인 공유 가능한)
//                     www:도메인/port
// next document.cookie
// 미들웨어 만들어놓고, 앞으로 로그인 분기점할 때 미들웨어 사용하면서 렌더링
// 서버컴포넌트 (미들웨어, )
