// 12915. 문자열 내 마음대로 정렬하기
function solution(strings, n) {
  var sortedstrs = strings.sort()
  return sortedstrs.sort((a, b) => a[n].charCodeAt() - b[n].charCodeAt())
}
