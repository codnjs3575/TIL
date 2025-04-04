// 구명보트는 최대 2명씩
// 최대한 적게 사용하여 모든 사람을 구출
// 필요한 구명보트 개수는?
// 사람의 몸무게는 40kg 이상, 240kg 이하
// 구명보트의 최대 무게 제한은 240kg
// 사람의 수는 1명 이상 50,000명 이하

function solution(people, limit) {
  people.sort((a, b) => a - b)

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
