// 사칙연산, N의 조합
// N의 사용 횟수에 따라 사칙연산과의 조합 확인
// 모든 경우를 완전탐색으로 돌되, 규칙에 따라 연산이 가능하도록 DP 저장
// 1번 : N
// 2번 : NN, N+N, N-N, N*N, N/N
// 3번 : DP[1] X DP[2]
//      N+(N+N), N+(N-N), N+(N*N), N+(N/N)
//      N-(N+N), N-(N-N), N-(N*N), N-(N/N)
//      N*(N+N), N*(N-N), N*(N*N), N*(N/N)
//      .. 나눗셈
//      NNN, N+NN, N-NN, N*NN, N/NN
// 4번 : DP[1] X DP[3], DP[2] X DP[2], DP[3] X DP[1] => 최대한 중복 제거하면서 탐색

// 최솟값이 8보다 크면 -1을 return 합니다. ==> 최대 사용 횟수 8번 이상의 완전 탐색 X

function solution(N, number) {
  const DP = Array.from({ length: 9 }, () => new Set())

  for (let cnt = 1; cnt <= 8; cnt++) {
    // 1. N, NN, NNN같은 반복형 숫자 먼저 저장하기
    DP[cnt].add(Number(String(N).repeat(cnt)))

    // 2. 사칙연산 후 저장하기
    for (let i = 1; i <= cnt / 2; i++) {
      for (const num1 of DP[i]) {
        for (const num2 of DP[cnt - i]) {
          // 덧셈/곱셈
          DP[cnt].add(num1 + num2)
          DP[cnt].add(num1 * num2)

          // 뺄셈/나눗셈 => 양쪽 모두 계산 (교환법칙 성립 x)
          DP[cnt].add(num1 - num2)
          DP[cnt].add(num2 - num1)

          if (num2 !== 0) DP[cnt].add(Math.floor(num1 / num2))
          if (num1 !== 0) DP[cnt].add(Math.floor(num2 / num1))
        }
      }
    }

    if (DP[cnt].has(number)) return cnt
  }

  return -1
}

console.log(solution(5, 12)) // 4
console.log(solution(2, 11)) // 3
