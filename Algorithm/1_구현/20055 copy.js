let [[N, K], [...conArr]] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number))
// N = 1번째 줄 /  2N = 2번째 줄

// --------------변수--------------
// 1. 로봇 확인 변수 : robotArr
let robotArr = new Array(2 * N).fill(0)

// 맨 처음, 로봇 올리고 시작.
// robotArr[0] = 1 // 로봇 확인 표시
// conArr[0] -= 1 // 내구도 -1

// 1-1. 로봇 위치 변수 : findIndex
// 1-2. 로봇 위치 저장 배열 : findIdxArr

// 2. 단계 변수 : stepCnt
let stepCnt = 1

// 3. 내구도 0 확인 변수 : zeroCnt
let zeroCnt = 0

// --------------로직--------------
// [반복 : 내구도 0인 자리(zeroCnt)가 K개 있을 때까지 반복]
// for (zeroCnt = 0; zeroCnt < K; stepCnt++) {
// while (zeroCnt < K) {
let count = 6
while (count--) {
  console.log(`${stepCnt}번째 단계 실행 중..`)

  let findIndex = robotArr.indexOf(1) // 첫 번째 위치
  let findIdxArr = []

  // conArr : 내구도 / robotArr : 로봇 유무 확인

  // 1. 로봇 1회 이동
  // while 문 : 로봇 있는 모든 위치 찾기
  while (findIndex != -1) {
    findIdxArr.push(findIndex)
    findIndex = robotArr.indexOf(1, findIndex + 1)
  }
  findIdxArr.reverse().map((idx) => {
    let nextidx = idx + 1
    if (!robotArr[nextidx] && conArr[nextidx] > 0) {
      console.log()
      robotArr[idx] = 0
      conArr[nextidx] -= 1
      robotArr[nextidx] = idx + 1 === 2 * N - 1 ? 0 : 1
      console.log(idx)
      console.log(`로봇 이동 중..`)
      console.log(`내구도 상황 : ${conArr}`)
      console.log(`로봇 위치 상황 : ${robotArr}`)
      if (!conArr[nextidx]) zeroCnt++
    }
  })

  // 2. 올리는 자리의 내구도가 1 이상이고, 로봇이 없을 때
  if (conArr[0] > 0 && !robotArr[0]) {
    robotArr[0] = 1
    conArr[0] -= 1
    console.log()
    console.log(`....새 로봇 출동중....`)
    console.log(`내구도 상황 : ${conArr}`)
    console.log(`로봇 위치 상황 : ${robotArr}`)
    if (!conArr[0]) zeroCnt++
  }

  // 모든 절차가 끝났다면, 다음 단계로
  console.log()
  console.log(`${stepCnt}번째 단계 실행 완료!`)
  console.log(`내구도 상황 : ${conArr}`)
  console.log(`로봇 위치 상황 : ${robotArr}`)
  console.log('-------------------------------')
  console.log()
  stepCnt++
}
// console.log(stepCnt - 1)
