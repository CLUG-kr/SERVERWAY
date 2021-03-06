# ๐ข (1์ฃผ์ฐจ) ์คํฐ๋ ์ผ์ง

> #### ์์ฑ์ : ๊น๋ฏผํ
>
> #### ์์ฑ ๋ ์ง : 2021.09.20
>
> #### ์ฐธ์ฌ์ : ์ ํ์ง, ์ต์ข์ค, ํ์ฑ์ฌ

## โ ์ด๋ฒ์ฃผ ๊ณต๋ถ ๋ด์ฉ : ์ํ์ฝ๋ฉ WEB2 node.js - ์น์ 2

### โถ๏ธ ๋ฐํ ๋ด์ฉ

- ์๋ฃํ
- ๋ณ์
- ํํ๋ฆฟ ๋ฆฌํฐ๋ด
- URL
- ํ์ผ ์์คํ
- ๋น๊ต ์ฐ์ฐ์, ์ ์ด๋ฌธ
- ๋ฐฐ์ด
- ํจ์


### โถ๏ธ ์๋ฃํ (Number, string, boolean)

์๋ฐ์คํฌ๋ฆฝํธ์ ์ซ์ ์๋ฃํ์ Number
int, float ๋ฑ ๊ตฌ๋ถX

string์ + ์ฐ์ฐ์ ํ๋ฉด string์ด ์ฐ๊ฒฐ๋จ
```
a = 'Hello';
b = 'World';
a + b; //(result) HelloWorld
```

string์ .length๋ฅผ ํ๋ฉด ๊ธธ์ด๋ฅผ ์ ์ ์๋ค.
```
a = 'string';
b = a.length; //(result) 6
```

cf) ์ซ์๋ฅผ ํํํ string์ *, /, - ๋ฅผ ํ๋ฉด Number์ฒ๋ผ ์ฐ์ฐํจ.
```
a = '3';
b = '2';

a * b; //(result) 6
a / b; //(result) 1.5
a - b; //(result) 1
```

boolean์ true, false


### โถ๏ธ ๋ณ์

๋ณ์ ์ ์ธ ์ var ์ฌ์ฉ
```
var a = 2;
```

cf) ์์ฆ์ ๋ณ์ ์ ์ธ ์ var๊ฐ ์๋ let, const๋ฅผ ์ฌ์ฉํ๋ค.
```
const a = 1; //const๋ ์์์ฌ์ ์ดํ ๋ณ๊ฒฝ ๋ถ๊ฐ
a = 2;       //(์๋ฌ ๋ฐ์) Uncaught TypeError: Assignment to constant variable.

let b = 'b'; //let์ ๋ณ๊ฒฝ ๊ฐ๋ฅ
b = 3;       //b === 3
```


### โถ๏ธ ํํ๋ฆฟ ๋ฆฌํฐ๋ด

`(๋ฐฑํฑ)์ผ๋ก ๋ฌธ์์ด์ ๊ฐ์ผ ํ ๊ทธ ์์ ${๊ฐ}์ ๋ฃ์ด ๋ฌธ์์ด์ ๋ง๋ค ์ ์๋ค.

ex)
```
let a = 2;
let b = 3;
const string = `the result of ${a} + ${b} is ${a + b}`; //(result) the result of 2 + 3 is 5
```


### โถ๏ธ URL

http://naver:80/search?query=url

| protocol | host(domain) | port |  path  | query string|
| :------: | :----------: | :--: | :----: | :---------: |
|   http   |     naver    |  80  | search |  query=url  |


url์ query string, path name ํ์ฑํ๋ ๋ฒ
```
const url = require('url'); //url ๋ชจ๋ import

const queryData = url.parse('http://naver:80/search?query=url', true).query; //(result) { query: 'url' }
const pathnameData = url.parse('http://naver:80/search?query=url', true).pathname; //(result) /search
```


### โถ๏ธ ํ์ผ ์์คํ

```
const testFolder = './data';
const fs = require('fs'); //fs ๋ชจ๋ import

//ํ์ผ ์ฝ๊ธฐ
fs.readFile('sample.txt', 'utf8', function(error, data){
    console.log(data);
})

//ํด๋ ๋ด ํ์ผ ๋ชฉ๋ก ์ฝ๊ธฐ
fs.readdir(testFolder, function(error, fileList){
    console.log(fileList); //['file1', 'file2', 'file3']
})
```


### โถ๏ธ ๋น๊ต ์ฐ์ฐ์, ์ ์ด๋ฌธ

์๋ฐ์คํฌ๋ฆฝํธ์์ ๋๋ฑ ๋น๊ต๋ ==, ===๊ฐ ์๋ค.
==๋ ๋์จํ ๋น๊ต, ===๋ ์ ํํ ๋น๊ต
```
1 == '1';  //true
1 === '1'; //false
```

์กฐ๊ฑด๋ฌธ ์
```
if (a > b) {
    console.log(a);
} else if (a === b) {
    console.log(a, b);
} else {
    console.log(b);
}
```

๋ฐ๋ณต๋ฌธ ์
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


### โถ๏ธ ๋ฐฐ์ด

```
const array = ['a', 'b', 'c', 'd'];
console.log(array[0]); //(result) a
array[2] = 3;    //['a', 'b', 3, 'd']
array[5] = 'f';  //['a', 'b', 3, 'd', empty, 'f']
array.push('g'); //['a', 'b', 3, 'd', empty, 'f', 'g']
array.length;    //(result) 7
```


### โถ๏ธ ํจ์

๊ธฐ๋ณธ ํจ์ ํํ
```
function printHello() {
    console.log('Hello');
}

printHello(); //(result) Hello
```

๋ด์ฅ ํจ์
```
Math.round(1.6); //(result) 2
Math.round(1.3); //(result) 1
```

ํ๋ผ๋ฏธํฐ๊ฐ ์๋ ํจ์ ํํ
```
function add(first, second) {
    return first + second;
}

add(2, 4); //(result) 6
```


## ๐ Git (๊ณต๋ถํ ์์ค์ฝ๋ ๊ณต์ )

|  ์์ฑ์  |             ์ฃผ์             |
| :----: | :-------------------------: |
|  ๊น๋ฏผํ  |  |