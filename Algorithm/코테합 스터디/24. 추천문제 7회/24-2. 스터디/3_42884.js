// [0] 진입, [1] 진출

// 그리디 로직 : 진출별로 sort해놓고 진출 지점마다 카메라 설치 후 다른 차량과 비교하기
function solution(routes) {
  routes.sort((a, b) => a[1] - b[1])

  let camera = -Infinity // 위치 상 맨 뒤에 카메라 설치
  let answer = 0 // 설치한 카메라 개수

  for (const [enter, exit] of routes) {
    // 이미 카메라에 찍히고 있는 경우, 즉 진입한 차량이 카메라보다 위치가 뒤라면 곧 지나갈 예정, 진출은 무조건 앞 차량보다 늦기 때문에 가능
    if (enter <= camera) continue

    // 카메라에 찍히지 않고 있는 경우, 즉 진입한 차량이 카메라보다 위치가 앞이라면 찍고 있는 카메라가 없음
    answer++ // 카메라설치
    camera = exit // 진출 시점에 카메라 설치
  }

  return answer
}

// prettier-ignore
solution([[-20,-15], [-14,-5], [-18,-13], [-5,-3]])
