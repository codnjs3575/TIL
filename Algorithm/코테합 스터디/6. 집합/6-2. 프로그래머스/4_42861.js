function find(parent, i) {
  // 1. 'i'가 속한 집합의 루트 노드 찾기
  if (parent[i] == i) return i

  // 2. 경로 압축 : 'i'의 부모를 직접 루트로 설정
  parent[i] = find(parent, parent[i])
  return parent[i]
}

function union(parent, rank, x, y) {
  // 3. 랭크를 기준으로 두 집합을 합치기
  const xroot = find(parent, x)
  const yroot = find(parent, y)
  // 4. 작은 랭크의 트리를 큰 랭크의 트리 아래에 연결
  if (rank[xroot] < rank[yroot]) parent[xroot] = yroot
  else if (rank[xroot] > rank[yroot]) parent[yroot] = xroot
  else {
    // 5. 랭크가 같은 경우, 한 트리를 다른 트리에 붙이고 랭크 증가
    parent[yroot] = xroot
    rank[xroot] += 1
  }
}

function solution(n, costs) {
  // 6. 최소 비용 순으로 정렬
  costs.sort((a, b) => a[2] - b[2]) // [ [ 0, 1, 1 ], [ 1, 3, 1 ], [ 0, 2, 2 ], [ 1, 2, 5 ], [ 2, 3, 8 ] ]

  // 7. 각 노드의 부모를 추적하는 parent 배열 -> 일단 본인으로 초기화
  const parent = Array.from({ length: n }, (_, i) => i) // [ 0, 1, 2, 3 ]

  // 8. 각 노드의 트리의 랭크를 추적하는 rank 배열 -> 0으로 초기화
  const rank = Array(n).fill(0)

  let minCost = 0 // 최소 신장 트리의 총 비용
  let edges = 0 // 최소 신장 트리에 포함된 간선의 개수

  for (const edge of costs) {
    // 9. n-1개의 간선이 포함된 경우 중단
    if (edge === n - 1) break

    // 10. 현재 간선의 두 노드가 속한 집합의 루트 찾기
    const x = find(parent, edge[0]) // 1번 노드
    const y = find(parent, edge[1]) // 2번 노드

    // 11. 루트 노드가 다르다면 -> 두 노드가 서로 다른 집합에 속하였다면 집합 합치기 (루트 노드가 같아짐)
    if (x !== y) {
      union(parent, rank, x, y)
      minCost += edge[2] // 비용만큼 추가
      edges += 1 // 포함된 간선 1개 추가
    }
  }

  return minCost
}

// prettier-ignore
solution(4,	[[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]])
