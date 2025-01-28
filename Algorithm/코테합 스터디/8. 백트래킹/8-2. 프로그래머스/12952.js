function solution(n) {
  const checkBoard = []
  let answer = 0

  // 열/대각선 확인하기
  function checking(row) {
    // queen을 놓을 수 있는 자리인지 확인하는 함수
    for (let i = 0; i < row; i++) {
      if (
        checkBoard[row] == checkBoard[i] ||
        Math.abs(row - i) == Math.abs(checkBoard[row] - checkBoard[i])
      ) {
        return false
      }
    }
    return true
  }

  // tracking 함수 + 조건에 맞지 않는다면 back!
  function tracking(row) {
    // 행 번호가 n이라면 -> queen을 n개 놓았다면
    if (row == n) {
      return answer++ // 경우의 수를 업데이트 한다.
    }

    for (let queen = 0; queen < n; queen++) {
      // 조건 1. 같은 행에 Queen이 없어야 함.
      checkBoard[row] = queen // 해당 행에 queen을 놓는다.
      if (checking(row)) {
        // 만약 queen을 놓을 수 있는 자리라면
        tracking(row + 1) // 다음 행으로 넘어간다.
      }
    }
    return
  }

  tracking(0) // 인덱스 0번 행부터 진행한다.
  return answer
}
console.log(solution(4)) // 2
