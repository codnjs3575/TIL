function Node(data) {
  this.left = null
  this.right = null
  this.val = data
}

function BST() {
  this.root = null
}

BST.prototype.insert = function (key) {
  if (!this.root) this.root = new Node(key)
  else {
    let curr = this.root

    while (true) {
      if (key < curr.val) {
        if (curr.left) curr = curr.left
        else {
          curr.left = new Node(key)
          break
        }
      } else {
        if (curr.right) curr = curr.right
        else {
          curr.right = new Node(key)
          break
        }
      }
    }
  }
}
BST.prototype.search = function (key) {
  let curr = this.root

  while (curr && curr.val !== key) {
    if (key < curr.val) curr = curr.left
    else curr = curr.right
  }
  return curr
}

function solution(list, searchList) {
  const bst = new BST()
  for (const key of list) bst.insert(key)

  const result = []
  for (const searchVal of searchList) {
    if (bst.search(searchVal)) result.push(true)
    else result.push(false)
  }

  console.log(result)
  return result
}
// solution([5, 3, 8, 4, 2, 1, 7, 10], [1, 2, 5, 6])
// [true, true, true, false]

solution([1, 3, 5, 7, 9], [2, 4, 6, 8, 10])
// [false, false, false, false, false]
