// 동일한 가짓수의 토핑 -> tuple의 개수
// toppings의 길이는 최대 1,000,000개! -> slice + set은 시간복잡도 초과
// 따라서 미리 케이크의 토핑 개수들을 객체 형태로 저장하고, 나눌 때마다 하나씩 -1

function solution(toppings) {
  let answer = 0

  const cakeToppings = new Map()
  toppings.map((topping) => {
    cakeToppings.has(topping)
      ? cakeToppings.set(topping, cakeToppings.get(topping) + 1)
      : cakeToppings.set(topping, 1)
  })
  const brother = new Map()

  for (const topping of toppings) {
    brother.has(topping)
      ? brother.set(topping, brother.get(topping) + 1)
      : brother.set(topping, 1)

    // 남아있는 케이크 위 토핑의 개수가 1개라면 토핑 프로퍼티 삭제
    cakeToppings.get(topping) == 1
      ? cakeToppings.delete(topping)
      : cakeToppings.set(topping, cakeToppings.get(topping) - 1)

    if (brother.size === cakeToppings.size) answer++

    // 최적화
    if (brother.size > cakeToppings.size) break
  }

  return answer
}

// 공평하게 자르는 방법의 수
solution([1, 2, 1, 3, 1, 4, 1, 2]) // 2
// solution([1, 2, 3, 1, 4]) // 0
