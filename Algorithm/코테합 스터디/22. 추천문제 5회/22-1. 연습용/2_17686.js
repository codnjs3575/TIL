// [img12.png, img, 12]
// [img10.png, img, 10]
// [img02.png, img, 02]
// [IMG01.GIF, img, 01]
function solution(files) {
  var answer = []

  // 1. 파일명을 [file, HEAD, NUMBER]로 추출
  files.map((file) => {
    const [base, _] = file.split('.')
    const idx = base.search(/\d/) // 숫자가 시작되는 위치
    const HEAD = base.slice(0, idx).toLowerCase() // 문자만 (소문자로 변형)
    const NUMBER = parseInt(base.slice(idx)) // 숫자만 (정수형으로 변형)
    answer.push([file, HEAD, NUMBER])
  })

  // 2. 추출된 파일명들을 HEAD/NUMBER 순으로 정렬(오름차순)
  answer.sort((a, b) => {
    const HEAD_A = a[1]
    const HEAD_B = b[1]
    if (HEAD_A < HEAD_B) return -1
    if (HEAD_A > HEAD_B) return 1
    return a[2] - b[2]
  })

  // 3. 파일명만 return
  return answer.map((a) => a[0])
}

// prettier-ignore
solution(["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"])

// prettier-ignore
// solution(["F-5 Freedom Fighter", "B-50 Superfortress", "A-10 Thunderbolt II", "F-14 Tomcat"])
