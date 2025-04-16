// 약관마다 개인정보 보관 유효기간이 정해져있음.

function solution(today, terms, privacies) {
  // 1. 약관 유효기간을 객체로 변환하기
  const termsObj = Object.fromEntries(terms.map((term) => term.split(' ')))

  return privacies.reduce((acc, privacy, idx) => {
    const [date, term] = privacy.split(' ') // [ '2021.05.02', 'A' ]
    const [year, month, day] = date.split('.').map(Number) // [ 2021, 5, 2 ]

    // 유효기간 넘은 개인정보 찾기
    //  ㄴ date + termsObj[term] 계산 후에 today랑 비교하기
    const untilDate = new Date(year, month + Number(termsObj[term]) - 1, day)

    if (untilDate <= new Date(today)) acc.push(idx + 1)

    return acc
  }, [])
}

// console.log(
// solution(
//   '2022.05.19',
//   ['A 6', 'B 12', 'C 3'],
//   ['2021.05.02 A', '2021.07.01 B', '2022.02.19 C', '2022.02.20 C']
// )
// )
// [1, 3]

// prettier-ignore
console.log(
solution(
  "2020.01.01",	["Z 3", "D 5"],
  ["2019.01.01 D", "2019.11.15 Z", "2019.08.02 D", "2019.07.01 D", "2018.12.28 Z"]
) 
)
// [1, 4, 5]
