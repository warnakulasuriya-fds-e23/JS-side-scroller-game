import { PickUpParticleHandler } from "./PickUpParticleHandler.js";
class PickUp {
  constructor(game, name) {
    this.name = name;
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
    super(game, "HealthPickUp");
    this.pickUpImage = document.getElementById("HealthPickupImage");
    this.spriteWidth = 524;
    this.spriteHeight = 525;
    this.spawnX = this.game.width;
    this.spawnY = this.game.height - this.game.groundMargin - 100;
    this.posX = this.spawnX;
    this.posY = this.spawnY;
    this.xVelocity = -this.game.maxSpeed * this.game.speedFraction;
    this.sizeModifier = 0.1;
    this.PickUpParticleHandler = new PickUpParticleHandler(this);
    this.angle = 0;
    this.varyAngle = Math.random() * 0.1 + 0.1;
  }
  update(deltaTime) {
    super.update();
    this.angle += this.varyAngle;
    this.xVelocity = -this.game.maxSpeed * this.game.speedFraction;
    this.posX += this.xVelocity;
    this.posY += Math.sin(this.angle);
    this.PickUpParticleHandler.update(deltaTime);
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
    this.PickUpParticleHandler.draw(context);
  }
}
