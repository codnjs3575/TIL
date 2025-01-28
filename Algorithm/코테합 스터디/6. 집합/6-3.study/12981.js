function solution(n, words) {
  let wordSet = new Set(words) // 1. 중복을 제외한 set 만들기
  let endWord = words[0][0] // 2. 끝말잇기 확인용 변수 : 첫 단어의 마지막 알파벳으로 초기화

  for (let i = 0; i < words.length; i++) {
    // 3. 탈락 조건 확인하기
    // 3-1. 중복 단어를 말할 경우 : set에 있는 단어를 지워가면서, false라면 중복!
    // 3-2. 끝말잇기가 안되었을 경우 : 이전 단어의 마지막 알파벳과 현재 단어의 첫번째 알파벳 확인
    
    if (!wordSet.delete(words[i]) || endWord !== words[i][0]) {
      return [(i % n) + 1, Math.floor(i / n) + 1] // [탈락자 번호, 탈락한 차례] 반환
    }

    endWord = words[i].at(-1) // 마지막 알파벳 재지정
  }

  // 4. for문을 다 순회해도 return이 안되면 아무도 탈락하지 않음.
  return [0, 0]
}

// 1
// prettier-ignore
// console.log(solution(3,	["tank", "kick", "know", "wheel", "land", "dream", "mother", "robot", "tank"])) // [3,3]

// 2
// prettier-ignore
// console.log(solution(5,	["hello", "observe", "effect", "take", "either", "recognize", "encourage", "ensure", "establish", "hang", "gather", "refer", "reference", "estimate", "executive"]))
// [0,0]

// 3
// prettier-ignore

// console.log(solution(2,	["hello", "one", "even", "never", "now", "world", "draw"]))
// [1,3]

// 반례 모음
// console.log(solution(2, ['tank', 'kick', 'kick', 'know']))
// console.log(solution( 2, ["hello", "one", "even", "never", "row", "world", "draw"]))
// console.log(solution(2, ['land', 'dream', 'mom', 'mom', 'ror']))
