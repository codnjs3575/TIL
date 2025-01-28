// point! 큐를 구현해서 풀기
// Queue : 남은 작업일수 배열 (길이 = progresses)

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
  return this.front === this.rear
}
Queue.prototype.head = function () {
  return this.arr[this.front]
}

function solution(progresses, speeds) {
  var answer = []
  let queue = new Queue()

  // 1. Queue 생성 하기 : 남은 작업일 수 push
  progresses.map((progress, idx) => {
    queue.push(Math.ceil((100 - progress) / speeds[idx]))
  })
  console.log(queue)

  // 2. 남은 작업일수 배포 확인하기
  // 2-1. 만약에 최댓값(maxVal)이 현재값(val)보다 작으면
  //  ㄴ cnt를 answer에 넣음
  //  ㄴ 최댓값을 현재값으로 변경함
  // 2-2. 그렇지 않다면 (최댓값이 현재값보다 크거나 같으면)
  //  ㄴ cnt를 늘림
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

  // 3. 모든 queue에 대해 확인한 후에도 cnt가 남아있다면(배포가 안된 작업들) 그대로 answer에 넣음
  if (cnt > 0) answer.push(cnt)

  console.log(answer)

  return answer
}

solution([93, 30, 55], [1, 30, 5])
solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1])
