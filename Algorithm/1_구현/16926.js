const fs = require('fs')
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt'
let [[N, M, R], ...Arr] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' '))

// 배열을 받아서 R만큼 돌리는 함수 생성하기
function rotateArr(N, M, R, cnt) {
  let tmp = Arr[cnt][cnt]
  let row = N - 2 * cnt
  let col = M - 2 * cnt

  console.log()
  console.log(
    `${
      cnt + 1
    }번째 사각형(${row} X ${col}) : 꼭짓점은 [${cnt}][${cnt}] (${tmp})`
  )
  console.log(`row : ${row} col: ${col} cnt: ${cnt}`)

  minR = 2 * row + 2 * (col - 2) // 원점으로 돌아오는 돌리기(R) 횟수
  R %= minR // R % minR = 돌리기 횟수 (0<= x < minR)

  // 배열 돌리기 실행
  while (R--) {
    // 윗 줄 : 오른쪽에서 왼쪽
    let a = Arr[cnt][cnt]
    for (let j = 0; j < col - 1; j++) Arr[cnt][cnt + j] = Arr[cnt][cnt + j + 1]
    Arr[cnt][cnt + col - 1] = Arr[cnt + 1][cnt + col - 1]

    // 왼쪽 : 위에서 아래
    for (let i = 0; i < row - 1; i++) {
      // console.log(Arr[N - i - 1][cnt], Arr[N - i - 2][cnt])
    }

    // 아랫 줄 : 왼쪽에서 오른쪽

    // 오른쪽 줄 : 아래에서 위
  }
  console.log()
  console.log(Arr.join('\n'))
}

let RotateCnt = parseInt(Math.min(N, M) / 2) // 사각형 갯수
for (let cnt = 0; cnt < RotateCnt; cnt++) rotateArr(N, M, R, cnt)
