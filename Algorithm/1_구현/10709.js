let [nums, ...cloudArr] =
  // let input
  require('fs')
    .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
    .toString()
    .trim()
    .split('\n')

let [H, W] = nums.split(' ').map(Number)

let resultArr = Array.from(Array(H), () => Array(W).fill(-1))

// 1. 기존 구름은 0으로 수정하기
cloudArr.map((cArr, arridx) => {
  cArr.split('').map((isCloud, i) => {
    if (isCloud === 'c') resultArr[arridx][i] = 0
  })
})

// 2. 첫 번째 줄부터(i), 맨 오른쪽-1 부터 맨 왼쪽으로(w) 이동하며 수정하기
// 맨 오른쪽-1 : 맨 오른쪽은 확인할 필요가 없음 (있어도 이미 0이고, 더 이상 오른쪽 수정할 것이 없음)
for (let h = 0; h < H; h++) {
  for (let w = W - 2; w >= 0; w--) {
    let cnt = 0
    cloud = resultArr[h][w] // 기존 구름

    // 조건. (!cloud) => cloud가 0임 (= cloud 첫 자리임)
    if (!cloud && w !== W - 1) {
      // 오른쪽으로 이동하면서 수정하기
      for (let wRight = w + 1; wRight < W; wRight++) {
        cnt++ // 오른쪽으로 이동할수록 +1
        if (resultArr[h][wRight] === -1) {
          resultArr[h][wRight] = cnt
        }
      }
    }
  }
}

resultArr.map((arr) => {
  console.log(arr.join(' '))
})
