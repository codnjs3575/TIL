// 주어진 모든 문제들을 풀 수 있는 [알고력], [코딩력]을 얻는 최단시간을 구함
// problems = [alp_req, cop_req, alp_red, cop_red, cost]
//            필요 알고력, 필요 코딩력, 증가 알고력, 증가 코딩력, 문제풀이 시간

function solution(alp, cop, problems) {
  // 0. 필요 알고력, 필요 코딩력의 최댓값 구하기
  let [maxAlp, maxCop] = problems.reduce(
    ([a, c], [reqA, reqC]) => [Math.max(a, reqA), Math.max(c, reqC)],
    [0, 0]
  )
  const maxReq = [Math.max(maxAlp, alp), Math.max(maxCop, cop)]

  // 고려사항 2) 능력치가 오르지 않는 문제는 수정하기!
  problems = problems.filter(([, , a, c]) => !(a === 0 && c === 0))

  // 0. 시간 1당 [알고력] 혹은 [코딩력]을 올리는 것 또한 공부 리스트에 속함 (chatGPT)
  problems.push([0, 0, 1, 0, 1]) // 알고력 공부 1
  problems.push([0, 0, 0, 1, 1]) // 코딩력 공부 1

  // 1. dp 풀이
  // 1-1. dp 2차원 배열 초기화
  const dp = Array.from({ length: maxReq[0] + 1 }, () =>
    new Array(maxReq[1] + 1).fill(Infinity)
  )
  alp = Math.min(alp, maxReq[0]) // 150, 20
  cop = Math.min(cop, maxReq[1]) // 130, 30 일 경우 [20][30]까지만 dp 돌기
  dp[alp][cop] = 0 // 시작 지점 초기화 (현재 [알고력][코딩력])

  // 1-2. dp 진행하기
  for (let cur_alp = alp; cur_alp <= maxReq[0]; cur_alp++) {
    for (let cur_cop = cop; cur_cop <= maxReq[1]; cur_cop++) {
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
          const study_alp = Math.min(cur_alp + alp_red, maxReq[0]) // 공부한 뒤의 알고력, 최대 알고력 중 작은 수
          const study_cop = Math.min(cur_cop + cop_red, maxReq[1]) // 공부한 뒤의 코딩력, 최대 코딩력 중 작은 수
          const study_time = dp[cur_alp][cur_cop] + cost

          // 조건 1
          // 공부한 [알고력][코딩력]의 공부시간이 최소 시간이라면 수정하기
          if (dp[study_alp][study_cop] > study_time)
            dp[study_alp][study_cop] = study_time
        }
      }
    }
  }

  return dp[maxReq[0]][maxReq[1]]
}

// prettier-ignore
solution(10,	10,	[[10,15,2,1,2],[20,20,3,3,4]]) // 15

// prettier-ignore
// solution(0,	0,	[[0,0,2,1,2],[4,5,3,1,2],[4,11,4,0,2],[10,4,0,4,2]]) // 13
