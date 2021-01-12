# development environment

Phaser + TypeScript + webpack 環境

- wsl2 ( ubuntu ) 環境で動作
- 自動ビルド + hotreload 構成
- サーバーは webpack cli

~~windows virtualBox(ubuntu18_64) で動作~~

# setup and run development

```sh
git clone git@github.com:umi-tyaahan/ts_phaser_test.git
cd ts_phaser_test
yarn install
yarn start
```

chrome などで http://localhost:5000 でデモが動作します。

# Other build command

```
yarn build # productionビルド(source map なし)
yarn gitbuild # githubでゲーム公開用 (docs以下にファイル出力)
yarn dev # sourcemapありで出力
```

# fork from

https://github.com/digitsensitive/phaser3-typescript

# その他

pretter/ESLint 構成など  
https://qiita.com/KUMANOPUXTU/items/a7c4f935f34fa55dd2aa
