const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// ビルド対象を変える場合はここを変更する
// const buildtarget = './src/boilerplate/';
// const buildtarget = './src/sandbox/';
const buildtarget = './src/games/flash/';
// const buildtarget = './src/games/tutorial/';

module.exports = {
  // エントリポイント 依存関係整理の起点にするファイル
  entry: buildtarget + 'game.ts',
  output: {
    // モジュールバンドルを行った結果を出力する場所やファイル名の指定
    // "__dirname"はこのファイルが存在するディレクトリを表すnode.jsで定義済みの定数
    path: path.resolve(__dirname, '../public'),
    filename: 'js/bundle.js',
  },
  // モジュールに適用するルールの設定（ここではローダーの設定を行う事が多い）
  module: {
    rules: [
      // 拡張子が.tsで終わるファイルに対して、TypeScriptコンパイラを適用する
      { test: /\.ts$/, use: 'ts-loader', exclude: '/node_modules/' },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'assets/', to: 'assets/', context: buildtarget }],
    }),
  ],
  // モジュールとして扱いたいファイルの拡張子を指定する
  // 例えば「import Foo from './foo'」という記述に対して"foo.ts"という名前のファイルをモジュールとして探す
  // デフォルトは['.js', '.json']
  resolve: {
    extensions: ['.ts', '.js'],
  },

  devServer: {
    // webpack-dev-serverの公開フォルダ
    contentBase: path.resolve(__dirname, '../public'),
    host: '0.0.0.0', // for virtualbox
    port: 5000, // for virtualbox
    // open: true,
    // disableHostCheck: true
  },
};
