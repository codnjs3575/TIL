let [[N], [...arr]] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number))

let acc = 0
let result = 0

arr
  .sort((a, b) => a - b)
  .map((num) => {
    acc += num
    result += acc
  })

console.log(result)
