```
모든 출처는 코어 자바스크립트에 있습니다.
```

# CH 03. this

- 자바스크립트에서의 this는 어디서든 사용할 수 있음. 상황에 따라 this가 바라보는 대상이 달라짐

  -> 어떤 이유로 그렇게 되는지를 파악하기 힘들거나 예상과 다르게 엉뚱한 대상을 바라보는 경우가 생김



- this는 함수와 객체(메서드)의 구분을 확실하게 해줌



---
## 3-1. 상황에 따라 달라지는 this

- 기본적으로, this는 실행 컨텍스트가 생성될 때 함께 결정됨 => this**는 함수를 호출할 때 결정됨**

  따라서 **함수를 어떤 방식으로 호출하느냐에 따라 값이 달라짐**



### 3-1-1. 전역 공간에서의 this

- 전역 공간에서 `this`는 전역 객체를 가리킴 (개념상 전역 컨텍스트를 생성하는 주체가 전역 객체이기 때문에)
  - 브라우저 환경에서의 전역객체 : `window`
  - Node.js 환경에서의 전역객체 : `global`

- 예제 3-1. 전역 공간에서의 this(브라우저 환경)

  ```javascript
  console.log(this);    // { alert: f(), atob: f(), blur:f(), btoa:f(),... }
  console.log(window);  // { alert: f(), atob: f(), blur:f(), btoa:f(),... }
  console.log(this === window); // true
  ```

  

- 예제 3-2. 전역 공간에서의 this(Node.js 환경)

  ```javascript
  console.log(this);    // { process: { title:'node', version: 'v10.13.0'} }  
  console.log(global);  // { process: { title:'node', version: 'v10.13.0'} } 
  console.log(this === global) // true
  ```



> 전역공간에서만 발생하는 자바스크립트의 성질
>
> ---
>
> 전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로도 할당
>
> 변수이면서 객체의 프로퍼티인 셈



- 예제 3-3. 전역변수와 전역객체(1)

  ```javascript
  var a = 1;
  console.log(a);        // 1
  console.log(window.a); // 1
  console.log(this.a)		 // 1
  ```

  - **자바스크립트의 모든 변수는 실은 특정 객체의 프로퍼티**로서 동작하기에 window.a // this.a 모두 1 출력

  - var 연산자를 이용해 변수를 선언하더라도 실제 자바스크립트 엔진은 어떤 객체의 프로퍼티로 인식함

  - 특정 객체란 바로 **실행 컨텍스트의 LexicalEnvironment(L.E)**임

    이후 어떤 변수를 호출하면 L.E를 조화해서 일치하는 프로퍼티가 있을 경우 그 값을 반환

    전역 컨텍스트의 경우 L.E는 전역객체를 그대로 참조

  > 전역변수를 선언하면 자동으로 전역객체의 프로퍼티로도 할당함 => 틀린 말
  >
  > 전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당한다 => 정확한 표현

  - window.a나 this.a가 1이 나오는 이유는 설명이 되는데, **a를 직접 호출할 때도 1이 나오는 까닭은 무엇인가**

    -> 이는 변수 a에 접근하고자 하면 스코프 체인에서 a를 검색하다가 가장 마지막에 도달하는 전역 스코프의 L.E, 

    ​    즉 **전역 객체**에서 해당 프로퍼티 a를 발견해서 그 값을 반환하기 때문 (window.)이 생략된 것과도 같음



- 예제 3-4. 전역변수와 전역객체(2) - window의 프로퍼티에 직접 할당해도 var로 선언한 것과 똑같이 동작함

  ```javascript
  var a = 1;
  window.b = 2;
  console.log(a, window.a, this.a); // 1 1 1
  console.log(b, window.b, this.b); // 2 2 2
  
  window.a = 3;
  b = 4;
  console.log(a, window.a, this.a); // 3 3 3
  console.log(b, window.b, this.b); // 4 4 4
  ```

  

