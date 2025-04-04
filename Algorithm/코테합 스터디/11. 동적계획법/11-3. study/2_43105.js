// dfs (완전 탐색)
//  ㄴ 하나씩 접근하면서 숫자들을 저장하고, 끝까지 도달할 때 계산하기
//    [7, 3, 8, 2, 4] => 24

// 동적 계획법 (중복 부분 + 최적 경로)
//   ㄴ 최적 경로 : 하위 문제로 나누기 (두 수끼리의 계산)
//               ( ( ( (7 + 3) + 8 ) + 2 ) ) + 4
//   ㄴ 중복 부분 : 계산의 결과값들을 저장해놓기

// 구현 방식은?
// 위에서부터 내려가면서 계산하기! => 하향식 구현 => 따라서, 재귀 호출 + 메모이제이션 사용
// 재귀 호출은 어떻게 호출할 것인가..
// function 재귀(depth){
//    if(종료 조건) return 값
//    실행문...
//    재귀(depth+1)
// }

function solution(triangle) {
  const memo = Array.from({ length: triangle.length }, (_, i) =>
    Array(i + 1).fill(-1)
  )

  function topdown(depth, col) {
    // 종료 조건 : 마지막 행에 도달
    if (depth === triangle.length - 1) return triangle[depth][col]

    // 최적화 조건
    if (memo[depth][col] !== -1) return memo[depth][col]

    // 왼쪽 아래, 오른쪽 아래로 이동
    const left = topdown(depth + 1, col)
    const right = topdown(depth + 1, col + 1)

    // 현재 위치 최댓값 저장하기
    memo[depth][col] = triangle[depth][col] + Math.max(left, right)
    return memo[depth][col]
  }

  return topdown(0, 0)
}

solution([[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]) // 30
