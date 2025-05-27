function solution(queue1, queue2) {
  // 1. queue를 하나로 합치기
  const queue = [...queue1, ...queue2]

  // 총합 구하고, targetSum 구하기
  const totalSum = queue.reduce((acc, cur) => acc + cur, 0)
  if (totalSum % 2 !== 0) return -1
  const targetSum = totalSum / 2

  // 2. 투포인터 구현하기
  const n = queue1.length
  let [LeftPointer, RightPointer] = [0, n - 1]
  let currentSum = queue1.reduce((acc, cur) => acc + cur, 0)
  let count = 0

  while (count <= n * 3) {
    if (currentSum === targetSum) return count

    // 만약에 값이 모자르다면, 새로운 값을 더하기 => rightPointer + 1
    if (currentSum < targetSum) {
      // mod 연산 필수! (undefined 방지용)
      RightPointer = (RightPointer + 1) % queue.length
      currentSum += queue[RightPointer]
    } else {
      currentSum -= queue[LeftPointer]
      LeftPointer = (LeftPointer + 1) % queue.length
    }
    count++
  }
  return -1
}
