function Queue(array = new Array()) {
  this.arr = array
  this.front = 0
  this.rear = 0
  this.length = 0
}
Queue.prototype.push = function (data) {
  this.length++
  return (this.arr[this.rear++] = data)
}
Queue.prototype.pop = function () {
  this.length--
  return this.arr[this.front++]
}
Queue.prototype.isEmpty = function () {
  return this.length === 0
}
Queue.prototype.head = function () {
  return this.arr[this.front]
}
Queue.prototype.print = function () {
  console.log(this.arr.slice(this.front, this.rear).join(', '))
}

function solution(bridge_length, bridge_weight, truck_weights) {
  let bridgeQueue = new Queue()
  let truckQueue = new Queue()
  truck_weights.map((weight) => truckQueue.push(weight))
  if (bridge_length > truckQueue.length) {
    for (let i = 0; i < bridge_length; i++) bridgeQueue.push(0)
  }

  // console.log(truckQueue) // [7, 4, 5, 6]

  let resultTime = 0
  // for (let i = 0; i < 8; i++) {
  while (!bridgeQueue.isEmpty() || !truckQueue.isEmpty()) {
    resultTime++
    // console.log()
    // console.log(
    //   `----------------------- ${resultTime}초 (${bridge_weight}) -----------------------`
    // )

    // 1. 대기하고 있는 트럭이 없거나 다리가 꽉 차있는 경우 -> 다리에서 pop만 함.
    if (truckQueue.isEmpty() || bridgeQueue.length === bridge_length) {
      // if (bridgeQueue.length === bridge_length) {
      let truck = bridgeQueue.pop()
      bridge_weight += truck
      // console.log(`다리에서 트럭 ${truck}을 삭제함`)
    }

    // 2. 다리에 자리가 있는 경우 -> 무게를 보고 트럭 or 빈 자리(0)를 삽입
    // else if (bridgeQueue.length < bridge_length) {
    // else {
    // console.log('다리에 자리가 있거나, 대기하고 있는 트럭이 있는 경우')
    // console.log(truckQueue.head(), '대기 중')
    // 경우 1-1. 무게를 초과하지 않은 경우
    if (bridge_weight - truckQueue.head() >= 0) {
      let truck = truckQueue.pop()
      bridge_weight -= truck
      bridgeQueue.push(truck)
    }

    // 경우 1-2. 무게를 초과한 경우
    // else bridgeQueue.push(0)
    else if (!truckQueue.isEmpty()) bridgeQueue.push(0)

    // }

    // console.log()
    // truckQueue.print()
    // bridgeQueue.print()
  }
  // console.log()
  console.log(resultTime)
}

// solution(2, 10, [7, 4, 5, 6]) // 8
// <<---/--7->>
// <<--7-/--->>
// <<---/--4->>
// <<--4-/--5->>
// <<--5-/--->>
// <<---/--6->>
// <<--6-/--->>
// <<---/--->>

solution(100, 100, [10]) // 101
// <<---/---/---/---/---/---/---/---/---/--10->>
// <<---/---/---/---/---/---/---/---/--10-/--->>
// <<---/---/---/---/---/---/---/--10-/---/--->>
// <<---/---/---/---/---/---/--10-/---/---/--->>
// <<---/---/---/---/---/--10-/---/---/---/--->>
// <<---/---/---/---/--10-/---/---/---/---/--->>
// <<---/---/---/--10-/---/---/---/---/---/--->>
// <<---/---/--10-/---/---/---/---/---/---/--->>
// <<---/--10-/---/---/---/---/---/---/---/--->>
// <<-10--/---/---/---/---/---/---/---/---/--->>
// x 10

// solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]) // 110
// <<---/---/---/---/---/---/---/---/---/--10->>
// <<---/---/---/---/---/---/---/---/--10-/--10->>
// <<---/---/---/---/---/---/---/--10-/--10-/--10->>
// <<---/---/---/---/---/---/--10-/--10-/--10-/--10->>
// <<---/---/---/---/---/--10-/--10-/--10-/--10-/--10->>
// <<---/---/---/---/--10-/--10-/--10-/--10-/--10-/--10->>
// <<---/---/---/--10-/--10-/--10-/--10-/--10-/--10-/--10->>
// <<---/---/--10-/--10-/--10-/--10-/--10-/--10-/--10-/--10->>
// <<---/--10-/--10-/--10-/--10-/--10-/--10-/--10-/--10-/--10->>
// <<-10--/--10-/--10-/--10-/--10-/--10-/--10-/--10-/--10-/--10->>
// x 10
