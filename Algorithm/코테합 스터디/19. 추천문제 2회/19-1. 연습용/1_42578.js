function solution(clothes) {
  const HashMap = new Map()

  // 1. 종류에 따른 해시맵 만들기
  for (const [_, kind] of clothes) {
    HashMap.set(kind, (HashMap.get(kind) || 0) + 1)
  }

  // 2. 해시맵을 계산하여 return (조합 개수)
  return (
    [...HashMap.values()].reduce((acc, cur) => {
      return acc * (cur + 1)
    }, 1) - 1
  )
}

console.log(
  solution([
    ['yellow_hat', 'headgear'],
    ['blue_sunglasses', 'eyewear'],
    ['green_turban', 'headgear'],
  ])
)
// 5

console.log(
  solution([
    ['crow_mask', 'face'],
    ['blue_sunglasses', 'face'],
    ['smoky_makeup', 'face'],
  ])
)
// 3
