let [input, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')

let [N, K] = input.split(' ').map(Number)
arr = arr.map(Number).reverse()

let acc = 0 // 누적
let cnt = 0

while (K > 0) {
  let maxNum = 0

  arr.forEach((num) => {
    if (maxNum !== 0) return
    if (num <= K) maxNum = num
    acc += maxNum
    K -= maxNum
  })

  cnt += 1
}

console.log(cnt)
