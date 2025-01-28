function solution(genres, plays) {
  let hashTable = new Object()
  let answer = []

  // 1. hashTable 초기화하기
  genres.map((genre, idx) => {
    // 1-1. hashTable[genre]가 없다면, 초기화
    if (hashTable[genre] === undefined) hashTable[genre] = [plays[idx], [idx]]
    // 1-2. 이미 저장된 hashTable[genre]가 있다면, 재생횟수를 더하고 고유 번호를 순서대로 저장함
    //   ㄴ { classic: [ 1450, [ 2, 0 ] ], pop: [ 2500, [ 3 ] ] }
    else {
      hashTable[genre][0] += plays[idx]

      let idxs = hashTable[genre][1] // 이미 저장되어있는 고유 번호 리스트
      for (let i = 0; i < idxs.length && i < 2; i++) {
        console.log(idxs)
        if (plays[idxs[i]] < plays[idx]) {
          console.log(plays[idxs[i]], plays[idx])
          hashTable[genre][1] = [idx, idxs[0]]
        } else if (plays[idxs[i]] == plays[idx] && idxs[i] < idx) {
          hashTable[genre][1].push(idx)
        } else if (plays[idxs[i]] > plays[idx] && idxs.length < 2) {
          hashTable[genre][1].push(idx)
        }
      }
    }
  })

  Object.entries(hashTable)
    .sort(([, [a]], [, [b]]) => b - a)
    .map((val) => {
      val[1][1].map((idx) => answer.push(idx))
    })

  // console.log(answer)
  return answer
}

// solution(
//   ['classic', 'classic', 'classic', 'classic', 'pop'],
//   [50, 60, 100, 30, 8000]
// )
// [4, 2, 1]

solution(
  ['classic', 'Newage', 'pop', 'classic', 'classic', 'pop', 'Newage'],
  [500, 1700, 600, 150, 800, 2500, 1500]
)
// [3014]

// solution(
//   ['classic', 'pop', 'classic', 'classic', 'pop'],
//   [500, 600, 150, 800, 2500]
// )
// 	[4, 1, 3, 0]

// solution(['classic', 'classic', 'classic', 'pop'], [500, 150, 800, 2500])
// [ 3, 2, 0 ]

// solution(['classic', 'pop', 'classic', 'classic'], [800, 600, 150, 800])
// [0, 3, 1]

// solution(
//   ['jazz', 'rap', 'hiphop', 'jazz', 'jazz', 'hiphop'],
//   [100, 1000, 50, 100, 50, 500]
// )
// [1, 5, 2, 0, 3]

// solution(
//   ['classic', 'classic', 'classic', 'pop', 'pop'],
//   [600, 600, 150, 600, 700]
// )
// [0, 1, 4, 3]

// ["classic", "pop", "classic", "classic", "pop"] [500, 600, 150, 800, 600] [3, 0, 1, 4]
// ["classic", "Newage", "pop", "classic", "classic", "pop", "Newage"] [500, 1700, 600, 150, 800, 2500, 1500] [1, 6, 5, 2, 4, 0]
// ["classic", "pop", "classic", "classic", "pop", "zazz", "zazz"] [500, 600, 150, 800, 2500, 2000, 6000] [6, 5, 4, 1, 3, 0]
// ["classic", "pop", "classic", "classic", "pop", "zazz", "zazz"] [500, 600, 150, 800, 2500, 2100, 1000] [4, 1, 5, 6, 3, 0]
// ["classic", "pop", "classic", "pop", "classic", "classic"] [1950, 600, 500, 2500, 500, 150] [0, 2, 3, 1]
// ["classic", "pop", "classic", "classic", "pop", "test"] [500, 600, 150, 800, 2500, 100] [4, 1, 3, 0, 5]
// ["pop", "pop", "pop", "rap", "rap"] [45, 50, 40, 60, 70] [1, 0, 4, 3]
// ["classic", "pop", "classic", "pop", "classic", "classic"] [400, 600, 150, 600, 500, 500] [4, 5, 1, 3]
// ["a", "b", "b", "c", "c"] [5, 5, 40, 5, 5] [2, 1, 3, 4, 0]
// ["A", "B", "A", "B", "A", "C"] [500, 600, 150, 800, 2500, 5000] [5, 4, 0, 3, 1]
// ["A", "A", "B", "A"] [5, 5, 6, 5] [0, 1, 2]
