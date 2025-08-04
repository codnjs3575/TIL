function solution(files) {
  let answer = []
  // 1. 파일명을 [file, HEAD, NUMBER]로 추출
  files.map((file) => {
    const [base, _] = file.split('.')
    const idx = base.search(/\d/) // 문자열이 끝나는 위치(숫자시작 위치)
    const HEAD = base.slice(0, idx).toLowerCase() // 문자만(소문자로 변환)
    const NUMBER = parseInt(base.slice(idx)) // 숫자만(정수형으로 변환)
    answer.push([file, HEAD, NUMBER])
  })

  // 2. HEAD, NUMBER를 오름차순으로 정렬하기
  answer.sort((a, b) => {
    const HEAD_A = a[1]
    const HEAD_B = b[1]
    if (HEAD_A < HEAD_B) return -1
    if (HEAD_A > HEAD_B) return 1
    return a[2] - b[2]
  })

  return answer.map((a) => a[0])
}
// prettier-ignore
solution(["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"])

// [---file---,HEAD,NUMBER]
// [Img12.png, img, 12]
// [img10.png, img, 10]
// [img02.png, img, 2]
// [img1.png,  img, 1]
