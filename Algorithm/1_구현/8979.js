const fs = require('fs')
const path = process.platform === 'linux' ? 'dev/stdin' : 'input.txt'
let [nums, ...arr] = fs.readFileSync(path).toString().trim().split('\n')
let [n, k] = nums.split(' ').map(Number)
arr.map((country) => {
  country = country.split(' ').map(Number)
  console.log(country)
})
