const answer = [0, 0]

function solution(arr) {
  const value = arr[0][0] // 1, 0

  // 1-value : 0이면 1, 1이면 0
  // n 이중for n -> n
  if (!arr.flat().includes(1 - value)) {
    answer[value]++
    if (arr.length === 1) return
  } else {
    const halfLength = arr.length / 2
    let rightArr = arr.map((a) => a.splice(halfLength)) // 왼쪽-오른쪽 분할하기
    solution(arr.splice(0, halfLength)) // 왼쪽 상단
    solution(arr) // 왼쪽 하단
    solution(rightArr.splice(0, halfLength))
    solution(rightArr)
  }

  return answer
}

// prettier-ignore
solution([[1,1,0,0],[1,0,0,0],[1,0,0,1],[1,1,1,1]]) // [4, 9]

// prettier-ignore
// solution([[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1],[0,0,0,0,1,1,1,1],
//     [0,1,0,0,1,1,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,1],
//     [0,0,0,0,1,0,0,1],[0,0,0,0,1,1,1,1]]) // [10, 15]
