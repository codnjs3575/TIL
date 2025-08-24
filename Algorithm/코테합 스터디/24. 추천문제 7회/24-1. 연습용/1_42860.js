// AAA, AAAA 등으로 시작함
// 위 : 다음 알파벳 / 아래 : 이전 알파벳
// 좌 : 커서를 왼쪽으로(처음->맨 마지막) / 우 : 커서를 오른쪽으로(맨 마지막->처음)

// 알파벳 : 위/아래 중 최소 이동 숫자(B도 1, Z도 1)
// 커서 이동 : 모든 인덱스에서 오른쪽->왼쪽, 왼쪽->오른쪽 중 최소 이동 숫자
//           A가 없다면 직진이 최적, A가 있다면 최소 이동 숫자 확인
function solution(name) {
  let answer = 0
  let bestMove = name.length - 1 // 직진만 했을 때 최소 길이

  for (let i = 0; i < name.length; i++) {
    // 1. 알파벳 이름 : 상/하 조이스틱 이동 확인
    const code = name[i].charCodeAt() - 65
    answer += code > 13 ? 26 - code : code

    // 2. 알파벳 위치 : 좌/우 조이스틱 이동 확인 (i는 현재 위치, j는 포인터)
    // j는 연속된 A가 끝난 뒤의 첫 번째 알파벳 위치 => (i+1) ~ (j-1) 까지는 'A'임
    // ex. RAAAED 라고 하면 i가 0일때 j는 4가 되며, i+1(1) ~ j-1(3)은 A임을 확인할 수 있음.
    let j = i + 1 // 포인터 설정
    while (j < name.length && name[j] === 'A') j++

    // 2-1. 오른쪽으로 갔다가 연속된 A가 있다면 되돌아가기 (ex.RAAAED)
    // name.length - j : A 이후 방문하지 않은 글자 수
    // 2*i : 현재 위치까지 갔다가 되돌아가는 이동 횟수
    const rightThenBack = 2 * i + (name.length - j)

    // 2-2. 되돌아갔다가 연속된 A가 있다면 오른쪽으로 가기
    const backThenRight = i + 2 * (name.length - j)

    bestMove = Math.min(bestMove, rightThenBack, backThenRight)
  }

  return answer + bestMove
}

solution('JEROEN') // 56
// solution('JAN') // 23