- 예제 3-5. 전역변수와 전역객체(3) - 전역변수 선언과 전역객체의 프로퍼티 할당 사이에 전혀 다른 경우 (**삭제 명령시**)

  ```javascript
  var a = 1;
  delete window.a; 								 // false
  console.log(a, window.a, this.a) // 1 1 1
  ```

  ```javascript
  var b = 2;
  delete b; 											 // false
  console.log(b, window.b, this.b) // 2 2 2
  ```

  ```javascript
  window.c = 3;
  delete window.c; 								  // true
  console.log(c, window.c, this.c); // Uncaught ReferenceError: c is not defined
  ```

  ```javascript
  window.d = 4;
  delete d;												  // true
  console.log(d, window.d, this.d); // Uncaught ReferenceError: d is not defined
  ```

  - 변수에 delete 연산자를 쓰는 것은 (window.)을 생략한 것과도 같음 (전역변수가 곧 전역객체의 프로퍼티이므로)

    - **처음부터 전역객체의 프로퍼티로 할당한 경우** : 삭제가 됨
    - **전역변수로 선언한 경우** : 삭제가 되지 않음

  - 전역변수를 선언하면 자바스크립트 엔진이 이를 자동으로 전역객체의 프로퍼티로 할당하면서

    추가적으로 **해당 프로퍼티의 configurable 속성(변경 및 삭제 가능성)**을 `false`로 정의

    => 이처럼 var로 선언한 전역변수와 전역객체의 프로퍼티는 **호이스팅 여부** 및 **configurable**여부에서 차이를 보임



### 3-1-2. 메서드로서 호출할 때 그 메서드 내부에서의 this

#### 1. 함수 vs 메서드

- 어떤 함수를 실행하는 방법은 여러 가지가 있는데, 가장 일반적인 방법 두가지는 `함수로서 호출하는 경우`와 `메서드로서 호출하는 경우`
- 함수와 메서드는 미리 정의한 동작을 수행하는 코드 뭉치로, 이 둘을 구분하는 유일한 차이는 **독립성**에 있음
  - 함수 : 그 자체로 독립적인 기능을 수행
  - 메서드 : 자신을 호출한 대상 객체에 관한 동작을 수행



- 어떤 함수를 객체의 프로퍼티에 할당한다고 해서 그 자체로 무조건 메서드가 되는 것이 아니라

  객체의 메서드로서 호출할 경우에만 메서드로 동작하고, 그렇지 않으면 함수로 동작함

  

- 예제 3-6. 함수로서 호출, 메서드로서 호출
  

  ```javascript
  01 var func = function(x){
  02   console.log(this, x);
  03 }
  04 func(1);        // window { ... } 1
  05
  06 var obj = {
  07   method: func
  08 };
  09 obj.method(2); // { method: f } 2
  ```

  - 1번째 줄 : func라는 변수에 **익명함수**를 할당함
  - 4번째 줄 : func를 호출했더니 this로 **전역객체 window**가 출력됨
  - 6번째 줄 : obj라는 변수에 **객체**를 할당하는데, 그 객체의 `method` 프로퍼티에 앞에서 만든 func 함수를 할당
  - 9번째 줄 : obj, method를 호출했더니, this로 **obj**가 호출됨

  

  - 즉 원래는 익명함수는 그대로인데 이를 변수에 담아 호출한 경우와 obj 객체의 프로퍼티에 할당해서 호출한 경우에 this가 달라짐



- 예제 3-7. 메서드로서 호출 - 점 표기법, 대괄호 표기법

  ```javascript
  var obj = {
    method: function (x) { console.log(this, x); }
  }
  obj.method(1);    // { method: f } 1
  obj['method'](2); // { method: f } 2
  ```

  - 어떤 함수를 호출할 때 **그 함수 이름(프로퍼티) 앞에 객체가 명시돼 있는 경우에는 메서드로 호출**한 것이고, 

    **그렇지 않은 모든 경우에는 함수로 호출**한 것



#### 2. 메서드 내부에서의 this

- this에는 호출한 주체에 대한 정보가 담김
  - 어떤 함수를 **메서드로서 호출하는 경우** 호출 주체는 바로 **함수명(프로퍼티명) 앞의 객체**임
  - 점 표기법의 경우) 마지막 점 앞에 명시된 객체가 this임



- 예제 3-8. 메서드 내부에서의 this

```javascript
var obj = {
  methodA :  function() { console.log(this); },
  inner : {
    methodB : function() { console.log(this); }
  }
};
obj.methodA();             // { methodA: f, inner: {...} } (=== obj)
obj['methodA']();          // { methodA: f, inner: {...} } (=== obj)

obj.inner.methodB();       // { methodB: f }               (=== obj.inner)
obj.inner['methodB']();    // { methodB: f }               (=== obj.inner)
obj['inner'].methodB();    // { methodB: f }               (=== obj.inner)
obj['inner']['methodB'](); // { methodB: f }               (=== obj.inner)
```



### 3-1-3. 함수로서 호출할 때 그 함수 내부에서의 this

#### 1. 함수 내부에서의 this

- 어떤 함수를 **함수로서 호출할 경우**에는 this가 지정되지 않음

  - 함수로서 호출하는 것은 호출 주체(객체지향 언어에서의 객체)를 명시하지 않고,

    개발자가 코드에 직접 관여해서 실행한 것이기에 **호출 주체의 정보를 알 수 없음**



