let [[H, W], [...Arr]] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number))

let checkArr = Array.from(Array(H), () => Array(W).fill('0'))

Arr.map((num, idx) => {
  for (let h = H; h > 0; h--) if (h <= num) checkArr[h - 1][idx] = '1'
})

let acc = 0
checkArr.reverse().forEach((col) => {
  let isCheck = false
  let cnt = 0
  col.forEach((num, idx) => {
    if (num === '1') {
      if (isCheck) {
        acc += cnt
        cnt = 0
      } else isCheck = true
    } else isCheck && cnt++
  })
})
console.log(acc)
