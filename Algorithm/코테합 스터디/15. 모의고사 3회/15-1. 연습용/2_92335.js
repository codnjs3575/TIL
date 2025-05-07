// 양의 정수 n -> k진수로 변환
// 소수가 몇 개인지 확인
// 1) 소수 양쪽에 0이 있음
// 2) 소수 오른쪽에만 0이 있음, 왼쪽에는 공백
// 3) 소수 왼쪽에만 0이 있음, 오른쪽에는 공백
// 4) 소수 양쪽에 공백이 있음

// 437674 -> 3진수 => 211020101011
// 211, 2, 11 -> 총 3개
function solution(n, k) {
  let num = n.toString(k) // k진수로 변환
  const arr = num.split('0').filter((n) => n && n !== '1')

  let count = 0
  arr.map((num) => {
    let isPrime = true
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false
        break
      }
    }
    if (isPrime) count++
  })

  return count
}

solution(437674, 3) // 3
solution(110011, 10) // 2
