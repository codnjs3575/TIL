const path = process.platform === 'linux' ? 'dev/stdin' : 'input.txt'
const fs = require('fs')
let [N, ...arr] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map((v) => Number(v)))

let result = []

for (let i = 0; i < arr.length; i++) {
  let grade = 1
  for (let j = 0; j < arr.length; j++) {
    if (i !== j) {
      if (arr[i][0] < arr[j][0] && arr[i][1] < arr[j][1]) grade++
    }
  }
  result.push(grade)
}

console.log(result.join(' '))
