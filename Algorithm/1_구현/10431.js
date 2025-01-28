const fs = require('fs')
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt'
let [_, ...PArr] = fs.readFileSync(path).toString().trim().split('\n')

PArr.map((arr, i) => {
  let cnt = 0

  let sArr = arr
    .split(' ')
    .splice(1)
    .map((v) => Number(v))

  for (let sidx = 1; sidx <= sArr.length - 1; sidx++) {
    sArr.slice(0, sidx).map((sNum) => {
      if (sNum > sArr[sidx]) cnt++
    })
  }

  console.log(i + 1, cnt)
})
