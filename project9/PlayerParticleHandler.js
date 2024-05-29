import {
  DustParticle,
  FireParticle,
  SplashParticle,
} from "./PlayerParticles.js";

export class PlayerParticleHandler {
  constructor(player) {
    this.player = player;
    this.currentlyActiveParticles = [];
    this.maxParticles = 100;
  }
  clearCurrentParticles() {
    this.currentlyActiveParticles.splice(
      0,
      this.currentlyActiveParticles.length
    );
  }
  addDustParticle() {
    this.currentlyActiveParticles.unshift(new DustParticle(this.player));
  }
  addFireParticle() {
    this.currentlyActiveParticles.unshift(new FireParticle(this.player));
  }
  addSplashParticles() {
    //will be called within the handleKeyBoardInput method of the Diving class
    this.clearCurrentParticles();
    for (let i = 1; i <= 100; i++) {
      this.currentlyActiveParticles.unshift(new SplashParticle(this.player));
    }
  }
  update() {
    if (this.player.playerStateHandler.currentState.state == "RUNNING") {
      this.addDustParticle();
    } else if (this.player.playerStateHandler.currentState.state == "ROLLING") {
      this.addFireParticle();
    }

    if (this.currentlyActiveParticles.length > this.maxParticles) {
      this.currentlyActiveParticles.splice(
        0,
        Math.floor((3 * this.maxParticles) / 4)
      );
    }

    this.currentlyActiveParticles.forEach((particle, index) => {
      particle.update();
      if (particle.markedForDeletion == true)
        this.currentlyActiveParticles.splice(index, 1);
    });
  }
  draw(context) {
    this.currentlyActiveParticles.forEach((particle) => {
      particle.draw(context);
    });
  }
}
