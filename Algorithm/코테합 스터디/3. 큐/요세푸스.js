function queue(array = new Array()) {
  this.arr = array
  this.front = -1
  this.rear = -1
}

queue.prototype.push = function (item) {
  this.arr.push(item)
  this.rear++
}

queue.prototype.pop = function () {
  return this.arr[this.front++]
}

queue.prototype.size = function () {
  return this.rear - this.front
}

function solution(n, k) {
  for (let i = 1; i <= n; i++) {
    queue.push(i)
  }
  while (queue.size() > 1) {
    for (let i = 0; i < k - 1; i++) {
      queue.push(queue.pop())
    }
    queue.pop()
  }

  return queue.pop()
}

// solution(5, 2)
// console.log((100 - 30) / 30)
// console.log((100 - 30) % 30)
console.log(Math.ceil((100 - 70) / 14))
