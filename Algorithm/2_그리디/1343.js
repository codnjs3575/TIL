let input = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('.')
  .forEach((val, idx) => {
    if (val !== '' && val.length % 2 === 0) {
      console.log(val, val.length)
    }
  })
