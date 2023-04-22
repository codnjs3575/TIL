var arr1 = [undefined, 1];
var arr2 = [];
arr2[1] = 1;

console.log('forEach')
arr1.forEach(function(v,i) {console.log(v, i)}); // undefined 0 / 1 1
arr2.forEach(function(v,i) {console.log(v, i)}); // 1 1

console.log('==============');
console.log('map')
arr1.map(function (v,i) {console.log( v + i)}); // [NaN, 2]
arr2.map(function (v,i) {console.log( v + i)}); // [empty, 2]

console.log('==============');
console.log('filter')
// arr1.filter(function (v) {return !v;}); 
// arr2.filter(function (v) {return !v;});
arr1.filter(function (v) {console.log(!v)}); // [undefined]
arr2.filter(function (v) {console.log(!v)}); // []

console.log('==============');
console.log('reduce')
// arr1.reduce(function (p, c, i) {return p + c + i}, '');
// arr2.reduce(function (p, c, i) {return p + c + i}, '');
arr1.reduce(function (p, c, i) {console.log(p + c + i)}, ''); // undefiend011
arr2.reduce(function (p, c, i) {console.log(p + c + i)}, ''); // 11