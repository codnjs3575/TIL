function solution(n, playInfo) {
  // 0. winsCnt, losesCnt init : index는 자신, value는 Cnt
  let answer = 0

  // 1. wins, loses init
  const wins = {} // { '1': [ 2 ], '2': [ 5 ], '3': [ 2 ], '4': [ 3, 2 ] }
  const loses = {} // { '2': [ 4, 3, 1 ], '3': [ 4 ], '5': [ 2 ] }

  playInfo.map(([winner, loser]) => {
    wins[winner] = [...(wins[winner] || []), loser]
    loses[loser] = [...(loses[loser] || []), winner]
  })

  // 2. dfs 탐색용 함수
  function dfs(graph, i, visited) {
    for (const next of graph[i] || [])
      if (!visited.has(next)) {
        visited.add(next)
        dfs(graph, next, visited)
      }

    return visited.size
  }

  // 3. dfs 탐색 진행하기 : 해당 노드 i(1 ~ n)의 승리 횟수, 패배 횟수를 알 수 있는 dfs 진행
  for (let i = 1; i <= n; i++) {
    const winsCnt = dfs(wins, i, new Set())
    const losesCnt = dfs(loses, i, new Set())

    if (winsCnt + losesCnt == n - 1) answer++ // 승리 횟수 + 패배 횟수
  }

  return answer
}

// prettier-ignore
solution(5, [[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]])
