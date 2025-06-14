function solution(msg) {
  // 1. 기존 사전 init
  const dictMap = {}
  for (let i = 65; i < 91; i++) dictMap[String.fromCharCode(i)] = i - 64

  let nextS = ''
  let lastCnt = 27
  const result = []

  // 2. reduce로 한 글자씩 순회하기
  //  [acc]: 가장 긴 문자열, [cur]: 현재 글자
  const s = msg.split('').reduce((acc, cur) => {
    nextS = acc + cur

    // 2-1. 만약 nextS가 사전에 없을 경우
    if (!dictMap[nextS]) {
      dictMap[nextS] = lastCnt++ // 사전에 새로운 단어 등록

      if (dictMap[acc]) result.push(dictMap[acc]) // acc가 사전에 있다면, 사전번호 result에 삽입
      return cur // 현재 글자(cur)로 acc 초기화하기
    }

    // 2-2. nextS가 사전에 있다면, acc를 nextS로 업데이트한 후 다음 cur로 이동
    //      = 더 긴 문자열로 시도
    return nextS
  })

  result.push(dictMap[s])
  return result
}

solution('KAKAO')
