function solution(N, info) {
  // 0. 초기값 설정
  let answer = [-1] // 라이언의 점수표 배열 (전역변수)
  let maxDiff = 0 // 라이언과 어피치의 점수 차이 (전역변수)

  // 1. isBetterDiff 함수 : 수정할 라이언의 점수표가 더 좋은 결과값인지 판단하는 함수
  //  ㄴ 낮은 과녁을 맞출수록 좋은 점수표
  function isBetterDiff(currentAnswer, maxAnswer) {
    for (let i = 10; i >= 0; i--) {
      if (currentAnswer[i] > maxAnswer[i]) return true
      if (currentAnswer[i] < maxAnswer[i]) return false
    }
    return false
  }

  // 2. dfs 함수 : num(과녁판 점수), ryanArrows(라이언 점수표), ryanscore(라이언 점수), apeachScore(어피치 점수), leftArrow(남은 화살)
  function dfs(num, ryanArrows, ryanScore, apeachScore, leftArrow) {
    // 분기 1. 모든 점수를 다 돌았거나 화살을 다 쏜 경우
    if (num === 11) {
      // 2-1-1. 아직 남은 화살이 있는 경우(0점을 맞추는 경우) -> 남은 화살은 0점에 넣어줌
      if (leftArrow > 0) ryanArrows[10] += leftArrow

      // 2-1-2. 만약 점수 차이가 크다면, 결과값 수정하기 (점수차이, 라이언의 점수표)
      if (ryanScore > apeachScore) {
        const currentDiff = ryanScore - apeachScore
        if (
          currentDiff > maxDiff ||
          (currentDiff === maxDiff && isBetterDiff(ryanArrows, answer))
        ) {
          maxDiff = currentDiff // (결과값) 최대 점수 차이 수정
          answer = [...ryanArrows] // (결과값) 라이언의 점수표 수정
        }
      }

      if (leftArrow > 0) ryanArrows[10] -= leftArrow // 원상복구
      return
    }

    // 분기 2. 라이언이 점수를 얻는 경우 -> 라이언의 점수를 더해줌
    if (leftArrow > info[num]) {
      ryanArrows[num] = info[num] + 1
      dfs(
        num + 1,
        ryanArrows,
        ryanScore + (10 - num),
        apeachScore,
        leftArrow - ryanArrows[num]
      )
      ryanArrows[num] = 0 // back : 원상복구
    }

    // 분기 3. 라이언이 점수를 얻지 못하는 경우 -> 어피치의 점수를 더해줌
    const apeachPoint = info[num] > 0 ? 10 - num : 0
    dfs(num + 1, ryanArrows, ryanScore, apeachScore + apeachPoint, leftArrow)
  }

  dfs(0, Array(11).fill(0), 0, 0, N)
  // console.log(answer)
  return answer
}

// solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0])
// [0,2,2,0,1,0,0,0,0,0,0]

// solution(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
// [-1]

solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1])
// [1,1,2,0,1,2,2,0,0,0,0]

// solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3])
// [1,1,1,1,1,1,1,1,0,0,2]
