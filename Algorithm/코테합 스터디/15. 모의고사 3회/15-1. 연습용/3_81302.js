// 대기실은 5개이며, 각 대기실은 5X5 크기
// 맨허튼 거리가 2 이하로 앉지 않기
// 단 응시자가 앉아있는 자리 사이가 파티션으로 막혀있으면 허용

// 앉아있는 자리 P, 빈 테이블 0, 파티션 X
// 거리두기를 잘 지키고 있으면 1, 한 명이라도 지키지 않고 있다면 0을 배열에 담아 return

function checking(place) {
  // 1. 지원자들의 위치를 미리 저장해놓기.
  const personArr = place.reduce((acc, cur, i) => {
    cur.split('').forEach((v, j) => {
      if (v === 'P') acc.push([i, j])
    })
    return acc
  }, [])

  // 2. 지원자들끼리 거리두기 확인하기 (0(i)-12345(j), 1(i)-2345(j), 2-345, 3-45, 4-5)
  for (let i = 0; i < personArr.length; i++) {
    for (let j = i + 1; j < personArr.length; j++) {
      const [x1, y1] = personArr[i] // (행) 무조건 x1 >= x2
      const [x2, y2] = personArr[j] // (열) y1 ? y2

      const manhattan = Math.abs(x1 - x2) + Math.abs(y1 - y2)

      // 1 : 바로 옆에 있음 -> 무조건 0(거리두기 지켜지지 않음)
      if (manhattan === 1) return 0

      // 2 : 파티션이 없으면 0(거리두기 지켜지지 않음)
      if (manhattan === 2) {
        // 2-1. x1 - x2가 1칸 (옆, 행으로) => y1 === y2
        // P ? P
        // [2,1] [2,3]
        if (x1 === x2 && place[x1][y1 + 1] !== 'X') return 0

        // 2-2. y1 - y2가 2칸 (아래, 열로)
        // [0, 1] [2, 1]
        if (y1 === y2 && place[x1 + 1][y1] !== 'X') return 0

        // 2-3. x1 - x2가 1칸, y1 - y2가 1칸 (대각선)
        if (x2 - x1 === 1 && Math.abs(y1 - y2) === 1) {
          // [1, 2] [2, 1] -> [1, 1]  [2, 2]
          // [2, 2] [3, 1] -> [2, 1]  [3, 2]
          // [3, 3] [4, 2] -> [3, 2]  [4, 3]
          if (place[x1][y2] !== 'X' || place[x2][y1] !== 'X') return 0
        }
      }
    }
  }

  return 1
}

function solution(places) {
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
// [1, 0, 1, 1, ]
