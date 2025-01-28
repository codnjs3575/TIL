function solution(board) {
  // 조건 1. 열에 해당 숫자가 있는지 -> 있다면 true
  function inCol(num, col) {
    return board.some((row) => row[col] === num)
  }
  // 조건 2. 행에 해당 숫자가 있는지 -> 있다면 true
  function inRow(num, row) {
    return board[row].includes(num)
  }
  // 조건 3. 3 X 3에 해당 숫자가 있는지 -> 있다면 true
  function inBox(num, row, col) {
    const rowNum = Math.floor(row / 3) * 3
    const colNum = Math.floor(col / 3) * 3

    for (let i = rowNum; i < rowNum * 3; i++) {
      for (let j = colNum; j < colNum * 3; j++) {
        if (board[i][j] === num) return true
      }
    }
    return false
  }
  // (조건 1, 2, 3) 유망함수
  // 현재 위치에 num이 들어갈 수 있는지 검사
  // num이 이미 있다면 false 반환, 없다면 true 반환
  function isValid(num, row, col) {
    return !(inCol(num, col) || inRow(num, row) || inBox(num, row, col))
  }

  // 빈칸인지 확인 후 빈칸이라면 행, 열 반환
  function isEmpty() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; i < 9; i++) {
        if (board[i][j] === 0) return [i, j]
      }
    }
    return null
  }

  // 백트래킹 함수
  function findResult() {
    const empty = isEmpty()
    if (!empty) return true // 빈칸이 하나도 없다면 return true
    const [row, col] = empty // 빈칸이 있다면 row, col로 변환

    // 숫자 1부터 9까지 스도쿠 완성하기
    for (let num = 1; num <= 9; num++) {
      // true라면 num 집어넣기 가능
      if (isValid(num, row, col)) {
        board[row][col] = num

        // 이대로 백트래킹 재귀 호출 -> true라면 정답을 찾은 것(더 이상 빈칸이 없음)
        if (findResult()) return true

        board[row][col] = 0 // 가능하지 않다면 원래 0으로 되돌림
      }
    }
    return false
  }

  findResult()
  return board
}

console.log(
  solution([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ])
)

// [
//   [5, 3, 4, 6, 7, 8, 9, 1, 2],
//   [6, 7, 2, 1, 9, 5, 3, 4, 8],
//   [1, 9, 8, 3, 4, 2, 5, 6, 7],
//   [8, 5, 9, 7, 6, 1, 4, 2, 3],
//   [4, 2, 6, 8, 5, 3, 7, 9, 1],
//   [7, 1, 3, 9, 2, 4, 8, 5, 6],
//   [9, 6, 1, 5, 3, 7, 2, 8, 4],
//   [2, 8, 7, 4, 1, 9, 6, 3, 5],
//   [3, 4, 5, 2, 8, 6, 1, 7, 9],
// ]

// console.log(
//   solution([
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   ])
// )

// [
//   [1, 2, 3, 4, 5, 6, 7, 8, 9],
//   [4, 5, 6, 7, 8, 9, 1, 2, 3],
//   [7, 8, 9, 1, 2, 3, 4, 5, 6],
//   [2, 3, 4, 5, 6, 7, 8, 9, 1],
//   [5, 6, 7, 8, 9, 1, 2, 3, 4],
//   [8, 9, 1, 2, 3, 4, 5, 6, 7],
//   [3, 4, 5, 6, 7, 8, 9, 1, 2],
//   [6, 7, 8, 9, 1, 2, 3, 4, 5],
//   [9, 1, 2, 3, 4, 5, 6, 7, 8],
// ]
