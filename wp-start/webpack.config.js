// webpack.config.js
// `webpack` command will pick up this config setup by default
var path = require("path");
//node.js common.js 모둘문법 path라는 라이브러리를 사용하여 변수에 담았다.

module.exports = {
  mode: "none",
  entry: "./src/index.js", // 이경로를 돌려서
  output: {
    filename: "main.js", // 이 이름으로
    path: path.resolve(__dirname, "dist"), //path라는 라이브러리에 해당 api를 사용
  }, // 이 결과값을 리턴한다. path에 생성
};

//Node.js Path API 문서 
//https://nodejs.org/api/path.html 읽어봅시다