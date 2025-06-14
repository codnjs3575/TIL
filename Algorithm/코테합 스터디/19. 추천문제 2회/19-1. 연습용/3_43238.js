// 대기하는 사람 수 : 1,000,000,000명 이하
// 심사 시간 : 1,000,000,000분 이하
// 심사관 : 100,000명 이하

// -> 무조건 O(n)으로는 풀 수 없음. 이분 탐색으로 진행해야 함(chatGPT)
// [이분 탐색]
//   ㄴ 어떤 시간 t 안에 모든 사람이 심사를 마칠 수 있는가를 판단.
//   ㄴ left = 1, right = n * max(times) 범위에서 이분 탐색

// 어떤 시간 t가 주어진다면, 각 심사관 i가 t분 동안 심사할 수 있는 사람의 수는  Math.floor(t/times[i])
// 각각 심사할 수 있는 사람의 수를 더하여 n명 이상이라면? 더 적은 시간으로도 가능함.
function solution(n, times) {
  // 1. 이분탐색을 위한 left, right 범위 설정
  let left = 1
  let right = Math.max(...times) * n

  // 2. 이분탐색 진행
  while (left <= right) {
    const mid = Math.floor((left + right) / 2) // 이분값을 목표값으로 두고 확인하기
    const people = times.reduce((acc, cur) => acc + Math.floor(mid / cur), 0) // 현재 이분값(시간)동안 심사 가능한 사람의 수

    // 심사가능한 사람의 수가 n보다 적으면, left 높여서 다시 시도
    // n보다 크면 right 줄여서 다시 시도
    people < n ? (left = mid + 1) : (right = mid - 1)
  }

  return left
}
solution(6, [7, 10]) // 28
