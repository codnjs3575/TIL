// 알파벳 이름 : 알파벳이 총 26개니까 0~13(14), 12~1(12)로 확인
// 알파벳 위치 : 모든 글자별로 최소 이동 횟수 확인하기
//             A가 없다면 직진이 최선, A가 있다면 최소 이동 확인 필요

function solution(name) {
  let answer = 0
  let bestMove = name.length - 1

  for (let i = 0; i < name.length; i++) {
    // 알파벳 이름
    const code = name[i].charCodeAt() - 65
    answer += code > 13 ? 26 - code : code

    // 알파벳 위치 : 좌/우 조이스틱 확인(i는 현재 위치, j는 포인터)
    // ex.RAAAED, i가 0일 때 j는 4, i+1(1) ~ j-1(3)까지는 A
    let j = i + 1
    while (j < name.length && name[j] === 'A') j++ // 연속된 A가 끝난 뒤 첫 알파벳 위치 -> i+1 ~ j-1 까지 A 연속

    // 2-1. 직진하다가 되돌아가기
    // name.length - j : 연속 A가 끝난 뒤 방문하지 않은 글자 개수
    // 2 * i : i까지 갔다가 되돌아가기 위한 이동 횟수
    const rightThenBack = 2 * i + (name.length - j)

    // 2-2. 되돌아갔다가 오른쪽으로 가기
    const backThenRight = i + 2 * (name.length - j)

    bestMove = Math.min(bestMove, rightThenBack, backThenRight)
  }

  return answer + bestMove
}

solution('JEROEN') // 56
solution('JAN') // 23
