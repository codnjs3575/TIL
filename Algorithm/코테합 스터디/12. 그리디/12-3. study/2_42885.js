function solution(people, limit) {
  people.sort((a, b) => a - b) // 오름차순 정렬

  let count = 0
  let left = 0
  let right = people.length - 1

  while (left <= right) {
    if (people[left] + people[right] <= limit) left++

    right--
    count++
  }
  return count
}

solution([70, 50, 80, 50], 100) // 3
solution([70, 80, 50], 100) // 3
