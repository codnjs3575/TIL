// 3. 오픈 채팅방
// 30분 풀이

function solution(record) {
  var answer = []
  let hashTable = new Object()

  record.map((message) => {
    let [state, uid, nick] = message.split(' ')
    if (state === 'Enter' || state === 'Change') hashTable[uid] = nick
  })

  record.map((message) => {
    let [state, uid, _] = message.split(' ')

    switch (state) {
      case 'Enter':
        answer.push(hashTable[uid] + '님이 들어왔습니다.')
        break
      case 'Leave':
        answer.push(hashTable[uid] + '님이 나갔습니다.')
        break
    }
  })

  return answer
}

solution([
  'Enter uid1234 Muzi',
  'Enter uid4567 Prodo',
  'Leave uid1234',
  'Enter uid1234 Prodo',
  'Change uid4567 Ryan',
])

// ["Prodo님이 들어왔습니다.", "Ryan님이 들어왔습니다.",
//   "Prodo님이 나갔습니다.", "Prodo님이 들어왔습니다."]
