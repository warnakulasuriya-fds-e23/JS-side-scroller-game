import { CollisionAnimationHandler } from "./CollisionAnimationHandler.js";

export class CollisionHandler {
  constructor(game) {
    this.game = game;
    this.player = game.player;
    this.collisionAnimationHandler = new CollisionAnimationHandler(game);
  }
  collisionDetection() {
    //player colliding with enemy detection
    this.game.enemyHandler.currentlyActiveEnemies.forEach((enemy) => {
      if (
        enemy.posX < this.player.posX + this.player.spriteWidth &&
        enemy.posX > this.player.posX &&
        enemy.posY < this.player.posY + this.player.spriteHeight &&
        enemy.posY > this.player.posY
      ) {
        enemy.markedForDeletion = true;
        this.collisionAnimationHandler.addExplosionCollision(enemy);
        if (
          this.player.playerStateController.currentState.state == "ROLLING" ||
          this.player.playerStateController.currentState.state == "DIVING"
        ) {
          this.game.score++;
        } else {
          let indexOfGotHit =
            this.player.playerStateController.stateNums["GOTHIT"];
          this.player.playerStateController.setState(indexOfGotHit);
        }
      }
    });
    //particles colliding with enemy detection
    this.game.enemyHandler.currentlyActiveEnemies.forEach((enemy) => {
      this.player.playerParticleController.currentlyActiveParticles.forEach(
        (particle) => {
          if (
            enemy.posX < particle.posX + particle.size &&
            enemy.posX > particle.posX &&
            enemy.posY < particle.posY + particle.size &&
            enemy.posY > particle.posY
          ) {
            enemy.markedForDeletion = true;
            this.collisionAnimationHandler.addExplosionCollision(enemy);
            this.game.score++;
          }
        }
      );
    });
  }

  update(deltaTime) {
    this.collisionDetection();
    this.collisionAnimationHandler.update(deltaTime);
  }
  draw(context) {
    this.collisionAnimationHandler.draw(context);
  }
}
