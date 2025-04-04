// 1로 이뤄진 가장 큰 정사각형 찾기!

// 동적 계획법(DP) : 최적 구조 + 중복 부분
//   ㄴ 최적 구조: 하위문제로 나누기 => 근처에 있는 칸끼리만 계산하기
//   ㄴ 중복 부분: 메모이제이션 => 여태까지의 최대 길이를 저장

// 구현 방식은?
// 상향식 vs 하향식
//   ㄴ 힌트! 점화식을 사용할 수 있다 => 하향식 접근 + 점화식
//      한 줄, 한 칸씩 내려가면서 계산하기

function solution(board) {
  let maxLength = 0 // 가장 큰 정사각형의 한 변의 길이

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === 1) {
        if (i > 0 && j > 0) {
          // prettier-ignore
          board[i][j] = Math.min(board[i-1][j], board[i][j-1], board[i-1][j-1]) + 1
        }
        maxLength = Math.max(maxLength, board[i][j])
      }
    }
  }

  return maxLength * maxLength // 가장 큰 정사각형의 넓이
}

// prettier-ignore
solution([[0,1,1,1],[1,1,1,1],[1,1,1,1],[0,0,1,0]]) // 9

// prettier-ignore
solution([[0,0,1,1],[1,1,1,1]]) // 4