- 실행 컨텍스트를 활성화할 당시에 this가 지정되지 않은 경우 this는 전역 객체를 바라봄

  따라서 **함수에서의 this는 전역 객체를 가리킴**

  => 더글라스 크락포드(Douglas Crockford)의 지적 - **설계상의 오류**

  

#### 2. 메서드의 내부함수에서의 this

- **내부함수** 역시 `함수`로서 호출했는지 `메서드`로서 호출했는지만 파악하면 값을 예측할 수 있음



- 예제 3-9. 내부함수에서의 this

  ```javascript
  01 var obj1 = {
  02 	outer : function(){
  03    console.log(this);           // (1)
  04    var innerFunc = function(){
  05    	console.log(this);         // (2) (3)
  06    }
  07    innerFunc();
  08    
  09    var obj2 = {
  10      innerMethod: innerFunc
  11    };
  12    obj2.innerMethod();
  13  }
  14 };
  15 obj1.outer();
  ```

  - 결과) **(1): obj1, (2): 전역객체(Windwo), (3): obj2**

  - 1번째 줄 : 객체를 생성하는데, 이때 객체 내부에는 outer라는 프로퍼티가 있으며, 여기에는 `익명함수`가 연결됨

    ​				 이렇게 생성한 객체를 변수 obj1에 할당함

  - 15번째 줄 : **obj1.outer 호출**

  - 2번째 줄 : obj1.outer 함수의 실행 컨텍스트가 생성되면서 호이스팅하고, 스코프 체인 정보를 수집하고, **this를 바인딩함**

    ​				이 함수는 호출할 때 함수명인 outer 앞에 점(.)이 있었으므로 **메서드로서 호출한 것임**

    ​				따라서 this에는 마지막 점 앞의 객체인 **obj1이 바인딩됨**

  - 3번째 줄 : obj1 객체 정보 출력

  - 4번째 줄 : 호이스팅된 변수 innerFunc는 outer 스코프 내에서만 접근할 수 있는 `지역변수`임

    ​				이 지역변수에 익명 함수 할당

  - 7번째 줄 : **innerFunc 호출**

  - 4번째 줄 : innerFunc 함수의 실행 컨텍스트가 생성되면서 호이스팅,스코프 체인 수집, **this를 바인딩함**

    ​				이 함수는 호출할 때 함수명인 outer 앞에 점(.)이 없었으므로 **함수로서 호출한 것임**

    ​				따라서 this가 지정되지 않았고, 자동으로 스코프 체인상의 최상위 객체인 **전역객체(Window)가 바인딩됨**

  - 5번째 줄 : Window 객체 정보 출력

  - 9번째 줄 : 호이스팅된 변수 obj2 역시 outer 스코프 내에서만 접근할 수 있는 `지역변수`임

    ​				여기에는 다시 객체를 할당하는데, 그 객체에는 innerMethod라는 프로퍼티가 있으며, 

    ​				앞서 정의된 변수 innerFunc와 연결된 익명 함수가 연결됨

  - 12번째 줄 : **obj2.innerMethod 호출**

  - 9번째 줄 : obj2.innerMethod 함수의 실행 컨텍스트가 생성됨

    ​				이 함수는 호출할 때 함수명인 innerMethod 앞에 점(.)이 있었으므로 **메서드로서 호출한 것임**

    ​				따라서 this에는 마지막 점 앞의 객체인 **obj2가 바인딩됨**

  - 10번쨰 줄 : obj2 객체 정보 출력





#### 3. 메서드의 내부함수에서의 this를 우회하는 방법

- **호출 주체가 없을 때 ** 자동으로 전역객체를 바인딩하지 않고 호출 당시 주변 환경의 this를 그대로 상속받아 사용할 수 있다면?

  - 훨씬 자연스럽고 자바스크립트 설계상 이렇게 동작하는 것이 스코프 체인과의 일관성을 지킬 수 있음

  - 변수를 검색하면, 우선 가장 가까운 스코프의 L.E를 찾고 없으면 상위 스코프를 탐색하듯이,

    this 역시 현재 컨텍스트에 바인딩된 대상이 없으면 직전 컨텍스트의 this를 바라볼 수 있게끔 하면 좋을듯

- 하지만 자체적으로 내부함수에 this를 상속할 방법은 없음. 그래서 **우회하는 방법**을 사용 (**변수를 활용하는 것**)



- 예제 3-10. 내부함수에서의 this를 우회하는 방법

  ```javascript
  var obj = {
    outer: function(){
      console.log(this);          // (1) { outer: f }
      var innerFunc1 = function(){
        console.log(this);        // (2) Window {...}
      };
      innerFunc1();
      
      // outer 스코프에서 self라는 변수에 this를 저장 -> 상위 스코프의 this를 저장해서 내부함수에서 활용
      var self = this;           
      var innerFunc2 = function(){
        console.log(self);       // (3) { outer: f }
      };
      innerFunc2();
    }
  };
  obj.outer();
  ```



