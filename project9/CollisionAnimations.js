export class CollisionAnimation {
  constructor(enemy) {
    this.enemy = enemy;
    this.game = enemy.game;
    this.sizeModifier = Math.random() + 0.5;
    this.frameX = 0;
    this.frameY = 0;
    this.markedForDeletion = false;
  }
  update() {
    this.posX -= this.game.maxSpeed;
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
    this.modifiedWidth = this.spriteWidth * this.sizeModifier;
    this.modifiedHeight = this.spriteHeight * this.sizeModifier;
    this.posX = this.enemy.posX - this.modifiedWidth * 0.5;
    this.posY = this.enemy.posY - this.modifiedHeight * 0.5;
  }
}
