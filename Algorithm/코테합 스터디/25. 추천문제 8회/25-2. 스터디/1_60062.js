function solution(n, weak, dist) {
  const weakLen = weak.length // 취약 지점 개수
  if (weakLen === 1) return 1

  const distLen = dist.length // 친구 수
  let answer = distLen + 1 // 최댓값으로 init

  const linear_weak = [...weak, ...weak.map((w) => w + n)] // 원형을 직선으로 펴기
  const friends = new Array(distLen).fill(false) // 순열에 사용한 친구 확인용

  function permutation(len, dists) {
    // 1. 만약 모든 친구들을 다 뽑았다면, 취약 구간 돌면서 점검하기
    if (len === distLen) {
      for (let weakPoint = 0; weakPoint < weakLen; weakPoint++) {
        const end = weakPoint + weakLen // 취약 지점 끝 인덱스
        let start = weakPoint // 현재 취약 지점 인덱스를 시작 지점 인덱스로 설정
        // [start, end] => 덮어야 할 취약 지점

        let friends_cnt = 0 // 투입한 친구 수

        // 이동 가능 거리 하나씩 보면서 덮을 수 있는지 확인해보기
        for (const dist of dists) {
          if (start >= end) break // 이미 덮었다면 반복 종료
          friends_cnt += 1 // 아니라면, 친구 투입하기
          const maxDist = dist + linear_weak[start] // 투입한 친구가 점검할 수 있는 최대 거리
          while (start < end && maxDist >= linear_weak[start]) start++ // 덮을 수 있을 때까지 이동하기
        }
        if (start < end) continue // 취약 지점을 다 덮지 못했다면 pass
        answer = Math.min(answer, friends_cnt) // 취약 지점을 다 덮었다면 투입한 최소 인원 수로 갱신
      }
      return
    }

    // 2. 그렇지 않다면, 친구들을 하나씩 뽑아서 순열에 넣기 (후보 넣어보기)
    for (let i = 0; i < distLen; i++) {
      if (friends[i]) continue
      friends[i] = true
      permutation(len + 1, [...dists, dist[i]]) // 다음 순열 자리로 넘어가면서 해당 친구의 이동가능거리 추가
      friends[i] = false // 백트래킹
    }
  }

  permutation(0, []) // 순열 생성
  return answer === distLen + 1 ? -1 : answer
}

solution(12, [1, 5, 6, 10], [1, 2, 3, 4])
