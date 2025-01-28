function solution(phone_book) {
  let phoneList = new Set([...phone_book])

  for (num of phoneList) {
    for (let i = 1; i < num.length; i++) {
      if (phoneList.has(num.slice(0, i))) return false
    }
  }
  return true
}

console.log(solution(['119', '97674223', '1195524421']))
console.log(solution(['123', '456', '789']))
console.log(solution(['12', '123', '1235', '567', '88']))
