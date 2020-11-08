export default class MainScene extends Phaser.Scene {
  private imgobj: Phaser.Physics.Arcade.Image;
  constructor() {
    super({
      key: 'Main',
      physics: { arcade: { debug: true } },
    });
  }

  create(): void {
    this.add.shader('Flame', 0, 0, 800, 600).setOrigin(0);

    const particles = this.add.particles('red');

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    });

    this.physics.world.gravity.y = 100;
    this.imgobj = this.physics.add
      .sprite(30, 30, 'imgobj') //loading画面で設定したkeyで画像を読める
      .setScale(0.5)
      // .setOrigin(0, 0)
      .setInteractive()
      .setVelocityX(200)
      .setCollideWorldBounds(true, 1, 1);

    this.imgobj.on('pointerdown', () => {
      this.imgobj.setVelocityX(-this.imgobj.body.velocity.x);
    });

    emitter.startFollow(this.imgobj);
  }
  update(): void {
    //console.log(this.acorn.x, this.acorn.y);
  }
}
