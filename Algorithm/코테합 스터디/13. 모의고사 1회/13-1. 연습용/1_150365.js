// n(세로, x, r) X m(가로, y, c) 크기의 격자 미로
// 출발점 (x, y)에서 k번 이동 후 도착점 (r, c)으로 가는 경로가 존재하는지 확인

// bfs를 사용하면 모든 경로(상,하,좌,우)를 탐색해야 하므로 시간 초과가 발생
// 따라서 탐색을 줄이는 방법과 함께 탐색해야 함 (이동거리에 대한 가능여부 판단)

// tip! 맨해튼 거리(Manhattan distance) : 두 점 사이의 최단 거리는 x축과 y축을 따라 이동하는 거리의 합

function solution(n, m, x, y, r, c, k) {
  const dx = [1, 0, 0, -1] // 사전순 : d(하)/l(좌)/r(우)/u(상)
  const dy = [0, -1, 1, 0]
  const dir = ['d', 'l', 'r', 'u']

  // 0. 맨해튼 거리(distance)가 유효한 값인지 확인하기
  const distance = Math.abs(x - r) + Math.abs(y - c)
  // 만약, (1) distance(최단거리)가 k(이동필수횟수)보다 크거나(즉, 이동해도 도달하지 못함),
  //      (2) (k-거리)가 홀수일 경우에는 "impossible" 반환하기
  if (distance > k || (k - distance) % 2 !== 0) return 'impossible'

  let answer = ''
  // 1. 사전순으로 이동하며 탐색 시작
  while (k > 0) {
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i]
      const ny = y + dy[i]

      // 1-1. 미로 범위를 벗어난다면 continue -> i++ 진행
      if (nx < 1 || ny < 1 || nx > n || ny > m) continue

      // 1-2. 미로 범위를 벗어나지 않는다면 그대로 진행하기
      //      남은 거리를 계산하기
      //      -> 만약 남은 거리가 k-1보다 크다면, 잘못된 방향!
      //      -> k-1보다 같거나 작다면, 좌표를 갱신하고 for문에서 벗어나서 k-- 진행.
      const remainingDistance = Math.abs(nx - r) + Math.abs(ny - c)
      if (remainingDistance <= k - 1) {
        x = nx
        y = ny
        answer += dir[i]
        k--
        break
      }
    }
  }
  return answer
}

solution(3, 4, 2, 3, 3, 1, 5) // "dllrl"
solution(2, 2, 1, 1, 2, 2, 2) // "dr"
solution(3, 3, 1, 2, 3, 3, 4) // "impossible"
