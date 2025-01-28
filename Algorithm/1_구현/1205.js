let N, newScore, P, scoreArr
let inputs = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number))
  .forEach((input, index) => {
    if (index === 0) [N, newScore, P] = input
    else scoreArr = input
  })

// 랭킹 리스트에 아무것도 없음.
if (N === 0) console.log('1')
else {
  // 랭킹 리스트에 1개 이상 있음.
  // 경우 1. -1일 경우
  //  ㄴ N과 P가 같고(이미 점수가 최대치로 기록됨), 가장 끝에 있는 점수와 비교하였을 때 작거나 같음.
  if (N === P && scoreArr[N - 1] >= newScore) {
    console.log('-1')
    return
  }

  // 경우 2. -1가 아님 : 점수 체크가 가능함
  for (let i = 0; i < scoreArr.length; i++) {
    // 만약 현재(i+1번째 요소) 점수보다 newScore가 크면, i+1 출력.
    if (scoreArr[i] <= newScore) {
      console.log(i + 1)
      return
    }
    if (i + 1 === N) console.log(N + 1) // 꼴등임
  }
}
