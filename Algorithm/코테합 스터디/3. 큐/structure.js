// 연결리스트를 이용하는 방식
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  push(data) {
    const newNode = new Node(data)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.size++
  }

  pop() {
    if (!this.head) return null

    const removeNode = this.head
    this.head = this.head.next

    if (!this.head) this.tail = null

    this.size--

    return removeNode.data
  }

  isEmpty() {
    return this.size === 0
  }
}
