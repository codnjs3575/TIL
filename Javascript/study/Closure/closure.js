// 연습 1
// let outerFunc = function(){
//     let a = 1;
//     let inner = function(){
//         console.log(a);
//     }
//     inner();
// }
// outerFunc();

// 연습 2
let outerFunc = function(){
    let a = 1;
    let inner = function(){
        console.log(++a);
    }
    return inner; // inner 함수 리턴
}
let innerFunc = outerFunc();
innerFunc();  // 2
innerFunc();  // 3

// 연습 3 
console.log('-----  연습 3.  -----------------------');
let b = 1;
let outerFunc2 = function(){
    
    let inner = function(){
        return ++b;
    }
    return inner(); // inner 함수 **결과값** 리턴
}
console.log('outerFunc2 실행 :',outerFunc2());
console.log('outerFunc2 실행 :',outerFunc2());
let innerFunc2 = outerFunc2();
console.log('innerFunc2 출력 :',innerFunc2); // 2


// 연습 4
console.log('-----  연습 4.  -----------------------');
let outerFunc3 = function(){
    let a = 1;
    let inner = function(){
        return ++a;
    }
    return inner; // inner 함수 리턴
}
let innerFunc3 = outerFunc3();
console.log(innerFunc3()); // 2
console.log(innerFunc3()); // 3
