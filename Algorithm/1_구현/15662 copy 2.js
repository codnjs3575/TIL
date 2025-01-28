let [N, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')

N = Number(N)
let TeseCase = arr.slice(0, N).map((v) => v.split(''))
let lotationCase = arr.slice(N + 1).map((v) => v.split(' ').map(Number))

lotationCase.map(([caseNum, lotationN]) => {
  // 1. 왼쪽 확인 : 극이 다르면 반대 방향으로(*= -1) 진행.
  let leftNum = caseNum - 2
  let startNum = caseNum
  let endNum = caseNum - 1
  while (leftNum >= 0) {
    if (TeseCase[leftNum + 1][6] === TeseCase[leftNum][2]) break
    else endNum = leftNum
    leftNum--
  }
  for (let i = startNum; i <= endNum; i++) {
    if (lotationN === 1) TeseCase[i].push(TeseCase[i].shift())
    else TeseCase[i].unshift(TeseCase[i].pop())
  }

  // 2. 오른쪽 확인 : 극이 다르면 반대 방향으로(*= -1) 진행.
  let rightNum = caseNum
  while (rightNum < N) {
    if (TeseCase[rightNum - 1][2] === TeseCase[rightNum][6]) break
    else endNum = rightNum
    rightNum++
  }

  for (let i = startNum; i <= endNum; i++) {
    if (lotationN === 1) TeseCase[i].push(TeseCase[i].shift())
    else TeseCase[i].unshift(TeseCase[i].pop())
  }

  // 3. 본인 회전
  if (lotationN === 1)
    TeseCase[caseNum - 1].unshift(TeseCase[caseNum - 1].pop())
  else TeseCase[caseNum - 1].push(TeseCase[caseNum - 1].shift())
})
console.log(TeseCase.map((v) => v.join('')).join('\n'))
console.log()
