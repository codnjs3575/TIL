let [[A, B, C], ...Arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number))

let checkArr = new Array(100).fill(0)
let acc = 0

Arr.map(([Time1, Time2]) => {
  for (let i = Time1; i < Time2; i++) checkArr[i] += 1
})

checkArr.map((val) => {
  if (val === 1) acc += A
  else if (val === 2) acc += B * 2
  else if (val === 3) acc += C * 3
})

console.log(acc)
