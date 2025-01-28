// <문제 및 입출력 분석>
// 입력값에 따른 시간복잡도 분석
//   ㄴ board의 최대 길이(n)는 30이므로, n²까지도 가능함 -> 이중 반복문까지 가능
//   ㄴ moves의 최대 길이(m)은 1000이므로, m까지 가능
// stack 사용 분석
//   ㄴ 찾아낸 인형 숫자가 stack[top]가 다르다면(다른 인형을 골라냄) stack에 삽입,
//   ㄴ stack[top]과 같다면(같은 인형을 골라냄) stack[top]을 pop하고 count+=2
// -----------------------------------------------------------------------------------------

// <구현>
// moves 배열을 하나씩 돌면서 인형(findVal)을 찾아냄
// 인형(findVal)이 stack[top]과 다르다면 stack에 삽입 : stack.push(findVal)
// 인형(findVal)이 stack[top]과 같다면 stack[top] 삭제 : stack.pop()

function solution(board, moves) {
  let result = 0
  let stack = []

  moves.map((move, idx) => {
    let findVal = -1
    // 1. 인형이 있는 곳을 찾아 0으로 바꾸고, 인형 값을 변수에 저장하기
    for (let col = 0; col < board.length; col++) {
      if (board[col][move - 1] !== 0) {
        findVal = board[col][move - 1]
        board[col][move - 1] = 0
        break
      }
    }

    // 2. 만약 stack[top]과 현재 인형 값이 같다면 삭제, 다르다면 stack에 저장
    if (stack.length !== 0 && stack[stack.length - 1] === findVal) {
      console.log(findVal)
      stack.pop()
      result += 2
    } else if (findVal !== -1) {
      stack.push(findVal)
    }
  })

  return result
}

solution(
  [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [4, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ],
  [1, 5, 3, 5, 1, 2, 1, 4]
)
