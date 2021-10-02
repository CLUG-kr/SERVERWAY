//특정 디렉토리에 있는 파일의 이름으로 array를 만듦.
var testFolddr = './data';
var fs = require('fs');

fs.readdir(testFolddr, function(error, filelist){
  console.log(filelist);
})
