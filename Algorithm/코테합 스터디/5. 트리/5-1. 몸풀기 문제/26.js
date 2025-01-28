function preorder(nodes, idx) {
  if (idx < nodes.length) {
    let ret = `${nodes[idx]}` // C
    ret += preorder(nodes, idx * 2 + 1) // L
    ret += preorder(nodes, idx * 2 + 2)
    return ret
  }
  return ''
}
function inorder(nodes, idx) {
  if (idx < nodes.length) {
    let ret = inorder(nodes, idx * 2 + 1)
    ret += `${nodes[idx]}` // C
    ret += inorder(nodes, idx * 2 + 2)
    return ret
  }
  return ''
}
function postorder(nodes, idx) {
  if (idx < nodes.length) {
    let ret = postorder(nodes, idx * 2 + 1)
    ret += postorder(nodes, idx * 2 + 2)
    ret += `${nodes[idx]}`
    return ret
  }
  return ''
}

function solution(nodes) {
  return [
    preorder(nodes, 0).split('').join(' '),
    inorder(nodes, 0).split('').join(' '),
    postorder(nodes, 0).split('').join(' '),
  ]
}

console.log(solution([1, 2, 3, 4, 5, 6, 7]))
