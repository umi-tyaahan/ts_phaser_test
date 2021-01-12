import 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Main',
    });
  }

  preload(): void {
    this.load.image('sky', 'assets/space3.png');
    this.load.image('akane', 'assets/akane_base7_s.png');
  }

  create(): void {
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'akane');

    this.cameras.main.fade(2000);
  }
  update(): void {
  }
}

class UIScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'UIScene',
      active: true
    });
  }

  create(): void {
    //  Our Text object to display the Score
    var info = this.add.text(10, 10, 'Score: 100', { font: '48px Arial', color: '#fff' });
  }
  update(): void {
    //console.log(this.acorn.x, this.acorn.y);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  scene:
    [GameScene, UIScene,]
  ,
};

var game = new Phaser.Game(config);

