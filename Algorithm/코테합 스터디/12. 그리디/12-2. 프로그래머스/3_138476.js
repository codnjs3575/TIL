// 수확한 귤 중에서 k개를 골라 상자 한개에 담기로 함
// 크기가 일정하기않기에 크기별로 분류했을 때 서로 다른 종류의 수를 최소화하고픔
// k개를 담기 위해서 몇 종류의 귤을 담아야 하는지

function solution(k, tangerine) {
  tangerine.sort((a, b) => a - b)

  // 1. 원소들의 중복 개수 구하기
  let map = new Map()
  tangerine.map((num) => map.set(num, (map.get(num) || 0) + 1))

  // 2. map의 값만을 추출하여 배열로 만드는 법 (+내림차순 정렬)
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
