// <단어 퍼즐> 문제
function solution(strs, t) {
  const N = t.length
  const dp = Array(N + 1).fill(Infinity) // 최소 단어조각 개수
  dp[0] = 0

  // i는 문자열의 인덱스 (끝나는 기준 인덱스)
  for (let i = 1; i <= N; i++) {
    // j는 단어 조각의 길이 (최대 5 이하, 최소 1 이상) => 즉 이전 문자 5개~i번째까지 비교
    for (let j = 1; j <= 5; j++) {
      if (i - j < 0) continue
      const str = t.slice(i - j, i) // 문자열[이전 인덱스] ~ 문자열[현재 인덱스] 사이의 문자열
      if (strs.includes(str)) dp[i] = Math.min(dp[i], dp[i - j] + 1)
    }
  }
  return dp[N] === Infinity ? -1 : dp[N]
}

solution(['ba', 'na', 'n', 'a'], 'banana') // 3
solution(['app', 'ap', 'p', 'l', 'e', 'ple', 'pp'], 'apple') // 2
solution(['ba', 'an', 'nan', 'ban', 'n'], 'banana') // -1
