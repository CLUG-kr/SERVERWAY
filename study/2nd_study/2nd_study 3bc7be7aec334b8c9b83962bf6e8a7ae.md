# 2nd_study

# ๐ข (1์ฃผ์ฐจ) ์คํฐ๋ ์ผ์ง

> ์์ฑ์ : ํ์ฑ์ฌ ์์ฑ ๋ ์ง : 2021.10.01 ์ฐธ์ฌ์ : ์ ํ์ง, ์ต์ข์ค, ํ์ฑ์ฌ
> 

## โ ์ด๋ฒ์ฃผ ๊ณต๋ถ ๋ด์ฉ : ์ํ์ฝ๋ฉ WEB2 node.js - ์น์3, ์น์4

### โถ๏ธ ๋ฐํ ๋ด์ฉ

- Nodejs์์ ๋๊ธฐ์ ๋น๋๊ธฐ
- callback
- ํจํค์ง ๋งค๋์ ์ PM2
- HTML -Form
- ๊ธ์์ฑ UI ๋ง๋ค๊ธฐ
- POST ๋ฐฉ์์ผ๋ก ์ ์ก๋ ๋ฐ์ดํฐ ๋ฐ๊ธฐ
- ํ์ผ์์ฑ๊ณผ ๋ฆฌ๋ค์ด๋ ์
- ํ์ผ ์์ 
- ํ์ผ ์ญ์ 

- **โถ๏ธ Nodejs์์ ๋๊ธฐ์ ๋น๋๊ธฐ**
    - ๋๊ธฐ์ (synchronous): ์์๋๋ก ์ฒ๋ฆฌ
        - ์ฝ๋: readFileSyncํจ์์ ๋ฆฌํด๊ฐ์ result ๋ณ์์ ์ ์ฅ
        
        ```jsx
        var fs = require('fs');
        //sample.txt์ ์ ํ์๋ ๋ฌธ์๋ 'b'
        
        console.log('A');
        var result = fs.readFileSync('syntax/sample.txt','utf8');
        console.log(result);
        console.log('C');
        ```
        
        - ๊ฒฐ๊ณผ๊ฐ: ์ฝ๋์ ์์๋๋ก ๊ฒฐ๊ณผ๊ฐ ์ผ์ด๋จ.
        
        ```powershell
        A
        b
        
        C
        ```
        
        - ๋น๋๊ธฐ์ (asynchronous): ๋ณ๋ ฌ์  ์ฒ๋ฆฌ
            
            / /ํจ์จ์ ์ด์ง๋ง ๋ณต์ก//JS์์ ์ ํธํ๋ ๋ฐฉ์์
            
            - ์ฝ๋: readFileํจ์์ err์ธ์์๋ ์๋ฌ๋ฅผ ์ ์ฅ, result์ธ์์๋ sample.txt ํ์ผ์ ๋ด์ฉ์ ์ ์ฅํจ.
            
            ```jsx
            var fs = require('fs');
            
            console.log('A');
            fs.readFile('syntax/sample.txt','utf8',function(err, result){
              console.log(result);
            });
            console.log('C');
            ```
            
            - ๊ฒฐ๊ณผ๊ฐ:
                1.  'A'๋ฅผ ๋จผ์  log
                2.  log, readFileํจ์๊ฐ ์คํ๋๋ ์๊ฐ๋์ ๋ฐ๋ก ๋ค์ log ํจ์ ์คํ,
                3. ๊ทธ ์ดํ ์คํ์๋ฃ๋ readFileํจ์ ์์ log ํจ์ callback.
            
            ```powershell
            A 
            C 
            b
            ```
            
