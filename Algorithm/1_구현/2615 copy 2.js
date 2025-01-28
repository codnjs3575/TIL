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
  for (k = 0; k < 5; k++) if (Arr[i][j] !== Arr[i][j + k]) return false
  if (Arr[i][j] === Arr[i][j + 5]) return 2
  return true
}

// 세로
function Search2(i, j) {
  for (k = 0; k < 5; k++) if (Arr[i][j] !== Arr[i + k][j]) return false
  return true
}

// 오른쪽 윗대각선
function Search3(i, j) {
  for (k = 0; k < 5; k++) if (Arr[i][j] !== Arr[i - k][j + k]) return false
  return true
}

// 오른쪽 아랫대각선
function Search4(i, j) {
  for (k = 0; k < 5; k++) if (Arr[i][j] !== Arr[i + k][j + k]) return false
  return true
}

for (let i = 0; i < Arr.length; i++) {
  for (let j = 0; j < Arr.length; j++) {
    if (Arr[i][j] === '0') result = false
    else if (i <= 14 && j > 0 && Arr[i][j] !== Arr[i][j - 1] && Search1(i, j)) {
      console.log(Arr[i][j])
      console.log(i + 1, j + 1)
      return
    } else if (
      i > 0 &&
      j <= 14 &&
      Arr[i][j] !== Arr[i - 1][j] &&
      Search2(i, j)
    ) {
      console.log(Arr[i][j])
      console.log(i + 1, j + 1)
      return
    } else if (
      0 < i <= 14 &&
      j >= 4 &&
      Arr[i][j] !== Arr[i + 1][j - 1] &&
      Search3(i, j)
    ) {
      console.log(Arr[i][j])
      console.log(i + 1, j + 1)
      return
    } else if (
      0 < i <= 14 &&
      0 < j <= 14 &&
      Arr[i][j] !== Arr[i - 1][j - 1] &&
      Search4(i, j)
    ) {
      console.log(Arr[i][j])
      console.log(i + 1, j + 1)
      return
    }
  }
}
console.log('0')
