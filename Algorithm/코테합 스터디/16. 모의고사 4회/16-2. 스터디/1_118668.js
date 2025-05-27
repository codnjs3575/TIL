// problems = [alp_req, cop_req, alp_rwd, cop_rwd, cost
function solution(alp, cop, problems) {
  // 0. 구해야 하는 알고력, 코딩력의 최댓값 구하기
  let [maxAlp, maxCop] = problems.reduce(
    ([a, c], [reqA, reqC]) => [Math.max(a, reqA), Math.max(c, reqC)],
    [0, 0]
  )

  // 주의) 오히려 현재 알고력, 코딩력이 더 클수도 있음!
  const maxReq = [Math.max(maxAlp, alp), Math.max(maxCop, cop)]

  // 0. 시간 1당 [알고력]이나 [코딩력]을 1씩 키우는 공부도 리스트에 포함!
  problems.push([0, 0, 1, 0, 1]) // 알고력 공부 1
  problems.push([0, 0, 0, 1, 1]) // 코딩력 공부 1

  // 주의) 능력치가 아예 오르지 않는 문제가 있을 수 있음! -> 제거
  problems = problems.filter(([, , a, c]) => !(a === 0 && c === 0))

  // 1. dp와 함께 공부 목록을 하나씩 진행하면서 조건에 맞게 공부하고 수정해나가기
  // 1-1. dp 배열 초기화 (2차원 배열)
  const dp = Array.from({ length: maxReq[0] + 1 }, () =>
    new Array(maxReq[1] + 1).fill(Infinity)
  )
  dp[alp][cop] = 0 // 현재 [알고력][코딩력]을 초기화

  // 1-2. dp 진행하기
  for (let cur_alp = alp; cur_alp <= maxReq[0]; cur_alp++) {
    for (let cur_cop = cop; cur_cop <= maxReq[1]; cur_cop++) {
      if (dp[cur_alp][cur_cop] === Infinity) continue // 아직 진행해보지 않은 [알고력][코딩력]의 공부 시간은 알기 어려움

      // 1-3. 모든 공부를 하나씩 진행해보기
      for ([alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
        // 공부 가능하다면, 진행하기
        if (cur_alp >= alp_req && cur_cop >= cop_req) {
          const study_alp = Math.min(cur_alp + alp_rwd, maxReq[0])
          const study_cop = Math.min(cur_cop + cop_rwd, maxReq[1])
          const study_time = dp[cur_alp][cur_cop] + cost

          if (dp[study_alp][study_cop] > study_time)
            dp[study_alp][study_cop] = study_time
        }
      }
    }
  }

  return dp[maxReq[0]][maxReq[1]]
}
solution(10, 10, [
  [10, 15, 2, 1, 2],
  [20, 20, 3, 3, 4],
])
