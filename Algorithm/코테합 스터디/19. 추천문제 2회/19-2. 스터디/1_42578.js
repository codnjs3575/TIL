// 누적곱(옷의 종류 + 1(안 입는 경우)) - 1 (아무것도 안 입는 경우)
function solution(clothes) {
  const hashMap = new Map()

  // 1. 옷 종류별로 해시맵 (종류 : 개수)
  for (const [_, kind] of clothes) {
    hashMap.set(kind, (hashMap.get(kind) || 0) + 1)
  }

  // 2. 누적곱 - 1 형태 반환하기
  return (
    [...hashMap.values()].reduce((acc, cur) => {
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
