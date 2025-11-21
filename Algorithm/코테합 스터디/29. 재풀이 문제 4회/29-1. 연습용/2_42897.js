// 완전 탐색보다는 첫 번째 집을 털거나 털지않는 경우로 나눠서 DP로 진행 (무조건 하나 건너 하나 터는게 이득)

// 첫 번째 집을 털면(DP1) -> 마지막 집은 무조건 털지 않음
// 첫 번째 집을 털지 않는다면(DP2) -> 마지막 집은 털 수도, 털지 않을 수도 있음
// return math.max(DP1, DP2) -> 두 경우 중 더 많이 얻은 경우로 return

function solution(money) {
  const DP1 = [0]
  const DP2 = [0]

  for (let i = 0; i < money.length - 1; i++) {
    DP1.push(money[i])
    DP2.push(money[i + 1])
  }

  // 지금 집을 털 경우로 갈 것인지, 이전까지의 DP 최댓값으로 갈 것인지
  for (let i = 2; i < DP1.length; i++) {
    DP1[i] = Math.max(DP1[i] + DP1[i - 2], DP1[i - 1])
    DP2[i] = Math.max(DP2[i] + DP2[i - 2], DP2[i - 1])
  }

  return Math.max(DP1[DP1.length - 1], DP2[DP2.length - 1])
}
