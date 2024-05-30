class PickUp {
  constructor(game) {
    this.game = game;
    this.markedForDeletion = false;
  }
  update() {
    if (this.posX < 0) {
      this.markedForDeletion = true;
    }
  }
}

export class HealthPickUp extends PickUp {
  constructor(game) {
    super(game);
    this.pickUpImage = document.getElementById("HealthPickupImage");
    this.spriteWidth = 524;
    this.spriteHeight = 525;
    this.spawnX = this.game.width;
    this.spawnY = this.game.height - this.game.groundMargin - 100;
    this.posX = this.spawnX;
    this.posY = this.spawnY;
    this.sizeModifier = 0.1;
  }
  update() {
    super.update();
    this.posX += -this.game.maxSpeed * this.game.speedFraction;
  }
  draw(context) {
    context.drawImage(
      this.pickUpImage,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.posX,
      this.posY,
      this.spriteWidth * this.sizeModifier,
      this.spriteHeight * this.sizeModifier
    );
  }
}
