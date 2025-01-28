function solution(string) {
  let stack = []

  for (s of string) {
    if (stack.length > 0 && stack[stack.length - 1] == s) stack.pop()
    else stack.push(s)
  }

  return stack.length ? 0 : 1
}

solution('cdcd')
