function Node(info, num, left = null, right = null) {
  this.info = info
  this.left = left
  this.right = right
  this.num = num
}

Node.prototype.hasLeft = function () {
  return this.left !== null
}

Node.prototype.hasRight = function () {
  return this.right !== null
}

function makeTree(nodeinfo) {
  const nodes = Array.from({ length: nodeinfo.length }, (_, i) => i + 1) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9]

  nodes.sort((a, b) => {
    const [ax, ay] = nodeinfo[a - 1]
    const [bx, by] = nodeinfo[b - 1]
    return ay === by ? ax - bx : by - ay
  }) // [ 7, 4, 2, 6, 1, 3, 9, 8, 5]

  let root = null
  for (const nodenum of nodes) {
    if (!root) root = new Node(nodeinfo[nodenum - 1], nodenum)
    else {
      let parent = root
      const newNode = new Node(nodeinfo[nodenum - 1], nodenum)
      while (true) {
        if (newNode.info[0] < parent.info[0]) {
          if (parent.hasLeft()) {
            parent = parent.left
            continue
          }
          parent.left = newNode
          break
        } else {
          if (parent.hasRight()) {
            parent = parent.right
            continue
          }
          parent.right = newNode
          break
        }
      }
    }
  }
  return root
}

function solution(nodeinfo) {
  let tree = makeTree(nodeinfo)
  console.log(tree)
}

solution([
  [5, 3],
  [11, 5],
  [13, 3],
  [3, 5],
  [6, 1],
  [1, 3],
  [8, 6],
  [7, 2],
  [2, 2],
])

// 전위 : [7,4,6,9,1,8,5,2,3]
// 후위 : [9,6,5,8,1,4,3,2,7]
