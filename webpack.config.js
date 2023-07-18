const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: {
    config: path.resolve('src', 'config'),
    desktop: path.resolve('src', 'desktop'),
    mobile: path.resolve('src', 'mobile'),
  },
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: path.resolve('plugin', 'js'),
    // 出力ファイル名
    filename: '[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './plugin/css/main.css',
    }),
  ],
  module: {
    rules: [
      {
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ['web', 'es5'],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
}
