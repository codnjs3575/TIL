function solution(maps) {
  const n = maps.length // 세로, i, ny
  const m = maps[0].length // 가로, nx
  const dy = [-1, 1, 0, 0] // 상, 하
  const dx = [0, 0, -1, 1] // 좌,우

  // 1. 로봇 이동용 queue : [y, x]
  let queue = [[0, 0]] // 로봇 시작 위치

  // 2. 로봇 방문 확인용 배열
  let visited = Array.from({ length: n }, () => Array(m).fill(-1))
  visited[0][0] = 1 // 로봇 시작 위치 방문처리

  // 3. bfs 탐색
  while (queue.length) {
    let [y, x] = queue.shift()

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i]
      const nx = x + dx[i]

      // 이동 가능한 좌표일경우
      if (
        ny >= 0 &&
        nx >= 0 &&
        ny < n &&
        nx < m &&
        maps[ny][nx] === 1 &&
        visited[ny][nx] === -1
      ) {
        queue.push([ny, nx])
        visited[ny][nx] = visited[y][x] + 1 
      }
    }
  }
  
  return visited[n - 1][m - 1]
}
// prettier-ignore
// solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]]) // 11

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