#### 4. this를 바인딩하지 않는 함수

- ES6에서는 함수 내부에서 this가 전역객체를 바라보는 문제를 보완하고자, this를 바인딩하지 않는 **화살표 함수(arrow function)** 도입
- 실행 컨텍스트를 생성할 때 **this 바인딩 과정 자체가 빠지게 되어, 상위 스코프의 this를 그대로 활용할 수 있음**



- 예제 3-11. this를 바인딩하지 않는 함수(화살표 함수)

  ```javascript
  var obj = {
    outer: function(){
      console.log(this);    // (1) { outer: f }
      var innerFunc = () => { 
        console.log(this);  // (2) { outer: f }
      };
      innerFunc();
    }
  };
  obj.outer();
  ```

  

### 3-1-4. 콜백 함수 호출 시 그 함수 내부에서의 this

- 함수 A의 제어권을 다른 함수(혹은 메서드) B에게 넘겨주는 경우 함수 A를 `콜백 함수`라고 함

  - 이때 함수 A는 함수 B의 내부 로직에 따라 실행되며, this 역시 함수 B의 내부 로직에서 정한 규칙에 따라 값이 결정됨

- 콜백 함수도 함수이기에 기본적으로는 this가 전역객체를 참조하지만, 

  제어권을 받은 함수에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 참조함



- 예제 3-12. 콜백 함수 내부에서의 this

  ```javascript
  setTimeout(function() {console.log(this);}, 300);        // (1)
  
  [1,2,3,4,5].forEach(function(x){                         // (2)
    console.log(this,x);
  });
  
  document.body.innerHTML += '<button id="a">클릭</button>'
  document.body.querySelector('#a')
    .addEventListener('click',function(e){                // (3)
    		console.log(this,e);
  });
  ```

  (1) : setTimeout 함수는 300ms 만큼 시간 지연을 한 뒤 콜백 함수를 실행하라는 명령, **0.3초 뒤 전역객체 출력됨**

  (2) : forEach 메서드는 배열의 각 요소를 앞에서부터 차례로 하나씩 꺼내어 그 값을 콜백 함수의 첫 번째 인자로 삼아 함수로 실행하라는 명령.

  ​		**전역객체와 배열의 각 요소가 총 5회 출력됨**

  (3) : addEventListener는 지정한 HTML 엘리먼트에 'click' 이벤트가 발생할 때마다 

  ​		그 이벤트 정보를 콜백 함수의 첫 번째 인자로 삼아 함수를 실행하라는 명령.

  ​		**버튼을 클릭하면 앞서 지정한 엘리먼트와 클릭 이벤트에 관한 정보가 담긴 객체가 출력됨**

  

  - (1),(2)의 함수와 메서드는 그 내부에서 콜백 함수를 호출할 때 대상이 될 this 지정하지 않음 -> this : 전역 객체 참조
  - (3)의 메서드는 콜백 함수를 호출할 때 자신의 this를 상속하도록 정의되어 있음 -> this : 메서드명의 점(.) 앞부분



### 3-1-5. 생성자 함수 내부에서의 this

- 생성자 함수 : 어떤 공통된 성질을 지니는 객체들을 생성하는 데 사용하는 함수
  - 객체지향 언어에서는 생성자를 `클래스(class)`, 클래스를 통해 만든 객체를 `인스턴스(instance)`라고 함
  - `생성자` : **구체적인 인스턴스를 만들기 위한** 일종의 **틀**



- 자바스크립트는 함수에 **생성자로서의 역할**을 함께 부여함
  - `new 명령어`와 함께 함수를 호출하면 해당 함수가 생성자로서 동작함
  - 어떤 함수가 생성자 함수로서 호출된 경우 **내부에서의 this**는 곧 새로 만들 구체적인 **인스턴스 자신**이 됨



- 생성자 함수를 호출(new 명령어 사용)하면 우선 생성자의 prototype 프로퍼티를 참조하는 `__proto__`라는 프로퍼티가 있는 객체(인스턴스)를 만듦

  미리 준비된 공통 속성 및 개성을 해당 객체(this)에 부여. 이렇게 해서 구체적인 인스턴스가 만들어짐



