const path = require('path');
const { merge } = require('webpack-merge') // webpack-merge
const common = require('./webpack.common.js') // 汎用設定をインポート

// common設定とマージする
module.exports = merge(common, {
  mode: 'production', // 本番モード
  // devtool: 'source-map'

  output: {
    // モジュールバンドルを行った結果を出力する場所やファイル名の指定
    // "__dirname"はこのファイルが存在するディレクトリを表すnode.jsで定義済みの定数
    path: path.join(__dirname, 'docs'),
    filename: 'js/bundle.js'
  },

})