- โถ๏ธ **callback**
    - ์ด์ ์์
    
    ```jsx
    var fs = require('fs');
    
    console.log('A');
    fs.readFile('syntax/sample.txt','utf8',function(err, result){
      console.log(result);
    });
    console.log('C');
    ```
    
    readFileํจ์๋ ์ธ๋ถ ํ์ผ์ ์ฝ์ด์ค๋ ํจ์ โ> ์๊ฐ์ด ๊ฑธ๋ฆผ
    
    ๋ฐ๋ผ์ readFileํจ์์ ์ธ์๋ก callbackํจ์๋ฅผ ์ค๋ค. (callback: ๋ถ์ฌ์ค ์ ํ์ ์๋ตํ๋ ๊ฒ, ์ด ๊ฒฝ์ฐ ํจ์์ ์ธ์๋ฅผ ๋์ค์ callํ๋ค๋ ๋ป)
    
    ๋ฐ๋ผ์ readFileํจ์๋ฅผ ํตํด sample.txt ํ์ผ์ ์ฝ์ด์จ ์ดํ์ ์ธ์์ธ function ํจ์ ์คํ
    
    - ํจ์ ์์
    
    ```jsx
    var a = function(){
      console.log('A');
    };
    
    function slowfunc(callback){
      callback();
    }
    
    slowfunc(a);
    ```
    
    ๊ฒฐ๊ณผ
    
    ```powershell
    A 
    
    ```
    
- **โถ๏ธ ํจํค์ง ๋งค๋์ ์ PM2**
    
    ํจํค์ง: ๋๋ฆฝ์ ์ผ๋ก ์คํ๋๋ ํ๋ก๊ทธ๋จ ํน์ ๋ถํ์ผ๋ก ์ฌ์ฉ๋๋ ํ๋ก๊ทธ๋จ
    
    ํจํค์ง ๋งค๋์ : ํจํค์ง๋ฅผ ๊ด๋ฆฌํ๋ ๋งค๋์ 
    
    NPM: ๋ธ๋ js์์ ๊ฐ์ฅ ๊ด๋ฒ์ํ๊ฒ ์ฌ์ฉ๋๋ ํจํค์ง ๋งค๋์ 
    
    npm install pm2 -g
    
    pm2 start main.js
    
    pm2 monit
    
    q(๋๊ฐ๋ ํค)
    
    pm2 stop main
    pm2 start main.js --watch
    
    pm2 log
    
- โถ๏ธ **HTML-Form**
    
    ์ง๊ธ๊น์ง ๋ง๋ ๊ฑด ๋ฐ์ดํฐ ๋๋ ํ ๋ฆฌ์ ํ์ผ์ ์์ฑํ๋ฉด ํ์ผ์ ๊ฐ์งํด์ ๊ธ ๋ชฉ๋ก์ ๋ง๋ค์ด์ฃผ๊ณ  ์ฐ๋ฆฌ๋์ ์ html์ฝ๋๋ฅผ ์์ฑํด์ฃผ๋ ์น ์ดํ๋ฆฌ์ผ์ด์์ ๋ง๋ค์๋ค. 
    
    ์ด๋ ๋ฐ์ดํฐ ๋๋ ํ ๋ฆฌ์ ์ฌ์ดํธ ์์ ์๋ง ์ ๊ทผ๊ฐ๋ฅํ๋ค.
    
    ๋ฐ๋ผ์ ๋๊ตฌ๋ ๋ฐ์ดํฐ ๋๋ ํ ๋ฆฌ์ ์ ๊ทผํ  ์ ์๊ฒ ํ๋ ๋ฐฉ๋ฒ์ ์๊ณ ์ถ๋ค.
    
    ์ด์ ๋ํ ์ฒซ๊ฑธ์์ผ๋ก ์ฌ์ฉ์๊ฐ ์๋ฒ์ชฝ์ผ๋ก ๋ฐ์ดํฐ๋ฅผ ์ ๊ทผํ  ์ ์๊ฒ ํ๋ ๋ฐฉ๋ฒ์ธ HTML-Form ๋ฐฉ์์ ์์๋ณผ ๊ฒ์ด๋ค.
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled.png)
    
    ์๋ฒ๋ก ์ ๋ฌํ๋ ๋ฐฉ์์ด get ์ธ ๊ฒฝ์ฐ, ์๋์ ๊ฐ์ด ์ ๋ฌํ๊ณ ์ ํ๋ ์ ๋ณด๊ฐ ๋งํฌ์ ๋ด๊ธด๋ค.
    
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
    
    ์๋ฒ๋ก ์ ๋ฌํ๋ ๋ฐฉ์์ด post์ธ ๊ฒฝ์ฐ์๋ ์ด์๊ฐ์ ์ ๋ณด๋ค์ด ์๋ฒ๋จ์ ์จ๊ฒจ์ ธ์ ๋งํฌ์์์ ๋ณด์ด์ง ์๋๋ค.
    
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
    
