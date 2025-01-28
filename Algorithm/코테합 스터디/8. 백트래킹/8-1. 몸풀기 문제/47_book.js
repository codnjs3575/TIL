function solution(num) {
  const result = []
  // 백트래킹 재귀 함수
  function backtracking(sum, nums, start) {
    if (sum === 10) return result.push(nums)

    // 합이 10이 되는 조합 찾기
    for (let i = start; i <= num; i++) {
      if (sum + i <= 10) backtracking(sum + i, nums.concat(i), i + 1)
    }
  }

  backtracking(0, [], 1)
  return result
}

// prettier-ignore
// console.log(solution(5)) // [[1, 2, 3, 4], [1, 4, 5], [2, 3, 5]]
// console.log(solution(2)) // []
// console.log(solution(7)) // [[1, 2, 3, 4], [1, 2, 7], [1, 3, 6], [1, 4, 5], [2, 3, 5], [3, 7], [4, 6]]
