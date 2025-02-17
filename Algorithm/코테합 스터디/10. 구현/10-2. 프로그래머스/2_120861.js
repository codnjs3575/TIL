// up: [0, 1]
// down : [0, -1]
// left : [-1, 0]
// right : [1, 0]
// 항상 [0, 0]에서 시작

// 제일 좋은 시간 복잡도 -> key가 들어올 때마다 처리하기
// 1. key가 들어올 때마다 처리하기
// 2. key를 모아두었다가 처리하기
// [left](left-right) : - (left) ~ + (right)
// [down](down-up) : - (down) ~ + (up)

// 가로, 세로는 무조건 홀수 -> 0,0를 제외하고 좌-우, 아래-위 칸이 동일

function solution(keyinputs, board) {
  // 0. board의 가로 최대 이동, 세로 최대 이동
  const boardRowLength = (board[0] - 1) / 2
  const boardColLength = (board[1] - 1) / 2

  const keyinputArr = [0, 0]
  keyinputs.map((input) => {
    switch (input) {
      case 'left':
        if (keyinputArr[0] > boardRowLength * -1)
          keyinputArr[0] = keyinputArr[0] - 1
        break

      case 'right':
        if (keyinputArr[0] !== boardRowLength)
          keyinputArr[0] = keyinputArr[0] + 1
        break

      case 'down':
        if (keyinputArr[1] > boardColLength * -1)
          keyinputArr[1] = keyinputArr[1] - 1
        break

      case 'up':
        if (keyinputArr[1] !== boardColLength)
          keyinputArr[1] = keyinputArr[1] + 1
        break
    }
  })

  return keyinputArr
}

// solution(['right', 'right', 'right', 'right', 'right', 'left'], [9, 5])
// solution(['left', 'right', 'up', 'right', 'right'], [11, 11]) // [2,1]
solution(['down', 'down', 'down', 'down', 'down'], [7, 9]) // [0, -4]
