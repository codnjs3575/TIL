// 1. 시작점부터 이동해야하니 maps에서 출발점과 도착점을 찾고 시작함
// 2. 출발점부터 BFS 방식으로 이동하며 방문한 지점들을 모두 Queue에 저장
// 3. 방문했던 곳을 다시 방문하지 않도록 방문확인용 배열도 생성함
// 4. 도착점에 도달할 때까지 Queue를 계속 push/pop 하며 이동하기

class Queue {
  constructor() {
    this.data = []
    this.front = 0
    this.rear = 0
  }
  isEmpty() {
    return this.front === this.rear
  }
  push(data) {
    this.data.push(data)
    this.rear++
  }
  pop() {
    return this.data[this.front++]
  }
}

function checkVisit(ny, nx, k, time, isVisited, visitedQueue) {
  // 분기점 : 방문을 하지 않았을 경우에만 수정/삽입
  // 방문 확인용 배열을 수정하기
  // Queue에 방문 기록 삽입하기
  if (!isVisited[ny][nx][k]) {
    isVisited[ny][nx][k] = true
    visitedQueue.push([ny, nx, k, time + 1])
  }
}

function solution(maps) {
  const n = maps.length // 행, i, y
  const m = maps[0].length // 열, j, x
  const dy = [1, -1, 0, 0] // 상 하 좌 우 이동
  const dx = [0, 0, -1, 1] // 상 하 좌 우 이동

  // 0. 방문 확인용 배열
  const isVisited = Array.from(Array(n), () =>
    Array(m)
      .fill(false)
      .map(() => Array(2).fill(false))
  )

  // 0. 방문 기록용 Queue [ y, x, k(레버를 당겼는가? false: 0, true: 1), time(이동횟수, 시간) ]
  const visitedQueue = new Queue()

  // 1. 시작점, 도착점 찾기
  let endX = -1
  let endY = -1
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maps[i][j] === 'S') {
        // 시작점 -> 배열과 큐에 삽입
        isVisited[i][j][0] = true
        visitedQueue.push([i, j, 0, 0])
      } else if (maps[i][j] === 'E') {
        // 도착점 -> x, y 저장하기
        endY = i
        endX = j
      }
    }
  }

  // 2. 도착점을 찾을 때까지 Queue를 push/pop하며 이동하기
  while (!visitedQueue.isEmpty()) {
    const [y, x, k, time] = visitedQueue.pop()

    // 도착점에 도달했다면 반환 (이동횟수/시간)
    if (y === endY && x === endX && k === 1) return time

    // 상 하 좌 우 이동하며 queue에 push/pop 하기
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i]
      const nx = x + dx[i]

      // ny, nx가 유효한 좌표인지 확인하기 : 좌표상에서 벗어낫거나 벽인 경우
      if (!(ny >= 0 && ny < n && nx >= 0 && nx < m && maps[ny][nx] !== 'X'))
        continue

      // 다음 이동 지점이 레버인 경우
      if (maps[ny][nx] === 'L') {
        checkVisit(ny, nx, 1, time, isVisited, visitedQueue)
      }
      // 다음 이동 지점이 레버가 아닌 경우
      else {
        checkVisit(ny, nx, k, time, isVisited, visitedQueue)
      }
    }
  }

  // 3. 도착점까지 도달하지 못했다면 -1 리턴
  return -1
}

// ["SOOOL","XXXXO","OOOOO","OXXXX","OOOOE"] 16
// ["LOOXS","OOOOX","OOOOO","OOOOO","EOOOO"] -1
// ["LOOXS", "OOEXO", "OXXXO", "OXXXO", "OOOOO"] 15
// ["SOOOO", "OOOOO", "OOOOO", "OOOOO", "OOOLE"] 8
// ["OOOOOL", "OXOXOO", "OOSXOX", "OXXXOX", "EOOOOX"] 14
// ["XXXXXL", "XXXXOO", "OOSXOX", "OXXXOX", "EOOOOX"] 22
// ["XXXXL", "XOOSX", "XXXXX", "XXXOO", "EXXXX", "XXXXX"] -1
// ["LOS", "XXX", "XEX"] -1
// ["OOOLS", "XXXEO", "XXXXX"] 2
console.log(solution(['OOS', 'OOL', 'OOX', 'OXX', 'OOE'])) // 8
