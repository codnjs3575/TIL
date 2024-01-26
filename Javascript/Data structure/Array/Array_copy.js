// array = [1, [2,3], 4]
// array_copy = [...array];

// array.push(6); // 원본 배열만 복사됨
// array[1].push(7); // 중첩 배열은 참조됨
// console.log(array, array_copy);


let fruits = ["딸기", "망고",["오렌지", "사과"]];
let copyOfFruits = fruits.concat();

fruits.push("수박"); // 원본 배열 복사됨
console.log(fruits); // [ '딸기', '망고', [ '오렌지', '사과' ], '수박' ]
console.log(copyOfFruits) // [ '딸기', '망고', [ '오렌지', '사과' ] ]

fruits[2].push("멜론") // 중첩 배열 복사됨
console.log(fruits) // [ '딸기', '망고', [ '오렌지', '사과', '멜론' ], '수박' ]
console.log(copyOfFruits) // [ '딸기', '망고', [ '오렌지', '사과' ] ]