// O(n)으로는 무조건 풀 수 없음. [chatGPT] 이분 탐색으로 풀어보아라.

function solution(n, times) {
  // 이분탐색을 위한 헬퍼변수들
  let left = 1
  let right = Math.max(...times) * n

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const people = times.reduce((acc, cur) => acc + Math.floor(mid / cur), 0) // 현재 mid시간동안 심사 가능한 사람의 수

    // 심사 가능한 사람의 수가 n보다 적으면, mid값 높여서 다시 시도(left)
    // n보다 크면, mid값 낮춰서 다시 시도(right)
    people < n ? (left = mid + 1) : (right = mid - 1)
  }

  return left
}

solution(6, [7, 10]) // 28
