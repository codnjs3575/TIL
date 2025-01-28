let checkArr = new Array(10).fill(0)
let maxNum = 0
let maxIdx = 0

require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('')
  .map(Number)
  .map((num) => (checkArr[num] += 1))

checkArr[9] += checkArr[6]
checkArr[6] = 0

checkArr.forEach((val, idx) => {
  if (val > maxNum) {
    maxNum = val
    maxIdx = idx
  }
})

if (maxIdx === 9) console.log(Math.round(maxNum / 2))
else console.log(maxNum)
