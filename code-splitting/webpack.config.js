var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "none", // 배포할 때는 production
  entry: "./index.js",
  output: {
    filename: "[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      //여기에 들어가는 게 하나의 규칙
      {
        test: /\.css$/, //이 파일에 대한
        use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"], //로더 규칙을 적용하겠다.
        //css-loader css 웹팩안에 삽입하는 거고 style-loader는 웹팩안에 css에를 헤더에 삽입해주는 것
        //그리고 배열 맨 오른쪽 부터 해석함
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()], //플러그인 이라는 걸 사용해서 css 분리함, 플러그인에서 사용해서 결과물을 분리한다.
};
