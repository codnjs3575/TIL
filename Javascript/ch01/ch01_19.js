// (1) undefined 값을 대입하지 않은 변수에 접근
var a;
console.log(a); // undefined

// (2) 존재하지 않는 프로퍼티에 접근
var obj = {a:1};
console.log(obj.a) // 1
console.log(obj.b) // undefined


// (3) 반환(return) 값이 없으면 undefined를 반환한것으로 간주
var func = function() {};
var c = func()
console.log(c) // undefined