function solution(n, wires) {
  let answer = 99
  // 1. Map 형식으로 트리 연결하기 & 배열 형식으로 연결 개수 저장하기
  let wireMap = new Map() // 트리 Map
  wires.map(([node1, node2]) => {
    // 1-1. node1에 대해서 map 생성 및 수정
    wireMap.set(
      node1,
      wireMap.has(node1) ? [...wireMap.get(node1), node2] : [node2]
    )

    // 1-2. node2에 대해서 map 생성 및 수정
    wireMap.set(
      node2,
      wireMap.has(node2) ? [...wireMap.get(node2), node1] : [node1]
    )
  })

  console.log(wireMap)

  wires.map(([w1, w2]) => {
    console.log()
    console.log(`w1: ${w1}, w2: ${w2}`)
    // prettier-ignore
    console.log(wireMap.get(w1), "=>",wireMap.get(w1).filter(n => n !== w2))
    // prettier-ignore
    console.log(wireMap.get(w2), "=>",wireMap.get(w2).filter(n => n !== w1))
  })
  // console.log(wireMap)
  // console.log()
  // console.log(wireMap.get(3).filter((n) => n !== 1))
  // console.log(connects.join(' ')) // 1 1 3 4 1 1 3 1 1

  // wires.map(([node1, node2]) => {
  // let num = dfs(node1) // 한 전력망이 가지는 송전탑 개수
  // let result = Math.abs(n - 2 * num) // 두 전력망이 가지는 송전탑 개수의 차이 (절대값)
  // if (result < answer) answer = result // 현재 차이가 가장 적다면 (즉, 비슷한 개수로 송전탑이 나눠짐) answer 수정
  // })

  // function dfs(node) {
  //   console.log(node, connects[node - 1], wireMap.get(node))
  //   return -1
  // }

  return answer
}

// prettier-ignore
solution(9,[[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]]) // 3

// prettier-ignore
// solution(4,[[1,2],[2,3],[3,4]]) // 0

// prettier-ignore
// solution(7,[[1,2],[2,7],[3,7],[3,4],[4,5],[6,7]]) // 1
