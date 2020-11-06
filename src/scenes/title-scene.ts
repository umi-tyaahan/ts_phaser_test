export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Title',
    });
  }

  /**ロードが終わったあとのライフサイクルで呼ばれるメソッド */
  create(): void {
    const text = this.add.text(10, 10, 'おしたらStartA');

    //setInteractiveを呼ぶと動的なオブジェクトになる
    //入力系のイベントなどが有効化される
    text.setInteractive();

    text.on('pointerdown', () => {
      this.scene.start('Main');
    });
  }
}