- **โถ๏ธ ๊ธ์์ฑ UI ๋ง๋ค๊ธฐ**
    
    create ๋ฒํผ์ ๋๋ ์ ๋, Form ๋ฐฉ์์ผ๋ก ์ ๋ชฉ๊ณผ ๋ด์ฉ ์์ ๋์ ๋ง๋ค์๋ค. ์ด๋ method="post"๋ฅผ ํตํด์, ์ ๋ณด๋ฅผ ์ ๋ฌํ๋๋ฐ,
    
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
    
    ์์ ๊ฐ์ด ์ ๋ฌ๋๋ ๋ฐ์ดํฐ๊ฐ ์ ์์ ์ผ๋ก ์๋ฒ๋จ์ ์จ๊ฒจ์ ธ ์์์ ํ์ธํ  ์ ์๋ค.
    
- **โถ๏ธ POST ๋ฐฉ์์ผ๋ก ์ ์ก๋ ๋ฐ์ดํฐ ๋ฐ๊ธฐ.**
    
    ์ฌ์ฉ์๊ฐ ํฌ์คํธ ๋ฐฉ์์ผ๋ก ์ ๋ฌํ ๋ฐ์ดํฐ๋ฅผ ๋ธ๋ ์ ์ด์์ค ์์์ ๊ฐ์ ธ์ค๊ธฐ ์ํ ๋ฐฉ๋ฒ์ด ํ์ํ๋ค.
    
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
    
    ์ ์ฝ๋์์, request.on ํจ์๊ฐ ํ๋ ์ผ์ด๋?
    
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
    
    createServer ํจ์๋ node.js ๋ฅผ ํตํด ์น๋ธ๋ผ์ฐ์ ์ ์ ์์ด ๋ค์ด์ฌ ๋ ๋ง๋ค ํธ์ถ๋จ.
    
    ์ด๋, createServer ํจ์์ ์ฝ๋ฐฑํจ์๋ฅผ ํตํด ์ ๋ฌ๋ฐ์ request(์์ฒญํ  ๋, ์น๋ธ๋ผ์ฐ์ ๊ฐ ๋ณด๋ธ ์ ๋ณด)์์ post ์ ๋ณด๋ฅผ ํ์ฉํ๊ธฐ ์ํด request.on ํจ์๋ฅผ ์ฌ์ฉ.
    
    (response๋ ์์ฒญํ  ๋, ์ฐ๋ฆฌ๊ฐ ์น๋ธ๋ผ์ฐ์ ๋ก ๋ณด๋ด๋ ์ ๋ณด)
    
    ๋ฆฌํ์คํธ ์จ ํจ์๋? : ์น๋ธ๋ผ์ฐ์ ๊ฐ ํฌ์คํธ ๋ฐฉ์์ผ๋ก ๋ฐ์ดํฐ๋ฅผ ์ ์ก ํ  ๋, ๋ฐ์ดํฐ๊ฐ ๋๋ฌด ๋ง์ผ๋ฉด ๊ทธ ๋ฐ์ดํฐ๋ฅผ ํ๋ฒ์ ์ฒ๋ฆฌํ๋ค๊ฐ ์ฌ๋ฌ๊ฐ์ง ๋ฌธ์ ๊ฐ ์๊น.
    
    ๋๋ฌธ์, post๋ก ์ ์ก๋๋ ๋ฐ์ดํฐ๊ฐ ๋ง์ ๋, request.onํจ์๋ฅผ ์ฌ์ฉ.
    
    โ ํน์ ํ ์์ ๋ฐ์ดํฐ๋ฅผ ์์ ํ ๋๋ง๋ค, request.onํจ์์ ์ฝ๋ฐฑ ํจ์๋ฅผ ํธ์ถํจ.
    
    โ ๊ทธ๋ฆฌ๊ณ  ๊ทธ๋ฅผ ํธ์ถํ  ๋, data๋ผ๋ ์ธ์๋ก ์์ ํ ์ ๋ณด๋ฅผ ์ ๋ฌ.
    
    โ ๋ชจ๋  ๋ฐ์ดํฐ ์์ ์ด ๋๋ฌ์๋, request.on('end... ํจ์๋ฅผ ์คํํจ.
    
    โ ์คํ์
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%205.png)
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%206.png)
    
