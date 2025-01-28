function solution(enroll, referral, sellers, amount) {
  // 1. 트리 및 맵 생성하기
  //  ㄴ 판매원 - 추천인 관계의 트리 생성하기
  //  ㄴ 판매원 별 이익금을 표시한 맵 생성하기
  const tree = new Map()
  const moneys = new Map()

  enroll.map((name, idx) => {
    tree.set(name, { referral: referral[idx], money: 0 })
    moneys.set(name, 0)
  })
  console.log(tree)

  // 2. 판매 기록 (판매원 - 이익금) 하나씩 보면서 이익금 분배하기
  sellers.map((seller, i) => {
    let money = amount[i] * 100 // 단위 100원 (1200)
    console.log(tree.get(seller))
    let info = tree.get(seller)
    console.log(info)

    // while (seller !== '-' && money > 0) {
    //   // 현재 판매원의 이익금 더하기 (0 + 1200 - 120)
    //   console.log(tree.get(seller))
    //   moneys.set(seller, moneys.get(seller) + money - Math.floor(money / 10))
    //   // 추천인을 판매원으로 재지정
    //   seller = tree.get(seller)
    //   // 이익금 재설정 (120)
    //   money = Math.floor(money / 10)
    // }
  })

  return enroll.map((seller) => moneys.get(seller))
}

const input1 = [
  ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
  ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
  ['young', 'john', 'tod', 'emily', 'mary'],
  [12, 4, 2, 5, 10],
]

const input2 = [
  ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
  ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
  ['sam', 'emily', 'jaimie', 'edward'],
  [2, 3, 5, 4],
]

solution(...input2)
