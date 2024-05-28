import { ExplosionCollision } from "./CollisionAnimations.js";

export class CollisionAnimationHandler {
  constructor(game) {
    this.game = game;
    this.currentlyActiveCollisionAnimations = [];
  }

  addExplosionCollision(enemy) {
    this.currentlyActiveCollisionAnimations.unshift(
      new ExplosionCollision(enemy)
    );
  }
  update() {
    if (this.currentlyActiveCollisionAnimations.length != 0) {
      this.currentlyActiveCollisionAnimations.forEach(
        (collisionAnimation, index) => {
          collisionAnimation.update();
          if (collisionAnimation.markedForDeletion == true) {
            this.currentlyActiveCollisionAnimations.splice(index, 1);
          }
        }
      );
    }
  }
  draw(context) {
    if (this.currentlyActiveCollisionAnimations.length != 0) {
      this.currentlyActiveCollisionAnimations.forEach((collisionAnimation) => {
        collisionAnimation.draw(context);
      });
    }
  }
}
