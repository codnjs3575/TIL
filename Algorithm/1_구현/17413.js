const fs = require('fs')
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt'
String = fs.readFileSync(path).toString().trim()

let str = ''
let result = []
String.map((word) => {
  if (word === '>') {
  } else {
    if (word === '<' && result.length)
      str += result
        .join('')
        .split(' ')
        .map((a) => a.split('').reverse().join(''))
        .join(' ')
    result = []
  }
})
