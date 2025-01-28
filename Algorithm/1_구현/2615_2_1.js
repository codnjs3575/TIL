let input = require('fs')
  //   .readFileSync('/dev/stdin')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
input.forEach((x, i) => (input[i] = x.split(' ')))

let answer = '0'
let [X, Y] = [0, 0]
check()
function check() {
  for (let x = 0; x < 19; ++x) {
    for (let y = 0; y < 19; ++y) {
      let a = input[y][x]
      if (a === '0') continue
      // 가로
      if (x <= 14) {
        let isValid = true
        for (let i = 1; i < 5; ++i) {
          if (input[y][x + i] !== a) {
            isValid = false
            break
          }
        }
        if (isValid) {
          if (x + 5 < 19 && input[y][x + 5] === a) isValid = false
          if (x - 1 >= 0 && input[y][x - 1] === a) isValid = false
        }
        if (isValid) {
          answer = a
          X = x
          Y = y
          return
        }
      }

      // 세로
      if (y <= 14) {
        isValid = true
        for (let i = 1; i < 5; ++i) {
          if (input[y + i][x] !== a) {
            isValid = false
            break
          }
        }
        if (isValid) {
          if (y + 5 < 19 && input[y + 5][x] === a) isValid = false
          if (y - 1 >= 0 && input[y - 1][x] === a) isValid = false
        }
        if (isValid) {
          answer = a
          X = x
          Y = y
          return
        }
      }

      // 대각선 우하향

      if (x <= 14 && y <= 14) {
        isValid = true
        for (let i = 1; i < 5; ++i) {
          if (input[y + i][x + i] !== a) {
            isValid = false
            break
          }
        }
        if (isValid) {
          if (x + 5 < 19 && y + 5 < 19 && input[y + 5][x + 5] === a)
            isValid = false
          if (x - 1 >= 0 && y - 1 >= 0 && input[y - 1][x - 1] === a)
            isValid = false
        }
        if (isValid) {
          answer = a
          X = x
          Y = y
          return
        }
      }

      // 대각선 좌상향
      if (y >= 4 && x <= 14) {
        isValid = true
        for (let i = 1; i < 5; ++i) {
          if (input[y - i][x + i] !== a) {
            isValid = false
            break
          }
        }
        if (isValid) {
          if (x + 5 < 19 && y - 5 >= 0 && input[y - 5][x + 5] === a)
            isValid = false
          if (x - 1 >= 0 && y + 1 < 19 && input[y + 1][x - 1] === a)
            isValid = false
        }
        if (isValid) {
          answer = a
          X = x
          Y = y
          return
        }
      }
    }
  }
}

console.log(answer)
if (answer !== '0') console.log(Y + 1, X + 1)
