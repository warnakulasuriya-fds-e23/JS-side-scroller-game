class Particle {
  constructor(player) {
    this.player = player;
    this.markedForDeletion = false;
  }
  update() {
    this.posX +=
      this.xVelocity -
      this.player.game.maxSpeed * this.player.game.speedFraction;
    this.posY += this.yVelocity;
    this.size *= 0.95;
    if (this.size < 0.01) this.markedForDeletion = true;
  }
}

export class DustParticle extends Particle {
  constructor(player) {
    super(player);
    this.particleSpawnX = this.player.posX + this.player.spriteWidth / 2;
    this.particleSpawnY = this.player.posY + this.player.spriteHeight;
    this.posX = this.particleSpawnX;
    this.posY = this.particleSpawnY;
    this.size = 1 * 10 + 10;
    this.xVelocity = Math.random();
    this.yVelocity = -Math.random();
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

export class FireParticle extends Particle {
  constructor(player) {
    super(player);
    this.particleImage = document.getElementById("fireSprite");
    this.size = Math.random() * 50 + 50;
    this.particleSpawnX =
      this.player.posX + this.player.spriteWidth * Math.random();
    this.particleSpawnY =
      this.player.posY + this.player.spriteHeight * Math.random();
    this.posX = this.particleSpawnX;
    this.posY = this.particleSpawnY;
    this.xVelocity = 1;
    this.yVelocity = -1;
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

export class SplashParticle extends Particle {
  constructor(player) {
    super(player);
    this.particleImage = document.getElementById("fireSprite");
    this.size = Math.random() * 100 + 100;
    this.particleSpawnX =
      this.player.posX + this.player.spriteWidth / 2 - this.size * 0.4;
    this.particleSpawnY =
      this.player.posY + this.player.spriteHeight / 2 - this.size * 0.5;
    this.posX = this.particleSpawnX;
    this.posY = this.particleSpawnY;
    this.xVelocity =
      Math.random() * (Math.random() * 6 + 20 * (Math.random() < 0.5 ? -1 : 1));
    this.yVelocity = -Math.random() * 40;
    this.grav = 0;
  }
  update() {
    super.update();
    this.grav += 2;
    this.posY += this.grav;
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
