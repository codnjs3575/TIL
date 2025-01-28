function solution(participant, completion) {
  let hashTable = new Object()

  // 1. 참가자 목록을 돌며 hashTable에 { 참가자이름(Key): 동명이인 포함 사람 수(Value) } 형태로 저장
  participant.map((player) => {
    // hashTable[player] ? hashTable[player] : 0
    //  ㄴ 만약 이미 동명이인이 hashTable에 저장되어있다면 해당 값을 꺼내와서 +1
    //  ㄴ 그렇지 않다면, 1로 초기화
    hashTable[player] = hashTable[player] ? ++hashTable[player] : 1
  })

  // 2. 완주한 참가자 목록을 돌며 hashTable에 저장되어있는 사람 수(Value)를 -1
  completion.map((player) => hashTable[player]--)

  // 3. hashTable에 사람 수가 남아있는 이름은 완주하지 못한 이름이므로 그대로 반환함
  for (const player in hashTable) {
    if (hashTable[player] === 1) return player
  }
}

solution(['leo', 'kiki', 'eden'], ['eden', 'kiki'])
//"leo"

solution(
  ['marina', 'josipa', 'nikola', 'vinko', 'filipa'],
  ['josipa', 'filipa', 'marina', 'nikola']
)
//	"vinko"

solution(['mislav', 'stanko', 'mislav', 'ana'], ['stanko', 'ana', 'mislav'])
// "mislav"
