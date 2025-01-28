function solution(phone_book) {
  let phoneList = new Set(phone_book)

  for (phoneNum of phoneList) {
    for (let i = 1; i < phoneNum.length; i++) {
      if (phoneList.has(phoneNum.slice(0, i))) return false
    }
  }
  return true
}

console.log(solution(['119', '97674223', '1195524421']))
console.log(solution(['123', '456', '789']))
console.log(solution(['12', '123', '1235', '567', '88']))

// 정확성  테스트
// 테스트 1 〉	통과 (0.06ms, 33.4MB)
// 테스트 2 〉	통과 (0.07ms, 33.4MB)
// 테스트 3 〉	통과 (0.06ms, 33.4MB)
// 테스트 4 〉	통과 (0.06ms, 33.4MB)
// 테스트 5 〉	통과 (0.06ms, 33.4MB)
// 테스트 6 〉	통과 (0.07ms, 33.4MB)
// 테스트 7 〉	통과 (0.09ms, 33.4MB)
// 테스트 8 〉	통과 (0.08ms, 33.5MB)
// 테스트 9 〉	통과 (0.05ms, 33.4MB)
// 테스트 10 〉	통과 (0.06ms, 33.4MB)
// 테스트 11 〉	통과 (0.10ms, 33.4MB)
// 테스트 12 〉	통과 (0.08ms, 33.5MB)
// 테스트 13 〉	통과 (0.09ms, 33.3MB)
// 테스트 14 〉	통과 (1.44ms, 33.7MB)
// 테스트 15 〉	통과 (34.20ms, 37MB)
// 테스트 16 〉	통과 (31.57ms, 37.7MB)
// 테스트 17 〉	통과 (11.34ms, 37.9MB)
// 테스트 18 〉	통과 (8.31ms, 38MB)
// 테스트 19 〉	통과 (55.49ms, 37.6MB)
// 테스트 20 〉	통과 (6.81ms, 37.8MB)

// 효율성  테스트
// 테스트 1 〉	통과 (1.07ms, 35.1MB)
// 테스트 2 〉	통과 (1.07ms, 35.1MB)
// 테스트 3 〉	통과 (274.60ms, 84.8MB)
// 테스트 4 〉	통과 (158.36ms, 97.2MB)
