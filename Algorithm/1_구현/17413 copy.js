const fs = require('fs')
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt'
let String = fs.readFileSync(path).toString().trim()
let result = []
let startN = 0
let isNoCount = false
let countArr = []

String.split('').map((word, i) => {
  if (word === '<') {
    startN = i
    isNoCount = true
    if (countArr.length) {
      result.push(
        countArr
          .join('')
          .split(' ')
          .map((a) => a.split('').reverse().join(''))
          .join(' ')
      )
      countArr = []
    }
  } else if (word === '>') {
    result.push(String.slice(startN, i + 1))
    isNoCount = false
  } else if (!isNoCount) countArr.push(v)
})
result.push(
  countArr
    .join('')
    .split(' ')
    .map((a) => a.split('').reverse().join(''))
    .join(' ')
)

console.log(result.join(''))
