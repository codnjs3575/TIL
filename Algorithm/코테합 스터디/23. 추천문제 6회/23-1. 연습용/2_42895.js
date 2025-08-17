// 사칙연산 ( + - * / )와 num의 조합
// N의 사용횟수별 사칙연산과의 조합 확인
// 1번 : N
// 2번 : N+N, N-N (0), N*N, N/N(1), NN
// 3번 : N+(N+N), N-(N+N), N*(N+N), N/(N+N)
//       N+0(N), N-0(N), N*0(0), N/0(1)
//       N+(N*N), N-(N*N), N*(N*N), N/(N*N)
//       N+1, N-1, N*1(N), N/1(N)
//       NNN

// 이것들을 모두 완전탐색으로 알아내되, 저장하는 DP 사용
// DP[1] = 1번, {N}
// DP[2] = 2번, {N+N, N-N (0), N*N, N/N(1), NN}
// DP[3] = 3번, { DP[1] X DP[2]의 연산 결과 }
// DP[4] = 4번, { DP[1] X DP[3]의 연산 결과 }, { DP[2] X DP[2]의 연산 결과 }, { DP[3] X DP[1]의 연산 결과 } => 중복 제거 최적화 필수

// 최솟값이 8보다 크면 -1을 return 합니다. => 8번 이상 사용 예시의 완전탐색 X
// 따라서, 완전탐색을 하면서 DP로 저장하며 그 중에 목표값이 있으면 그대로 반환.
//       그렇지 않다면 저장해놓은 DP값들을 이용하여 다음 DP를 탐색
function solution(N, number) {
  const DP = Array.from({ length: 9 }, () => new Set()) // 0. DP 선언

  // 0. cnt : N을 중복 사용한 횟수
  for (let cnt = 1; cnt <= 8; cnt++) {
    // 1. N, NN, NNN처럼 단순 반복한 숫자 먼저 저장하기
    DP[cnt].add(Number(String(N).repeat(cnt)))

    // 2. cnt만큼 사칙연산과 num 개수 조합하기
    //    cnt = i * cnt-i (단, 4처럼 DP[1]*DP[3] === DP[3]*DP[1]일수도 있으니, i는 cnt-i보다 커지면 안 됨. cnt/2 만큼만 탐색)
    //                    (물론, +,* 는 방향이 상관없지만, -,/는 방향이 중요하므로 두 번 계산)
    for (let i = 1; i <= cnt / 2; i++) {
      for (const num1 of DP[i]) {
        for (const num2 of DP[cnt - i]) {
          // 2-1. 덧셈/곱셈은 한 번만 계산
          DP[cnt].add(num1 + num2)
          DP[cnt].add(num1 * num2)

          // 2-2. 뺄셈/나눗셈은 양쪽 모두 계산
          DP[cnt].add(num1 - num2)
          DP[cnt].add(num2 - num1)

          if (num2 !== 0) DP[cnt].add(Math.floor(num1 / num2))
          if (num1 !== 0) DP[cnt].add(Math.floor(num2 / num1))
        }
      }
    }

    // 3. 원하던 값을 찾으면 가장 낮은 cnt 수를 반환하기
    if (DP[cnt].has(number)) return cnt
  }

  return -1
}

console.log(solution(5, 12)) // 4
console.log(solution(2, 11)) // 3
