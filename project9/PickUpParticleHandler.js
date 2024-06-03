import { HealthStar, SpeedBoostStar } from "./PickUpParticles.js";

export class PickUpParticleHandler {
  constructor(pickUp) {
    this.pickUp = pickUp;
    this.currentlyActivePickUpParticles = [];
    this.pickUpParticleTimer = 0;
    this.pickUpParticleInterval = 200;
  }
  addPickUpParticle() {
    if (this.pickUp.name == "HealthPickUp") {
      this.currentlyActivePickUpParticles.push(new HealthStar(this.pickUp));
    } else if (this.pickUp.name == "SpeedBoostPickUp") {
      this.currentlyActivePickUpParticles.push(new SpeedBoostStar(this.pickUp));
    }
  }
  update(deltaTime) {
    if (this.pickUpParticleTimer > this.pickUpParticleInterval) {
      this.pickUpParticleTimer = 0;
      this.addPickUpParticle();
      this.addPickUpParticle();
    } else {
      this.pickUpParticleTimer += deltaTime;
    }
    this.currentlyActivePickUpParticles.forEach((pickUpParticle, index) => {
      pickUpParticle.update();
      if (pickUpParticle.markedForDeletion == true) {
        this.currentlyActivePickUpParticles.splice(index, 1);
      }
    });
  }
  draw(context) {
    this.currentlyActivePickUpParticles.forEach((pickUpParticle) => {
      pickUpParticle.draw(context);
    });
  }
}
