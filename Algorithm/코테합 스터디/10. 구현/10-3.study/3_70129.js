// ------회차와 0삭제개수를 반환하는 문제------
// 0과 1로 이뤄진 문자열 s -> 이진수 : binaryNum
// 0을 제거하며 남아있는 1의 개수로 새로운 이진수 만들기 (1의 개수가 4라면, 100이 됨)
function solution(binaryNum) {
  const result = [0, 0] // 회차, 삭제 개수
  let isOneLength = 0 // 1의 개수

  while (isOneLength != 1) {
    result[0]++ // 1. result[0] : 회차 수정
    isOneLength = binaryNum.split('').filter((s) => s !== '0').length // 2. 1의 개수 구하기
    result[1] += binaryNum.length - isOneLength // 3. result[1] : 0 삭제 개수 수정
    binaryNum = isOneLength.toString(2) // 4. 새로운 이진수 구하기
  }

  return result
}

solution('110010101001') // 3,8
// solution('01110') // 3,3
// solution('1111111') // 4,1
