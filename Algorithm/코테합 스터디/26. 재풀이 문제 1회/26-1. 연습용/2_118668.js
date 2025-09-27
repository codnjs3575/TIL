// 0 ≤ alp,cop ≤ 150
// problems의 원소는 [alp_req, cop_req, alp_rwd, cop_rwd, cost]
// alp_req는 문제를 푸는데 필요한 알고력입니다. 0 ≤ alp_req ≤ 150
// cop_req는 문제를 푸는데 필요한 코딩력입니다. 0 ≤ cop_req ≤ 150
// alp_rwd는 문제를 풀었을 때 증가하는 알고력입니다. 0 ≤ alp_rwd ≤ 30
// cop_rwd는 문제를 풀었을 때 증가하는 코딩력입니다. 0 ≤ cop_rwd ≤ 30
// cost는 문제를 푸는데 드는 시간입니다. 1 ≤ cost ≤ 100

// 추가 1) 알고력/코딩력을 시간 1로 공부 1 하는 방법 ([0,0,0,1,1], [0,0,1,0,1])
// 추가 2) 성공 달성 조건 만들기 -> 목표하는 알고력/코딩력 설정하기

// 로직 1) 목표 알고력/코딩력이 아니라면, 공부하기
//  목표치만큼 올릴 수 있는 효율적인 공부방법으로 공부하기
// 로직 2) DP로 효율적인 공부방법 확인하기

function solution(alp, cop, problems) {
  // 목표하는 알고력/코딩력 설정하기(가장 큰 알고력, 코딩력)
  let [max_alp, max_cop] = problems.reduce(
    ([a, c], [curA, curC]) => [Math.max(a, curA), Math.max(c, curC)],
    [0, 0]
  )

  // 알고력/코딩력 시간 1, 공부 1
  problems.push([0, 0, 1, 0, 1])
  problems.push([0, 0, 0, 1, 1])

  problems = problems.filter(([, , a, c]) => !(a === 0 && c === 0))

  // problem에 있는 공부를 통해 알고력/코딩력을 높이기
  const dp = Array.from({ length: max_alp + 1 }, () =>
    new Array(max_cop + 1).fill(Infinity)
  )
  alp = Math.min(alp, max_alp)
  cop = Math.min(cop, max_cop)
  dp[alp][cop] = 0

  // dp 진행하기
  for (let cur_alp = alp; cur_alp <= max_alp; cur_alp++) {
    for (let cur_cop = cop; cur_cop <= max_cop; cur_cop++) {
      if (dp[cur_alp][cur_cop] === Infinity) continue

      // 공부 목록 하나씩 뽑아가면서, (무조건 모든 공부 진행해보기)
      // [조건 1] 최소 시간이라면 수정하는 방식으로 진행하기!
      // [조건 2] 단, 최대 알고력, 코딩력을 공부하게 된다면 진행하지 않기!
      // [조건 3] 필요 알고력,코딩력(alp_req, cop_req)를 넘을 때에만 공부하기!
      for ([alp_req, cop_req, alp_red, cop_red, cost] of problems) {
        // 조건 3
        if (cur_alp >= alp_req && cur_cop >= cop_req) {
          // 수정 전
          // const study_alp = cur_alp + alp_red // 공부한 뒤의 알고력 -> 최대보다 작아야 함
          // const study_cop = cur_cop + alp_cop // 공부한 뒤의 코딩력 -> 최대보다 작아야 함

          // 조건 2) 수정 후
          const study_alp = Math.min(cur_alp + alp_red, max_alp) // 공부한 뒤의 알고력, 최대 알고력 중 작은 수
          const study_cop = Math.min(cur_cop + cop_red, max_cop) // 공부한 뒤의 코딩력, 최대 코딩력 중 작은 수
          const study_time = dp[cur_alp][cur_cop] + cost

          // 조건 1
          // 공부한 [알고력][코딩력]의 공부시간이 최소 시간이라면 수정하기
          if (dp[study_alp][study_cop] > study_time)
            dp[study_alp][study_cop] = study_time
        }
      }
    }
  }

  return dp[max_alp][max_cop]
}

// prettier-ignore
// solution(0,	0,[[0,0,2,1,2],[4,5,3,1,2],[4,11,4,0,2],[10,4,0,4,2]]) // 13

// prettier-ignore
console.log(
solution(10,	10,	[[10,15,2,1,2], [20,20,3,3,4]]) // 15
)
