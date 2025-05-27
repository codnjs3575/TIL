// 1 ~ 45까지 중 6개를 찍어서 맞히는 복권
// 1등 : 6개 번호 모두 일치
// 2등 : 5개, 3등 : 4개, 4등 : 3개, 5등 : 2개
// 6등 : 그 외 (낙첨))

// 7-
// [44, 1, 0, 0, 31, 25]

// 0은 알아볼 수 없는 숫자, 이를 제외한 숫자들은 2개 이상 담겨있지 않음
function solution(lottos, win_nums) {
  const LANK = [6, 6, 5, 4, 3, 2, 1] // 인덱스 = 맞힌 개수

  let zeroCnt = 0
  let correctCnt = 0

  for (selectNum of lottos) {
    if (selectNum === 0) zeroCnt++
    if (win_nums.includes(selectNum)) correctCnt++
  }

  return [LANK[correctCnt + zeroCnt], LANK[correctCnt]]
}

solution([44, 1, 0, 0, 31, 25], [31, 10, 45, 1, 6, 19]) // [3, 5]
// solution([0, 0, 0, 0, 0, 0], [38, 19, 20, 40, 15, 25]) // [1, 6]
// solution([45, 4, 35, 20, 3, 9], [20, 9, 3, 45, 4, 35]) // [1, 1]
