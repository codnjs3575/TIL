function solution(string) {
  let result = 0
  string = string.split('')

  for (let i = 0; i < string.length; i++) {
    let stack = []
    let top = -1
    let isCorrect = true

    // 1. 올바른 괄호 문자열인지 확인하기
    for (s of string) {
      // 1-1. 여는 괄호 -> stack에 삽입
      if (['(', '[', '{'].includes(s)) {
        stack.push(s)
        top += 1
      }

      // 1-2. 닫는 괄호 -> stack[top]과 짝이 맞는지 확인 후 맞다면 삭제, 아니라면 return
      else if (
        (s == ')' && stack[top] == '(') ||
        (s == ']' && stack[top] == '[') ||
        (s == '}' && stack[top] == '{')
      ) {
        stack.pop()
        top -= 1
      } else {
        isCorrect = false
      }
    }
    if (isCorrect && stack.length === 0) result += 1

    // 2. 문자열 회전하기
    string.push(string.shift())
  }
  return result
}

solution('}}}')
