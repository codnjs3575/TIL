function solution(maps) {
  const n = maps.length // 세로, ny
  const m = maps[0].length // 가로, nx
  const dy = [-1, 1, 0, 0] // 상, 하
  const dx = [0, 0, -1, 1] // 좌, 우

  // 1. 이동경로 [x,y] 저장용 queue
  let queue = [[0, 0]] // 캐릭터 칸 queue에 넣고 시작하기

  // 2. 이동거리 저장용 배열 visited
  let visited = Array.from({ length: n }, () => Array(m).fill(-1))
  visited[0][0] = 1 // 캐릭터 칸 visited에 이동거리 1 넣고 시작하기

  // 3. queue가 비어질 떄까지 shift하면서 방문확인 및 queue에 push하기
  while (queue.length) {
    const [y, x] = queue.shift()
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i] 
      const nx = x + dx[i]

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
// solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]]) // 11

// prettier-ignore
// solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]]) // -1
