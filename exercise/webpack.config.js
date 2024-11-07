var path = require('path')
var webpack = require('webpack')

module.exports = {
  mode: 'production', //프로덕션 모드
  entry: './src/main.js', //시작점 변환파일
  output: {
    path: path.resolve(__dirname, './dist'), 
    publicPath: '/dist/', // 모든파일의 기본 경로?
    filename: 'build.js'
  }, //dist폴더에 'build.js' 만든다
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader' 
        ], //css 파일 일고 vue 스타일 헤더에 삽입
      },      
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        } // .vue를 읽는다
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ 
      }, //바벨 로더로 js 파일을 빌드 노드 모듈을 제외하고
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        } //정규식이 들어간 이미지 파일들을 이름 확장자 해쉬를 넣어 이름 삽입
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 여기에 넣으면 import 할때 ../../ 할 필요 없이 바로 호출 사능
      //import Utility from '../../utilities/utility';
      //import Utility from 'Utilities/utility';
    },
    extensions: ['*', '.js', '.vue', '.json'] //확장자 제외?
  },
  devServer: {
    historyApiFallback: true, //404대신 표시
    noInfo: true,
    overlay: true // 오류가 있을 경우 전체 표시
  },
  performance: {
    hints: false // 힌트를 켜거나 끕니다. 또한 힌트가 발견되면 webpack에 오류나 경고를 표시하도록 합니다.
  },
  devtool: '#eval-source-map'
}

//만약 환경 변수가 프로덕션일 경우?
// if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = '#source-map'
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     })
//   ])
// }