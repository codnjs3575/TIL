// row: 1,000이하의 자연수
// column: 1,000이하의 자연수

// DP: 중복 부분 문제 + 최적 부분 구조
//   ㄴ 중복 부분 문제 : 메모이제이션 => 여태까지의 최대길이 저장
//   ㄴ 최적 부분 구조 : 하위문제 => 근처에 있는 칸끼리만 계산하기

// 상향식 vs 하향식
//  ㄴ 힌트! 점화식을 사용할 수 있다 => 하향식 접근
//     한 줄, 한 칸씩 내려가면서 계산하기
function solution(board) {
  let maxLen = 0 // 최대 길이

  // 하향식 : 첫 번째 줄, 첫 번째 칸부터 시작
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === 1) {
        if (i > 0 && j > 0) {
          // 점화식 사용 & 현재 보드에 저장: 상, 하, 왼쪽 대각선 중 가장 작은 수에 +1
          //   작은 수에 더해야 정사각형으로 완성됨! 큰 수는 직사각형이 됨
          board[i][j] =
            Math.min(board[i - 1][j], board[i][j - 1], board[i - 1][j - 1]) + 1
        }
        maxLen = Math.max(maxLen, board[i][j])
      }
    }
  }

  return maxLen * maxLen
}

// prettier-ignore
solution([[0,1,1,1],[1,1,1,1],[1,1,1,1],[0,0,1,0]]) // 9

// prettier-ignore
// solution([[0,0,1,1],[1,1,1,1]]) // 4