- **โถ๏ธ ํ์ผ ์์ฑ๊ณผ ๋ฆฌ๋ค์ด๋ ์**
    
    create ๋ฒํผ์ ๋๋ฅด๊ณ  submit์ ๋๋ ์ ๋,
    
    fs.writeFileํจ์๋ก title๊ณผ description์ ๊ฐ์ง ํ์ผ์ ์์ฑํ๋๋ก ํ๋ค.
    
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
    
    ์ดํ ์ฌ์ฉ์๋ฅผ ๋ค์ ํ์ผ์ ๋ณผ ์ ์๋ ๋ทฐํ์ด์ง๋ก ๋ณด๋ด๊ธฐ์ํด ๋ฆฌ๋ค์ด๋ ์์ ์ฌ์ฉํด์ผ ํจ.
    
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
    
    ๋ฐ๋ผ์ ์ ์ฝ๋ ์ฒ๋ผ respons.writeHead ํจ์์ ์ธ์๋ก 200(์๋ต์ ์ฑ๊ณตํ๋ค๋ ์๋ฏธ)๊ฐ ์๋๋ผ 302(๋ค๋ฅธ ๋งํฌ๋ก ์ด๋์ํค๋ ์๋ฏธ)๋ก ํ๊ณ  ๋ค๋ฅธ ์ธ์๋ก, ์ฟผ๋ฆฌ๊ฐ์ ์ ๋ฌํ๋ค.
    
    ๊ทธ๋ ๊ฒํ๋ฉด, 
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%209.png)
    
    ์ด๋ ๊ฒ, ์ ์ถํ ์ ๋ชฉ๊ณผ description์ด ์ํ์ด์ง์ ๊ตฌํ๋๋ค.
    
