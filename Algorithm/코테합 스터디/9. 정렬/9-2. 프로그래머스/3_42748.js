function solution(array, commands) {
  let result = []
  commands.map(([i, j, k]) => {
    let arr = Array.from(array)
      .slice(i - 1, j)
      .sort((a, b) => a - b)

    result.push(arr[k - 1])
  })
  return result
}

solution(
  [1, 5, 2, 6, 3, 7, 4],
  [
    [2, 5, 3],
    [4, 4, 1],
    [1, 7, 3],
  ]
)
