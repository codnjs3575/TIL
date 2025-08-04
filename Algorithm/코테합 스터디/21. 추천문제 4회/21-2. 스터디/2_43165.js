// 모든 숫자에 대해 + 혹은 - 연산을 하는 재귀 호출 형식의 dfs 로직

function solution(numbers, target) {
  let cnt = 0

  function dfs(idx, sum) {
    if (idx === numbers.length) {
      if (sum === target) cnt++
      return
    }
    dfs(idx + 1, sum + numbers[idx])
    dfs(idx + 1, sum - numbers[idx])
  }

  dfs(0, 0)
  return cnt
}
solution([1, 1, 1, 1, 1], 3)
