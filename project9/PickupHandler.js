import { HealthPickUp } from "./PickUps.js";
export class PickUpHandler {
  constructor(game) {
    this.game = game;
    this.currentlyActivePickUps = [];
    this.pickUpTimer = 0;
    this.pickUpInterval = 60000 * Math.random();
  }
  update(deltaTime) {
    let HealthPercent = this.game.player.playerHealthHandler.HealthPercentage;
    this.pickUpTimer += deltaTime;
    if (
      this.pickUpTimer > this.pickUpInterval &&
      Math.random() > 0.5 &&
      HealthPercent < 75
    ) {
      this.pickUpTimer = 0;
      this.pickUpInterval = 60000 * Math.random();
      this.currentlyActivePickUps.push(new HealthPickUp(this.game));
    }

    this.currentlyActivePickUps.forEach((pickUp, index) => {
      pickUp.update();
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
