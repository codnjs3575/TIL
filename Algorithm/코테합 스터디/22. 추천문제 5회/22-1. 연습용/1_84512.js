function solution(word) {
  const digit = [781, 156, 31, 6, 1] // 5번자리 ~ 1번자리
  const alpha = ['A', 'E', 'I', 'O', 'U']

  return word
    .split('')
    .reduce((acc, char, i) => acc + alpha.indexOf(char) * digit[i] + 1, 0)
}

solution('AAAAE')
// solution('AAAE')
// solution('I')
// solution('EIO')

// A(0) = 1
//  ㄴ AA(00) = 2
//     ㄴ AAA(000) = 3
//     ㄴ AAAA(0000) = 4 (AAAA ~ AUUU) 125개
//       ㄴ AAAE(0001) = 10 (1+1+1+7) 7 = 6*1 + 1
//       ㄴ AAAI(0002) = 16 (1+1+1+13) 13 = 6*2 + 1
//       ㄴ AAAO(0003) = 22 (1+1+1+19) 19 = 6*3 + 1
//       ㄴ AAEA(0010) = 35 (1+1+32+1) 32 = 31*1 + 1
//     ㄴ AAAAA(00000) = 5 (AAAAA ~ AUUUU)
//       ㄴ AAAAE(00001) = 6
//       ㄴ AAAAI(00002) = 7
//       ㄴ AAAAO(00003) = 8
//       ㄴ AAAAU(00004) = 9

// 1. 완전탐색
//    ㄴ 총개수(중복순열) : 5 + 25 + 125 + 625 + 3,125 = 3,905
// 2. 수학적 계산 : 5진법(AEIOU) * 5 digit(0,00,000,0000,00000)

// A = 0, E = 1, I = 2, O = 3, U = 4

// 1번째 자리 = 1
// 2번째 자리 = 5 + 1 (6) (A)(6) A(1)
// 3번째 자리 = 25 + 5 + 1 (31)
// 4번째 자리 = 125 + 25 + 5 + 1 (156)
// 5번째 자리 = 625 + 125 + 25 + 5 + 1 (781)
