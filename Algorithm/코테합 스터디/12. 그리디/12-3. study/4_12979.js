function solution(n, stations, w) {
  let count = 0 // 설치해야 하는 기지국의 개수
  let coverage = 0 // 현재 커버되는 아파트의 범위
  const range = 2 * w + 1 // 기지국이 커버하는 범위

  for (const station of stations) {
    const left = station - w - 1
    if (coverage < left) count += Math.ceil((left - coverage) / range)
    coverage = station + w
  }

  if (coverage < n) count += Math.ceil((n - coverage) / range)

  return count
}

solution(11, [4, 11], 1) // 3
solution(16, [9], 2) // 3
