import 'phaser';

let group: Phaser.GameObjects.Group;
let path1: Phaser.Curves.Path;
let path2: Phaser.Curves.Path;
let path3: Phaser.Curves.Path;
let path4: Phaser.Curves.Path;

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
  this.load.image('sky', '/assets/space3.png');
  this.load.image('akane', '/assets/akane_kubi.png');
}

function create() {
  let path1: Phaser.Curves.Path = this.path1;
  let path2: Phaser.Curves.Path = this.path2;
  let path3: Phaser.Curves.Path = this.path3;
  let path4: Phaser.Curves.Path = this.path4;

  this.add.image(400, 300, 'sky');

  this.group = this.add.group({
    key: 'akane',
    frameQuantity: 400,
    setScale: { x: 0.5, y: 0.5 },
  });

  //  Randomly position the sprites within the rectangle
  const rect = new Phaser.Geom.Rectangle(0, 0, 800, 600);
  Phaser.Actions.RandomRectangle(this.group.getChildren(), rect);

  path1 = this.add.path(50, 150);
  path1.cubicBezierTo(200, 150, 50, 50, 200, 50);
  path1.cubicBezierTo(50, 500, 200, 300, 100, 300);
  path1.lineTo(200, 500);
  let points1 = path1.getSpacedPoints(100);

  path2 = this.add.path();
  path2.add(new Phaser.Curves.Ellipse(320, 280, -60, -220));
  let points2 = path2.getSpacedPoints(100);

  path3 = this.add.path(450, 150);
  path3.cubicBezierTo(600, 150, 450, 50, 600, 50);
  path3.cubicBezierTo(450, 500, 600, 300, 500, 350);
  path3.lineTo(600, 500);
  let points3 = path3.getSpacedPoints(100);

  path4 = this.add.path();
  path4.add(new Phaser.Curves.Line([700, 80, 700, 500]));
  let points4 = path4.getSpacedPoints(100);

  this.input.once('pointerdown', () => {
    // Phaser.Actions.RotateAroundDistance(this.group.getChildren(), { x: 400, y: 300 }, 0.02, 200);

    let num = 0;

    this.group.children.iterate((child) => {
      let vec;
      if (num < 100) {
        vec = points1[num];
      } else if (num < 200) {
        vec = points2[num - 99];
      } else if (num < 300) {
        vec = points3[num - 199];
      } else if (num < 400) {
        vec = points4[num - 299];
      }

      this.tweens.add({
        targets: child,
        duration: 2000,
        ease: 'Expo',
        x: vec.x,
        y: vec.y,
      });

      num++;
    });
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
