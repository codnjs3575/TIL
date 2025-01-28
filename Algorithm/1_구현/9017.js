let [N, ...gArr] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')

// 테스트 케이스마다 처리
for (let i = 0; i < N * 1; i++) {
  let [[numAll], garr] = gArr
    .slice(2 * i, 2 * (i + 1))
    .map((v) => v.split(' ').map(Number))

  let tarr = []
  let checkarr = new Array(numAll).fill(-1)
  let tObj = {}

  // 1. 6명 이상 있는 팀을 골라냄 : 본인 포함, 내 뒷 순서 선수들만 체크함
  garr.forEach((tnum, playernum) => {
    let cntTeam = 0
    let sumTeam = 0
    for (let j = playernum; j < numAll; j++) {
      if (tnum == garr[j] && checkarr[j] !== 0 && ++cntTeam === 6) {
        tarr.push(tnum)
        // 선수들 점수 배열, 누적합, 4명 카운트용 헬퍼 변수
        tObj[tnum] = [[], 0, 0]
        checkarr[j] = 0
      }
    }
  })

  // 2. 조건 만족한 팀의 선수들만 점수 측정 -> 선수들 점수 및 누적합 저장
  let cnt = 0
  garr.forEach((tnum, playernum) => {
    // 조건을 만족한 팀의 선수들만
    if (tarr.includes(tnum)) {
      tObj[tnum][0].push(++cnt) // 선수들 점수를 객체의 1번, 배열에 넣음
      if (++tObj[tnum][2] <= 4) tObj[tnum][1] += cnt // 객체 3번 자리에 상위 4명 누적합 넣음
    }
  })

  // 3. 우승팀 가려내기
  let minnum = 9999999999999
  let winTeam = 0
  tarr.forEach((tnum, j) => {
    if (tObj[tnum][1] < minnum) {
      minnum = tObj[tnum][1]
      winTeam = tnum
    } else if (tObj[tnum][1] == minnum && j > 0) {
      winTeam = tObj[tnum][0][4] < tObj[winTeam][0][4] ? tnum : winTeam
    }
  })
  console.log(winTeam)
}
