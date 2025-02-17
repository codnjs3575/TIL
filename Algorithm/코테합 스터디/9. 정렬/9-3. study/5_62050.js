// 문제 -> 부분집합들을 받아서 튜플로 치환하기
// 풀이 -> 부분집합들의 원소개수를 기준으로 오름차순 정렬하기!
// 1. {} 문자열을 [] 배열로 변환하기 => arr
// 2. 원소 개수를 기준으로 오름차순 정렬하기
// 3. 정렬한 배열들을 돌면서 없는 숫자만 answer에 push
function solution(s) {
  const arr = s.slice(2, -2).split('},{') // 1
  const sortedArr = arr.sort((a, b) => a.length - b.length) // 2

  // 3
  const answer = []
  sortedArr.map((arr) => {
    arr.split(',').map((num) => {
      if (!answer.includes(num * 1)) answer.push(num * 1) // 자동 형변환
    })
  })

  return answer
}

solution('{{2},{2,1},{2,1,3},{2,1,3,4}}') // [2, 1, 3, 4]
// solution('{{1,2,3},{2,1},{1,2,4,3},{2}}') // [2, 1, 3, 4]
// solution('{{20,111},{111}}') // [111, 20]
// solution('{{123}}') // [123]
// solution('{{4,2,3},{3},{2,3,4,1},{2,3}}') // [3, 2, 4, 1]
