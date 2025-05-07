// 가능한 경우의 수
// banId에 해당하는 user_id를 찾기
// 조건 1) 길이가 같아야 함
// 조건 2) *로 대체 가능해야 함

// 제재 아이디 목록을 구할 때 나열된 순서 관계 X (순열이 아니라 조합)
// a 목록 개수 * b 목록 개수 - 1x(중복된 개수)
// 2 * 2 - 1 (1개만 중복)
// 2 * 2 - 2 (2개 중복)
// 2 * 3 - 1 (1개 중복)

// [a,b] [a,b,c] = 6개

function solution(user_id, banned_id) {
  const userIdSet = []

  // 1. 제재 아이디에 해당하는 userIdSet 구하기
  for (const banId of banned_id) {
    const currentSet = []
    for (let i = 0; i < user_id.length; i++) {
      // 1. 제재 아이디에 들어갈 currentID 찾기
      const currentID = user_id[i]
      // 1-1. 길이가 다를 경우에는 비교하지 않음
      if (currentID.length !== banId.length) continue

      // 1-2. 길이가 같을 경우, *를 제외한 모든 문자가 같은지 확인
      const isCorrect = [...currentID].every(
        (char, idx) => banId[idx] === '*' || char === banId[idx]
      )

      if (isCorrect) currentSet.push(currentID)
    }
    userIdSet.push(currentSet)
  }

  // 2. userIdSet을 돌면서 조합 구하기 -> 중복 제거 필수
  const result = new Set()
  function SelectUser(userArr = [], depth = 0) {
    if (depth === userIdSet.length) {
      const key = [...new Set(userArr)]
      if (key.length === userIdSet.length) result.add(key.sort().join(','))
      return
    }

    for (const user of userIdSet[depth]) {
      SelectUser([...userArr, user], depth + 1)
    }
  }

  SelectUser()
  return result.size
}

// solution(['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'], ['fr*d*', 'abc1**']) // 2

// prettier-ignore
// solution(["frodo", "fradi", "crodo", "abc123", "frodoc"], ["*rodo", "*rodo", "******"]) // 2

// prettier-ignore
solution(["frodo", "fradi", "crodo", "abc123", "frodoc"],	["fr*d*", "*rodo", "******", "******"]) // 3
