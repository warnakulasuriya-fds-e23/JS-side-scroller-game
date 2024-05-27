class Particle {
  constructor(player) {
    this.player = player;
    this.markedForDeletion = false;
  }
  update() {
    this.posX +=
      this.xVelocity -
      this.player.game.maxSpeed * this.player.game.speedFraction;
    console.log(this.posY);
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
    this.size = Math.random() * 10 + 10;
    this.xVelocity = Math.random();
    this.yVelocity = Math.random();
    this.dustColor = "rgb(0,0,0,0.15)";
  }

  draw(context) {
    // context.save();
    context.beginPath();
    context.arc(this.posX, this.posY, this.size, 0, Math.PI * 2);
    context.fillStyle = this.dustColor;
    context.fill();
    // context.restore();
  }
}
