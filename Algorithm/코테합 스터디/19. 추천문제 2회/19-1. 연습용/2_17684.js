function solution(msg) {
  let nextS = ''
  let lastCnt = 27
  const result = []

  // 1. 한 자리 알파벳으로 사전 초기화
  const dictMap = {}
  for (let i = 65; i < 91; i++) dictMap[String.fromCharCode(i)] = i - 64

  // 2. reduce를 이용해서 한 글자씩 순회하기
  //  ㄴ acc : 가장 긴 문자열, cur : 현재 글자
  const s = msg.split('').reduce((acc, cur) => {
    nextS = acc + cur // 현재까지 문자열(acc)에 현재 글자(cur) 붙이기

    // 2-1. nextS가 사전에 없을 경우
    if (!dictMap[nextS]) {
      dictMap[nextS] = lastCnt++ // 새로운 단어 등록하기

      if (dictMap[acc]) result.push(dictMap[acc]) // acc가 사전에 있다면, result에 사전번호 삽입
      return cur // 현재 글자(cur)로 acc 초기화하기
    }
    // 2-2. 사전에 있다면, acc 업데이트 후 다음 cur로 이동 (더 긴 문자열로 시도)
    return acc + cur
  })

  result.push(dictMap[s]) // reduce가 끝난 뒤 마지막 남은 s의 사전번호도 결과에 추가
  return result
}

// solution('KAKAO') // [11, 1, 27, 15]

solution('TOBEORNOTTOBEORTOBEORNOT')
// [20, 15, 2, 5, 15, 18, 14, 15, 20, 27, 29, 31, 36, 30, 32, 34]

// solution('ABABABABABABABAB')
// [1, 2, 27, 29, 28, 31, 30]
