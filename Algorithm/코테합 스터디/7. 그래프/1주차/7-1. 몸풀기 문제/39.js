// 제약 조건
// 1. 노드의 최대 개수는 100개
// 2. 시작 노드부터 시작해서 모든 노드를 방문할 수 있는 경로가 항상 있음
// 3. 그래프의 노드는 숫자임
function Queue() {
  this.arr = []
  this.front = 0
  this.rear = 0
}
Queue.prototype.push = function (data) {
  this.arr[this.front++] = data
}
Queue.prototype.pop = function () {
  return this.arr[this.rear++]
}
Queue.prototype.isEmpty = function () {
  return this.front === this.rear
}

function solution(graph, start) {
  // 1. 출발노드-도착노드 Map 형식으로 저장하기
  let graphMap = new Map()
  graph.map(([startNode, endNode]) => {
    if (graphMap.get(startNode))
      graphMap.set(startNode, [...graphMap.get(startNode), endNode])
    else graphMap.set(startNode, [endNode])
  })

  // 2. 출발 노드 방문처리
  let unVisited = new Set(graphMap.keys()) // Set(6) { 0, 1, 2, 3, 4, 5 }
  let queue = new Queue()
  queue.push(start) // 2-1. queue에 삽입 : Queue { arr: [ 1 ], front: 1, rear: 0 }
  unVisited.delete(start) // 2-2. 방문처리 : Set(5) { 0, 2, 3, 4, 5 }
  const result = [start] // 2-3. 반환할 result 배열에 출발 노드 삽입

  // 3. BFS 실행하기
  while (!queue.isEmpty()) {
    let node = queue.pop() // 3-1. 가장 먼저 queue에 삽입된 node

    // 3-2. 모든 인접 노드에 대하여 방문확인
    graphMap.get(node).map((neighbor) => {
      // 아직 방문하지 않은 노드라면
      if (unVisited.has(neighbor)) {
        queue.push(neighbor) // 3-3. queue에 삽입
        unVisited.delete(neighbor) // 3-4. 방문처리
        result.push(neighbor) // 3-5. 반환할 result 배열에 노드 삽입
      }
    })
  }
  return result
}

// prettier-ignore
// console.log(solution([[1, 2], [1, 3], [2, 4], [2, 5], [3, 6], [3, 7], [4, 8], [5, 8], [6, 9], [7, 9]], 1))
// solution([[1, 2], [1, 3], [2, 4], [2, 5], [3, 6], [3, 7], [4, 8], [5, 8], [6, 9], [7, 9]], 1) // 반환값 :[1, 2, 3, 4, 5, 6, 7, 8, 9]

// prettier-ignore
console.log(solution([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]], 1)) // 반환값 : [1, 2, 3, 4, 5, 0]
