let fs = require('fs')
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt'
let [SwitchNum, SArr, _, ...StudentArray] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
SArr = SArr.split(' ').map((v) => v * 1)
StudentArray = StudentArray.map((v) => v.split(' '))

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
    console.log()
    console.log(
      `여학생 : ${n} | Left : ${LeftN} | Right : ${RightN} // ${SArr.join(' ')}`
    )
    // 본인 스위치 바꾸기
    SArr[n - 1] = Math.abs(SArr[n - 1] - 1)
    console.log(
      `여학생 : ${n} | Left : ${LeftN} | Right : ${RightN} // ${SArr.join(' ')}`
    )

    // 대칭인지 확인 -> 대칭이면 바꾸기, 대칭이 아니라면 return

    while (LeftN > 0 && RightN <= SwitchNum) {
      if (SArr[LeftN] === SArr[RightN]) {
        ToggleN = Math.abs(SArr[LeftN] - 1)
        SArr[LeftN] = ToggleN
        SArr[RightN] = ToggleN
        console.log(
          `여학생 : ${n} | Left : ${LeftN} | Right : ${RightN} // ${SArr.join(
            ' '
          )}`
        )
        LeftN -= 1
        RightN += 1
      } else return
    }
  }
})

for (let i = 1; i < SArr.length; i += 20) {
  result += SArr.slice(i - 1, i + 20).join(' ')
  if (i % 20 === 0) result += '\n'
}
console.log(result)
