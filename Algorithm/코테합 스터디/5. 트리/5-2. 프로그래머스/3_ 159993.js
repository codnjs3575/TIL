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

// 헬퍼 함수 1. 이동 가능한 좌표인지 판단하는 함수
function isMovable(ny, nx, n, m, maps) {
  // ny/nx가 좌표 범위를 벗어나지 않는지 && 해당 좌표 위치가 벽이 아닌지 체크
  return ny >= 0 && ny < n && nx >= 0 && nx < m && maps[ny][nx] !== 'X'
}

// 헬퍼 함수 2. 방문 확인 및 체크용 함수
function apppendToQueue(ny, nx, k, time, vistied, queue) {
  if (!vistied[ny][nx][k]) {
    vistied[ny][nx][k] = true
    queue.push([ny, nx, k, time + 1])
  }
}

function solution(maps) {
  const n = maps.length // 행의 개수 (가로)
  const m = maps[0].length // 열의 개수 (세로)
  const dy = [-1, 1, 0, 0]
  const dx = [0, 0, -1, 1]

  // - 방문 기록용 큐
  const q = new Queue()

  // - 방문 체크용 배열
  const visited = Array.from(Array(n), () =>
    Array(m)
      .fill(false)
      .map(() => Array(2).fill(false))
  )

  // 1. start와 end 찾기 : 이중 반복문
  //   ㄴ 1-1. start는 바로 방문확인체크 + 큐에 넣음
  //   ㄴ 1-2. end는 확인용 배열에 넣기
  let endY = -1
  let endX = -1

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maps[i][j] === 'S') {
        visited[i][j][0] = true
        q.push([i, j, 0, 0])
      } else if (maps[i][j] === 'E') {
        endY = i
        endX = j
      }
    }
  }

  // 2. Queue에 push하고 pop하며 도착점까지 이동하기
  while (!q.isEmpty()) {
    const [y, x, k, time] = q.pop()

    // 분기점 1. 도착점이며 레버가 당겨져 있다면 return time(이동횟수,시간)
    if (y === endY && x === endX && k === 1) return time

    // 분기점 2. 도착점까지 상하좌우로 이동함
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i]
      const nx = x + dx[i]

      // 이동 가능한 좌표인지 확인하기 -> 이동이 불가능한 좌표라면 continue
      if (!isMovable(ny, nx, n, m, maps)) continue

      // 다음 이동 지점이 레버인 경우
      if (maps[ny][nx] === 'L') {
        apppendToQueue(ny, nx, 1, time, visited, q)
      }
      // 다음 이동 지점이 통로인 경우
      else {
        apppendToQueue(ny, nx, k, time, visited, q)
      }
    }
  }
  return -1
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
