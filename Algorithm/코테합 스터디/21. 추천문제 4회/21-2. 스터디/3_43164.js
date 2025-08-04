// ! 가능한 경로가 2개 이상이라면 알파벳 순서로 return => sort 필요
// ! 무조건 ICN 공항에서 출발 => dfs('ICN')
function solution(tickets) {
  const answer = []
  const visited = Array(tickets.length).fill(false)

  tickets.sort() // 알파벳 순서

  function dfs(curr, path) {
    // 종료 조건
    if (path.length === tickets.length + 1) {
      answer.push([...path])
    }

    for (let i = 0; i < tickets.length; i++) {
      const [a, b] = tickets[i]
      // 방문하지 않은 경로이고, 현재 출발지라면 -> b로 향하는 경로 추가 후 dfs 재귀 호출
      if (!visited[i] && a === curr) {
        visited[i] = true
        dfs(b, [...path, b])
        visited[i] = false
      }
    }
  }

  dfs('ICN', ['ICN'])
  return answer[0]
}

// prettier-ignore
solution([["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]])

// prettier-ignore
solution([["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]])
