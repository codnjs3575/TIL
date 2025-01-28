function Queue() {
  this.arr = []
  this.front = 0
  this.rear = 0
}
Queue.prototype.push = function (data) {
  this.arr[this.front++] = data
}
Queue.prototype.pop = function () {
  return this.arr[this.rear++]
}
Queue.prototype.isEmpty = function () {
  return this.front === this.rear
}

// - 우리팀 진영 : [0, 0] & 상대팀 진영 : [n-1, m-1]
function solution(maps) {
  const n = maps.length // 세로, j, ny
  const m = maps[0].length // 가로, i, nx
  const dy = [-1, 1, 0, 0] // 상, 하
  const dx = [0, 0, -1, 1] // 좌, 우

  // 1. 이동경로 [x, y] 저장용 queue 생성하기
  let queue = new Queue()
  queue.push([0, 0])

  // 2. 이동 거리 확인용 배열 생성하기
  let visited = Array.from({ length: n }, () => Array(m).fill(-1))
  visited[0][0] = 1

  // 3. bfs : 현재를 기준으로 상하좌우로 움직이며 방문 확인
  while (!queue.isEmpty()) {
    let [y, x] = queue.pop()
    for (let i = 0; i < 4; i++) {
      let ny = y + dy[i]
      let nx = x + dx[i]

      // 지도 내 유효한 좌표 && 방문하지 않은 좌표 -> 방문 처리
      if (
        ny >= 0 &&
        nx >= 0 &&
        ny < n &&
        nx < m &&
        visited[ny][nx] === -1 &&
        maps[ny][nx] === 1
      ) {
        queue.push([ny, nx])
        visited[ny][nx] = visited[y][x] + 1
      }
    }
  }
  return visited[n - 1][m - 1]
}

// prettier-ignore
solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]]) // 11

// prettier-ignore
// solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]]) // -1

// prettier-ignore
// solution([[1, 1, 1, 1, 0], [1, 1, 1, 1, 0], [1, 1, 1, 1, 0], [1, 1, 1, 0, 0], [1, 1, 1, 1, 1]]) // 9

// prettier-ignore
// solution([[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [1, 1, 1, 1, 1]]) // 9

// prettier-ignore
// solution([[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]) // 9

// prettier-ignore
// solution([[1, 0, 1, 1, 1], [0, 0, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 0, 0], [1, 1, 1, 0, 1]]) // -1

// 정확성  테스트
// 테스트 1 〉	통과 (0.33ms, 33.4MB)
// 테스트 2 〉	통과 (0.38ms, 33.3MB)
// 테스트 3 〉	통과 (0.33ms, 33.4MB)
// 테스트 4 〉	통과 (0.33ms, 33.4MB)
// 테스트 5 〉	통과 (0.45ms, 33.4MB)
// 테스트 6 〉	통과 (0.51ms, 33.5MB)
// 테스트 7 〉	통과 (0.38ms, 33.4MB)
// 테스트 8 〉	통과 (0.35ms, 33.5MB)
// 테스트 9 〉	통과 (0.34ms, 33.5MB)
// 테스트 10 〉	통과 (0.34ms, 33.4MB)
// 테스트 11 〉	통과 (0.32ms, 33.4MB)
// 테스트 12 〉	통과 (0.30ms, 33.4MB)
// 테스트 13 〉	통과 (0.44ms, 33.4MB)
// 테스트 14 〉	통과 (0.30ms, 33.4MB)
// 테스트 15 〉	통과 (0.35ms, 33.5MB)
// 테스트 16 〉	통과 (0.16ms, 33.3MB)
// 테스트 17 〉	통과 (0.32ms, 33.4MB)
// 테스트 18 〉	통과 (0.17ms, 33.5MB)
// 테스트 19 〉	통과 (0.16ms, 33.4MB)
// 테스트 20 〉	통과 (0.15ms, 33.4MB)
// 테스트 21 〉	통과 (0.18ms, 33.4MB)

// 효율성  테스트
// 테스트 1 〉	통과 (7.80ms, 38.1MB)
// 테스트 2 〉	통과 (7.68ms, 37.8MB)
// 테스트 3 〉	통과 (7.23ms, 38.1MB)
// 테스트 4 〉	통과 (26.73ms, 37.4MB)
