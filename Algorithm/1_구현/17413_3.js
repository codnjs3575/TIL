const fs = require('fs')
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt'
let String = fs.readFileSync(filePath).toString().trim().split('\n')

let str = ''
let result = []
for (let word of String) {
  if (word === '>') {
    for (let i = 0; i < result.length; i++) str += result[i]
    str += word

    while (result.pop() !== '<');
  } else {
    if (word === '<' && result.length) {
      str += result
        .join('')
        .split(' ')
        .map((word) => word.split('').reverse().join(''))
        .join(' ')
      result = []
    }
    result.push(word)
  }
}
str += result
  .join('')
  .split(' ')
  .map((word) => word.split('').reverse().join(''))
  .join(' ')
console.log(str)