- **โถ๏ธ ํ์ผ ์์ **
    - ์์ ๋งํฌ ์์ฑ
    
    ํน์  ํ๋ฉด์ ๊ธ์ ๋ด์ฉ์ update ํ๊ธฐ ์ํด, ์ธ๋ถ ํ์ด์ง๋ก ๋ค์ด๊ฐ์ ๋, create ๋ฒํผ ์์ update๋ฒํผ์ด ์์ด์ผ ํ๋ค. 
    
    ์ด๋ฅผ ์ํด, 
    
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
    
    templateHTMLํจ์์ ์ธ์๋ก control์ ์ถ๊ฐํ๊ณ , create ๋ฒํผ ์์น์ control ์ธ์๋ฅผ ๋ฐฐ์นํ๋ค.
    
    ๊ทธ๋ฆฌ๊ณ , 
    
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
    
    ์ธ๋ถ ํ์ด์ง์์ control ์ธ์๋ก create ์ธ์, update์ธ์๋ฅผ ์ฃผ๋๋ฐ, ์ด๋, update ๋งํฌ์ ์ฟผ๋ฆฌ ์คํธ๋ง์ผ๋ก ๊ทธ ํ์ด์ง์ tilte๊ฐ์ ์ฃผ๋ฉด, ์ด๋ค ํ์ด์ง๋ฅผ ์์ ํ๋์ง ์ ๋ฌ ๋ฐ์ ์ ์๋ค.
    
    - ์์ ํ  ์ ๋ณด ์ ์ก
    
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
    
    /update ํ์ด์ง์์ ๋ค๋ฅธ ํ์ด์ง ui์ ๋ค๋ฅธ์ ์ tile, description์ด ๋ณด์ฌ์ผํ  ๊ณณ์
    
    form ํํ๊ฐ ๋ณด์ด๋ ๊ฒ์ด๋ค.
    
    ![Untitled](2nd_study%203bc7be7aec334b8c9b83962bf6e8a7ae/Untitled%2010.png)
    
    ์ด๋, input type์ hidden์ผ๋ก ์ ํด id๊ฐ์ผ๋ก ์ ๋ฌํ๋ ๋ฐฉ๋ฒ์ ์ฌ์ฉํ๋ฉด ์๋ ์ด๋ฆ์ ๊ทธ๋๋ก ์ฌ์ฉํ  ์ ์๋ค.
    
    - ํ์ผ๋ช ๋ณ๊ฒฝ/์ ์ฅ
    
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
    
    ํ์ผ๋ช์ ๋ณ๊ฒฝํ  ๋์๋ rename ํจ์๋ฅผ ํตํด ์๋ ์ด๋ฆ์ด์๋ id๋ฅผ, ๋ณ๊ฒฝํ title๋ก ๋ฐ๊พธ๊ณ ,
    
    ์ฝ๋ฐฑํจ์๋ก writeFileํจ์๋ฅผ ์ฌ์ฉํด์, ๋ด์ฉ์ ๋ณ๊ฒฝํ  ์ ์๋ค.
    
- **โถ๏ธ ํ์ผ ์ญ์ **
    
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
    
    ์ญ์  ๋งํฌ๋ create์ update๊ฐ์ด ์ฟผ๋ฆฌ ์คํธ๋ง์ผ๋ก ์์ฒญ์ ํ๋ get๋ฐฉ์์ผ๋ก ์์ฑ๋๋ฉด ์๋๋ค.
    
    ์ญ์  ๋งํฌ๋ post ๋ฐฉ์์ผ๋ก ์์ฑ๋์ด์ผํ๋ค(๋ด์ฉ์ด ์๋).
    
    ์ด์ ๋, ์ ๋ณด ์ ์ก๊ณผ ๋น์ทํ๊ฒ ์ฌ์ฉ์๊ฐ ๋งํฌ ์์ ํ๋ผ๋ฏธํฐ ์กฐ์์ผ๋ก ์์์ ์์ ์ ๊ฐํ  ์ ์์ผ๋ฉด ์๋๊ธฐ ๋๋ฌธ์ด๋ค.
    
    - get๊ณผ post์ ์ฐจ์ด:
        
        [[https://blog.outsider.ne.kr/312](https://blog.outsider.ne.kr/312)](https://www.notion.so/https-blog-outsider-ne-kr-312-1f8ff8e1857645278137e0e7b0f9a2bb)
        
    
    - ์ญ์  ๊ตฌํ
    
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
    
    ์ด๋ฅผ ํตํด, delete ๋ฒํผ์ ๋๋ฅด๋ฉด, ํด๋น ํ์ผ์ ์ญ์ ํ๊ณ , ํ์ผ๋ก ์ด๋ํ๋ ๊ธฐ๋ฅ๊น์ง ๊ตฌํ์ ์๋ฃํ๋ค.
    

## ๐ Git (๊ณต๋ถํ ์์ค์ฝ๋ ๊ณต์ )

[์ ๋ชฉ ์์](https://www.notion.so/e2a1f14ba0da40e2a32a44b5ffe8c1ac)