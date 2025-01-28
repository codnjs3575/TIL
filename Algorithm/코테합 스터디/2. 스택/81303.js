function solution(n, k, cmd) {
  const deleted = []

  const up = [...new Array(n + 2)].map((_, i) => i - 1)
  const down = [...new Array(n + 1)].map((_, i) => i + 1)

  k += 1

  for (const item of cmd) {
    // 1. 삭제
    if (item[0] === 'C') {
      deleted.push(k)
      up[down[k]] = up[k]
      down[up[k]] = down[k]
      k = n < down[k] ? up[k] : down[k]
    }
    // 2. 복원
    else if (item[0] === 'Z') {
      const restore = deleted.pop()
      down[up[restore]] = restore
      up[down[restore]] = restore
    } else {
      const [action, num] = item.split(' ')
      if (action === 'U') {
        for (let i = 0; i < num; i++) {
          k = up[k]
        }
      } else {
        for (let i = 0; i < num; i++) {
          k = down[k]
        }
      }
    }
  }

  const answer = new Array(n).fill('O')
  for (const i of deleted) {
    answer[i - 1] = 'X'
  }
  return answer.join('')
}

// 8개 중 3번을 선택한 채로 시작
solution(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z']) // "OOOOXOOO"
// solution(8, 2, [
//   'D 2',
//   'C',
//   'U 3',
//   'C',
//   'D 4',
//   'C',
//   'U 2',
//   'Z',
//   'Z',
//   'U 1',
//   'C',
// ])
// "OOXOXOOO"
