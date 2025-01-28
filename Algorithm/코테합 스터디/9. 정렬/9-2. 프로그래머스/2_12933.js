// 12933. 정수 내림차순 배치
function solution(n) {
  return Number(
    String(n)
      .split('')
      .sort((a, b) => b - a)
      .join('')
  )
}
solution(118372)
