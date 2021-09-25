# 📢 (1주차) 스터디 일지

> #### 작성자 : 김민혁
>
> #### 작성 날짜 : 2021.09.20
>
> #### 참여자 : 전혜지, 최종윤, 한성재

## ✅ 이번주 공부 내용 : 생활코딩 WEB2 node.js - 섹션 2

### ▶️ 발표 내용

- 자료형
- 변수
- 템플릿 리터럴
- URL
- 파일 시스템
- 비교 연산자, 제어문
- 배열
- 함수


### ▶️ 자료형 (Number, string, boolean)

자바스크립트의 숫자 자료형은 Number
int, float 등 구분X

string에 + 연산을 하면 string이 연결됨
```
a = 'Hello';
b = 'World';
a + b; //(result) HelloWorld
```

string에 .length를 하면 길이를 알 수 있다.
```
a = 'string';
b = a.length; //(result) 6
```

cf) 숫자를 표현한 string에 *, /, - 를 하면 Number처럼 연산함.
```
a = '3';
b = '2';

a * b; //(result) 6
a / b; //(result) 1.5
a - b; //(result) 1
```

boolean은 true, false


### ▶️ 변수

변수 선언 시 var 사용
```
var a = 2;
```

cf) 요즘은 변수 선언 시 var가 아닌 let, const를 사용한다.
```
const a = 1; //const는 상수여서 이후 변경 불가
a = 2;       //(에러 발생) Uncaught TypeError: Assignment to constant variable.

let b = 'b'; //let은 변경 가능
b = 3;       //b === 3
```


### ▶️ 템플릿 리터럴

`(백틱)으로 문자열을 감싼 후 그 안에 ${값}을 넣어 문자열을 만들 수 있다.

ex)
```
let a = 2;
let b = 3;
const string = `the result of ${a} + ${b} is ${a + b}`; //(result) the result of 2 + 3 is 5
```


### ▶️ URL

http://naver:80/search?query=url

| protocol | host(domain) | port |  path  | query string|
| :------: | :----------: | :--: | :----: | :---------: |
|   http   |     naver    |  80  | search |  query=url  |


url의 query string, path name 파싱하는 법
```
const url = require('url'); //url 모듈 import

const queryData = url.parse('http://naver:80/search?query=url', true).query; //(result) { query: 'url' }
const pathnameData = url.parse('http://naver:80/search?query=url', true).pathname; //(result) /search
```


### ▶️ 파일 시스템

```
const testFolder = './data';
const fs = require('fs'); //fs 모듈 import

//파일 읽기
fs.readFile('sample.txt', 'utf8', function(error, data){
    console.log(data);
})

//폴더 내 파일 목록 읽기
fs.readdir(testFolder, function(error, fileList){
    console.log(fileList); //['file1', 'file2', 'file3']
})
```


### ▶️ 비교 연산자, 제어문

자바스크립트에서 동등 비교는 ==, ===가 있다.
==는 느슨한 비교, ===는 정확한 비교
```
1 == '1';  //true
1 === '1'; //false
```

조건문 예
```
if (a > b) {
    console.log(a);
} else if (a === b) {
    console.log(a, b);
} else {
    console.log(b);
}
```

반복문 예
```
let i = 0;
while (i < 10) {
    console.log(i);
    i++;
}

for (let j = 0; j < 10; j++) {
    console.log(j);
}
```


### ▶️ 배열

```
const array = ['a', 'b', 'c', 'd'];
console.log(array[0]); //(result) a
array[2] = 3;    //['a', 'b', 3, 'd']
array[5] = 'f';  //['a', 'b', 3, 'd', empty, 'f']
array.push('g'); //['a', 'b', 3, 'd', empty, 'f', 'g']
array.length;    //(result) 7
```


### ▶️ 함수

기본 함수 형태
```
function printHello() {
    console.log('Hello');
}

printHello(); //(result) Hello
```

내장 함수
```
Math.round(1.6); //(result) 2
Math.round(1.3); //(result) 1
```

파라미터가 있는 함수 형태
```
function add(first, second) {
    return first + second;
}

add(2, 4); //(result) 6
```


## 👊 Git (공부한 소스코드 공유)

|  작성자  |             주소             |
| :----: | :-------------------------: |
|  김민혁  |  |