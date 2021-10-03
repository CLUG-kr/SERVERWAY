# 2nd_study

# 📢 (1주차) 스터디 일지

> 작성자 : 한성재 작성 날짜 : 2021.10.01 참여자 : 전혜지, 최종윤, 한성재
> 

## ✅ 이번주 공부 내용 : 생활코딩 WEB2 node.js - 섹션3, 섹션4

### ▶️ 발표 내용

- Nodejs에서 동기와 비동기
- callback
- 패키지 매니저와 PM2
- HTML -Form
- 글생성 UI 만들기
- POST 방식으로 전송된 데이터 받기
- 파일생성과 리다이렉션
- 파일 수정
- 파일 삭제

- **▶️ Nodejs에서 동기와 비동기**
    - 동기적(synchronous): 순서대로 처리
        - 코드: readFileSync함수의 리턴값을 result 변수에 저장
        
        ```jsx
        var fs = require('fs');
        //sample.txt에 적혀있는 문자는 'b'
        
        console.log('A');
        var result = fs.readFileSync('syntax/sample.txt','utf8');
        console.log(result);
        console.log('C');
        ```
        
        - 결과값: 코드의 순서대로 결과가 일어남.
        
        ```powershell
        A
        b
        
        C
        ```
        
        - 비동기적(asynchronous): 병렬적 처리
            
            / /효율적이지만 복잡//JS에서 선호하는 방식임
            
            - 코드: readFile함수에 err인자에는 에러를 저장, result인자에는 sample.txt 파일의 내용을 저장함.
            
            ```jsx
            var fs = require('fs');
            
            console.log('A');
            fs.readFile('syntax/sample.txt','utf8',function(err, result){
              console.log(result);
            });
            console.log('C');
            ```
            
            - 결과값:
                1.  'A'를 먼저 log
                2.  log, readFile함수가 실행되는 시간동안 바로 다음 log 함수 실행,
                3. 그 이후 실행완료된 readFile함수 안의 log 함수 callback.
            
            ```powershell
            A 
            C 
            b
            ```
            
- ▶️ **callback**
    - 이전예시
    
    ```jsx
    var fs = require('fs');
    
    console.log('A');
    fs.readFile('syntax/sample.txt','utf8',function(err, result){
      console.log(result);
    });
    console.log('C');
    ```
    
    readFile함수는 외부 파일을 읽어오는 함수 —> 시간이 걸림
    
    따라서 readFile함수의 인자로 callback함수를 준다. (callback: 부재중 전화에 응답하는 것, 이 경우 함수의 인자를 나중에 call한다는 뜻)
    
    따라서 readFile함수를 통해 sample.txt 파일을 읽어온 이후에 인자인 function 함수 실행
    
    - 함수 예시
    
    ```jsx
    var a = function(){
      console.log('A');
    };
    
    function slowfunc(callback){
      callback();
    }
    
    slowfunc(a);
    ```
    
    결과
    
    ```powershell
    A 
    
    ```
    
- **▶️ 패키지 매니저와 PM2**
    
    패키지: 독립적으로 실행되는 프로그램 혹은 부품으로 사용되는 프로그램
    
    패키지 매니저: 패키지를 관리하는 매니저
    
    NPM: 노드 js에서 가장 광범위하게 사용되는 패키지 매니저
    
    npm install pm2 -g
    
    pm2 start main.js
    
    pm2 monit
    
    q(나가는 키)
    
    pm2 stop main
    pm2 start main.js --watch
    
    pm2 log
    
- ▶️ **HTML-Form**
    
    지금까지 만든건 데이터 디렉토리에 파일을 생성하면 파일을 감지해서 글 목록을 만들어주고 우리대신에 html코드를 생성해주는 웹 어플리케이션을 만들었다. 
    
    이는 데이터 디렉토리에 사이트 소유자만 접근가능하다.
    
    따라서 누구나 데이터 디렉토리에 접근할 수 있게 하는 방법을 알고싶다.
    
    이에 대한 첫걸음으로 사용자가 서버쪽으로 데이터를 접근할 수 있게 하는 방법인 HTML-Form 방식을 알아볼 것이다.
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled.png)
    
    서버로 전달하는 방식이 get 인 경우, 아래와 같이 전달하고자 하는 정보가 링크에 담긴다.
    
    ```html
    <form action="http://localhost:3000/process create">
    
    <p><input type ="text" name="title"></p>
    <p>
      <textarea name="description"></textarea>
    </p>
    <p>
      <input type="submit">
    </p>
    </form>
    ```
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%201.png)
    
    서버로 전달하는 방식이 post인 경우에는 이와같은 정보들이 서버단에 숨겨져서 링크상에서 보이지 않는다.
    
    ```html
    <form action="http://localhost:3000/process create" method="post">
    
    <p><input type ="text" name="title"></p>
    <p>
      <textarea name="description"></textarea>
    </p>
    <p>
      <input type="submit">
    </p>
    </form>
    ```
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%202.png)
    
