// 단어 퍼즐 문제
// 주어진 단어 조각들을 이용해서 주어진 문장을 완성하는 퍼즐
// 주어진 단어 조각들은 무한개씩 있음
// 주어진 문장을 완성하기 위해 사용해야 하는 단어조각 개수의 최솟값을 return (불가능한 경우 -1 return)

// 코드는 공부했습니당..
// 문자열을 하나의 배열로 본다면 i번째 값은 문자열[i]까지의 최소 조각수
//  ㄴ dp[i] = 문자열[i]까지의 최소 조각수

function solution(strs, t) {
  const N = t.length

  const dp = Array(N + 1).fill(Infinity)
  dp[0] = 0

  // i는 문자열의 인덱스
  for (let i = 1; i <= N; i++) {
    // j는 단어 조각의 길이는 5 이하, 즉 이전 문자 5개까지만 확인
    for (let j = 1; j <= 5; j++) {
      if (i - j < 0) continue

      const str = t.slice(i - j, i) // 문자[이전 인덱스] ~ 문자[현재 인덱스] 사이의 문자열
      if (strs.includes(str)) dp[i] = Math.min(dp[i], dp[i - j] + 1)
    }
  }
  return dp[N] === Infinity ? -1 : dp[N]
}

solution(['ba', 'na', 'n', 'a'], 'banana') // 3
// solution(['app', 'ap', 'p', 'l', 'e', 'ple', 'pp'], 'apple') // 2
// solution(['ba', 'an', 'nan', 'ban', 'n'], 'banana') // -1
// solution(['ba', 'an', 'nan', 'ban', 'n'], 'bananan') // 4
