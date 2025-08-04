// 로직 후보
// 1. 완전탐색(중복 순열) 5*5*5*5*5 일줄 알았지만 숫자 1~5자리 있으므로 각 자리별 갯수 파악해야함
// 2. 수학적 계산 : 5진법 풀이(AEIOU 5개를 숫자 01234로 변환해서 수학적 계산하기)

// A = 0, E = 1, I = 2, O = 3, U = 4
// 1번째 자리 = 1 (A)
// 2번째 자리 = 1 + 5 (6) (A~U, AA)
// 3번째 자리 = 1 + 5 + 25 (31) (A
// 4번째 자리 = 1 + 5 + 25 + 125 (156)
// 5번째 자리 = 1 + 5 + 25 + 125 + 625 (781)

function solution(word) {
  const digit = [781, 156, 31, 6, 1] // 자리 가중치
  const alpha = ['A', 'E', 'I', 'O', 'U'] // 5진법

  return word
    .split('')
    .reduce((acc, char, i) => acc + alpha.indexOf(char) * digit[i] + 1, 0)
}

solution('AAAAE')
