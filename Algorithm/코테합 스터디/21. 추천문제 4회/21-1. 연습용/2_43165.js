// 모든 숫자에 대해 + 혹은 - 연산을 하는 재귀 호출 로직

function solution(numbers, target) {
  let count = 0

  function dfs(index, sum) {
    if (index === numbers.length) {
      if (sum === target) count++
      return
    }

    dfs(index + 1, sum + numbers[index])
    dfs(index + 1, sum - numbers[index])
  }

  dfs(0, 0)
  return count
}
