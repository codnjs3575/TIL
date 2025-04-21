let result = [0, 0]

function divide(x, y, n) {
  if (n === 1) {
    result[arr[x][y]]++
    return
  }

  const value = arr[x][y]
  let isSame = true

  for (let i = x; i < x + n; i++) {
    for (let j = y; j < y + n; j++) {
      if (arr[i][j] !== value) {
        isSame = false
        break
      }
    }
    if (!isSame) break
  }

  if (isSame) {
    result[value]++
  } else {
    const half = n / 2
    divide(x, y, half)
    divide(x, y + half, half)
    divide(x + half, y, half)
    divide(x + half, y + half, half)
  }
}

divide(0, 0, arr.length)
return result
