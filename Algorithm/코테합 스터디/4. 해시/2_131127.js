// 2. 할인 행사
//  ㄴ 해시테이블 : 제품별로 사야할 갯수 저장 (0이라면 모두 구매에 성공한 것)
// (1시간 풀이)
//  시행착오 1. 또 문제 이해를 제대로 못해서 출력값의 기준을 헷갈려버렸다.

function solution(want, number, discount) {
  let hashTable = new Object()

  // 1. 제품 목록 want배열과 가격 number 배열로 해시테이블 만들어놓기
  //   ㄴ { banana: 3, apple: 2, rice: 2, pork: 2, pot: 1 }
  want.map((item, idx) => (hashTable[item] = number[idx]))

  // 2. 1일 차 ~ 10일 차 제품들을 미리 해시테이블에서 빼기 (구매할 것들)
  //  ㄴ { banana: 1, apple: -1, rice: 0, pork: 0, pot: 1 }
  discount.slice(0, 10).map((item) => {
    if (want.includes(item)) hashTable[item]--
  })

  // 3. 10개 제품의 목록이 포함되는 일자까지만 반복문 돌기
  //  ㄴ 1일차 ~ 5일차
  let answer = checkDiscount(hashTable) ? 1 : 0
  for (let i = 1; i <= discount.length - 10; i++) {
    hashTable[discount[i - 1]]++ // 이전 제품은 구매 안함
    hashTable[discount[i + 9]]-- // 다음 제품은 구매 함

    // 만약 모든 제품을 구매에 성공하였다면, 해당 일차는 회원등록가능날짜이므로 +1
    if (checkDiscount(hashTable)) answer++
  }
  console.log(answer)
  return answer
}

function checkDiscount(hashTable) {
  for (const Item in hashTable) {
    if (hashTable[Item] > 0) return false
  }
  return true
}

// solution(
//   ['banana', 'apple', 'rice', 'pork', 'pot'],
//   [3, 2, 2, 2, 1],
//   [
//     'chicken',
//     'apple',
//     'apple',
//     'banana',
//     'rice',
//     'apple',
//     'pork',
//     'banana',
//     'pork',
//     'rice',
//     'pot',
//     'banana',
//     'apple',
//     'banana',
//   ]
// )
// 3

// solution(
//   ['apple'],
//   [10],
//   [
//     'banana',
//     'banana',
//     'banana',
//     'banana',
//     'banana',
//     'banana',
//     'banana',
//     'banana',
//     'banana',
//     'banana',
//   ]
// )
// 0

solution(
  ['banana', 'apple', 'rice', 'pork', 'pot'],
  [3, 2, 2, 2, 1],
  [
    'apple',
    'banana',
    'rice',
    'apple',
    'pork',
    'banana',
    'pork',
    'rice',
    'pot',
    'banana',
    'apple',
    'banana',
    'chicken',
    'apple',
  ]
)
// 3
