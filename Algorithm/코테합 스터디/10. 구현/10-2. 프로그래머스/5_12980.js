// 1. 한 번에 K칸을 앞으로 점프 || (현재까지온거리) X 2 해당하는 위치로 순간이동
// 2. K 칸을 점프하면 K만큼의 건전지 사용량이 듬 -> 순간이동이 효율적
// 3. 거리가 N 만큼 떨어진 장소로 가기 위해 점프를 최소한으로 사용

// 풀이 1. 0부터 +1하면서 배수 풀이
// 풀이 2. N부터 /2하면서 점프해야 할 거리 계산
function solution(N) {
  let k = 0

  while (N > 0) {
    if (N % 2 == 1) k++
    N = parseInt(N / 2)
  }

  return k
}

// solution(5)
// solution(6)
solution(5000)
