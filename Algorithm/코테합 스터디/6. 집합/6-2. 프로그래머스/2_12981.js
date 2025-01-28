function solution(n, words) {
  let wordSet = new Set(words)
  let endWord = words[0][0]

  for (let idx = 0; idx < words.length; idx++) {
    let word = words[idx]

    // 탈락 조건) 이미 WordSet에 있는 단어를 말했을 경우(중복) || 끝말잇기가 안 되었을 경우
    if (!wordSet.delete(word) || endWord !== word[0]) {
      return [(idx % n) + 1, Math.floor(idx / n) + 1]
    }

    endWord = word.at(-1)
  }
  return [0, 0]
}

// 1
// prettier-ignore
// console.log(solution(3,	["tank", "kick", "know", "wheel", "land", "dream", "mother", "robot", "tank"])) // [3,3]

// 2
// prettier-ignore
// solution(5,	["hello", "observe", "effect", "take", "either", "recognize", "encourage", "ensure", "establish", "hang", "gather", "refer", "reference", "estimate", "executive"])
// [0,0]

// 3
// prettier-ignore
// console.log(solution(2,	["hello", "one", "even", "never", "now", "world", "draw"]))
// [1,3]

// 반례 모음
// console.log(solution(2, ['tank', 'kick', 'kick', 'know']))
// console.log(solution( 2, ["hello", "one", "even", "never", "row", "world", "draw"]))
console.log(solution(2, ['land', 'dream', 'mom', 'mom', 'ror']))
