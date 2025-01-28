class Queue {
  item = []
  front = 0
  rear = 0

  push(item) {
    this.item.push(item)
    this.rear++
  }

  pop() {
    return this.item[this.front++]
  }

  isEmpty() {
    return this.front === this.rear
  }
}

// 함수 1. 이동 가능한 좌표인지 판단하는 함수
function isValidMove(ny, nx, n, m, maps) {
  // ny/nx가 좌표 범위를 벗어나지 않는지 && 해당 좌표 위치가 벽이 아닌지 체크
  return 0 <= ny && ny < n && 0 <= nx && nx < m && maps[ny][nx] !== 'X'
}

// 함수 2. 방문한 적이 없으면 큐에 넣고 방문 여부 표시
function apppendToQueue(ny, nx, k, time, visited, q) {
  // 방문하지 않을 때에만(false)일 때에만 true로 변경하여 방문 표시함.
  // 이미 방문했다면 해당 좌표의 최단 경로는 이미 구한 것과 같음
  if (!visited[ny][nx][k]) {
    visited[ny][nx][k] = true // 해당 좌표애 대하여 방문 표시함
    q.push([ny, nx, k, time + 1]) // 해당 좌표를 큐에 삽입함
  }
}

function solution(maps) {
  const n = maps.length
  const m = maps[0].length
  const visited = Array.from(Array(n), () =>
    Array(m)
      .fill(false)
      .map(() => Array(2).fill(false))
  )

  // 아래, 위, 왼쪽, 오른쪽 이동 방향
  const dy = [-1, 1, 0, 0]
  const dx = [0, 0, -1, 1]
  const q = new Queue()
  let endY = -1
  let endX = -1

  // 시작점과 도착점을 찾아 큐에 넣고 방문 여부 표시
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maps[i][j] === 'S') {
        // 시작점
        q.push([i, j, 0, 0])
        visited[i][j][0] = true
      }
      if (maps[i][j] === 'E') {
        // 도착점
        endY = i
        endX = j
      }
    }
  }

  while (!q.isEmpty()) {
    // 큐에서 좌표와 이동 횟수를 꺼냄
    const [y, x, k, time] = q.pop()

    // 도착점에 도착하면 결과 반환
    if (y === endY && x === endX && k === 1) return time

    // 네 방향으로 이동
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i]
      const nx = x + dx[i]

      // 이동 가능한 좌표인 때에만 큐에 넣음
      if (!isValidMove(ny, nx, n, m, maps)) {
        continue
      }

      // 다음 이동 지점이 레버인 경우
      if (maps[ny][nx] === 'L') {
        apppendToQueue(ny, nx, 1, time, visited, q)
      }

      // 다음 이동 지점이 레버가 아닌 경우
      else {
        apppendToQueue(ny, nx, k, time, visited, q)
      }
    }
    console.log(q.item.join('\n'))
    console.log('--------')
  }
  // visited.map((val) => console.log(val))

  return -1 // 도착점에 도달하지 못한 경우
}

// solution(['SOOOL', 'XXXXO', 'OOOOO', 'OXXXX', 'OOOOE']) // 16
// solution(['LOOXS', 'OOOOX', 'OOOOO', 'OOOOO', 'EOOOO']) // -1
// solution(['LOOXS', 'OOEXO', 'OXXXO', 'OXXXO', 'OOOOO']) // 15
// solution(['SOOOO', 'OOOOO', 'OOOOO', 'OOOOO', 'OOOLE']) // 8
// solution(['OOOOOL', 'OXOXOO', 'OOSXOX', 'OXXXOX', 'EOOOOX']) // 14
// solution(['XXXXXL', 'XXXXOO', 'OOSXOX', 'OXXXOX', 'EOOOOX']) // 22
// solution(['XXXXL', 'XOOSX', 'XXXXX', 'XXXOO', 'EXXXX', 'XXXXX']) // -1
// solution(['LOS', 'XXX', 'XEX']) // -1
// solution(['OOOLS', 'XXXEO', 'XXXXX']) // 2
solution(['OOS', 'OOL', 'OOX', 'OXX', 'OOE']) // 8

// 테스트 1 〉	통과 (0.43ms, 33.4MB)
// 테스트 2 〉	통과 (0.50ms, 33.5MB)
// 테스트 3 〉	통과 (0.64ms, 33.6MB)
// 테스트 4 〉	통과 (0.79ms, 33.5MB)
// 테스트 5 〉	통과 (0.91ms, 33.5MB)
// 테스트 6 〉	통과 (0.51ms, 33.5MB)
// 테스트 7 〉	통과 (2.94ms, 36MB)
// 테스트 8 〉	통과 (4.00ms, 36.4MB)
// 테스트 9 〉	통과 (0.45ms, 33.4MB)
// 테스트 10 〉	통과 (0.32ms, 33.5MB)
// 테스트 11 〉	통과 (2.10ms, 35.8MB)
// 테스트 12 〉	통과 (15.12ms, 38.3MB)
// 테스트 13 〉	통과 (9.06ms, 38.5MB)
// 테스트 14 〉	통과 (11.24ms, 38.4MB)
// 테스트 15 〉	통과 (1.73ms, 33.7MB)
// 테스트 16 〉	통과 (22.14ms, 39.2MB)
// 테스트 17 〉	통과 (26.98ms, 40MB)
// 테스트 18 〉	통과 (0.74ms, 33.6MB)
// 테스트 19 〉	통과 (1.05ms, 33.6MB)
// 테스트 20 〉	통과 (26.77ms, 38.9MB)
// 테스트 21 〉	통과 (3.36ms, 35.9MB)
// 테스트 22 〉	통과 (0.61ms, 33.5MB)
// 테스트 23 〉	통과 (0.44ms, 33.4MB)
