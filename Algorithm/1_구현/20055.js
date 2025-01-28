let [[N, K], [...conArr]] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number))

let robotArr = new Array(N).fill(0)
let stepCnt = 1

while (true) {
  conArr.unshift(conArr.pop())
  robotArr.unshift(robotArr.pop())

  let findIndex = robotArr.indexOf(1) // 첫 번째 위치
  let findIdxArr = []

  while (findIndex != -1) {
    findIdxArr.push(findIndex)
    findIndex = robotArr.indexOf(1, findIndex + 1)
  }
  findIdxArr.reverse().map((idx) => {
    if (idx === N - 1) {
      robotArr[idx] = 0
    } else if (conArr[idx + 1] > 0 && robotArr[idx + 1] !== 1) {
      robotArr[idx + 1] = idx + 1 !== N - 1 ? 1 : 0
      conArr[idx + 1] -= 1
      robotArr[idx] = 0
    }
  })

  // 2. 올리는 자리의 내구도가 1 이상이고, 로봇이 없을 때
  if (conArr[0] > 0 && !robotArr[0]) {
    robotArr[0] = 1
    conArr[0] -= 1
  }

  //   let zeroCnt = conArr.filter((v) => 0 === v).length
  let zeroCnt = conArr.reduce((acc, cur) => (cur === 0 ? acc + 1 : acc), 0)
  if (zeroCnt >= K) break

  stepCnt++
}

console.log(stepCnt)
