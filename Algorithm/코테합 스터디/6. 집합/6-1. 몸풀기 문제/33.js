// x와 y가 속한 두 집합을 합침
function union(tree, x, y) {
  x = find(tree, x)
  y = find(tree, y)
  tree[y] = x
}

// x가 속한 집합의 대표 원소를 찾음
function find(tree, x) {
  // 만약 본인이 루트 노드라면 본인을 반환
  if (tree[x] === x) return x

  // 그렇지 않다면, 본인의 부모 노드를 find()에 재귀 호출
  tree[x] = find(tree, tree[x])
  return tree[x]
}

// 연산을 모두 수행한 후 집합의 개수를 반환
function solution(k, operations) {
  let tree = Array.from({ length: k }, (_, i) => i)

  operations.map((op) => {
    if (op[0] === 'u') union(tree, op[1], op[2])
    else find(tree, op[1])
  })

  return new Set(Array.from({ length: k }, (_, i) => find(tree, i))).size
}

// prettier-ignore
// solution(3, [['u', 0, 1], ['u', 1, 2], ['f',2]]) // 1
// prettier-ignore
solution(4, [['u', 0, 1], ['u', 2, 3], ['f',0]]) // 2
