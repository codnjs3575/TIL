// 5분 풀이
function solution(n, a, b) {
  var answer = 0
  while (a !== b) {
    answer++
    a = Math.ceil(a / 2)
    b = Math.ceil(b / 2)
  }
  return answer
}

solution(8, 4, 7) // 3
