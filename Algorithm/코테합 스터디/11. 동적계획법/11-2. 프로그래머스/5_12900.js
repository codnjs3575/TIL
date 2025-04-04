// <2 x n 타일링>
// 가로 길이 2, 세로 길이 1인 직사각형 모양의 타일
// 해당 타일을 이용하여 가로 길이 n, 세로 길이 2인 바닥을 채우려고 한다. (n은 60,000이하 자연수)
// 타일을 채울 때는 2가지 방법이 있음
// 1. 타일을 가로로 배치하는 경우
// 2. 타일을 세로로 배치하는 경우
// 가로의 길이 n이 매개 변수로 주어질 때, 직사각형을 채우는 방법의 수를 구하는 문제

// 경우의 수를 따져보니 DP[N] = DP[N - 1] + DP[N - 2]와 같은 피보나치 수열과 같은 문제
//

// 시행착오 1 -> 공간복잡도의 문제라더라, 배열 사용 x
// 해결방법 : 어차피 2개의 수만 저장하면 되므로 배열이 아니라 변수로 저장한다.
// function solution(n) {
//   const fib = [1, 1] // fib(0) = 1, fib(1) = 1
//   for (let i = 2; i <= n; i++) {
//     fib[i] = (fib[i - 1] + fib[i - 2]) % 1_000_000_007
//   }
//   return fib[n]
// }

// 시행착오 2 -> 시간 초과, 왜인지는 잘 모르겠다.
// i = 2 부터 시작하는 것이 아니라 i를 3부터 시작
// curr 변수를 2로 초기화 <- 3부터 시작하기 위해

// function solution(n) {
//   const MOD = 1_000_000_007
//   let prev = 1 // fib(0)
//   let curr = 1 // fib(1)

//   for (let i = 2; i <= n; i++) {
//     const next = (prev + curr) % MOD
//     prev = curr
//     curr = next
//   }

//   return curr
// }

// 결국 시간초과에서 벗어나지 못함
function solution(n) {
  let prev = 1 // fib(0)
  let curr = 2 // fib(1)

  for (let i = 3; i <= n; i++) {
    const sum = prev + curr
    const next = sum > 1_000_000_007 ? sum % 1_000_000_007 : sum
    prev = curr
    curr = next
  }

  return curr
}

console.log(solution(4)) // 5
