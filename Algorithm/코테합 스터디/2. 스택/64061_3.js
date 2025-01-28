function solution(board, moves) {
  let result = 0
  let stack = []

  moves.map((move, idx) => {
    let findVal = -1

    // 1. 인형찾기 : 인형이 있는 곳을 찾아 0으로 바꾸고, 변수에 저장하기
    for (let col = 0; col < board.length; col++) {
      if (board[col][move - 1] !== 0) {
        findVal = board[col][move - 1]
        board[col][move - 1] = 0
        // console.log(col, move - 1)
        break
      }
    }
    console.log(move - 1)

    // 2. 만약 stack[top]과 현재 인형 값(findVal)이 같다면 삭제, 다르다면 stack에 삽입
    if (findVal === stack[stack.length - 1] && stack.length) {
      stack.pop()
      result += 2
    } else if (findVal !== -1) {
      // console.log(findVal)
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
