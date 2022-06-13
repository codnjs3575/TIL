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

### - 함수 vs 메서드

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



### - 메서드 내부에서의 this



### 3-1-3.

### 3-1-4.

### 3-1-5.

