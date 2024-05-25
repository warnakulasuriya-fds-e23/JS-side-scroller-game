class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }
  update(deltaTime) {
    //movement
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    //sprite animation
    if (this.frameTime > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.totalspriteFrames - 1) this.frameX++;
      else this.frameX = 0;
    } else this.frameTimer += deltaTime;
  }
  draw(context) {
    context.draw(
      this.enemyImage,
      this.frameX * this.spriteWidth,
      0, //cuz enemies have only one row in their sprite sheet
      this.spriteWidth,
      this.spirteHeight,
      this.spawnX,
      this.spawnY,
      this.spriteWidth,
      this.spirteHeight
    );
  }
}

class FlyingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.spawnX = 200; //x position of spawn point (starting point) of enemy
    this.spawnY = 200; //y position of spaw "" "" "" ""
  }
}

export class Fly extends FlyingEnemy {
  constructor(game) {
    super(game);
    this.spriteWidth = 60;
    this.spirteHeight = 44;
    this.xVelocity = 2;
    this.yVelocity = 0;
    this.totalspriteFrames = 6;
    this.enemyImage = document.getElementById("enemy_fly");
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
}

class GroundEnemy extends Enemy {}

class ClimbingEnemy extends Enemy {}
