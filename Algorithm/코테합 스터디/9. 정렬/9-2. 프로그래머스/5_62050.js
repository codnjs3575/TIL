// 튜플 : 중복 x, 순서 o 자료구조
//  ㄴ 형식? { a1, a2, a3, ..., an }의 부분집합 (공집합 x)
//  ㄴ 조합? {{2}, {2, 1}, {2, 1, 3}, {2, 1, 3, 4}}
//          {{2, 1, 3, 4}, {2}, {2, 1, 3}, {2, 1}}
//          {{1, 2, 3}, {2, 1}, {1, 2, 4, 3}, {2}}

// 문제? 부분집합들을 받아 튜플 작성하기
// 풀이? 부분집합들의 원소 개수를 기준으로 오름차순 정렬하기 -> answer에 넣기
// ① {} 형태의 문자열을 []의 배열로 변환하기 -> arr
// ② 원소 개수를 기준으로 오름차순 정렬하기 -> sortedArr
// ③ 정렬한 배열들을 돌면서 없는 숫자만 answer 배열에 push하기

function solution(s) {
  const arr = s.slice(2, -2).split('},{') // ①
  const sortedArr = arr.sort((a, b) => a.length - b.length) // ②

  // ③
  const answer = []
  sortedArr.map((arr) => {
    arr.split(',').map((num) => {
      if (!answer.includes(num * 1)) answer.push(num * 1)
    })
  })

  return answer
}

solution('{{2},{2,1},{2,1,3},{2,1,3,4}}') // [2, 1, 3, 4]
// solution('{{1,2,3},{2,1},{1,2,4,3},{2}}') // [2, 1, 3, 4]
// solution('{{20,111},{111}}') // [111, 20]
// solution('{{123}}') // [123]
// solution('{{4,2,3},{3},{2,3,4,1},{2,3}}') // [3, 2, 4, 1]
