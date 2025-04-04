// 1 ≤ 삼각형의 높이 ≤ 500
// 0 ≤ 삼각형 내 숫자 ≤ 9,999 (숫자는 정수)

// 1. topdown (완전 탐색)
//   ㄴ 하나씩 들어가면서 숫자들을 저장하고, 끝까지 갔다면 계산
//   [7, 3, 8, 2, 4] => 24

// 2. DP (중복 부분 + 최적 경로)
//   ㄴ 중복 부분 : '계산'의 결과값들을 저장하기
//   ㄴ 최적 경로 : 하위 문제들로 구성하기. (두 수끼리의 계산)
//     [7, 3, 8, 2, 4] => ( ( (7 + 3) + 8 ) + 2 ) + 4 = 24
//     + 중복 부분 : 두 수끼리의 계산을 저장하기
//   다만, [7,8,0,4,5] 까지 확인해야하는 것은 동일하기에 완전 탐색이긴 하다.

// DP의 구현 방식? 위에서부터 내려가며 계산 => 하향식 구현
// 따라서, 재귀 호출 + 메모이제이션 사용하기!
// 재귀 호출은 어떻게 구현할 것인가
// function 재귀 함수(){
//    if(종료 조건) return 값
//    실행문...
//    재귀 함수()
// }

// 시행착오 1. 사실상 topdown 완전 탐색과도 같은 풀이...
// function solution(triangle) {
//   let max = 0

//   function topdown(depth, col, pre) {
//     if (depth === triangle.length - 1) {
//       const currentVal = triangle[depth - 1][pre] + triangle[depth][col]
//       if (currentVal >= max) max = currentVal
//       return
//     }

//     if (depth >= 1) triangle[depth][col] += triangle[depth - 1][pre]

//     topdown(depth + 1, col, col)
//     topdown(depth + 1, col + 1, col)

//     if (depth >= 1) triangle[depth][col] -= triangle[depth - 1][pre]
//   }
//   topdown(0, 0, 0)
//   return max
// }

// 수정 : 메모이제이션을 더 적극적으로 활용 (기존 배열에 더하기 x)
function solution(triangle) {
  const memo = Array.from({ length: triangle.length }, (_, i) =>
    Array(i + 1).fill(-1)
  )

  function topdown(depth, col) {
    // 종료 조건: 삼각형의 마지막 행에 도달했을 때
    if (depth === triangle.length - 1) {
      return triangle[depth][col]
    }

    // 이미 계산된 값이 있다면 해당 값을 반환
    if (memo[depth][col] !== -1) {
      return memo[depth][col]
    }

    // 왼쪽 아래와 오른쪽 아래로 이동하며 최대값 계산
    const left = topdown(depth + 1, col)
    const right = topdown(depth + 1, col + 1)

    // 현재 위치의 최대값을 저장
    memo[depth][col] = triangle[depth][col] + Math.max(left, right)
    return memo[depth][col]
  }

  return topdown(0, 0)
}

solution([[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]) // 30
