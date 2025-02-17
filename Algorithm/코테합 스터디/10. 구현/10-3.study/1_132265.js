// 동일한 가짓수의 토핑? -> 객체 형태로 저장
// toppings의 길이는 최대 1,000,000개! -> slice + set은 시간복잡도 초과
// 따라서 미리 케이크의 토핑 개수들을 객체 형태로 저장하고, 나눌 때마다 하나씩 -1

function solution(toppings) {
  var answer = 0

  // 1. 케이크 위 토핑들 갯수 확인하기
  const cakeToppings = new Map()
  toppings.map((topping) => {
    cakeToppings.set(
      topping,
      cakeToppings.has(topping) ? cakeToppings.get(topping) + 1 : 1
    )
  })

  // 2. 케이크 토핑 나누기
  const brother = new Map()
  for (const topping of toppings) {
    // 2-1. 동생의 케이크 토핑 + 1
    brother.set(topping, brother.has(topping) ? brother.get(topping) + 1 : 1)

    // 2-2. 케이크 토핑 -1
    cakeToppings.get(topping) === 1
      ? cakeToppings.delete(topping) // 0이어도 토핑이 있는 걸로 추정 -> delete해야 함!
      : cakeToppings.set(topping, cakeToppings.get(topping) - 1)

    if (brother.size === cakeToppings.size) answer++

    if (brother.size > cakeToppings.size) break // 최적화
  }
  return answer
}

solution([1, 2, 1, 3, 1, 4, 1, 2])
solution([1, 2, 3, 1, 4])