- 예제 3-13. 생성자 함수

  ```javascript
  01 var Cat = function(name, age){
  02   this.bark = '야옹';
  03   this.name = name;
  04   this.age = age;
  05 };
  06 var choco = new Cat('초코',7);
  07 var nabi = new Cat('나비',5);
  08 console.log(choco,nabi);
  
  /* 결과
  Cat { bark: '야옹', name: '초코', age: 7 }
  Cat { bark: '야옹', name: '나비', age: 5 }
  */
  ```

  - Cat이란 변수에 `익명 함수 ` 할당. 이 함수 내부에서는 this에 접근해서 bark, name, age 프로퍼티에 각각 값을 대입

  - 6번째, 7번째 줄에서는 new 명령어와 함께 Cat 함수를 호출해서 변수 choco,nabi에 각각 할당

  - 8번쨰 줄에서 choco와 nabi를 출력해보니 각각 Cat 클래스의 **인스턴스 객체**가 출력됨

  - 즉 6번째 줄에서 실행한 생성자 함수 내부에서의 this는 **choco 인스턴스**를,

    7번째 줄에서 실행한 생성자 함수 내부에서의 this는 **nabi 인스턴스**를 가리킴



---
## 3-2. 명시적으로 this를 바인딩하는 방법

- this에 별도의 대상을 바인딩하는 방법도 있음



### 3-2-1. call 메서드
   `Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])`

---

- `call 메서드`는 메서드의 호출 주체인 함수를 **즉시 실행**하도록 하는 명령
  - call 메서드의 첫 번째 인자를 this로 바인딩하고, 이후의 인자들을 호출할 함수의 매개변수로 함
  - 함수를 그냥 실행하면 this는 전역객체를 참조하지만 call 메서드를 이용하면 **임의의 객체를 this로 지정할 수 있음**




- 예제 3-14. call 메서드(1)

  ```javascript
  var func = function (a,b,c){
    console.log(this,a,b,c);
  };
  
  func(1,2,3);								   // Window{...} 1 2 3 -> 전역객체 참조
  func.call({ x: 1 }, 4, 5, 6);  // { x: 1 } 4 5 6 -> 임의의 객체 지정
  ```



- 예제 3-15. call 메서드(2)

  ```javascript
  var obj = {
    a: 1,
    method: function(x,y) {
      console.log(this.a, x, y);
    }
  };
  
  obj.method(2,3);								  // 1 2 3
  obj.method.call({ a: 4 }, 5, 6);  // 4 5 6
  ```

  

### 3-2-2. apply 메서드

`Function.prototype.apply(thisArg[, argsArray])`

---

- call 메서드와 기능적으로 완전히 동일
  - `call 메서드` : 첫 번째 인자를 제외한 나머지 모든 인자들을 호출할 함수의 매개변수로 지정
  - `apply 메서드` :  **두 번째 인자를 배열**로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정



- 예제 3-16. apply 메서드

  ```javascript
  var func = function (a, b, c){
    console.log(this, a, b, c);
  };
  func.apply({x: 1}, [4,5,6]);       // { x: 1 } 4 5 6 
  
  var obj = {
    a: 1,
    method: function(x,y) {
      console.log(this.a, x, y);
    }
  };
  obj.method.apply({ a: 4 }, [5, 6] ) // 4 5 6
  ```

  



### 3-2-3. call / apply 메서드의 활용

#### 1. 유사배열객체(array-like object)에 배열 메서드를 적용

- 예제 3-17. call/apply 메서드의 활용 1-1) 유사배열객체에 배열 메서드를 적용

  ```javascript
  01 var obj = {
  02   0: 'a',
  03   1: 'b',
  04   2: 'c',
  05   length: 3
  06 };
  07 Array.prototype.push.call(obj,'d');
  08 console.log(obj);
  09
  10 var arr = Array.prototype.slice.call(obj);
  11 console.log(arr);
  ```

  - 객체에는 **배열 메서드를 직접 적용할 수 없음**

    그러나 **키가 0 또는 양의 정수인 프로퍼티가 존재하고** length **프로퍼티의 값이 0 또는 양의 정수인 객체 **,

    즉 배열의 구조와 유사한 객체의 경우(`유사배열객체`) call 또는 apply 메서드를 이용해 배열 메서드를 차용할 수 있음

  - 7번째 줄에서는 배열 메서드인 push를 객체 obj에 적용해 프로퍼티 3에 'd'를 추가함

  - 10번째 줄에서는 slice 메서드를 적용해 객체를 배열로 전환함

    - slice 메서드는 원래 시작 인덱스값과 마지막 인덱스값을 받아 시작값부터 마지막값의 앞부분까지의 배열 요소를 추출하는 메서드인데

      매개변수를 아무것도 넘기지 않을 경우에는 그냥 원본 배열의 **얕은 복사본**을 반환함

  - call 메서드를 이용해 원본인 유사배열객체의 얕은 복사를 수행한 것인데,

    slice 메서드가 배열 메서드이기에 복사본은 배열로 반환하게 된 것

    

  - 함수 내부에서 접근할 수 있는 **arguments 객체**도 유사배열객체이므로 배열로 전환해서 활용할 수 있음

    querySelectorAll, getElementsByClassName 등의 Node 선택자로 선택한 결과인 **NodeList**도 마찬가지



