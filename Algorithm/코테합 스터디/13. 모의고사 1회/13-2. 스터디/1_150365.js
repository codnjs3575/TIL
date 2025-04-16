// n(세로, x, r) X m(가로, y, c)
// tip! 맨해튼 거리 : 두 점 사이의 최단 거리는 x축, y축을 이동한 거리와 같다.
// 사전순 : d(down) l(left) r(right) u(up)

// 완전 탐색은 시간초과가 나옴! => 불필요한 탐색을 줄이는 것이 중요!
function solution(n, m, x, y, r, c, k) {
  // 0. 이동용 헬프변수 만들기
  const dx = [1, 0, 0, -1] // 하 좌 우 상
  const dy = [0, -1, 1, 0] // 하 좌 우 상
  const dir = 'dlru'.split('')

  // 1. 맨해튼 거리(distance)구하여 불필요한 탐색인지 확인하기
  //   ㄴ 만약, distance가 k보다 크거나(이동해도 도달하지 못하는 거리)
  //          k-distance가 홀수일 경우에는 불필요한 탐색 => "impossible" 반환

  const distance = Math.abs(x - r) + Math.abs(y - c)
  if (distance > k || (k - distance) % 2 !== 0) return 'impossible'

  let answer = ''
  // 2. 사전순으로 이동하면서 탐색 시작하기(bfs)
  //    탐색 조건 : k>0 (k--) => 한 칸씩 나아가기
  while (k > 0) {
    // 2-1. 하 좌 우 상 이동하기
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i]
      let ny = y + dy[i]

      // 2-2. 미로 범위 벗어나는지 확인하기 -> 벗어나면 i++ 진행하기(=방향 바꾸기)
      if (nx < 1 || ny < 1 || nx > n || ny > m) continue

      // 2-3. 범위를 벗어나지 않는다면 그대로 진행하기
      //      해당 방향으로 이동한 뒤 남은 거리를 계산하기
      //      만약 남은 거리가 K-1보다 크다면, 잘못된 방향!(거리가 좁혀지지 않음)
      //      K-1보다 같거나 작다면, 현재 위치 갱신한 뒤 k-- 진행하기(한 발 움직임)
      const remainingDistance = Math.abs(nx - r) + Math.abs(ny - c)
      if (remainingDistance <= k - 1) {
        x = nx
        y = ny
        k--
        answer += dir[i]
        break
      }
    }
  }

  return answer
}

solution(3, 4, 2, 3, 3, 1, 5) // "dllrl"
// solution(2, 2, 1, 1, 2, 2, 2) // "dr"
// solution(3, 3, 1, 2, 3, 3, 4) // "impossible"
