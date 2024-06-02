import { CollisionAnimationHandler } from "./CollisionAnimationHandler.js";

export class CollisionHandler {
  constructor(game) {
    this.game = game;
    this.player = game.player;
    this.collisionAnimationHandler = new CollisionAnimationHandler(game);
  }
  increaseScoreAccordingToEnemy(enemy) {
    if (enemy.name == "Fly") {
      this.game.score += 1;
      this.game.UIHandler.addHitPopUp(enemy);
    } else if (enemy.name == "Plant") {
      this.game.score += 2;
      this.game.UIHandler.addHitPopUp(enemy);
    } else if (enemy.name == "Spider_Big") {
      this.game.score += 3;
      this.game.UIHandler.addHitPopUp(enemy);
    }
  }
  UsePicKUp(pickUp) {
    if (pickUp.name == "HealthPickUp") {
      pickUp.UseOnPlayer();
      this.game.UIHandler.addHealthUpPopUp(pickUp);
    } else if (pickUp.name == "SpeedBoostPickUp") {
      pickUp.UseOnPlayer();
    }
  }
  playerCollisionWithEnemyDetection() {
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
          this.player.playerStateHandler.currentState.state == "ROLLING" ||
          this.player.playerStateHandler.currentState.state == "DIVING"
        ) {
          this.increaseScoreAccordingToEnemy(enemy);
        } else {
          this.player.playerHealthHandler.playerHealth -= 5;
          let indexOfGotHit =
            this.player.playerStateHandler.stateNums["GOTHIT"];
          this.player.playerStateHandler.setState(indexOfGotHit);
        }
      }
    });
  }
  attackParticleCollisionWithEnemyDetection() {
    this.game.enemyHandler.currentlyActiveEnemies.forEach((enemy) => {
      this.player.playerParticleHandler.currentlyActiveParticles.forEach(
        (particle) => {
          if (
            enemy.posX < particle.posX + particle.size &&
            enemy.posX > particle.posX &&
            enemy.posY < particle.posY + particle.size &&
            enemy.posY > particle.posY
          ) {
            enemy.markedForDeletion = true;
            this.collisionAnimationHandler.addExplosionCollision(enemy);
            this.increaseScoreAccordingToEnemy(enemy);
          }
        }
      );
    });
  }
  playerCollisionWithPickUpDetection() {
    this.game.PickUpHandler.currentlyActivePickUps.forEach((pickUp) => {
      if (
        pickUp.posX < this.player.posX + this.player.spriteWidth &&
        pickUp.posX > this.player.posX &&
        pickUp.posY < this.player.posY + this.player.spriteHeight &&
        pickUp.posY > this.player.posY
      ) {
        this.UsePicKUp(pickUp);
        pickUp.markedForDeletion = true;
      }
    });
  }
  collisionDetection() {
    this.playerCollisionWithEnemyDetection();
    this.attackParticleCollisionWithEnemyDetection();
    this.playerCollisionWithPickUpDetection();
  }

  update(deltaTime) {
    this.collisionDetection();
    this.collisionAnimationHandler.update(deltaTime);
  }
  draw(context) {
    this.collisionAnimationHandler.draw(context);
  }
}