- **▶️ 글생성 UI 만들기**
    
    create 버튼을 눌렀을 때, Form 방식으로 제목과 내용 수정란을 만들었다. 이때 method="post"를 통해서, 정보를 전달하는데,
    
    ```jsx
    else if(pathname === '/create'){
          fs.readdir('./data', function(error, filelist){
            var title = 'WEB - create';
            var list = templateList(filelist);
            var template = templateHTML(title,list,
              `
              <form action="http://localhost:3000/process create" method="post">
    
              <p><input type ="text" name="title" placeholder ="title"></p>
              <p>
                <textarea name="description" placeholder ="description"></textarea>
              </p>
              <p>
                <input type="submit">
              </p>
              </form>
    
              `);
            response.writeHead(200);
            response.end(template);
    
          });
        }
    
    ```
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%203.png)
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%204.png)
    
    위와 같이 전달되는 데이터가 정상적으로 서버단에 숨겨져 있음을 확인할 수 있다.
    
- **▶️ POST 방식으로 전송된 데이터 받기.**
    
    사용자가 포스트 방식으로 전달한 데이터를 노드 제이에스 안에서 가져오기 위한 방법이 필요하다.
    
    ```jsx
    var http = require('http');
    var fs = require('fs');
    var url = require('url');
    var qs = require('querystring');
    .
    .
    .
    
    else if(pathname ==='/create_process'){
          var body = '';
          request.on('data',function(data){
            body=body + data;
          });
          request.on('end',function(){
            var post = qs.parse(body);
            console.log(post);
          });
          
          response.writeHead(200);
          response.end('success');
        }
        else{
          response.writeHead(404);
          response.end('Not found');
        }
    .
    .
    .
    ```
    
    위 코드에서, request.on 함수가 하는 일이란?
    
    ```jsx
    .
    .
    .
    var app= http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    .
    .
    .
    ```
    
    createServer 함수는 node.js 를 통해 웹브라우저의 접속이 들어올 때 마다 호출됨.
    
    이때, createServer 함수의 콜백함수를 통해 전달받은 request(요청할 때, 웹브라우저가 보낸 정보)안의 post 정보를 활용하기 위해 request.on 함수를 사용.
    
    (response는 요청할 때, 우리가 웹브라우저로 보내는 정보)
    
    리퀘스트 온 함수란? : 웹브라우저가 포스트 방식으로 데이터를 전송 할 때, 데이터가 너무 많으면 그 데이터를 한번에 처리하다가 여러가지 문제가 생김.
    
    때문에, post로 전송되는 데이터가 많을 때, request.on함수를 사용.
    
    → 특정한 양의 데이터를 수신할때마다, request.on함수의 콜백 함수를 호출함.
    
    → 그리고 그를 호출할 때, data라는 인자로 수신한 정보를 전달.
    
    → 모든 데이터 수신이 끝났을때, request.on('end... 함수를 실행함.
    
    → 실행시
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%205.png)
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%206.png)
    
