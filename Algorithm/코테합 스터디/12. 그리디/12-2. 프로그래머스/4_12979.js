// N개의 아파트. 일부에는 4g 기지국 설치 -> 5g 기지국으로 변경
// 최소의 기지국 설치
function solution(n, stations, w) {
  let count = 0
  let coverage = 0
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
