require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(''))
  .forEach((game) => {
    if (game.join('') === 'end') return
    let result = false

    let xNum = game.filter((element) => 'X' === element).length
    let oNum = game.filter((element) => 'O' === element).length
    let dotNum = game.filter((element) => '.' === element).length

    // X의 승리
    if (xNum == oNum + 1 && isSuccess('X', game, dotNum === 0)) result = true
    // O의 승리
    else if (xNum == oNum && isSuccess('O', game, dotNum === 0)) result = true

    console.log(result ? 'valid' : 'invalid')
  })

function isSuccess(val, game, isDot) {
  let valCnt = 0
  let otherCnt = 0
  // 틱택토 확인
  // 1. 가로 틱택토 : 0 1 2 , 3 4 5 , 6 7 8
  for (let i = 0; i < 7; i += 3) {
    if (game[i] === game[i + 1] && game[i + 1] === game[i + 2]) {
      if (game[i] == val) valCnt++
      else otherCnt++
    }
  }

  // 2. 세로 틱택토 : 0 3 6 , 1 4 7, 2 5 8
  for (let i = 0; i < 3; i++) {
    if (game[i] === game[i + 3] && game[i + 3] === game[i + 6]) {
      if (game[i] === val) valCnt++
      else otherCnt++
    }
  }

  // 3. 대각선 틱택토 : 0 4 8, 2 4 6
  if (game[0] === game[4] && game[4] === game[8]) {
    if (game[0] == val) valCnt++
    else otherCnt++
  } else if (game[2] === game[4] && game[4] === game[6]) {
    if (game[2] == val) valCnt++
    else otherCnt++
  }

  // val이 이겼거나, 무승부
  // 'dotNum === 0' => true : 판이 다 참 / false : 판이 차지 않음
  if (otherCnt === 0) {
    if (valCnt > 0) return true // val이 이김
    if (valCnt === 0) return isDot // 무승부
  } else return false
}
