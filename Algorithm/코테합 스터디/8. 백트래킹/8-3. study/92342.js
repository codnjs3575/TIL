function solution(N, info) {
  // 0. 초깃값 설정 (최적의 경우 저장용, 결과값용)
  let answer = [-1] // 라이언의 점수표 배열
  let maxDiff = 0 // 라이언과 어피치의 점수 차이

  // 1. 헬퍼함수 : DFS 탐색한 라이언의 점수표가 더 좋은 결과값인지 판단하는 함수
  function isBetterDiff(currentAnswer, maxAnswer) {
    for (let i = 10; i >= 0; i--) {
      if (currentAnswer[i] > maxAnswer[i]) return true
      if (currentAnswer[i] < maxAnswer[i]) return false
    }
    return false
  }

  // 2. tracking(dfs) 함수
  function dfs(num, ryanArrows, ryanScore, apeachScore, leftArrow) {
    // 분기 1. 만약에 모든 점수를 다 돌았거나 화살을 다 쓴 경우
    // 점수 차이 계산후 결과값 수정하기(점수차이 maxDiff, 점수표 answer)
    if (num == 11) {
      // 남은 화살 있는지 확인하기
      if (leftArrow > 0) ryanArrows[10] += leftArrow

      // 점수 차이 계산하기
      if (ryanScore > apeachScore) {
        const currentDiff = ryanScore - apeachScore

        // 점수 차이가 크거나, 같더라도 더 나은 배열이라면
        if (
          currentDiff > maxDiff ||
          (currentDiff == maxDiff && isBetterDiff(ryanArrows, answer))
        ) {
          maxDiff = currentDiff
          answer = [...ryanArrows]
        }
      }

      // 원상복구하기
      if (leftArrow > 0) ryanArrows[10] -= leftArrow
      return
    }

    // 분기 2. 라이언이 점수를 얻는 경우 -> 라이언 득점!
    if (leftArrow > info[num]) {
      ryanArrows[num] = info[num] + 1 // 과녁을 맞힘
      dfs(
        num + 1,
        ryanArrows,
        ryanScore + (10 - num),
        apeachScore,
        leftArrow - ryanArrows[num]
      )
      ryanArrows[num] = 0 // 밑의 경우도 확인해야 하니 원상복구!
    }

    // 분기 3. 라이언이 점수를 얻지 못하는 경우 -> 어피치 득점!
    const apeachPoint = info[num] > 0 ? 10 - num : 0
    dfs(num + 1, ryanArrows, ryanScore, apeachScore + apeachPoint, leftArrow)
  }

  dfs(0, Array(11).fill(0), 0, 0, N)
  console.log(answer)
  return answer
}

solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0])
// [0,2,2,0,1,0,0,0,0,0,0]

// solution(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
// [-1]

// solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1])
// [1,1,2,0,1,2,2,0,0,0,0]

// solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3])
// [1,1,1,1,1,1,1,1,0,0,2]
