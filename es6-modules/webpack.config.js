var path = require("path");

module.exports = {
  mode: "production", //프로덕션 단계에서 코드를 난독하게 한다.
  entry: "./js/app.js", // 빌드를 할 대상 파일 - entry
  //entry - 속성은 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로입니다.
  //진입점
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.bundle.js",
  }, //빌드로 하고나서 웹팩으로 변환하고 나서 나오는 파일 - output
  //output 속성은 웹팩을 돌리고 난 결과물의 파일 경로를 의미합니다.
  //결과물
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  }, // 빌드를 할 때 중간에 개입하는
  //로더(Loader)는 웹팩이 웹 애플리케이션을 해석할 때 자바스크립트 파일이 아닌 웹 자원(HTML, CSS, Images, 폰트 등)들을 변환할 수 있도록 도와주는 속성입니다.
  //여기서 모듈이라는 속성은 로더이다
  stats: {
    colors: true,
  },
  devtool: "source-map", // 소스맵은 브라우저에서 콘솔로 확인했을 때 원본파일을 확인할 수 있게
};
