import { ExplosionCollision } from "./CollisionAnimations";

export class CollisionAnimationHandler {
  constructor(game) {
    this.game = game;
    this.currentlyActiveCollisionAnimations = [];
  }

  addExplosionCollision() {
    this.currentlyActiveCollisionAnimations.unshift(
      new ExplosionCollision(this.game)
    );
  }
  update() {
    this.currentlyActiveCollisionAnimations.forEach(
      (collisionAnimation, index) => {
        collisionAnimation.update();
        if (collisionAnimation.markedForDeletion == true) {
          this.currentlyActiveCollisionAnimations.splice(index, 1);
        }
      }
    );
  }
  draw(context) {
    this.currentlyActiveCollisionAnimations.forEach((collisionAnimation) => {
      collisionAnimation.draw(context);
    });
  }
}
