function solution(n, weak, dist) {
  const weakLen = weak.length
  if (weakLen === 1) return 1

  const distLen = dist.length
  let answer = distLen + 1

  const linear_weak = [...weak, ...weak.map((elem) => elem + n)]
  const visits = new Array(distLen).fill(0)

  function permutation(L, arr) {
    if (L === distLen) {
      for (let i = 0; i < weakLen; i++) {
        const end = i + weakLen
        let start = i
        let friends_cnt = 0

        for (let elem of arr) {
          if (start >= end) break
          friends_cnt += 1
          const maxDist = elem + linear_weak[start]

          while (start < end && maxDist >= linear_weak[start]) {
            start++
          }
        }

        if (start < end) continue

        answer = Math.min(answer, friends_cnt)
      }
      return
    }

    for (let i = 0; i < distLen; i++) {
      if (visits[i]) continue
      visits[i] = 1
      permutation(L + 1, [...arr, dist[i]])
      visits[i] = 0
    }
  }

  permutation(0, [])

  return answer === distLen + 1 ? -1 : answer
}
