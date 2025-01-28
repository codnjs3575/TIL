// <문제 및 입출력 분석>
// 입력값에 따른 시간복잡도 분석
//   ㄴ prices의 길이가 2 이상 100,000이하이므로 시간복잡도는 O(n)으로 풀어야 함
//   ㄴ 그렇다면, 이중 반복문이 아니라 모든 입력값에 대해 입력값이 들어오면 한 번에 바로 결과가 나와야 함
// Stack을 어떻게 사용할 수 있을까? -> 매 초가 지날때마다 '주식 가격이 떨어지지 않은' 주가만 저장해놓음
// 만약 모든 입력값을 다 돌고 Stack에 남은 주가가 있다면, 그 주가들은 마지막까지 주식 가격이 떨어지지 않은 것!
// -----------------------------------------------------------------------------------------
// Point) 주가가 아니라 주가의 index를 저장해야함
//    -> 이유: 주가의 등장시간이 아니라, 주가의 값을 저장해놓으면 주식 가격이 떨어지지 않은 시간을 계산하기가 어려움
// -----------------------------------------------------------------------------------------

// <구현>
// prices 배열의 값들을 하나씩 돌면서 Stack에 넣을 수 있는지 확인.
//  ㄴ 1. 만약, 현재값(prices[현재])이 Stack의 최상단값보다 작다면, 주식가격이 떨어진 것! -> stack에 있는 주가등장시간(stack[top])을 꺼내서 유지시간(현재 - stack[top])을 입력함.
//       -> stack의 다음 최상단값을 확인. (반복 break 조건 : stack에 값이 아무것도 없어지거나, stack의 최상단값이 현재값(prices[현재])보다 커질 때. )
//  ㄴ 2. 그렇지 않다면 주식 가격이 떨어지지 않았으므로 Stack에 현재값을 삽입함 (prices[현재])

function solution(prices) {
  let result = []
  let stack = []

  prices.map((price, priceTime) => {
    while (stack.length && price < prices[stack[stack.length - 1]]) {
      const stackPriceTime = stack.pop()
      result[stackPriceTime] = priceTime - stackPriceTime
    }
    stack.push(priceTime)
  })

  while (stack.length) {
    const stackPriceTime = stack.pop()
    result[stackPriceTime] = prices.length - stackPriceTime - 1
  }

  return result
}

solution([1, 2, 3, 2, 3])
