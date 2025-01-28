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

function solution(progresses, speeds) {
  var answer = []
  let queue = new Queue()

  progresses.map((progress, idx) =>
    queue.push(Math.ceil((100 - progress) / speeds[idx]))
  )

  console.log(queue)
  // [ 7, 3, 9 ]
  // 7 3 -> 함께 배포 (cnt++) nextVal = 7
  // 3 9 ->

  let cnt = 0
  let maxVal = -1
  while (!queue.isEmpty()) {
    console.log()
    let val = queue.pop()
    maxVal = maxVal <= val ? val : maxVal

    if (maxVal <= val) {
      cnt++
      console.log(`다음 값이 작음. 배포 진행`)
      console.log(`현재: ${val} / 최대: ${maxVal} / cnt: ${cnt}`)
      console.log(answer)
    } else {
      answer.push(++cnt)
      cnt = 0
      console.log('다음 값이 큼. 배포 중지')
      console.log(`현재: ${val} / 최대: ${maxVal} / cnt: ${cnt}`)
      console.log(answer)
    }
  }

  if (cnt > 0) answer.push(cnt)

  console.log(answer)
  return answer
}

// solution([93, 30, 55], [1, 30, 5]) // [2, 1]
solution([90, 90, 90], [1, 5, 4]) // [3]
// solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]) // [1, 3, 2]
