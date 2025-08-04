// 공항 수 : 3 ~ 10,000개
// [a,b] => a에서 b로 가는 항공권
// 항공권은 모두 사용해야 함
// 가능한 경로가 2개 이상이라면 알파벳 순서로 return
// 모든 도시를 방문할 수 없는 경우는 없음

function solution(tickets) {
  var answer = []
  const visited = Array(tickets.length).fill(false)

  tickets.sort()

  function dfs(curr, path) {
    if (path.length === tickets.length + 1) {
      answer.push([...path])
    }

    for (let i = 0; i < tickets.length; i++) {
      const [a, b] = tickets[i]

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
// solution([["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]])
