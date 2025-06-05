// 스택 사용해서 지금 값이랑 마지막 값 비교하기 -> 스택 길이가 남아 있으면 false
// s: )()(
// stack : [ ')' ] [ ')', '(' ] [ ')', '(', ')' ] [ ')', '(', ')', '(' ]

function solution(string) {
  const stack = []

  string.split('').map((s) => {
    if (s === ')' && stack[stack.length - 1] === '(') {
      stack.pop()
    } else stack.push(s)
  })

  return !stack.length
}

// solution('()()') // true
solution('(())()') // true
// solution(')()(') // false
// solution('(()(') // false
