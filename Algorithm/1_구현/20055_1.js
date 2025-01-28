let [[N, K], [...arr]] = require('fs')
  .readFileSync(process.platform === 'linux' ? 'dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number))

const getZeroCount = (arr) =>
  arr.reduce((acc, cur) => (cur === 0 ? acc + 1 : acc), 0)

const rotate = (arr, robots) => {
  const last = arr.pop()
  arr.unshift(last)

  robots.pop()
  robots.unshift(0)
}

const moveRobots = (arr, robots, N) => {
  for (let i = N - 2; i > -1; i--) {
    if (!robots[i]) continue

    if (!robots[i + 1] && arr[i + 1] > 0) {
      robots[i + 1] = 1
      robots[i] = 0
      arr[i + 1] -= 1
    }
  }
}

const addRobot = (arr, robots) => {
  if (arr[0] > 0) {
    arr[0] -= 1
    robots[0] = 1
  }
}

const removeNthRobot = (robots, n) => {
  robots[n] = 0
}

const solution = (N, K, arr) => {
  const robots = new Array(N).fill(0)
  let stage = 0

  while (getZeroCount(arr) < K) {
    stage++
    rotate(arr, robots)
    if (robots[N - 1]) removeNthRobot(robots, N - 1)

    moveRobots(arr, robots, N)
    if (robots[N - 1]) removeNthRobot(robots, N - 1)

    addRobot(arr, robots)
    if (stage > 30 && stage < 40) {
      console.log(arr.join(' '), robots)
    }
  }

  return stage
}

console.log(solution(N, K, arr))
