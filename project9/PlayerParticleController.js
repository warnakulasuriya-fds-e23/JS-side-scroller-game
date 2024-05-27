import { Dust, Fire } from "./PlayerParticles.js";

export class PlayerParticleController {
  constructor(player) {
    this.player = player;
    this.currentlyActiveParticles = [];
  }
  update() {
    if (this.player.playerStateController.currentState.state == "RUNNING") {
      this.currentlyActiveParticles.unshift(new Dust(this.player));
    } else if (
      this.player.playerStateController.currentState.state == "ROLLING"
    ) {
      this.currentlyActiveParticles.unshift(new Fire(this.player));
    }

    if (this.currentlyActiveParticles.length > 200) {
      this.currentlyActiveParticles.splice(0, 50);
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
