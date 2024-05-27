import { Dust } from "./PlayerParticles.js";

export class PlayerParticleController {
  constructor(player) {
    this.player = player;
    this.currentlyActiveParticles = [];
  }
  update() {
    if (this.player.playerStateController.currentState.state == "RUNNING") {
      let dust = new Dust(this.player);
      this.currentlyActiveParticles.push(dust);
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
