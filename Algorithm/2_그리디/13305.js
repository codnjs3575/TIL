const input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')

const N = Number(input[0])
const roadArr = input[1].split(' ').map(BigInt)
const priceArr = input[2].split(' ').map(BigInt)

let cost = 0n
let currPrice = priceArr[0]

for (let i = 0; i < N - 1; i++) {
  cost += currPrice * roadArr[i]
  if (currPrice > priceArr[i + 1]) currPrice = priceArr[i + 1]
}

console.log(String(cost))
