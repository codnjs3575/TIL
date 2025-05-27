function solution(A, B) {
  A.sort((a, b) => a - b)
  B.sort((a, b) => a - b)

  let j = 0
  let point = 0
  for (let i = 0; i < B.length; i++) {
    if (B[i] > A[j]) {
      j++
      point++
    }
  }

  return point
}

solution([5, 1, 3, 7], [2, 2, 6, 8])