- **▶️ 파일 생성과 리다이렉션**
    
    create 버튼을 누르고 submit을 눌렀을 때,
    
    fs.writeFile함수로 title과 description을 가진 파일을 생성하도록 한다.
    
    ```jsx
    else if(pathname ==='/create_process'){
          var body = '';
          request.on('data',function(data){
            body=body + data;
          });
          request.on('end',function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`,description,'utf8',function(err){
              
                    response.writeHead(200);
                    response.end('success');
            })
          });
    
        }
    ```
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%207.png)
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%208.png)
    
    이후 사용자를 다시 파일을 볼 수 있는 뷰페이지로 보내기위해 리다이렉션을 사용해야 함.
    
    ```jsx
    else if(pathname ==='/create_process'){
          var body = '';
          request.on('data',function(data){
            body=body + data;
          });
          request.on('end',function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`,description,'utf8',function(err){
    					response.writeHead(302,{Location: `/?id=${title}`})
              response.end('success');
            })
          });
    
        }
    ```
    
    따라서 위 코드 처럼 respons.writeHead 함수의 인자로 200(응답에 성공했다는 의미)가 아니라 302(다른 링크로 이동시키는 의미)로 하고 다른 인자로, 쿼리값을 전달한다.
    
    그렇게하면, 
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%209.png)
    
    이렇게, 제출한 제목과 description이 새페이지에 구현된다.
    
- **▶️ 파일 수정**
    - 수정링크 생성
    
    특정 화면의 글의 내용을 update 하기 위해, 세부 페이지로 들어갔을 때, create 버튼 옆에 update버튼이 있어야 한다. 
    
    이를 위해, 
    
    ```jsx
    unction templateHTML(title,list,body,control){
    
      return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href = "/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
      `;
    }
    ```
    
    templateHTML함수에 인자로 control을 추가하고, create 버튼 위치에 control 인자를 배치한다.
    
    그리고, 
    
    ```jsx
    var app= http.createServer(function(request,response){
        var _url = request.url;
        var queryData = url.parse(_url, true).query;
        var pathname = url.parse(_url, true).pathname;
    
        if(pathname === '/'){
    .
    .
    .
    .
    else{
            fs.readdir('./data', function(error, filelist){
              fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                var title = queryData.id;
                var list = templateList(filelist);
                var template =templateHTML(title,list,`<h2>${title}</h2>
                    <p>${description}</p>`,`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
              response.writeHead(200);
              response.end(template);
    
            });
    
            });
          }
    
        }
    .
    .
    ```
    
    세부 페이지에서 control 인자로 create 인자, update인자를 주는데, 이때, update 링크의 쿼리 스트링으로 그 페이지의 tilte값을 주면, 어떤 페이지를 수정하는지 전달 받을 수 있다.
    
    - 수정할 정보 전송
    
    ```jsx
    .
    .
    .
    else if(pathname === '/update'){
          fs.readdir('./data', function(error, filelist){
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
              var title = queryData.id;
              var list = templateList(filelist);
              var template =templateHTML(title,list,
                `
                <form action="/update_process" method="post">
                <input type ="hidden" name="id" value =${title}>
                <p><input type ="text" name="title" placeholder ="title" value ="${title}"></p>
                <p>
                  <textarea name="description" placeholder ="description">${description}</textarea>
                </p>
                <p>
                  <input type="submit">
                </p>
                </form>
                `,`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
            response.writeHead(200);
            response.end(template);
    
          });
    
          });
        }
    ```
    
    /update 페이지에서 다른 페이지 ui와 다른점은 tile, description이 보여야할 곳에
    
    form 형태가 보이는 것이다.
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%2010.png)
    
    이때, input type을 hidden으로 정해 id값으로 전달하는 방법을 사용하면 원래 이름을 그대로 사용할 수 있다.
    
    - 파일명 변경/저장
    
    ```jsx
    else if(pathname === '/update_process'){
          var body = '';
          request.on('data',function(data){
            body=body + data;
          });
          request.on('end',function(){
            var post = qs.parse(body);
            var id =post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`,`data/${title}`,function(error){
              fs.writeFile(`data/${title}`,description,'utf8',function(err){
                response.writeHead(302,{Location: `/?id=${title}`})
                response.end('success');
              })
            });
          });
        }
    ```
    
    파일명을 변경할 때에는 rename 함수를 통해 원래 이름이었던 id를, 변경한 title로 바꾸고,
    
    콜백함수로 writeFile함수를 사용해서, 내용을 변경할 수 있다.
    
- **▶️ 파일 삭제**
    
    ```jsx
    if(pathname === '/'){
    .
    .
    .
    else{
            fs.readdir('./data', function(error, filelist){
              fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                var title = queryData.id;
                var list = templateList(filelist);
                var template =templateHTML(title,list,`<h2>${title}</h2>
                    <p>${description}</p>`,`<a href="/create">create</a>
                    <a href="/update?id=${title}">update</a>
                    <form action ="delete_process" method ="post">
                    <input type="hidden" name = "id" value ="${title}">
                    <input type="submit" value="delete">
                    </form>
                    `);
              response.writeHead(200);
              response.end(template);
    
            });
    
            });
          }
    .
    .
    .
    ```
    
    삭제 링크는 create와 update같이 쿼리 스트링으로 요청을 하는 get방식으로 생성되면 안된다.
    
    삭제 링크는 post 방식으로 생성되어야한다(내용이 은닉).
    
    이유는, 정보 전송과 비슷하게 사용자가 링크 상의 파라미터 조작으로 임의의 수정을 가할 수 있으면 안되기 때문이다.
    
    - get과 post의 차이:
        
        [[https://blog.outsider.ne.kr/312](https://blog.outsider.ne.kr/312)](https://www.notion.so/https-blog-outsider-ne-kr-312-1f8ff8e1857645278137e0e7b0f9a2bb)
        
    
    - 삭제 구현
    
    ```jsx
    if(pathname === '/'){
    .
    .
    .
    
    else if(pathname === '/delete_process'){
          var body = '';
          request.on('data',function(data){
            body=body + data;
          });
          request.on('end',function(){
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${id}`,function(error){
              response.writeHead(302,{Location: `/`})
              response.end('success');
            })
          });
        }
    .
    .
    .
    ```
    
    이를 통해, delete 버튼을 누르면, 해당 파일을 삭제하고, 홈으로 이동하는 기능까지 구현을 완료했다.
    

## 👊 Git (공부한 소스코드 공유)

[제목 없음](https://www.notion.so/e2a1f14ba0da40e2a32a44b5ffe8c1ac)