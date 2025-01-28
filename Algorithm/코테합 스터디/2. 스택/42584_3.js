// prices 배열을 하나씩 돌면서 stack에 넣을 수 있는지 확인
// 1. 만약, 현재값이 stack의 최상단값보다 작다면, 주식가격이 떨어진 것!
//   ㄴ stack에 있는 주가등장시간(stack[top])을 꺼내서 유지시간(현재시간 - 주가등장시간)을 입력함
// 2. 그렇지 않다면, 주식가격이 떨어지지 않은 것! -> stack에 현재 값을 삽입함
// 주의! stack에 넣는 값은 주가가 아니라, 주가의 등장시간!

function solution(prices) {
  let stack = []
  let result = []

  prices.map((price, priceTime) => {
    // stack이 비어있지 않고, 현재 price가 stack[top]보다 작다면, 유지시간 입력함
    // 다음 stack[top] 비교를 위해 반복문(while) 사용
    while (stack.length && price < prices[stack[stack.length - 1]]) {
      const stackPriceTime = stack.pop() // 주가등장시간
      result[stackPriceTime] = priceTime - stackPriceTime
    }

    stack.push(priceTime) // 현재 주가등장시간도 stack에 넣음
  })

  // console.log(stack) // 끝까지 가격이 떨어지지 않은 주가의 '주가등장시간'

  while (stack.length) {
    const stackPriceTime = stack.pop() // 주가등장시간
    result[stackPriceTime] = prices.length - stackPriceTime - 1
  }

  // console.log(result)
  return result
}

solution([1, 2, 3, 2, 3])
