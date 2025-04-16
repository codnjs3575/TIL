// cap만큼 배달하거나 회수하기
// deliveries와 pickups를 역순으로 순회하면서 배달과 회수를 진행 (이동거리 *= 2)
function solution(cap, n, deliveries, pickups) {
  let distance = 0 // return해야 할 최소거리

  let deliveriesN = 0 // 배달할 상자 개수 저장용 변수
  let pickupN = 0 // 회수할 상자 개수 저장용 변수

  // 역순으로 순회하면서 배달|회수 진행하기
  for (let i = n - 1; i >= 0; i--) {
    deliveriesN += deliveries[i]
    pickupN += pickups[i]

    // 0보다 크면(배달|회수할 상자가 있으면) cap만큼 상자 배달|회수하기
    while (deliveriesN > 0 || pickupN > 0) {
      deliveriesN -= cap
      pickupN -= cap
      distance += (i + 1) * 2
    }
  }

  return distance
}

solution(4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]) // 16
// solution(2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]) // 30
