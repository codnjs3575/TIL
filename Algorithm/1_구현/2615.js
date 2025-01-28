const fs = require('fs')
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt'
Arr = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' '))
let result = false

// 가로
function Search1(i, j) {
  if (j !== 0 && Arr[i][j - 1] === Arr[i][j]) return false
  if (j !== 14 && Arr[i][j + 5] === Arr[i][j]) return false
  for (let k = 1; k < 5; k++) if (Arr[i][j] !== Arr[i][j + k]) return false
  return true
}

// 세로
function Search2(i, j) {
  if (i !== 0 && Arr[i - 1][j] === Arr[i][j]) return false
  if (i !== 14 && Arr[i + 5][j] === Arr[i][j]) return false

  for (let k = 1; k < 5; k++) {
    if (Arr[i][j] !== Arr[i + k][j]) return false
  }
  return true
}

// 윗대각선
function Search3(i, j) {
  if (j !== 0 && i !== 18 && Arr[i + 1][j - 1] === Arr[i][j]) return false
  if (j !== 14 && i !== 4 && Arr[i - 5][j + 5] === Arr[i][j]) return false

  for (let k = 1; k < 5; k++) if (Arr[i][j] !== Arr[i - k][j + k]) return false
  return true
}

// 아랫대각선
function Search4(i, j) {
  if (i !== 0 && j !== 0 && Arr[i - 1][j - 1] === Arr[i][j]) return false
  if (i !== 14 && j !== 14 && Arr[i + 5][j + 5] === Arr[i][j]) return false

  for (let k = 1; k < 5; k++) if (Arr[i][j] !== Arr[i + k][j + k]) return false
  return true
}

for (let i = 0; i < Arr.length; i++) {
  for (let j = 0; j < Arr.length; j++) {
    if (Arr[i][j] === '0') continue

    if (j < 15 && Search1(i, j)) {
      console.log(Arr[i][j])
      console.log(i + 1, j + 1)
      return
    }
    if (i < 15 && Search2(i, j)) {
      console.log(Arr[i][j])
      console.log(i + 1, j + 1)
      return
    }
    if (i > 3 && j < 15 && Search3(i, j)) {
      console.log(Arr[i][j])
      console.log(i + 1, j + 1)
      return
    }
    if (i < 15 && j < 15 && Search4(i, j)) {
      console.log(Arr[i][j])
      console.log(i + 1, j + 1)
      return
    }
  }
}
console.log('0')
