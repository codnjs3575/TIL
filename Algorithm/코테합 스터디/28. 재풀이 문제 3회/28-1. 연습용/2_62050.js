// 이동 가능한 그룹이 이미 나뉘어져 있으며 사다리를 놓아서 최소 비용으로 돌아야 함
// 이동 가능한 그룹 어떻게 나누지?
//  ㄴ BFS로 인접한 노드들을 살펴보며 움직일 수 있는 노드인지 확인 -> 최소 신장 트리(최소 경로로 이뤄진 비순환 트리)
//  ㄴ 정점 위주로 움직이는 프림 알고리즘 사용

// 우선순위 큐(최소힙) 구현
class MinHeap {
  constructor() {
    this.heap = []
  }

  push(node) {
    this.heap.push(node)
    this._heapifyUp()
  }

  pop() {
    if (this.size() === 1) return this.heap.pop()
    const top = this.heap[0]
    this.heap[0] = this.heap.pop()
    this._heapifyDown()
    return top
  }

  size() {
    return this.heap.length
  }

  _heapifyUp() {
    let index = this.heap.length - 1
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      if (this.heap[parentIndex].cost <= this.heap[index].cost) break
      ;[this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ]
      index = parentIndex
    }
  }

  _heapifyDown() {
    let index = 0
    const length = this.heap.length

    while (true) {
      const leftChildIndex = 2 * index + 1
      const rightChildIndex = 2 * index + 2
      let smallest = index

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex].cost < this.heap[smallest].cost
      ) {
        smallest = leftChildIndex
      }
      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].cost < this.heap[smallest].cost
      ) {
        smallest = rightChildIndex
      }
      if (smallest === index) break
      ;[this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ]
      index = smallest
    }
  }
}

function solution(land, height) {
  // 0. 필요한 변수 정리
  const N = land.length
  // prettier-ignore
  const directions = [[0, -1],[0, 1],[-1, 0],[1, 0]] // 상하좌우 방향
  const visited = Array.from({ length: N }, () => Array(N).fill(false)) // 방문여부 배열 : 2차원 배열로 초기화
  const pq = new MinHeap() // 우선순위 큐 : Min-Heap 기반

  // 0. 현재 정점에서 갈 수 있는 이웃 정점들을 후보로 pq에 추가하는 함수
  const addEdges = (x, y) => {
    // 상하좌우 확인하기
    for (const [dx, dy] of directions) {
      const nx = x + dx
      const ny = y + dy
      // 방문하지 않은 칸 중에서 최소 비용을 가진 순으로 우선순위 큐에 삽입
      if (nx >= 0 && ny >= 0 && nx < N && ny < N && !visited[ny][nx]) {
        const cost = Math.abs(land[y][x] - land[ny][nx]) // 현재 칸과 이웃 칸 높이차이 계산
        pq.push({ x: nx, y: ny, cost: cost > height ? cost : 0 })
      }
    }
  }

  let totalCost = 0 // 반환할 최소 비용
  let count = 0 // 방문한 칸 수 (모든 칸 방문 후 종료)
  pq.push({ x: 0, y: 0, cost: 0 }) // 시작점 추가 (cost는 사다리를 놓는 비용)

  while (pq.size() > 0) {
    // 우선순위 큐에서 최소 비용 간선을 선택
    const { x, y, cost } = pq.pop()

    if (visited[y][x]) continue // 이미 방문한 노드라면 스킵
    visited[y][x] = true // 방문 처리
    totalCost += cost // 비용 추가
    count++

    if (count === N * N) break // 모든 칸을 방문했으면 종료

    addEdges(x, y) // 현재 위치에서 새로운 후보 칸들 추가
  }

  return totalCost
}

solution(
  [
    [1, 4, 8, 10],
    [5, 5, 5, 5],
    [10, 10, 10, 10],
    [10, 10, 10, 20],
  ],
  3
)

solution(
  [
    [10, 11, 10, 11],
    [2, 21, 20, 10],
    [1, 20, 21, 11],
    [2, 1, 2, 1],
  ],
  1
)
