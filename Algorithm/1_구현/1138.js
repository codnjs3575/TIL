let [[N], [...Arr]] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number))

let checkArr = new Array(N).fill(-1)

Arr.map((leftCnt, idx) => {
  let cnt = 0
  checkArr.forEach((val, validx) => {
    if (val === -1) {
      cnt++
      if (cnt === leftCnt + 1) {
        checkArr[validx] = idx + 1
        return
      }
    }
  })
})

console.log(checkArr.join(' '))
