function solution(prices) {
  let stack = []
  let top = -1

  let answer = new Array(prices.length).fill(0) // 거리 저장할 배열 변수

  for (let i = 1; i < prices.length; i++) {
    // 1. Stack에 삭제할 수 있는 idx가 있는지 확인 후 삭제 작업
    while (stack.length > 0 && prices[i] < prices[stack[stack.length - 1]]) {
      const val = stack.pop()
      answer[idx]
    }

    // 2. 해당 요소를 Stack에 저장
    stack.push(idx)
    top += 1
  }

  // 남아있는 Stack 요소 작업하기
  //   ㄴ 마지막 요소는 0으로 저장
  //   ㄴ 그 외의 요소들은 마지막 idx - 해당 idx으로 저장
}

solution([1, 3, 4, 2, 3])
