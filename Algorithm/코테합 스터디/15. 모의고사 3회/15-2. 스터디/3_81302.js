// 맨해튼 거리 2 이하 금지! 단, 파티션으로 막혀있을 경우에는 허용.
// 그렇다면, 맨해튼 거리가 2 이하일때, 파티션으로 막혀있다면 ok

// 0 혹은 1을 반환하는 checking 함수
function checking(place) {
  // 1. 지원자들의 위치를 미리 저장하기
  // i는 가로, j는 세로
  const personArr = place.reduce((acc, cur, i) => {
    cur.split('').forEach((v, j) => {
      if (v === 'P') acc.push([i, j])
    })
    return acc
  }, [])

  // [ [ 0, 0 ], [ 0, 4 ], [ 2, 1 ], [ 2, 3 ], [ 4, 0 ], [ 4, 4 ] ]

  // 2. 지원자들끼리 거리두기 확인하기 (0-12345, 1-2345, 2-345, 3-45, 4-5)
  for (let i = 0; i < personArr.length; i++) {
    for (let j = i + 1; j < personArr.length; j++) {
      // x1은 무조건 x2보다 작음
      const [x1, y1] = personArr[i]
      const [x2, y2] = personArr[j]

      // 맨해튼 거리 구하기
      const manhatten = Math.abs(x1 - x2) + Math.abs(y1 - y2)

      // 맨해튼거리마다 '거리두기' 확인
      // 2-1. 맨해튼거리가 1일 경우 : 바로 옆에 붙어있음 -> 무조건 0
      if (manhatten === 1) return 0
      // 2-2. 맨해튼거리가 2일 경우 : 파티션이 없으면 0
      if (manhatten === 2) {
        // 파티션있는지 확인하기
        // 2-2-1. x2 - x1이 2칸일 경우
        //   P    ?   P       => y1 === y2
        // [2, 0] [4, 0]
        if (y1 === y2 && place[x1 + 1][y1] !== 'X') return 0

        // 2-2-2. y1 - y2가 2칸일 경우
        // [2, 1] ? [2, 3]  => x1 === x2
        if (x1 === x2 && place[x1][y1 + 1] !== 'X') return 0

        // 2-2-3. 대각선, x2-x1이 1칸, y1-y2가 1칸일 경우
        // [0, 1] [1, 0] -> [0, 0] [1, 1]
        // [2, 2] [3, 1] -> [2, 1] [3, 2]
        // [3, 4] [4, 3] -> [3, 3] [4, 4]
        if (Math.abs(x2 - x1) === 1 && Math.abs(y1 - y2) === 1) {
          if (place[x1][y2] !== 'X' || place[x2][y1] !== 'X') return 0
        }
      }
    }
  }

  // 모든 조건에 걸리지 않을 경우 해당 대기실은 거리두기가 지켜지고 있음 -> 1 반환
  return 1
}

function solution(places) {
  // 대기실을 돌면서, 미리 확인하기
  return places.map((place) => checking(place))
}

console.log(
  solution([
    ['POOOP', 'OXXOX', 'OPXPX', 'OOXOX', 'POXXP'],
    ['POOPX', 'OXPXP', 'PXXXO', 'OXXXO', 'OOOPP'],
    ['PXOPX', 'OXOXP', 'OXPOX', 'OXXOP', 'PXPOX'],
    ['OOOXX', 'XOOOX', 'OOOXX', 'OXOOX', 'OOOOO'],
    ['PXPXP', 'XPXPX', 'PXPXP', 'XPXPX', 'PXPXP'],
  ])
)

// [1, 0, 1, 1, 1]
