function solution(citations) {
  // 내림차순 정렬
  citations.sort((a, b) => b - a)

  for (let h = citations.length; h >= 0; h--) {
    const cnt = citations.filter((c) => c >= h).length
    if (cnt >= h) return h
  }

  return 0 // 마지막까지 못 찾으면 0
}

solution([3, 0, 6, 1, 5])

// 책직픽틱 형님의 테스트케이스 질문들
// 1. [10,8,5,4,3] => 4번 이상이 4개/5개
// 2. [25,8,5,3,3,2,1] = 3번 이상이 5개/7개
// 3. [0,0,0,0,1] = 1번 이상이 1개/5개
// 4. [6,6,6,6,6,6] = 6번 이상이 6개/6개
// 5. [1,1,1,1,1] = 1번 이상이 5개/5개
