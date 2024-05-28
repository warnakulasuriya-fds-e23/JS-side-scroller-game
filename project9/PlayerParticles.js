class Particle {
  constructor(player) {
    this.player = player;
    this.markedForDeletion = false;
  }
  update() {
    this.posX +=
      this.xVelocity -
      this.player.game.maxSpeed * this.player.game.speedFraction;
    this.posY -= this.yVelocity;
    this.size *= 0.95;
    if (this.size < 0.01) this.markedForDeletion = true;
  }
}

export class Dust extends Particle {
  constructor(player) {
    super(player);
    this.particleSpawnX = this.player.posX + this.player.spriteWidth / 2;
    this.particleSpawnY = this.player.posY + this.player.spriteHeight;
    this.posX = this.particleSpawnX;
    this.posY = this.particleSpawnY;
    this.size = 1 * 10 + 10;
    this.xVelocity = Math.random();
    this.yVelocity = Math.random();
    this.dustColor = "rgb(0,0,0,0.15)";
  }

  draw(context) {
    context.save();
    context.beginPath();
    context.arc(this.posX, this.posY, this.size, 0, Math.PI * 2);
    context.fillStyle = this.dustColor;
    context.fill();
    context.restore();
  }
}

export class Fire extends Particle {
  constructor(player) {
    super(player);
    this.particleImage = document.getElementById("fireSprite");
    this.size = Math.random() * 50 + 50;
    this.particleSpawnX = this.player.posX + this.player.spriteWidth / 2;
    this.particleSpawnY = this.player.posY + this.player.spriteHeight / 2;
    this.posX = this.particleSpawnX;
    this.posY = this.particleSpawnY;
    this.xVelocity = 1;
    this.yVelocity = 1;
    this.angle = 0;
  }
  update() {
    super.update();
  }
  draw(context) {
    context.drawImage(
      this.particleImage,
      this.posX,
      this.posY,
      this.size,
      this.size
    );
  }
}
