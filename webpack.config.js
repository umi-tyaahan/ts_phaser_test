const path = require('path');
const pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
const phaser = path.join(pathToPhaser, "dist/phaser.js");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  //エントリポイント。依存関係整理の起点にするファイル。
  entry: './src/game.ts',
  output: {
    // モジュールバンドルを行った結果を出力する場所やファイル名の指定
    // "__dirname"はこのファイルが存在するディレクトリを表すnode.jsで定義済みの定数
    path: path.join(__dirname, 'docs'),
    filename: 'bundle.js'
  },
  // モジュールに適用するルールの設定（ここではローダーの設定を行う事が多い）
  module: {
    rules: [
      // 拡張子が.tsで終わるファイルに対して、TypeScriptコンパイラを適用する
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      //phaser-hogehoge.jsというファイルの内容はPhaserというグローバル変数に内容を突っ込む(expose-loader)
      { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/', to: 'assets/' }
      ]
    })
  ],
  // モジュールとして扱いたいファイルの拡張子を指定する
  // 例えば「import Foo from './foo'」という記述に対して"foo.ts"という名前のファイルをモジュールとして探す
  // デフォルトは['.js', '.json']
  resolve: {
    extensions: ['.ts', '.js'],
    //import "phaser"ってしたときに読み込みに行くやつを指定する
    alias: {
      phaser: phaser
    }
  },

  devServer: {
    // webpack-dev-serverの公開フォルダ
    contentBase: path.join(__dirname, 'docs'),
    host: '0.0.0.0', // for virtualbox
    port: 8000, // for virtualbox
    // disableHostCheck: true
  },
  // ファイル変更監視オプション
  watchOptions: {
    //VirtualBox環境だとファイル変更通知が行われないため、ポーリングが必要
    poll: true,
    // 負荷が高い場合は以下を試す
    //  poll: 1000
  },
}