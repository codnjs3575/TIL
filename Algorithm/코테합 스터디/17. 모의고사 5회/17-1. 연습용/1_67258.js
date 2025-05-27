// 보석 쇼핑

// 특정 범위의 보석을 모두 구매하되, 목적 달생을 해야 함
// 진열된 모든 종류의 보석을 적어도 1개 이상 포함하는 가장 짧은 구간을 찾아서 구매하기

// return [시작 진열대 번호, 끝 진열대 번호]
// 가장 짧은 구간이 여러개라면, 시작 진열대 번호가 가장 작은 구간 return

// 똑같은 투포인터의 문제!
// 포인터를 오른쪽으로 움직여가면서, 모든 보석을 포함하였을 때를 확인
// 모든 보석을 포함하였다면 왼쪽으로 움직이면서, 보석의 종류가 줄어들지 않도록 확인
function solution(gems) {
  const gemsMap = new Map() // 갖고 있는 보석
  const gemTypes = new Set(gems).size // 보석의 종류 개수
  let answer = [0, gems.length] // 시작 인덱스와 끝 인덱스
  let [start, end] = [0, 0] // 투 포인터

  while (end < gems.length) {
    // 1. 보석 추가하기 (오른쪽 포인터 이동하기)
    const currentGem = gems[end]
    gemsMap.set(currentGem, (gemsMap.get(currentGem) || 0) + 1)
    end++

    // 2. 모든 종류를 포함할 때 축소 시작하기
    while (gemsMap.size === gemTypes) {
      // 2-2. 최소 길이 수정하기
      if (end - start < answer[1] - answer[0] + 1) answer = [start, end - 1]

      // 2-1. 보석 제거하기 (왼쪽 포인터 이동하기)
      const deleteGem = gems[start]
      gemsMap.set(deleteGem, gemsMap.get(deleteGem) - 1)
      if (gemsMap.get(deleteGem) === 0) gemsMap.delete(deleteGem)
      start++
    }
  }
  return [answer[0] + 1, answer[1] + 1]
}

solution(['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'])
// [3, 7]

solution(['AA', 'AB', 'AC', 'AA', 'AC'])
// [1, 3]

// solution(['XYZ', 'XYZ', 'XYZ'])
// [1, 1]

// solution(['ZZZ', 'YYY', 'NNNN', 'YYY', 'BBB'])
// [1, 5]
