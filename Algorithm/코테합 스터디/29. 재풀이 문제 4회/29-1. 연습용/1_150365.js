// [n x m] 미로
//   (x,y) -> (r,c)로 이동해야하는 거리 : k (두 번 이상 방문 가능)
// 경로가 문자열일 때, 사전 순으로 가장 빠른 경로로 탈출
//  ㄴ> <l r u d> ==> <d l r u>, 즉 <하 좌 우 상>순으로 이동하면 무조건 사전 순으로 이동 가능

// DFS 비효율적! 최대한 탐색을 줄일 수 있는 방법으로 진행
//  ㄴ> 맨해튼 거리 (두 점 사이의 최단 거리 탐색)

function solution(n, m, x, y, r, c, k) {
  // prettier-ignore
  const dir = [[1, 0],[0, -1], [0, 1], [- 1, 0]] // 하 좌 우 상
  const dirAlpha = 'dlru'.split('')

  // 1. 맨해튼 거리(distance)로 이동가능한지 우선 확인 (가지치기)
  //   ㄴ 불가능 1. distance가 k보다 큼
  //           2. k-distance가 홀수일 경우
  const distance = Math.abs(x - r) + Math.abs(y - c)
  if (distance > k || (k - distance) % 2 !== 0) return 'impossible' // 불가능

  let answer = ''
  // 2. 그래프 탐색 시작!
  while (k > 0) {
    // 2-1. 하 좌 우 상 이동하기
    for (let i = 0; i < 4; i++) {
      let nx = x + dir[i][0]
      let ny = y + dir[i][1]

      // 2-2. 미로 범위 밖일 경우 continue(= 방향 바꾸기)
      if (nx < 1 || ny < 1 || nx > n || ny > m) continue

      // 2-3. 남은 거리 계산 (이동한 곳 ~> 도착지점)
      //      남은 거리가 K보다 크거나같다면, 현재 멀어지는 방향이므로 남은 거리는 K 미만이어야 함
      //      현재 위치 수정 후에 한 발 움직임(k--)
      const remaingDist = Math.abs(nx - r) + Math.abs(ny - c)
      if (remaingDist < k) {
        x = nx
        y = ny
        k--
        answer += dirAlpha[i]
        break
      }
    }
  }

  return answer
}
