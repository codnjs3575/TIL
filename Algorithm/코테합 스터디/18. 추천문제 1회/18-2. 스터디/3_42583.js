function Queue(arr = new Array()) {
  this.arr = arr
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

function solution(bridge_length, bridge_weight, truck_weights) {
  const bridgeQueue = new Queue() // 다리에 올라와 있는 트럭 Queue
  for (let i = 0; i < bridge_length; i++) bridgeQueue.push(0) // init

  const truckQueue = new Queue() // 대기하고 있는 트럭 Queue
  truck_weights.map((truck) => truckQueue.push(truck)) // init

  let resultTime = 0

  // 두 개의 Queue 중 하나라도 값이 있을 경우 => 아직 움직여야 함
  while (!bridgeQueue.isEmpty() || !truckQueue.isEmpty()) {
    resultTime++

    // 1. 대기하고 있는 트럭이 없거나 다리에 자리가 없는 경우 -> 다리에서 pop만 함
    if (truckQueue.isEmpty() || bridgeQueue.length === bridge_weight) {
      let truck = bridgeQueue.pop()
      bridge_weight += truck // 트럭이 다리를 지나갔기에 무게 원상복구
    }

    // 2. 대기 트럭이 있는 경우 -> 무게에 따라 삽입값(트럭 or 빈 자리(0)) 결정
    if (!truckQueue.isEmpty()) {
      // 2-1. 무게가 초과되지 않는 경우
      if (bridge_weight - truckQueue.head() >= 0) {
        let truck = truckQueue.pop()
        bridge_weight -= truck // 트럭이 다리에 올라감
        bridgeQueue.push(truck)
      }

      // 2-2. 무게가 초과하는 경우
      else bridgeQueue.push(0) // 빈 자리 올리고 한 턴 넘김
    }
  }

  console.log(resultTime)
  return resultTime
}

solution(2, 10, [7, 4, 5, 6])
