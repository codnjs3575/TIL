let [N, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')

N = Number(N)
let TeseCase = arr.slice(0, N).map((v) => v.split(''))
let lotationCase = arr.slice(N + 1).map((v) => v.split(' ').map(Number))

function lotation(lotationN, caseNum) {
  if (lotationN === 1) TeseCase[caseNum].push(TeseCase[caseNum].shift())
  else TeseCase[caseNum].unshift(TeseCase[caseNum].pop())
}

lotationCase.map(([caseNum, lotationN]) => {
  let testcase = TeseCase[caseNum - 1]
  console.log('---------------------------------------')

  let leftNum = caseNum - 2
  let rightNum = caseNum

  // - 양쪽으로 점점 뻗어가며 회전 확인하기
  // 1. 왼쪽 확인 : 극이 다르면 반대 방향으로(*= -1) 진행.
  //  ㄴ leftNum이 0이 될 때까지 확인하기
  let startNum = leftNum
  let endNum = leftNum
  while (leftNum >= 0) {
    if (TeseCase[leftNum + 1][6] === TeseCase[leftNum][2]) break
    else {
      endNum = leftNum
      // console.log('왼쪽 :', leftNum + 1 + '번쨰')
      // console.log(TeseCase[leftNum + 1].join(''))
      // console.log(TeseCase[leftNum].join(''))
      // 1. 이동 전에 다른 극 확인하기

      // 반대 방향으로 이동
      // lotation(lotationN * -1, leftNum)
      console.log()
    }
    leftNum--
  }

  // 2. 오른쪽 확인 : 극이 다르면 반대 방향으로(*= -1) 진행.
  //  ㄴ caseNum이 N이 될 때까지 확인하기
  while (rightNum < N) {
    if (TeseCase[rightNum - 1][2] === TeseCase[rightNum][6]) break
    else {
      // console.log('오른쪽 :', rightNum + 1 + '번째', lotationN)
      // console.log(TeseCase[rightNum].join(''))
      // 1. 이동 전에 다른 극 확인하기
      // 반대 방향으로 이동
      // lotation(lotationN * -1, rightNum)
    }
    rightNum++
    console.log()
  }

  // lotationN에 따라 1이면 시계 방향 회전, -1면 반시계 방향 회전
  lotation(lotationN, caseNum - 1)

  if (lotationN === 1) testcase.unshift(testcase.pop())
  else testcase.push(testcase.shift())
  // console.log(testcase.join(''))
  console.log(TeseCase.join('\n'))
  console.log()
})
