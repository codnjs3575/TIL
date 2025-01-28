let fs = require('fs')
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt'
let [_, ...NArray] = fs.readFileSync(path).toString().trim().split('\n')
NArray.map((N) => {
  N *= 1
  let five = 0
  for (let u = 5; u <= N; u *= 5) {
    five += Math.floor(N / u)
  }
  console.log(five)
})
