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
Queue.prototype.isEmpty = function () {
  return this.rear === this.front
}
Queue.prototype.next = function () {
  return this.arr[this.front]
}
Queue.prototype.head = function () {
  return this.arr[0]
}

function solution(progresses, speeds) {
  var answer = []
  let queue = new Queue()

  progresses.map((progress, idx) =>
    queue.push(Math.ceil((100 - progress) / speeds[idx]))
  ) // [7, 3, 9]

  let maxVal = queue.head()
  let cnt = 0
  while (!queue.isEmpty()) {
    let val = queue.pop()

    if (maxVal >= val) cnt++
    else {
      answer.push(cnt)
      maxVal = val
      cnt = 1
    }
  }

  if (cnt > 0) answer.push(cnt)

  return answer
}

// solution([93, 30, 55], [1, 30, 5]) // [2, 1]
solution([90, 90, 90], [1, 5, 4]) // [3]
// solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]) // [1, 3, 2]
