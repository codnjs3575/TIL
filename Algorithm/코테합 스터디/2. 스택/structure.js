function stack(array = new Array()) {
  this.arr = array
  this.top = 0
}

stack.prototype.push = function (item) {
  return (this.arr[this.top++] = item)
}

stack.prototype.pop = function () {
  if (this.top <= 0) return null
  return this.arr[--this.top]
}

stack.prototype.isEmpty = function () {
  return stack.length === 0
}

let stack = new stack()
stack.push(1)
stack.push(2)
console.log(stack.pop())
stack.push(3)
console.log(stack.pop())
console.log(stack.isEmpty())
console.log(stack.pop())
console.log(stack.isEmpty())
