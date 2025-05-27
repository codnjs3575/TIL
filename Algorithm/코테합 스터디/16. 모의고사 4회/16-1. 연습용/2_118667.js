// 필요한 작업의 최소 횟수 구하기
// 1회 : pop 1번 + insert 1번

function solution(queue1, queue2) {
  // 0. queue를 합치고 targetSum 구하기
  const queue = [...queue1, ...queue2] // 하나의 queue로 만들기
  const n = queue1.length
  const totalSum = queue.reduce((sum, num) => sum + num, 0) // 총합 구하기
  if (totalSum % 2 !== 0) return -1 // 총합이 홀수라면 return -1

  const targetSum = totalSum / 2 // 총합이 짝수라면 총합/2 하여 targetSum 구하기

  // 1. 투포인터를 통해 문제 합 구간 찾기
  let [LeftPointer, RightPointer] = [0, n - 1] // 왼쪽 포인터, 오른쪽 포인터 초기화
  let currentSum = queue1.reduce((acc, cur) => acc + cur, 0) // 왼쪽 큐 누적합 구하기
  let count = 0

  while (count <= n * 3) {
    if (currentSum == targetSum) return count

    if (currentSum < targetSum) {
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

solution([3, 2, 7, 2], [4, 6, 5, 1]) // 2
solution([1, 2, 1, 2], [1, 10, 1, 2]) // 7

// console.log(solution([1, 1], [1, 5]))
// -1
