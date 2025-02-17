// 8 <= brown <= 5,000
// 1 <= yellow <= 2,000,000
function solution(brown, yellow) {
  let col = 1
  while (brown !== (yellow / col) * 2 + (col + 2) * 2) col++

  return [yellow / col + 2, col + 2]
}

// solution(10, 2)
// solution(8, 1)
console.log(solution(24, 24))

// ---------- yellow가 24인 경우 ----------
// 세로 1칸(col = 1) : 3 X 26(24+2)(24/1세로 = 24) 이때 b는 (24x2) + 6(3x2, (col+2)x2) = 54 (brown)
// 세로 2칸(col = 2) : 4 X 14(12+2)(24/2세로 = 12) b, (12x2) + 8(4x2, (col+2)x2) = 32 (brown)
// 세로 3칸(col = 3) : 5 X 10(08+2)(24/3세로 = 08) b, (8x2) + 10(5x2, (col+2)x2) = 26 (brown)
// 세로 4칸(col = 4) : 6 X 08(06+2)(24/4세로 = 06) b, (6x2) + 12(6x2, (col+2)x2) = 24 (brown)
// 세로 = col+2 / 가로 = yellow/col +2

// brown 계산법
// 1. 반복문: 계산해가면서 계산한 brown값이 입력된 brown 값과 동일한지 확인하는 법 (찾을 때까지 진행 -> 시간복잡도 높음)
// 2. 계산법: b를 계산해서 세로/가로를 구하는 방법 (시간복잡도 훨씬 좋음 -> 근데 계산법을 못 찾음...)
