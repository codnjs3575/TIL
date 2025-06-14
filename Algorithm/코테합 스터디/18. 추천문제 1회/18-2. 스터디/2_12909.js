function solution(string) {
  const stack = []

  string.split('').map((s) => {
    if (s === ')' && stack[stack.length - 1] === '(') {
      stack.pop()
    } else stack.push(s)
  })

  return !stack.length
}

// solution('()()')
// solution('(())()')
solution(')()(')
// solution('(()(')
