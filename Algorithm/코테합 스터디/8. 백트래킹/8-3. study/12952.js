function solution(n) {
  const checkBoard = [] // index = row, value = col ([1, 3, 0, 2])
  let answer = 0

  // 1. 헬퍼 함수 : 열과 대각선의 유망성 확인하기
  function checking(row) {
    // queen을 놓을 수 있는 자리인지 확인하기
    for (let i = 0; i < row; i++) {
      // 조건 1. 열 : 같은 숫자라면 false
      // 조건 2. 대각선 : 행 차이값과 열 차이값이 같다면, false
      if (
        checkBoard[i] == checkBoard[row] || // 조건 1
        Math.abs(row - i) == Math.abs(checkBoard[row] - checkBoard[i]) // 조건 2
      ) {
        return false
      }
    }
    return true
  }

  // 2. tracking 함수 + 조건에 맞지 않는다면 back!
  function tracking(row) {
    // row가 n이라면 -> queen을 n개 놓았다면 경우의 수 업데이트
    if (row == n) return answer++

    // 2-1. tracking 진행
    for (let queen = 0; queen < n; queen++) {
      // 2-2. 일단 말 놓기 -> 체스판 업데이트
      checkBoard[row] = queen // 해당 row에 queen(col : 0 ~ n-1)의 자리 놓기

      // 2-3. 현재 checkBoard가 가능한 경우인지 확인하기
      if (checking(row)) {
        // 만약 queen을 놓을 수 있는 자리라면, 다음 행으로 넘어가기
        tracking(row + 1)
      }
    }
  }

  tracking(0)
  return answer
}
console.log(solution(4)) // 2
