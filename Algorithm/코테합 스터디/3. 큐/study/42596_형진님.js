function solution(progresses, speeds) {
  let progressLength = progresses.length
  const date = [] // 완료되기 까지 걸리는 시간
  let count = 0

  while (progresses.length) {
    // 첫번째 요소가 100이상 완료되었을 때
    if (progresses[0] >= 100) {
      progresses.shift() // 첫번째 작업 제거
      speeds.shift() // 해당하는 속도도 제거

      date.push(count)

      count = 0 // 초기화
    } else {
      // Progresses 첫번째 요소에 해당하는 속도 더해서 증가
      progresses[0] += speeds[0]

      // 날짜 카운트
      count++
    }
  }

  console.log(date)

  const answer = []
  let c = 1
  // let current = date.shift() // 비교할 기준이 되는 첫번쩨 요소
  let current = date[0]

  for (let i = 0; i < progressLength; i++) {
    console.log(current)
    // 현재 기준 날짜 보다 늦게 완료되는 작업이 있는지
    if (current >= date[i]) {
      c++
    } else {
      answer.push(c)
      c = 1 // 초기화
      current = date[i] // 기준 날짜 갱신
    }
  }

  if (c > 1) answer.push(c)
  console.log(answer)

  return answer
}

solution([93, 30, 55], [1, 30, 5])
// solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1])
