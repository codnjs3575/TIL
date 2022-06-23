```
모든 출처는 코어 자바스크립트에 있습니다.
```

# CH 05. Closure

## 05-01. 클로저의 의미 및 원리 이해



### 1. < **MDN의 클로저 정의** >

---
> **MDN(Mozila Developer Network)**의 **클로저** 정의
>
> ---
>
> A closure is the **combination** of a **function** and the **lexical environment** within which that function was declared.
>
> ( 클로저는 함수와 그 함수가 선언될 당시의 L.E의 상호관계에 따른 현상 )



- **선언될 당시의 lexical environment**

​      : 실행 컨텍스트의 구성 요소 중 하나인 outerEnvironmentReference에 해당함
​	    lexicalEnvironment의 **environmentRecord**와 **outerEnvironmentReference**에 의해 
  	  변수의 유효 범위인 스코프가 결정되고 스코프 체인이 가능해짐



- **combination**의 의미

  : 어떤 컨텍스트 A에서 선언한 내부함수 B의 경우, 내부 함수 B가 A의 LexicalEnvironment를 언제나 사용하는 것이 아님.

   내부함수에서 외부 변수를 참조하는 경우에 한해서만 **combination** 즉, '선언될 당시의 LexicalEnvironment와의 상호관계' 임



=> 정리하자면 **클로저**란 "어떤 함수에서 선언한 변수를 참조하는 내부함수에서만 발생하는 현상"



### 2. 클로저를 설명하기 위한 예제들

- 예제 5-1. 외부 함수의 변수를 참조하는 내부 함수(1)

  ```javascript
  var outer = function(){
    var a = 1;
    var inner = function(){
      console.log(++a);
    };
    inner();
  }
  outer(); // 2
  ```

  `outer 함수`에서 **변수 a 선언**, outer 함수의 내부함수인 `inner 함수`에서 a의 값을 **1만큼 증가시킨 다음 출력**

  inner 함수 내부에서는 a를 선언하지 않았기 때문에 environmentRecord에서 값을 찾지 못하므로

  outerEnvironmentReference에 저장된 **상위 컨텍스트**인 **outer의 LexicalEnvironment**에 접근해서 a 검색 (2 출력)

  outer 함수의 실행 컨텍스트가 종료되면 LexicalEnvironment에 저장된 식별자들(a, inner)에 대한 참조를 지움 (가비지 컬렉터의 대상이 됨)



- 예제 5-2. 외부 함수의 변수를 참조하는 내부 함수(2)

  ```javascript
  var outer = function(){
    var a = 1;
    var inner = function(){
      return ++a;
    };
    return inner(); // inner 함수를 실행한 결과 리턴
  };
  var outer2 = outer();
  console.log(outer2);  // 2
  ```

  이번에도 `inner 함수` 내부에서 외부 변수인 a 사용함

  inner 함수를 **실행한 결과**를 리턴하고 있으므로 결과적으로 **outer 함수의 실행 컨텍스트가 종료된 시점**에는 a 변수를 참조하는 대상이 없어짐

  (a, inner 변수들의 값은 가비지 컬렉터의 대상이 됨)



- 예제 5-3. 외부 함수의 변수를 참조하는 내부 함수(3)

  ```javascript
  01 var outer = function(){
  02   var a= 1;
  03   var inner = function(){
  04     rerturn ++a;
  05   };
  06   return inner; // inner 함수 자체를 리턴
  07 };
  08 var outer2 = outer();
  09 console.log(outer2());  // 2
  10 console.log(outer2());  // 2
  ```

  inner 함수의 실행 결과가 아닌 inner 함수 자체를 반환함

  그러면 outer 함수의 실행 컨텍스트가 종료될 때 (8번째 줄) **outer2 변수**는 outer 실행 결과인 **inner 함수를 참조**하게 될 것

  이후 9번째 줄에서 outer2를 호출하면 앞서 반환된 함수인 **ineer**가 실핼됨

  inner 함수의 실행 컨텍스트의 environmentRecord에는 수집할 정보가 없음

  **outer-EnvironmentReference**에는 inner 함수가 선언된 위치의 LexicalEnvironment인 outer 함수의 L.E가 담길 것임

  스코프 체이닝에 따라 outer에서 선언한 변수 a에 접근해서 1만큼 증가시킨 후 그 값인 **2를 반환**하고, Inner 함수의 실행 컨텍스트 종료

  10번째 줄에서 다시 outer2를 호출하면 같은 방식으로 a를 2에서 3으로 1 증가시킨 후 **3을 반환**



❗️그런데, inner 함수 실행 시점(9번째, 10번째 줄)에는 outer 함수는 이미 실행이 종료된 상태인데 **outer 함수의 L.E에 어떻게 접근한 것일까**

​	 바로 **가비지 컬렉터의 동작 방식 때문**임. 가비지 컬렉터는 어떤 값을 참조하는 변수가 하나라도 있으면 그 값은 수집 대상에 포함시키지 않음

