const fs = require('fs')
const path = process.platform === 'linux' ? 'dev/stdin' : 'input.txt'
let input = fs.readFileSync(path).toString().trim().split('\n')
