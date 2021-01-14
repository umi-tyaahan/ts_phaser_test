import 'phaser';
import { Hero } from './class/Hero';

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  pixelArt: true,
  zoom: 2,
  physics: {
    default: 'arcade',
  },
  scene: {
    preload() {
      this.load.spritesheet('hero', 'assets/hero.png', {
        frameWidth: 32,
        frameHeight: 32,
      });
      this.load.image('bg', 'assets/bg.png');
    },

    create() {
      this.keys = this.input.keyboard.createCursorKeys();

      // Static background
      this.add.image(200, 200, 'bg');

      // The movable character
      this.hero = new Hero({ scene: this, x: 200, y: 150 });
    },

    update() {
      // this.stateMachine.step();
      this.hero.stateMachine.step();
    },
  },
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

//HTMLがロードされた後にインスタンスを生成する
window.addEventListener('load', () => {
  const game = new Game(config);
});
