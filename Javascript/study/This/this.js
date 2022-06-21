'use strict';
// // 연습 1
// let person = {
//     name : 'kim',
//     age: 24,
//     hello : function(){
//         console.log(this);
//         console.log('hello',this.name);
//     }
// }

// // 1. 메서드로서 호출
// person.hello(); // this는 호출한 객체(person)

// // 2. 함수로서 호출
// let personFunc = person.hello;
// personFunc(); // this는 window (global)
// -------------------------------------------

// 연습 2
let person2 = {
    name: 'lee',
    age: 20,
    hello : function(){
        setTimeout(function(){
            console.log('hello');
            console.log(this);
            console.log(this.name);
        },1000);
    }, // this는 window(global)
    helloBinded : function(){
        setTimeout(function(){
            console.log('helloBinded')
            console.log(this);
            console.log(this.name);
        }.bind(this),1000);
    } // this는 person2 객체
};

// person2.hello();        // this는 전역 객체
// person2.helloBinded();  // this는 person2 객체

// -------------------------------------------

// 연습 3
let btn = document.querySelector('button');
// console.log(btn);
btn.addEventListener('click',function(){
    console.log(this);
})

// 연습 4 - 화살표 함수 (ES6)
// 자신을 포함하고 있는 외부 Scope에서 this를 물려받음
let person3 = {
    name: 'kimCW',
    age: 24,
    hello: function(){
        setTimeout(function(){
            console.log(this);
        },1000); 
    },
    hello2: function(){
        setTimeout(() => {
            console.log(this);
        },1000);
    }
};
// person3.hello(); // this는 전역 객체
// person3.hello2(); // 화살표 함수 상위의 scope에서 this를 물려받음 -> this는 person3


// 연습 5 - this 저장해놓기
let person4 = {
    name: 'lee!',
    age: 20,
    
    hello: function(){
        let that = this; // this를 별도 변수에 저장해놓음
        console.log(that);
        console.log(that.name);
    },
};
person4.hello(); // this는 person4

// 연습 6 - 엄격 모드(strict mode)
// 'use strict' 사용 시 undefined로 뜸
function printThis(){
    console.log(this);
}
printThis(); // undefined