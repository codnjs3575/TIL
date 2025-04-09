function solution(arr, budget) {
  // 정렬 후 그리디
  return arr
    .sort((a, b) => a - b)
    .reduce((acc, price) => {
      if (budget - price >= 0) {
        budget -= price
        acc++
      }
      return acc
    }, 0)
}

console.log(solution([1, 3, 2, 5, 4], 9)) // 3
