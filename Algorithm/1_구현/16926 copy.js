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

  minR = 2 * row + 2 * (col - 2) // 원점으로 돌아오는 돌리기(R) 횟수
  R %= minR // R % minR = 돌리기 횟수 (0<= x < minR)
  // console.log(minR, R)

  // 배열 돌리기 실행
  while (R--) {
    // 꼭짓점 4개 바꾸기
    // let a = Arr[cnt][cnt]
    // let b = Arr[cnt][M - cnt - 1]
    // let c = Arr[N - cnt - 1][cnt]
    // let d = Arr[N - cnt - 1][M - cnt - 1]
    // console.log(
    //   `[${cnt}][${cnt}] [${cnt}][${M - cnt - 1}] [${N - cnt - 1}][${cnt}] [${
    //     N - cnt - 1
    //   }][${M - cnt - 1}]`
    // )

    // 윗 줄 돌리기
    for (j = 0; j < row - 1; j++) {
      Arr[cnt][cnt + j] = Arr[cnt][cnt + j + 1]
    }

    // 아랫 줄 돌리기

    // 왼쪽 줄 돌리기
    // 오른쪽 줄 돌리기
  }
  console.log()
  console.log(Arr.join('\n'))
}

let RotateCnt = parseInt(Math.min(N, M) / 2) // 사각형 갯수
for (let cnt = 0; cnt < RotateCnt; cnt++) rotateArr(N, M, R, cnt)
