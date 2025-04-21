// 0과 1로 이루어진 2^n x 2^n 크기의 2차원 정수 배열 arr (n은 0부터 10까지)
// 쿼드 트리와 같은 방식으로 압축
// 1. 압축하고자 하는 특저 영역을 S라고 정의
// 2. 만약 S 내부에 있는 모든 수가 같은 값이라면, S를 해당 수 하나로 압축
// 3. 그렇지 않다면, S를 정확히 4개의 균일한 정사각형 영역으로 쪼갠 뒤, 같은 방식의 압축 시도

// let isSame = !arr.flat().includes(1 - value)
const answer = [0, 0] // 0의 개수, 1의 개수

function solution(arr) {
  const value = arr[0][0]

  if (!arr.flat().includes(1 - value)) {
    answer[value]++
    if (arr.length === 1) return
  } else {
    const halfLength = Math.floor(arr.length / 2)
    let arr2 = arr.map((v) => v.splice(halfLength)) // 왼쪽/오른쪽 분할
    solution(arr.splice(0, halfLength)) // 왼쪽 상단 분할
    solution(arr) // 왼쪽 하단 분할
    solution(arr2.splice(0, halfLength)) // 오른쪽 상단 분할
    solution(arr2) // 오른쪽 하단 분할
  }
  return answer
}

// prettier-ignore
solution([[1,1,0,0],[1,0,0,0],[1,0,0,1],[1,1,1,1]]) // [4, 9]

// prettier-ignore
// solution([[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1],[0,0,0,0,1,1,1,1],
//     [0,1,0,0,1,1,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,1],
//     [0,0,0,0,1,0,0,1],[0,0,0,0,1,1,1,1]]) // [10, 15]
