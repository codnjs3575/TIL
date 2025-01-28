let fs = require('fs')
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt'
let [ScoreN, ...ScoreArray] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
ScoreN *= 1
ScoreArray = ScoreArray.map((v) => v.split(' '))

let score = 0
let resultArray = [0, 0]
let StartArray = [0, 0]

ScoreArray.map(([ScoreTeam, v], i) => {
  let [mm, ss] = v.split(':').map((v) => v * 1)
  let ScoreSS = mm * 60 + ss

  // 승부가 갈리는 골의 시점 : 일단 score가 0인지(동점인지) 확인
  // 이미 +거나 -인 경우 시간을 저장할 필요가 없음.
  // score가 0에서 -1 혹은 +1 되는 순간이 기록 해야 할 첫 골의 시간
  if (score === 0) StartArray[ScoreTeam - 1] = ScoreSS // 스코어를 얻어야 할 팀의 시간으로 저장

  // score 계산하기
  ScoreTeam === '1' ? (score += 1) : (score -= 1)

  // score를 계산하고 난 뒤에 0이 되었을 경우(즉, 동점 스코어가 되었을 경우)
  if (score === 0) {
    // ScoreTeam 1 -> 무승부 -> 2번 팀의 시간을 저장
    // console.log(ScoreSS, StartArray[2 - ScoreTeam])
    resultArray[2 - ScoreTeam] += ScoreSS - StartArray[2 - ScoreTeam]
    StartArray = [ScoreSS, ScoreSS] // 시간 측정 시작 0초 초기화 (상대팀의 시간을 초기화)
  }

  //   console.log(
  //     `${i + 1}번째) ${ScoreTeam}번 팀 득점 (${ScoreSS}초) : [${StartArray[0]},${
  //       StartArray[1]
  //     }], [${resultArray[0]},${resultArray[1]}]`
  //   )
  if (i + 1 === ScoreN) {
    score > 0
      ? (resultArray[0] += 48 * 60 - StartArray[0])
      : score < 0
      ? (resultArray[1] += 48 * 60 - StartArray[1])
      : score
    return
  }
})

// 출력하기
resultArray.map((s) => {
  let mm = Math.floor(s / 60)
  let ss = s % 60
  mm = mm >= 10 ? mm : '0' + mm
  ss = ss >= 10 ? ss : '0' + ss
  console.log(`${mm}:${ss}`)
})
