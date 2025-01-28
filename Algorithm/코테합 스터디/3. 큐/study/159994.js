function Queue(array = new Array()) {
  this.arr = array
  this.front = 0
}
Queue.prototype.pop = function () {
  return this.arr[this.front++]
}
Queue.prototype.head = function () {
  return this.arr[this.front]
}

function solution(cards1, cards2, goal) {
  // 1. 각각의 카드 뭉치들을 Queue로 만들기
  let queue1 = new Queue(cards1)
  let queue2 = new Queue(cards2)

  // 2. 만약 두 개의 카드 뭉치에서 꺼낼 단어카드 === 단어 배열 속 현재 단어카드라면 계속 진행
  //  ㄴ 마지막까지 돈다면 'Yes' return
  //  ㄴ 그렇지 않다면, 바로 'No' return
  for (let i = 0; i < goal.length; i++) {
    let target = goal[i]
    if (target === queue1.head()) queue1.pop()
    else if (target === queue2.head()) queue2.pop()
    else return 'No'
  }
  return 'Yes'
}

console.log(
  solution(
    ['i', 'drink', 'water'],
    ['want', 'to'],
    ['i', 'want', 'to', 'drink', 'water']
  )
) // "Yes"

console.log(
  solution(
    ['i', 'water', 'drink'],
    ['want', 'to'],
    ['i', 'want', 'to', 'drink', 'water']
  )
)
//	// "No"
