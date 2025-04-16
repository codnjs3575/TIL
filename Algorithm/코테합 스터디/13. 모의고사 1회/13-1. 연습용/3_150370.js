// 개인정보 수집 유효기간

// 1~n번으로 분류되는 개인정보 n개
// 약관마다 개인정보보관유효기간이 정해져 있음
// 각 개인정보가 어떤 약관으로 수집됐는지 알고 싶음
// 유효기간 전까지만 보관 가능, 유효기간이 지났다면 파기

// 예시) 오늘날짜: 2022.05.19
// 약관: A 6개월, B 12개월, C 3개월
// 개인정보: 2021.05.02 A, 2021.07.01 B, 2022.02.19 C 2022.02.20 C

// today: 오늘 날짜 | terms: 약관 유효기간(문자열 배열) | privacies : 수집된 개인정보(문자열 배열)
function solution(today, terms, privacies) {
  // 약관 유효기간(문자열 배열)을 객체로 변환하기
  const termsObj = Object.fromEntries(terms.map((term) => term.split(' ')))

  return privacies.reduce((acc, privacy, idx) => {
    const [date, term] = privacy.split(' ') // [2021.05.02, A]
    const [year, month, day] = date.split('.').map(Number) // [2021, 5, 2]
    const untilDate = new Date(year, month + Number(termsObj[term]) - 1, day) // 2021.11.02

    if (untilDate <= new Date(today)) acc.push(idx + 1) // 1부터 시작

    return acc
  }, [])
}

console.log(
  solution(
    '2022.05.19',
    ['A 6', 'B 12', 'C 3'],
    ['2021.05.02 A', '2021.07.01 B', '2022.02.19 C', '2022.02.20 C']
  )
)
// result: [1, 3]

// prettier-ignore
console.log(
  solution(
    '2020.01.01',
    ['Z 3', 'D 5'],
    ['2019.01.01 D', '2019.11.15 Z', '2019.08.02 D', '2019.07.01 D', '2018.12.28 Z']
  )
)
// result: [1, 4, 5]
