// 외벽점검
// 동그란 모양, 외벽의 총  둘레는 n미터, 취약한 지점들이 있음
// 1시간마다 친구들을 보내서 점검 (각자마다 이동할 수 있는 거리는 제각각)

// 질문 1. 원형?
// -> 원형을 직선으로 핀 뒤, 뒤에 한 번 더 구간을 붙여서 원형처럼 보이게끔!
// n이 12일 때 0은 12이며, 1은 13, 2는 14를 의미할 수 있다는 것!
// weak [1, 5, 6, 10]일 때 linear_weak = [1, 5, 6, 10, 13, 17, 18, 22]로 설정하면

// 질문 2. 시계 방향? 반시계 방향? -> 원형을 직선으로 폈기에 10 -> 1 이동도 편해짐.
// 즉, 시계 방향으로 통일하기

// 질문 3. 이동 시작은 어디서?
// -> 원본 weak의 인덱스들만을 돔 (1, 5, 6, 10) (13, 17, 18, 22 X)

// 질문 2. 몇 명이 최소한의 숫자인가
// 1명, 2명, ..., 최대 친구 수만큼 확인하다가 최소한일 경우에 return

function solution(n, weak, dist) {
  // 0. 필요한 변수들 설정하기
  const weakLen = weak.length // 0. 취약 지점 개수
  if (weakLen === 1) return 1

  const distLen = dist.length // 0. 친구 수
  let answer = distLen + 1

  const linear_weak = [...weak, ...weak.map((w) => w + n)] // 0. 원형을 직선으로 펴기
  const friends = new Array(distLen).fill(false) // 0. 친구순열 생성용 방문 확인배열

  // 1. 순열 생성용 함수 (친구들의 순서 확인용)
  function permutation(len, dists) {
    // 1-1. 모든 친구들을 다 뽑았다면, 취약 구간 돌면서 점검시켜보기
    if (len === distLen) {
      // 취약 지점을 하나씩 돌면서 시작 지점으로 설정하기
      for (let weakPoint = 0; weakPoint < weakLen; weakPoint++) {
        // [start, end]까지 덮어야 할 취약 지점
        const end = weakPoint + weakLen // 취약 지점 끝 인덱스
        let start = weakPoint // 현재 취약 지점을 시작 지점으로 설정

        let friends_cnt = 0 // 투입한 친구 수

        // 이동 가능 거리 하나씩 돌면서
        for (const dist of dists) {
          if (start >= end) break // 이미 덮었다면 반복 종료
          friends_cnt += 1 // 아니라면, 친구 투입
          const maxDist = dist + linear_weak[start] // 투입한 친구가 덮을 수 있는 최대 거리

          while (start < end && maxDist >= linear_weak[start]) start++ // 덮을 수 있게끔 이동하기
        }

        if (start < end) continue // 취약 지점을 다 덮지 못함
        answer = Math.min(answer, friends_cnt) // 취약 지점을 다 덮었다면 answer 갱신
      }
      return
    }

    // 1-2. 친구들을 하나씩 뽑아서 순열에 넣어보기 (후보 넣어보기)
    for (let i = 0; i < distLen; i++) {
      if (friends[i]) continue // 이미 뽑은 친구라면 pass
      friends[i] = true // i번째 친구를 선택
      permutation(len + 1, [...dists, dist[i]]) // 다음 자리로 넘어가면서 arr에 해당 친구의 이동가능거리 추가
      friends[i] = false // 백트래킹
    }
  }

  // 2. 순열 생성 시작
  permutation(0, [])
  return answer === distLen + 1 ? -1 : answer
}

solution(12, [1, 5, 6, 10], [1, 2, 3, 4])