- 예제 3-18. call/apply 메서드의 활용 1-2) arguments,NodeList에 배열 메서드를 적용

  ```javascript
  function a(){
    var argv = Array.prototype.slice.call(arguments);
    argv.forEach(function(arg){
      console.log(arg);
    });
  }
  a(1,2,3);
  
  document.body.innerHTML = '<div>a</div><div>b</div><div>c</div>';
  var nodeList = document.querySelectorAll('div');
  var nodeArr = Array.prototype.slice.call(nodeList);
  nodeArr.forEach(function(node){
    console.log(node);
  }); 
  ```

  - 배열처럼 인덱스와 length 프로퍼티를 지니는 문자열에 대해서도 마찬가지임

  - 단, 문자열의 경우 length 프로퍼티가 읽기 전용이기 떄문에 원본 문자열에 변경을 가하는 메서드(push,pop,shift,unshift,splice등)는 에러

    concat처럼 대상이 반드시 배열이어야 하는 경우에는 에러는 나지 않지만 제대로 된 결과를 얻을 수 없음



- 예제 3-19. call/apply 메서드의 활용 1-3) 문자열에 배열 메서드 적용 예시

  ```javascript
  var str = 'abc def';
  
  Array.prototype.push.call(str, ', pushed string');
  // Error: Cannot assign to read only property 'length' of object [object String]
  
  Array.prototype.concat.call(str, 'string'); // [String {"abc def"}, "string"]
  
  Array.prototype.every.call(str,function(char) { return char !== ' '; }) // false
  
  Array.prototype.some.call(str,function(char) { return char === ' '; }) // true
  
  var newArr = Array.prototype.map.call(str, function(char){ return char + '!'; });
  
  console.log(newArr); // ['a!', 'b!', 'c!', '!', 'd!', 'e!', 'f!']
  
  var newStr = Array.prototype.reduce.apply(str,[
    function(stirng, char, i){ return stirng + char + i; },
    ''
  ]);
  console.log(newStr);  // "a0b1c2 3d4e5f6"
  ```

  - slice 메서드는 오직 배열 형태로 복사하기 위해 차용됐을 뿐이니 의도 파악에 힘듦

    ES6는 유사배열객체 또는 순회 가능한 모든 종류의 데이터 타입을 배열로 전환하는 `Array.from` 메서드 새로 도입



- 예제 3-20. call/apply 메서드의 활용 1-4) ES6의 Array.from 메서드

  ```javascript
  var obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
  };
  var arr = Array.from(obj); // 배열로 전환
  console.log(arr);   // ['a', 'b', 'c']
  ```






#### 2. 생성자 내부에서 다른 생성자를 호출

- 생성자 내부에 다른 생성자와 공통된 내용이 있을 경우 call 또는 apply를 이용해 다른 생성자를 호출하면 간단하게 반복을 줄일 수 있음



- 예제 3-21. call/apply 메서드의 활용 2) 생성자 내부에서 다른 생성자를 호출

  ```javascript
  function Person(name,gender){
    this.name = name;
    this.gender = gender;
  }
  function Student(name,gender,school){
    Person.call(this,name,gender);
    this.company = company;
  }
  function Employee(name,gender,company){
    Person.apply(this, [name,gender]);
    this.company = company;
  }
  var by = new Student('보영','female','단국대');
  var jn = new Employee('재난','male','구골');
  ```





#### 3. 여러 인수를 묶어 하나의 배열로 전달하고 싶을 때 - apply 활용

- 여러 개의 인수를 받는 메서드에게 하나의 배열로 인수들을 전달하고 싶을 때 `apply` 메서드 사용
  - 예를 들어, 배열에서 최대/최솟값을 구해야 할 경우 apply를 사용하지 않는다면 다음과 같은 방식으로 구현



- 예제 3-22. call/apply 메서드의 활용 3-1) 최대/최솟값을 구하는 코드를 직접 구현

  ```javascript
  var numbers = [10, 20, 3, 16, 45];
  var max = min = numbers[0];
  numbers.forEach(function(number){
    if (number > max){
      max = number;
    }
    if (number < min){
      min = number;
    }
  });
  console.log(max, min);    // 45 3
  ```

  - 코드가 불필요하게 길고 가독성도 떨어짐 => `Math.max/Math.min` 메서드에 `apply` 적용하면 간단해짐



