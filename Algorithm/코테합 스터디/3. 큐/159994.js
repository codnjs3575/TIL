function Queue(array = new Array()) {
  this.arr = array
  this.front = 0
  this.rear = 0
}
Queue.prototype.push = function (data) {
  this.arr[this.rear++] = data
}
Queue.prototype.pop = function () {
  return this.arr[this.front++]
}
Queue.prototype.head = function () {
  return this.arr[this.front]
}
Queue.prototype.isEmpty = function () {
  return this.front === this.rear
}

function solution(cards1, cards2, goal) {
  let queue1 = new Queue([...cards1])
  let queue2 = new Queue([...cards2])

  for (let i = 0; i < goal.length; i++) {
    let target = goal[i]
    if (target === queue1.head()) queue1.pop()
    else if (target === queue2.head()) queue2.pop()
    else return 'No'
  }

  return 'Yes'
}

// solution(
//   ['i', 'drink', 'water'],
//   ['want', 'to'],
//   ['i', 'want', 'to', 'drink', 'water']
// ) // "Yes"

console.log(
  solution(
    ['i', 'water', 'drink'],
    ['want', 'to'],
    ['i', 'want', 'to', 'drink', 'water']
  )
) // "No"
