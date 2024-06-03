export class CollisionAnimation {
  constructor(enemy) {
    this.enemy = enemy;
    this.game = enemy.game;
    this.sizeModifier = Math.random() + 0.5;
    this.frameX = 0;
    this.frameY = 0;
    this.markedForDeletion = false;

    this.fps = 200;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }
  update(deltaTime) {
    this.posX -= this.game.maxSpeed;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      this.frameX++;
    } else {
      this.frameTimer++;
    }

    if (this.frameX > this.totalSpriteFrames - 1) {
      this.markedForDeletion = true;
    }
  }
  draw(context) {
    context.drawImage(
      this.collisionImage,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.posX,
      this.posY,
      this.modifiedWidth,
      this.modifiedHeight
    );
  }
}

export class ExplosionCollision extends CollisionAnimation {
  constructor(enemy) {
    super(enemy);
    this.collisionImage = document.getElementById("explosionSprite");
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.totalSpriteFrames = 5;
    this.modifiedWidth = this.spriteWidth * this.sizeModifier;
    this.modifiedHeight = this.spriteHeight * this.sizeModifier;
    this.posX = this.enemy.posX - this.modifiedWidth * 0.5;
    this.posY = this.enemy.posY - this.modifiedHeight * 0.5;
  }
}
