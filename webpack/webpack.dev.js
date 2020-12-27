const { merge } = require('webpack-merge') // webpack-merge
const common = require('../webpack.common.js') // 汎用設定をインポート

// common設定とマージする
module.exports = merge(common, {
  mode: 'development', // 開発モード
  // output: {
  //   publicPath: ... ,
  // },
  // devtool: 'inline-source-map', // 開発用ソースマップ(3rdpartytool向けに最適)
  devtool: 'eval-source-map', // 開発用ソースマップ (高速)
})