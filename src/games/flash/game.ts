import 'phaser';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  parent: 'game',
  scene: {
    preload: preload,
    create: create,
  },
};

function preload() {

  this.load.image('sky', 'assets/space3.png');
  this.load.image('akane', 'assets/akane_base7_s.png');

  this.load.image('bad', 'assets/bad.png')

  this.load.image('lifeContainer', 'assets/lifeContainer.png');
  this.load.image('lifeBar', 'assets/lifeBar.png');
}

function create() {
  this.add.image(400, 300, 'sky');
  let img1 = this.add.image(400, 300, 'akane');
  let badButton = this.add.image(650, 300, 'bad').setScale(1.5, 1.5).setInteractive();
  let lifeBarMask = createLifeBar(this);

  badButton.on('pointerdown', () => {

    //オブジェクトフラッシュ
    this.tweens.add({
      targets: img1,
      duration: 100,
      scope: img1,
      onLoop: () => {
        img1.isTinted ? img1.clearTint() : img1.setTintFill(0xe9e9e9);
      },
      loop: 4,
      onComplete: () => {
        //演出完了後にライフゲージを減らす
        lifeBarMask.x -= 20;
      },
    });

    budButtonAnimation(this, badButton);

  });
}

function createLifeBar(scene: Phaser.Scene): Phaser.GameObjects.Image {
  let lifeContainer = scene.add.image(32, 23, 'lifeContainer').setOrigin(0, 0);
  let lifeBar = scene.add.image(
    lifeContainer.x + 7,
    lifeContainer.y + 4,
    'lifeBar',
  ).setOrigin(0, 0);

  let lifeBarMask = scene.add.image(lifeBar.x, lifeBar.y, "lifeBar").setOrigin(0, 0).setVisible(false);
  lifeBar.mask = new Phaser.Display.Masks.BitmapMask(scene, lifeBarMask);

  return lifeBarMask
}

function budButtonAnimation(scene: Phaser.Scene, badButton: Phaser.GameObjects.Image): void {
  scene.tweens.add({
    targets: badButton,
    duration: 100,
    y: '+=4',
    yoyo: true,
  });
}

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

//HTMLがロードされた後にインスタンスを生成する
window.addEventListener('load', () => {
  const game = new Game(config);
});