- 예제 3-23. call/apply 메서드의 활용 3-2) 여러 인수를 받는 메서드(Math.max, Math.min)에 apply를 적용

  ```javascript
  var numbers = [10, 20, 3, 16, 45];
  var max = Math.max.apply(null, numbers);
  var min = Math.min.apply(null, numbers);
  console.log(max,min); // 45 3 
  ```

  - ES6에서는 펼치기 연산자(spread operator)를 이용하면 apply를 적용하는 것보다 더욱 간편하게 작성 가능



- 예제 3-24. call/apply 메서드의 활용 3-3) ES6의 펼치기 연산자 활용

  ```javascript
  const number = [10, 20, 3, 16, 45];
  const max = Math.max(...numbers);
  const min = Math.min(...numbers);
  console.log(max, min);
  ```

  

❗️call/apply 메서드는 명시적으로 별도의 this를 바인딩하면서 함수 또는 메서드를 실행할 수 있지만, 오히려 **this를 예측하기 어렵게 만듦**



### 3-2-4. bind 메서드

`Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])`

---

- call과 비슷하지만 즉시 호출하지는 않고 **넘겨 받은 this 및 인수들을 바탕으로 새로운 함수를 반환**하기만 하는 메서드
- 다시 새로운 함수를 호출할 때 인수를 넘기면 그 인수들은 기존 bind 메서드를 호출할 때 전달했던 인수들의 뒤에 이어서 등록됨
- bind 메서드의 두 가지 목적
  - **함수에 this를 미리 적용하는 것**
  - **부분 적용 함수를 구현하는 것**



- 예제 3-25. bind 메서드 - this 지정과 부분 적용 함수 구현

  ```javascript
  01 var func = function(a, b, c, d){
  02  console.log(this, a, b, c, d);
  03 };
  04 func(1, 2, 3, 4);  								   // Window{ ... } 1 2 3 4
  05 
  06 var bindFunc1 = func.bind({ x: 1 });  
  07 bindFunc1(5,6,7,8);									 // { x: 1 } 5 6 7 8
  08 
  09 var bindFunc2 = func.bind({ x: 1 }, 4, 5);
  10 bindFunc2(6, 7);										   // { x: 1 } 4 5 6 7
  11 bindFunc2(8, 9); 										 // { x: 1 } 4 5 8 9
  ```

  - 6번째 줄에서 `bindFunc1` 변수에는 func에 **this를 { x: 1 }로 지정**한 새로운 함수가 담김
  - 7번째 줄에서 bindFunc1을 호출하면 원하는 결과를 얻을 수 있음
  - 한편, 9번째 줄의 `bindFunc2` 변수에는 func에 **this를 { x: 1 }**로 지정하고, 앞에서부터 두 개의 인수를 각각 4,5로 지정한 새로운 함수를 담음
  - 10번째 줄에서 매개변수로 6,7을 넘기면 this 값이 바뀐 것을 제외하고는 최초 func 함수에 4,5,6,7을 넘긴 것과 같은 동작을 함 (=11번째 줄)
  - 6번째 줄의 bind는 **this만을 지정한 것**이고, 9번째 줄의 bind는 **this 지정과 함께 부분 적용 함수를 구현한 것**임



#### 1. name 프로퍼티

- bind 메서드를 적용해서 새로 만든 함수는 **name 프로퍼티에 동사  bind의 수동태인 `bound`라는 접두어가 붙는다는** 성질이 있음
- 어떤 함수의 name 프로퍼티가 'bound xxx'라면 이는 곧 함수명이 xxx인 원본 함수에 bind 메서드를 적용한 새로운 함수라는 의미가 됨
  - 기존의 call이나 apply보다 코드를 추적하기에 더 수월해짐



- 예제 3-26. bind 메서드 - name 프로퍼티

  ```javascript
  var func = function (a, b, c, d){
    console.log(this, a, b, c, d);
  };
  var bindFunc = func.bind({ x: 1 }, 4, 5);
  console.log(func.name);									// func
  console.log(bindFunc.name);							// bound func
  ```

  

#### 2. 상위 컨텍스트의 this를 내부함수나 콜백 함수에 전달하기

- call, apply 또는 bind 메서드를 이용하여 **메서드의 내부함수에서 메서드의 this를 그대로 바라보게 할 수 있음** (self 변수 우회법보다 깔끔함)



- 예제 3-27. 내부함수에 this 전달 - call vs bind

  ```javascript
  // call
  var obj = {
    outer: function(){
      console.log(this);
      var innerFunc = function(){
        console.log(this);
      };
      innerFunc.call(this);
    }
  };
  obj.outer();
  ```
  
  ```javascript
  // bind
  var obj = {
    outer: function(){
      console.log(this);
      var innerFunc = function(){
        console.log(this);
      }.bind(this);
      innerFunc();
    }
  };
  obj.outer();
  ```



