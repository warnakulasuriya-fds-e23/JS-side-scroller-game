import { HealthPickUp, SpeedBoostPickUp } from "./PickUps.js";
export class PickUpHandler {
  constructor(game) {
    this.game = game;
    this.currentlyActivePickUps = [];
    this.healthPickUpTimer = 0;
    this.healthPickUpInterval = 60000 * Math.random();
    this.speedBoostPickUpTimer = 0;
    this.speedBoostPickUpInterval = 120000 * Math.random();
  }
  healthPickUpSpawner(deltaTime) {
    let HealthPercent = this.game.player.playerHealthHandler.HealthPercentage;

    if (
      this.healthPickUpTimer > this.healthPickUpInterval &&
      Math.random() > 0.5 &&
      HealthPercent < 75
    ) {
      this.healthPickUpTimer = 0;
      this.healthPickUpInterval = 60000 * Math.random();
      this.currentlyActivePickUps.push(new HealthPickUp(this.game));
    } else {
      this.healthPickUpTimer += deltaTime;
    }
  }
  speedBoostPickUpSpawner(deltaTime) {
    if (
      this.speedBoostPickUpTimer > this.speedBoostPickUpInterval &&
      this.game.speedFraction > 0 &&
      this.game.player.playerStateHandler.currentState.state != "HYPERSPEED" &&
      Math.random() > 0.5
    ) {
      this.speedBoostPickUpTimer = 0;
      this.speedBoostPickUpInterval = 120000 * Math.random();
      this.currentlyActivePickUps.push(new SpeedBoostPickUp(this.game));
    } else {
      this.speedBoostPickUpTimer += deltaTime;
    }
  }
  update(deltaTime) {
    this.healthPickUpSpawner(deltaTime);
    this.speedBoostPickUpSpawner(deltaTime);
    this.currentlyActivePickUps.forEach((pickUp, index) => {
      pickUp.update(deltaTime);
      if (pickUp.markedForDeletion == true) {
        this.currentlyActivePickUps.splice(index, 1);
      }
    });
  }
  draw(context) {
    this.currentlyActivePickUps.forEach((pickUp, index) => {
      pickUp.draw(context);
    });
  }
}