​	 outer 함수는 실행 종료 시점에 **inner 함수를 반환**함. 외부함수인 outer의 실행이 종료되더라도 내부 함수인 inner 함수의 실행 컨텍스트가 

​	 활성화되면 outerEnvironmentReference가 outer 함수의 L.E를 필요로 할 것이므로 **수집 대상에서 제외**됨



### 3. 클로저 최종 설명

- 이처럼 함수의 실행 컨텍스트가 종료된 후에도 L.E가 가비지 컬렉터의 수집 대상에서 제외되는 경우는 5-3과 같이

  **지역변수를 참조하는 내부함수가 외부로 전달된 경우**가 유일함

  그러니까 "어떤 함수에서 선언한 변수를 참조하는 내부함수에서만 발생하는 현상"이란 

  "**외부 함수의 L.E가 가비지 컬렉팅 되지 않는 현상**"을 뜻하는 것.



- **정의 최종 수정**

  **클로저 : (어떤 함수 A에서 선언한) 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 **

    			**A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상**



- **외부로 전달?** : return만을 의미하는 것은 아님

  - 예제 5-4. return 없이도 클로저가 발생하는 다양한 경우

    ```javascript
    // (1) setInterval/setTimeout
    // 별도의 외부객체인 window의 메서드(setTimeout/setInterval)에 전달할 콜백 함수 내부에서 지역변수를 참조함
    (function(){
      var a = 0;
      var intervalId = null;
      var inner = function(){
        if (++a >= 10){
          clearInterval(intervalId);
        }
        console.log(a);
      };
      intervalId = setInterval(inner, 1000);
    })();
    ```

    ```javascript
    // (2) eventListener
    // 별도의 외부객체인 DOM의 메서드(addEventListener)에 등록할 handler 함수 내부에서 지역변수를 참조함
    (function(){
      var count = 0;
      var button = document.createElement('button');
      button.innerText = 'click';
      button.addEventListener('click', function(){
        console.log(++count, 'times clicked');
      })
      document.body.appendChild(button);
    })();
    ```

    두 상황 모두 **두 지역변수를 참조하는 내부함수를 외부에 전달했기에 클로저임**

  

## 05-02. 클로저와 메모리 관리

###  1. 메모리 누수

- ''메모리 누수''는 **개발자의 의도와 달리** 어떤 값의 **참조 카운트가 0이 되지 않아** GC의 수거 대상이 되지 않는 경우





### 2. 클로저의 메모리 관리

- 클로저는 어떤 필요에 의해 **의도적으로** 함수의 지역변수를 메모리를 소모하도록 함으로써 발생

  ​			  필요성이 사라진 시점에는 더는 메모리를 소모하지 않게 해주면 됨 -> 참조 카운트를 0으로 만들면 됨

  - 참조 카운트를 0으로 만드는 방법은? 식별자에 참조형이 아닌 **기본형 데이터**(null/ undefined)를 할당하면 됨



- 예제 5-5. 클로저의 메모리 관리

  ```javascript
  // (1) return에 의한 클로저의 메모리 해제
  var outer = (function(){
    var a = 1;
    var inner = function(){
      return ++a;
    };
    return inner;
  })();
  console.log(outer());
  console.log(outer());
  outer = null;  // outer 식별자의 Inner 함수 참조를 끊음
  ```

  ```javascript
  // (2) setInterval에 의한 클로저의 메모리 해제
  (function(){
    var a = 0;
    var intervalId = null;
    var inner = function(){
      if (++a >= 10){
        clearInterval(intervalId);
        inner = null;  // inner 식별자의 함수 참조를 끊음
      }
      console.log(a);
    };
    intervalId = setInterval(inner, 1000);
  })
  ```

  ```javascript
  // (3) eventListener에 의한 클로저의 메모리 해제
  (function(){
    var count = 0;
    var button = document.createElement('button');
    button.innerText = 'click';
    
    var clickHandler = function(){
      console.log(++count, 'times clicked');
      if (count >= 10){
        button.removeEventListener('click', clickHandler);
        clickHandler = null;  // clickHandler 식별자의 함수 참조를 끊음
      }
    };
    button.addEventListener('click',clickHandler);
    documnet.body.appendChild(button);
  })();
  ```

  

## 05-03. 클로저 활용 사례



### 1. 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때

- 이벤트 리스너에 관한 예시. 클로저의 '외부 데이터'에 주목



- 예제 5-6. 콜백 함수와 클로저(1)

  ```javascript
  var fruits = ['apple', 'banana', 'peach'];
  var $ul = document.createElement('ul'); 		// (공통 코드)
  
  fruits.forEach(function(fruit){							// (A)
    var $li = document.createElement('li')
    $li.innerText = fruit;
    $li.addEventListener('click',function(){  // (B)
      alert('your choice is '+ fruit);
    });
    $ul.appendCild($li);
  });
  document.body.appendChild($ul);
  

### 2. 접근 권한 제어(정보 은닉)



### 3. 부분 적용 함수



### 4. 커링 함수

