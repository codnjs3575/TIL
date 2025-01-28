let inputs = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')

let line = 0

while (true) {
  let input = inputs[line].trim()

  if (input === 'end') break

  let arr = []
  let temp = []

  let xCnt = 0
  let oCnt = 0

  for (let i = 0; i < input.length; i++) {
    if (input[i] === 'X') xCnt++
    else if (input[i] === 'O') oCnt++

    temp.push(input[i])

    if (temp.length === 3) {
      arr.push(temp)
      temp = []
    }
  }
  // x 승리 : x 3개 / o 3개 안됨 / x가 1개 더 많음
  if (xWin(arr) && !oWin(arr) && xCnt - oCnt === 1) {
    console.log('valid')
    line++
    continue
  }
  // o 승리 : o 3개 / x 3개 안됨 / x와 o 개수 같음
  if (oWin(arr) && !xWin(arr) && oCnt === xCnt) {
    console.log('valid')
    line++
    continue
  }
  // 비김 : x,o 둘다 3개가 안됨 / 판이 꽉참
  if (!xWin(arr) && !oWin(arr) && xCnt === 5 && oCnt === 4) {
    console.log('valid')
    line++
    continue
  }

  // 그 외

  console.log('invalid')
  line++
  continue
}

function xWin(arr) {
  for (let i = 0; i < 3; i++) {
    if (
      arr[i][0] === 'X' &&
      arr[i][0] === arr[i][1] &&
      arr[i][1] === arr[i][2]
    ) {
      return true
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      arr[0][i] === 'X' &&
      arr[0][i] === arr[1][i] &&
      arr[1][i] === arr[2][i]
    ) {
      return true
    }
  }
  if (arr[0][0] === 'X' && arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) {
    return true
  }
  if (arr[0][2] === 'X' && arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0]) {
    return true
  }

  return false
}

function oWin(arr) {
  for (let i = 0; i < 3; i++) {
    if (
      arr[i][0] === 'O' &&
      arr[i][0] === arr[i][1] &&
      arr[i][1] === arr[i][2]
    ) {
      return true
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      arr[0][i] === 'O' &&
      arr[0][i] === arr[1][i] &&
      arr[1][i] === arr[2][i]
    ) {
      return true
    }
  }
  if (arr[0][0] === 'O' && arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) {
    return true
  }
  if (arr[0][2] === 'O' && arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0]) {
    return true
  }

  return false
}
