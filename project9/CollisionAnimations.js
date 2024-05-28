export class CollisionAnimation {
  constructor(game) {
    this.game = game;
    this.player = this.game.player;
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
      this.posX,
      this.posY,
      this.modifiedWidth,
      this.modifiedHeight
    );
  }
}

export class ExplosionCollision extends CollisionAnimation {
  constructor(game) {
    super(game);
    this.collisionImage = document.getElementById("explosionSprite");
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.modifiedWidth = this.spriteWidth * this.sizeModifier;
    this.modifiedHeight = this.spriteHeight * this.sizeModifier;
    this.posX = this.player.posX - this.modifiedWidth * 0.5;
    this.posY = this.player.posY - this.modifiedHeight * 0.5;
  }
}
