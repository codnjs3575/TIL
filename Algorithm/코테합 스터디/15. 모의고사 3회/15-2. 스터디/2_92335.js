function solution(n, k) {
  let answer = 0

  // k진수로 변환
  let num = n.toString(k)
  // '0'을 기준으로 split
  const arr = num.split('0').filter((n) => n && n !== '1')

  // 소수 찾기
  arr.map((num) => {
    let isPrime = true
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false
        break
      }
    }
    if (isPrime) answer++
  })

  return answer
}
// solution(437674, 3) // 3
solution(110011, 10) // 2
