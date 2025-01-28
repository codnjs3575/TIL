const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')

let [N, K] = input.shift().split(' ')
let medalList = input.map((v) => v.split(' '))

let grade = 1
let nation = medalList.find((v) => Number(v[0]) === Number(K))

for (let i = 0; i < medalList.length; i++) {
  if (Number(medalList[i]) !== Number(K)) {
    if (Number(medalList[i][1]) > Number(nation[1])) grade++
    else if (Number(medalList[i][1]) === Number(nation[1])) {
      if (Number(medalList[i][2]) > Number(nation[2])) grade++
      else if (Number(medalList[i][2]) === Number(nation[2])) {
        if (Number(medalList[i][3]) > Number(nation[3])) grade++
      }
    }
  }
}

console.log(grade)
