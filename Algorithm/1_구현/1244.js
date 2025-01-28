let fs = require('fs')
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt'
let [SwitchNum, SArr, _, ...StudentArray] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
SArr = SArr.split(' ').map((v) => v * 1)
StudentArray = StudentArray.map((v) => v.split(' '))
let result = ''

StudentArray.map(([Gender, InputN]) => {
  let gender = Gender * 1
  let n = InputN * 1

  // 남학생
  if (gender == 1) {
    for (let i = 1; n * i <= SwitchNum; i++)
      SArr[n * i - 1] = Math.abs(SArr[n * i - 1] - 1)
  }

  // 여학생
  else {
    let [LeftN, RightN] = [n - 2, n]

    // 본인 스위치 켜/끄기
    SArr[n - 1] = Math.abs(SArr[n - 1] - 1)

    while (LeftN >= 0 || RightN <= SwitchNum) {
      if (SArr[LeftN] === SArr[RightN]) {
        if (SArr[LeftN] === 0) {
          SArr[LeftN] = 1
          SArr[RightN] = 1
        } else {
          SArr[LeftN] = 0
          SArr[RightN] = 0
        }
        LeftN -= 1
        RightN += 1
      } else break
    }
  }
})

let resultArr = []
for (let i = 0; i < SArr.length; i += 20) {
  let SliceArr = SArr.slice(i, i + 20).join(' ')
  resultArr.push(SliceArr)
}
console.log(resultArr.join('\n'))
