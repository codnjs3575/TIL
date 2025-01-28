// 1. progresses 배열의 요소를 검사한다.
// 2. speeds를 해당 요소에 더해 며칠이나 걸릴 지 확인한다.
// 3. 해당 요소에서 걸린 시간과 이전 요소에서 걸린 시간을 비교한다.
// 3-1. 이전 요소가 더 늦게 끝났다면, 정답 배열을 currentIndex의 값에 + 1 을 해준다.
// 3-2. 이전 요소가 더 빨리 끝났다면, currentIndex에 + 1 을 해주고, 정답 배열의 currentIndex번째 값을 1로 설정해준다.
// 4. progresses 배열의 모든 요소를 위와 같은 방식으로 검사했다면, answer 배열을 반환해준다.

function solution(progresses, speeds) {
  const progressesLength = progresses.length
  const answer = []
  let previousDeployDay = 0

  // -1부터 시작하는 이유는 최초의 요소에서 반드시 이전 배포일자(0)보다 이번 배포일자가 빠르기 때문에
  // 하단의 else문에 걸리게 된다. 이 때, if문으로 해당 if문 전체를 감싸는 방법과 currentIndex를 -1로 주는 방법 2가지가 있는데
  // 후자의 방법이 코드상 더 깔끔한 것 같다.
  let currentIndex = -1

  for (let i = 0; i < progressesLength; i++) {
    // 이번 배포 일자는 progresses 안의 매 요소마다 초기화해줘야한다.
    let deployDay = 0

    console.log()
    while (progresses[i] < 100) {
      deployDay += 1
      progresses[i] += speeds[i]
      console.log(progresses[i], deployDay)
    }

    console.log(progresses[i], deployDay, previousDeployDay)
    // 이전 배포일자가 이번 배포일자보다 느리면 이전 배포일자에 배포한다.
    if (previousDeployDay >= deployDay) {
      answer[currentIndex] += 1

      // 이전 배포일자가 이번 배포일자보다 빠르면 이번 배포는 따로한다.
    } else {
      previousDeployDay = deployDay
      currentIndex += 1
      answer[currentIndex] = 1
    }
    console.log(answer)
  }
  return answer
}
// solution([93, 30, 55], [1, 30, 5])
solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1])
