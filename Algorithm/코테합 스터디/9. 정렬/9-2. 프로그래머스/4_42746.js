// 완전 탐색은 X : 모든 조합을 찾는 완전 탐색은 시간복잡도가 너무 크다.
//  ㄴ 시간복잡도? n * n-1 * n-2 * ... * 1 => n!의 시간복잡도
// 그렇다면 조건에 따라 조합을 구하는 방법을 사용해야 한다.
//  ㄴ 조건? 두 개의 수에 한해서 붙였을 때 큰 경우에만 조합!
//  ㄴ 시간복잡도? 조합의 경우를 두 개씩 비교하여 하나만 선택하기에 logn
//              이를 n개에 한해서 구하기때문에 n * logn

function solution(numbers) {
  function compare(a, b) {
    const c1 = String(a) + b
    const c2 = String(b) + a

    return c1 > c2 ? -1 : 1 // ECMAScript의 array.sort 참고함 => 앞에가 크면 negative, 뒤가 크면 positive
  }

  const answer = numbers.sort(compare)
  return answer[0] == 0 ? '0' : answer.join('')
}
solution([6, 10, 2])
// solution([3, 30, 34, 5, 9])
