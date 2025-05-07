function solution(user_id, banned_id) {
  const userIdArr = []

  // 1. 제재 아이디 목록 구하기
  for (const banId of banned_id) {
    const currentSet = []
    for (let i = 0; i < user_id.length; i++) {
      const currentId = user_id[i]
      if (currentId.length !== banId.length) continue

      const isCorrect = [...currentId].every(
        (char, idx) => banId[idx] === '*' || char === banId[idx]
      )

      if (isCorrect) currentSet.push(currentId)
    }
    userIdArr.push(currentSet)
  }

  // console.log(userIdArr)
  // [ [ 'frodo', 'fradi' ], [ 'frodo', 'crodo' ],
  //   [ 'abc123', 'frodoc' ], [ 'abc123', 'frodoc' ] ]

  const result = new Set()
  function selectUser(path = [], depth = 0) {
    if (depth === userIdArr.length) {
      const userSet = [...new Set(path)]
      if (userSet.length === userIdArr.length)
        result.add(userSet.sort().join(','))

      return
    }

    for (const user of userIdArr[depth]) {
      selectUser([...path, user], depth + 1)
    }
  }

  selectUser()

  return result.size
}
// solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['fr*d*', 'abc1**']) // 2

// solution(
//   ['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'],
//   ['*rodo', '*rodo', '******']
// ) // 2

solution(
  ['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'],
  ['fr*d*', '*rodo', '******', '******']
) // 3
