// down: [0, -1]
// up: [0, 1]
// left: [-1, 0]
// right: [1, 0]
// 항상 [0,0]에서 시작 !!!가운데!!!

// 1. key가 들어올 때마다 이동 처리 -> 채택!! 더 나은 시간 복잡도? 최소 O(N)
// 2. key를 모아두었다가 이동 처리

// board의 가로크기, 세로 크기는 홀수! -> [0,0]을 제외하고 좌-우, 아래-위 이동가능횟수 동일
// keyInputArr[0] = left-right : -(left) ~ +(right)
// keyInputArr[1] = down-up : -(down) ~ +(up)
function solution(keyinputs, board) {
  // 1. board의 가로 최대 이동, 세로 최대 이동
  const boardRowLength = (board[0] - 1) / 2
  const boardColLength = (board[1] - 1) / 2

  // 2. 입력값 하나씩 처리하기
  const keyInputArr = [0, 0] // row, col
  keyinputs.map((input) => {
    switch (input) {
      case 'left':
        if (keyInputArr[0] > boardRowLength * -1)
          keyInputArr[0] = keyInputArr[0] - 1
        break

      case 'right':
        if (keyInputArr[0] !== boardRowLength)
          keyInputArr[0] = keyInputArr[0] + 1
        break

      case 'down':
        if (keyInputArr[1] > boardColLength * -1)
          keyInputArr[1] = keyInputArr[1] - 1
        break

      case 'up':
        if (keyInputArr[1] !== boardColLength)
          keyInputArr[1] = keyInputArr[1] + 1
        break
    }
  })

  return keyInputArr
}
solution(['left', 'right', 'up', 'right', 'right'], [11, 11]) // [2,1]
solution(['down', 'down', 'down', 'down', 'down'], [7, 9]) // [0,-4]
