function solution(k, tangerine) {
  let map = new Map()
  //  1. 원소들의 중복 구하기
  tangerine.map((num) => map.set(num, (map.get(num) || 0) + 1))

  // 2. map의 value만을 추출하여 내림차순 정렬된 배열 만들기
  let mapValues = Array.from(map.values()).sort((a, b) => b - a)

  // prettier-ignore
  let count = 0, sum = 0
  for (const value of mapValues) {
    if ((sum += value) >= k) return ++count
    count++
  }
  return count
}
solution(6, [1, 3, 2, 5, 4, 5, 2, 3]) // 3
solution(4, [1, 3, 2, 5, 4, 5, 2, 3]) // 2
solution(2, [1, 1, 1, 1, 2, 2, 2, 3]) // 1
