export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Loading',
    });
  }
  /**アセットを読み込むライフサイクルで呼ばれるメソッド*/
  preload(): void {
    //ロード中の文面を設定する
    const loadingText = (progress: number): string =>
      `Now Loading ... ${Math.round(progress * 100)}%`;

    //テキストオブジェクトを作る
    const currentLoadingText = this.add.text(10, 10, loadingText(0));

    //glslロード
    this.load.glsl('fire', './assets/fire.glsl.js', 'fragment', {
      responseType: 'text',
    });

    //ファイルのロードをしていく
    this.load.image('acorn', './assets/food_byanbyanmen_s.png');
    //疑似的に大量のアセットをロードするかのような動きをさせてる
    for (let index = 0; index < 100; index++) {
      this.load.image('acorn' + index, './assets/food_byanbyanmen_s.png');
    }

    //ロードに進捗があるたびに発生するイベント
    this.load.on('progress', (progress: number) => {
      //テキストの内容を書き換える
      currentLoadingText.text = loadingText(progress);
    });
    //ロードが完了すると発生するイベント
    this.load.on('complete', () => {
      //タイトルシーンへ遷移
      this.scene.start('Title');
    });
  }
}
