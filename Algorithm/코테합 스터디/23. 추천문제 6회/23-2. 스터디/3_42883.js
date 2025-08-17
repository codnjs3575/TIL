// 로직 : 일단 저장하면서, 새로운 숫자가 더 크다면 이전 숫자 제거하는 그리디 방식 사용

// 4 1 7 7 2 5 2 8 4 1
// 4 저장 -> 1 저장 -> 1 제거 -> 4 제거 -> 7 저장 -> 7 저장 ->
// 2 저장 -> 2 제거 -> 5 저장 -> 2 저장 -> 2 제거 -> 8 저장 -> 4 저장 -> 1 저장
function solution(number, k) {
  const stack = [] // 0. 후입선출 가능한 stack으로 사용

  // 반복문 돌면서 pop&push 진행하기
  // 문자열도 for문
  for (num of number) {
    // pop(맨 마지막 값) 조건 : stack 비어있지않고, k가 0보다 크고, 이전 값이 현재 값보다 작으면 이전 값 pop
    while (stack.length && k > 0 && stack[stack.length - 1] < num) {
      stack.pop()
      k--
    }

    // push 무조건 현재 값 저장하기
    stack.push(num)
  }

  // console.log(stack)
  // k가 남아있으면, 남아있는 만큼 제거한 뒤 앞부분만 추출하기
  if (k > 0) stack.splice(stack.length - k, k)
  return stack.join('')
}

solution('4177252841', 4) // 775841
