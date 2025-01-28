function solution(board, moves) {
  let stack = []
  let result = 0

  moves.map((move, idx) => {
    let updateVal = -1 // 찾아낸 인형 값을 저장해놓을 변수

    // 1. 인형이 있는 곳을 찾아 0으로 바꾸고, 인형 값을 변수에 저장하기
    for (let i = 0; i < board.length; i++) {
      if (board[i][move - 1] !== 0) {
        updateVal = board[i][move - 1]
        board[i][move - 1] = 0
        break
      }
    }
    // 2. 만약 stack[top]과 현재 인형 값이 같다면 삭제, 다르다면 stack에 저장
    if (stack.length && stack[stack.length - 1] === updateVal) {
      stack.pop()
      result += 2
    } else if (updateVal !== -1) {
      stack.push(updateVal)
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
