// 문제 29. 다단계 칫솔 판매
// 30분 풀이

function solution(enroll, referrals, sellers, amounts) {
  let tree = new Map()
  let moneys = new Map()

  // 1. 트리 1개, 해시맵 1개 생성하기
  //  ㄴ 트리 (tree) : 판매원 - 추천인 관계의 트리를 생성하기
  //  ㄴ 해시맵 (moneys) : 판매원들의 이익금을 표시한 해시맵
  enroll.map((val, idx) => {
    tree.set(val, referrals[idx])
    moneys.set(val, 0)
  })

  // 2. 이익금 나눠가지기
  sellers.map((seller, i) => {
    let money = amounts[i] * 100 // 해당 판매자의 수익

    // while문 : 이익금이 0원 이상이고 seller가 root가 아닐 동안 반복문
    while (money > 0 && seller !== '-') {
      moneys.set(seller, moneys.get(seller) + money - Math.floor(money / 10)) // 이익금 더하기
      seller = tree.get(seller) // 추천인을 판매자로 재지정
      money = Math.floor(money / 10)
    }
  })

  return enroll.map((seller) => moneys.get(seller))
}

let input1 = [
  ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
  ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
  ['young', 'john', 'tod', 'emily', 'mary'],
  [12, 4, 2, 5, 10],
]

// ㄴ Map(8) {
//     'john' => '-',
//     'mary' => '-',
//     'edward' => 'mary',
//     'sam' => 'edward',
//     'emily' => 'mary',
//     'jaimie' => 'mary',
//     'tod' => 'jaimie',
//     'young' => 'edward'
//   }

let input2 = [
  ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
  ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
  ['sam', 'emily', 'jaimie', 'edward'],
  [2, 3, 5, 4],
]

console.log(solution(...input1)) // [360, 958, 108, 0, 450, 18, 180, 1080]
// solution(...input2) // [0, 110, 378, 180, 270, 450, 0, 0]
