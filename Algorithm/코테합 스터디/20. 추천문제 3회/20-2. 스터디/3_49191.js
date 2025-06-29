// 방향 그래프를 사용해야 하는 문제, 따라서 Win과 lose를 따로 저장하자!
// win: 부모, 패배, 이길 수 없는 사람
// lose: 자식, 승리, 이길 수 있는 사람
// win + lose + 본인 = n 이라면, 순위를 확정할 수 있음!

function solution(n, playInfo) {
  // 1. wins, loses init
  const wins = {}
  const loses = {}

  playInfo.map(([winner, loser]) => {
    wins[winner] = [...(wins[winner] || []), loser]
    loses[loser] = [...(loses[loser] || []), winner]
  })

  // 2. dfs 함수 init
  function dfs(graph, i, visited) {
    // 방문하지 않은(확인하지 않은) 경우에만 확인 후 dfs 재귀호출
    for (const next of graph[i] || [])
      if (!visited.has(next)) {
        visited.add(next)
        dfs(graph, next, visited)
      }

    return visited.size
  }

  // 3. dfs 탐색 진행하기
  let answer = 0
  for (let i = 1; i <= n; i++) {
    const winsCnt = dfs(wins, i, new Set())
    const losesCnt = dfs(loses, i, new Set())

    if (winsCnt + losesCnt == n - 1) answer++
  }

  return answer
}

solution(5, [
  [4, 3],
  [4, 2],
  [3, 2],
  [1, 2],
  [2, 5],
])
