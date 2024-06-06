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
    this.name = "DustParticle";
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
    this.name = "FireParticle";
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
    this.name = "SplashParticle";
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

export class VerticalShockWave extends Particle {
  constructor(player) {
    super(player);
    this.name = "VerticalShockWave";
    this.spriteSheet = document.getElementById("fireRingSpriteSheet");
    this.spriteWidth = 500;
    this.spriteHeight = 500;
    this.sizeModifier = 0.005;
    this.particleSpawnX = this.player.posX + 120;
    this.particleSpawnY = this.player.posY + 45;
    this.posX = this.particleSpawnX;
    this.posY = this.particleSpawnY;
    this.xVelocity = -10;
    this.yVelocity = -40;

    //following properties will be used for animating the shockwave
    this.frameX = 0;
    this.totalframes = 3;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
  }
  animate() {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.totalframes - 1) {
        this.frameX += 1;
      } else {
        this.frameX = 0;
      }
    } else {
      let deltaTime = this.player.playerParticleHandler.deltaTime;
      this.frameTimer += deltaTime;
    }
  }
  update() {
    this.posX +=
      this.xVelocity -
      this.player.game.maxSpeed * this.player.game.speedFraction;
    this.posY += this.yVelocity;
    this.sizeModifier += 0.14;
    this.animate();
    if (this.sizeModifier > 1.3) this.markedForDeletion = true;
  }
  draw(context) {
    context.save();
    // context.strokeStyle = "green";
    // context.lineWidth = 5;
    // context.strokeRect(
    //   this.posX,
    //   this.posY,
    //   this.spriteWidth * this.sizeModifier,
    //   this.spriteHeight * this.sizeModifier
    // );
    // context.beginPath();
    // let midX = this.posX + (this.spriteWidth * this.sizeModifier) / 2;
    // let midY = this.posY + (this.spriteHeight * this.sizeModifier) / 2;
    // context.moveTo(midX, midY);
    // context.lineTo(midX + 500, midY);
    // context.lineWidth = 5;
    // context.strokeStyle = "red";
    // context.stroke();
    context.drawImage(
      this.spriteSheet,
      this.spriteWidth * this.frameX,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.posX,
      this.posY,
      this.spriteWidth * this.sizeModifier,
      this.spriteHeight * this.sizeModifier
    );
    context.restore();
  }
}
