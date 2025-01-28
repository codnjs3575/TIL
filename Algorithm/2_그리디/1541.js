let resultArr = []
require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('-')
  .map((arr) => {
    let acc = 0
    arr.split('+').map((val) => (acc += val * 1))
    resultArr.push(acc)
  })

let result = resultArr[0]
resultArr.slice(1).map((num) => (result -= num))

console.log(result)
