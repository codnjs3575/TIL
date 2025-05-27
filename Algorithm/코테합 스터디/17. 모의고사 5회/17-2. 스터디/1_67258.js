// 투포인터 문제!
// 포인터를 오른쪽으로 움직이면서, 보석 추가하기
// 만약 모든 보석을 포함하였다면?
// 포인터를 왼쪽으로 움직이면서, 보석 제거하기
// 최소 길이 맞는지도 확인하기

function solution(gems) {
  const gemsMap = new Map() // 갖고 있는 보석함
  const gemTypes = new Set(gems).size // 보석 종류 개수
  let answer = [1, gems.length] // 시작 인덱스와 끝 인덱스
  let min_length = gems.length
  let [start, end] = [0, 0] // 투포인터

  while (end < gems.length) {
    // 1. 보석 추가하기
    const currentGem = gems[end]
    gemsMap.set(currentGem, (gemsMap.get(currentGem) || 0) + 1)
    end++

    // 2. 만약 모든 종류를 포함하였다면
    while (gemTypes == gemsMap.size) {
      // 2-2. 최소 길이 확인하기
      if (end - start + 1 < min_length) {
        min_length = end - start + 1
        answer = [start + 1, end + 1]
      }

      // 2-1. 보석 제거하기
      const deleteGem = gems[start]
      gemsMap.set(deleteGem, gemsMap.get(deleteGem) - 1)
      if (gemsMap.get(deleteGem) === 0) gemsMap.delete(deleteGem)
      start++
    }
  }

  return answer
}
