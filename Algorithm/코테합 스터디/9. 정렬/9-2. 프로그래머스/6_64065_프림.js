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
  const directions = [[0, 1],[1, 0],[0, -1],[-1, 0]] // 상하좌우 방향
  const visited = Array.from({ length: N }, () => Array(N).fill(false)) // 방문여부 배열 : 2차원 배열로 초기화
  const pq = new MinHeap() // 우선순위 큐 : Min-Heap 기반

  // 0.간선 추가용 함수
  const addEdges = (x, y) => {
    for (const [dx, dy] of directions) {
      const nx = x + dx // 좌우
      const ny = y + dy // 상하
      // 방문하지 않은 칸 중에서 최소 비용을 가진 순으로 우선순위 큐에 삽입
      if (nx >= 0 && ny >= 0 && nx < N && ny < N && !visited[ny][nx]) {
        const cost = Math.abs(land[y][x] - land[ny][nx])
        pq.push({ x: nx, y: ny, cost: cost > height ? cost : 0 })
      }
    }
  }

  let totalCost = 0 // 반환할 최소 비용
  let count = 0 // 방문한 칸 수
  pq.push({ x: 0, y: 0, cost: 0 }) // 시작점 추가

  while (pq.size() > 0) {
    // 우선순위 큐에서 최소 비용 간선을 선택
    const { x, y, cost } = pq.pop()

    if (visited[y][x]) continue // 이미 방문한 노드라면 스킵
    visited[y][x] = true // 방문 처리
    totalCost += cost // 비용 추가
    count++

    if (count === N * N) break // 모든 칸을 방문했으면 종료

    addEdges(x, y) // 현재 위치에서 새로운 간선 추가
  }

  return totalCost
}

// prettier-ignore
solution([[1, 4, 8, 10], [5, 5, 5, 5], [10, 10, 10, 10], [10, 10, 10, 20]],	3)

// prettier-ignore
// solution([[10, 11, 10, 11], [2, 21, 20, 10], [1, 20, 21, 11], [2, 1, 2, 1]],	1)
