import { State, StateMachine } from './StateMachine';

export class Hero extends Phaser.Physics.Arcade.Sprite {
  private direction: string;
  private stateMachine: StateMachine;

  constructor(config) {
    super(config.scene, config.x, config.y, 'hero');

    this.scene.add.existing(this);

    this.scene.physics.world.enableBody(
      this,
      Phaser.Physics.Arcade.DYNAMIC_BODY,
    );

    this.direction = 'down';

    // The state machine managing the hero
    this.stateMachine = new StateMachine(
      'idle',
      new Map([
        ['idle', new IdleState()],
        ['move', new MoveState()],
        ['swing', new SwingState()],
        ['dash', new DashState()],
      ]),
      [this.scene, this],
    );

    this.createAnims();
  }

  public step(): void {
    this.stateMachine.step();
  }

  private createAnims(): void {
    // Animation definitions
    this.scene.anims.create({
      key: 'walk-down',
      frameRate: 8,
      repeat: -1,
      frames: this.scene.anims.generateFrameNumbers('hero', {
        start: 0,
        end: 3,
      }),
    });
    this.scene.anims.create({
      key: 'walk-right',
      frameRate: 8,
      repeat: -1,
      frames: this.scene.anims.generateFrameNumbers('hero', {
        start: 4,
        end: 7,
      }),
    });
    this.scene.anims.create({
      key: 'walk-up',
      frameRate: 8,
      repeat: -1,
      frames: this.scene.anims.generateFrameNumbers('hero', {
        start: 8,
        end: 11,
      }),
    });
    this.scene.anims.create({
      key: 'walk-left',
      frameRate: 8,
      repeat: -1,
      frames: this.scene.anims.generateFrameNumbers('hero', {
        start: 12,
        end: 15,
      }),
    });

    // NOTE: Sword animations do not repeat
    this.scene.anims.create({
      key: 'swing-down',
      frameRate: 8,
      repeat: 0,
      frames: this.scene.anims.generateFrameNumbers('hero', {
        start: 16,
        end: 19,
      }),
    });
    this.scene.anims.create({
      key: 'swing-up',
      frameRate: 8,
      repeat: 0,
      frames: this.scene.anims.generateFrameNumbers('hero', {
        start: 20,
        end: 23,
      }),
    });
    this.scene.anims.create({
      key: 'swing-right',
      frameRate: 8,
      repeat: 0,
      frames: this.scene.anims.generateFrameNumbers('hero', {
        start: 24,
        end: 27,
      }),
    });
    this.scene.anims.create({
      key: 'swing-left',
      frameRate: 8,
      repeat: 0,
      frames: this.scene.anims.generateFrameNumbers('hero', {
        start: 28,
        end: 31,
      }),
    });
  }
}

class IdleState implements State {
  public stateMachine;

  enter(scene, hero) {
    hero.setVelocity(0);
    hero.anims.play(`walk-${hero.direction}`);
    hero.anims.stop();
  }

  execute(scene, hero) {
    const { left, right, up, down, space, shift } = scene.keys;

    // Transition to swing if pressing space
    if (space.isDown) {
      this.stateMachine.transition('swing');
      return;
    }

    // Transition to dash if pressing shift
    if (shift.isDown) {
      this.stateMachine.transition('dash');
      return;
    }

    // Transition to move if pressing a movement key
    if (left.isDown || right.isDown || up.isDown || down.isDown) {
      this.stateMachine.transition('move');
      return;
    }
  }
}

class MoveState implements State {
  public stateMachine;

  enter() {
    return;
  }

  execute(scene, hero) {
    const { left, right, up, down, space, shift } = scene.keys;

    // Transition to swing if pressing space
    if (space.isDown) {
      this.stateMachine.transition('swing');
      return;
    }

    // Transition to dash if pressing shift
    if (shift.isDown) {
      this.stateMachine.transition('dash');
      return;
    }

    // Transition to idle if not pressing movement keys
    if (!(left.isDown || right.isDown || up.isDown || down.isDown)) {
      this.stateMachine.transition('idle');
      return;
    }

    hero.setVelocity(0);
    if (up.isDown) {
      hero.setVelocityY(-100);
      hero.direction = 'up';
    } else if (down.isDown) {
      hero.setVelocityY(100);
      hero.direction = 'down';
    }
    if (left.isDown) {
      hero.setVelocityX(-100);
      hero.direction = 'left';
    } else if (right.isDown) {
      hero.setVelocityX(100);
      hero.direction = 'right';
    }

    hero.anims.play(`walk-${hero.direction}`, true);
  }
}

class SwingState implements State {
  public stateMachine;

  enter(scene, hero) {
    hero.setVelocity(0);
    hero.anims.play(`swing-${hero.direction}`);
    hero.once('animationcomplete', () => {
      this.stateMachine.transition('idle');
    });
  }

  execute() {
    return;
  }
}

class DashState implements State {
  public stateMachine;

  enter(scene, hero) {
    hero.setVelocity(0);
    hero.anims.play(`swing-${hero.direction}`);
    switch (hero.direction) {
      case 'up':
        hero.setVelocityY(-300);
        break;
      case 'down':
        hero.setVelocityY(300);
        break;
      case 'left':
        hero.setVelocityX(-300);
        break;
      case 'right':
        hero.setVelocityX(300);
        break;
    }

    // Wait a third of a second and then go back to idle
    scene.time.delayedCall(300, () => {
      this.stateMachine.transition('idle');
    });
  }

  execute() {
    return;
  }
}