- 또한 콜백 함수를 인자로 받는 함수/메서드 중에서 **기본적으로 콜백 함수 내에서의  this에 관여하는 함수/메서드**에 대해서도 **bind 메서드**를 이용하면

  This 값을 사용자의 입맛에 맞게 변경 가능



- 예제 3-28. bind 메서드 - 내부함수에 this 전달

  ```javascript
  var obj = {
    logThis: function(){
      console.log(this);
    },
    logThisLater1: function(){
      serTimeout(this.logThis, 500);
    },
    logThisLater2: function(){
      setTimeout(this.logThis.bind(this), 1000);
    }
  };
  obj.logThisLater1();  // Window { ... }
  obj.logThisLater2();  // obj { logThis: f, ... }
  ```

  

### 3-2-5. 화살표 함수의 예외사항

- ES6에서 도입된 화살표 함수는 **실행 컨텍스트 생성 시 this를 바인딩하는 과정이 제외됨**

  즉 이 함수 내부에는 this가 아예 없으며, 접근하고자 하면 **스코프체인상 가장 가까운 this에 접근**



- 예제 3-29. 화살표 함수 내부에서의 this (예제 3-27의 내부함수를 화살표 함수로 수정)

  ```javascript
  var obj = {
    outer: function(){
      console.log(this);
      var innerFunc = () => {
        console.log(this);
      }
      innerFunc();
    }
  };
  obj.outer();
  ```

  - 별도의 변수로 우회하거나 call/apply/bind를 적용할 필요가 없어 더욱 간결하고 편리함





### 3-2-6. 별도의 인자로 this를 받는 경우(콜백 함수 내에서의 this)

- 콜백 함수를 인자로 받는 메서드 중 일부는 추가로 this를 지정할 객체(**thisArg**)를 인자로 지정할 수 있는 경우가 있음

  이러한 메서드의 thisArg 값을 지정하면 **콜백 함수 내부**에서 **this의 값을 원하는 대로 변경 가능**

- 이런 형태는 **배열 메서드**에 많이 포진(여러 내부 요소에 대해 같은 동작을 반복 수행해야하는 메서드)

  (+ ES6 - Set, Map)



- 예제 3-30. thisArg를 받는 경우 예시 - **forEach** 메서드

  ```javascript
  var report = {
    sum: 0,  				 								// report 객체의 프로퍼티 1
    count: 0, 			 								// report 객체의 프로퍼티 2
    add: function(){ 								// report 객체의 메서드 1
      var args = Array.prototyper.slice.call(arguments); // arguments를 배열로 변환해서 args 변수에 담음
      args.forEach(function(entry){											 
        // 배열을 순회하면서 콜백 함수를 실행 
        // (이때 콜백 함수 내부에서의 this는 forEach 함수의 두 번째 인자로 전달해준 this가 바인딩됨)
        this.sum += entry;
        ++this.count;
      },this);
    },
    average: function(){ 						// report 객체의 메서드 2
      return this.sum / this.count; // average 메서드는 sum 프로퍼티를 count 프로퍼티로 나눈 결과를 반환하는 메서드임
    }
  };
  
  // 60, 85, 95를 인자로 삼아 add 메서드를 호출하면 이 세 인자를 배열로 만들어 forEach 메서드가 실행됨 
  report.add(60. 85, 95);	
  
  // 콜백 함수 내부에서의 this는 add 메서드에서의 this가 전달된 상태이므로 add 메서드의 this(report)를 그대로 가리키고 있음
  // 따라서 배열의 세 요소를 순회하면서 report.sum 값, report.count 값이 차례로 바뀌고, 순회를 마치며 각각 240, 3이 담김
  console.log(report.sum, report.count, report.average()); // 240 3 80
  ```

  

- 이 밖에 thisArg를 인자로 받는 메서드

  ```javascript
  Array.prototype.forEach(callback[, thisArg])
  Array.prototype.map(callback[, thisArg])
  Array.prototype.filter(callback[, thisArg])
  Array.prototype.some(callback[, thisArg])
  Array.prototype.every(callback[, thisArg])
  Array.prototype.find(callback[, thisArg])
  Array.prototype.findIndex(callback[, thisArg])
  Array.prototype.flatMap(callback[, thisArg])
  Array.prototype.from(arrayLike[, callback[, thisArg]])
  Set.prototype.forEach(callback[, thisArg])
  Map.prototype.forEach(callback[, thisArg])
  ```
