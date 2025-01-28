function solution(N) {
  const result = []

  function tracking(start, sum, numArr) {
    if (sum === 10) {
      result.push(numArr)
      return
    }

    for (let i = start; i <= N; i++) {
      // 유망성 확인
      if (sum + i <= 10) {
        tracking(i + 1, sum + i, numArr.concat(i)) // 유망한 경우, 재귀호출
      }
    }
  }

  tracking(1, 0, [])
  return result
}

console.log(solution(5)) // [[1, 2, 3, 4], [1, 4, 5], [2, 3, 5]]
// console.log(solution(2)) // []
// console.log(solution(7)) // [[1, 2, 3, 4], [1, 2, 7], [1, 3, 6], [1, 4, 5], [2, 3, 5], [3, 7], [4, 6]]
