import { Movement } from "./Movement.js";
import { PlayerSpriteSheetAnimations } from "./playerSpriteSheetAnimation.js";
import { PlayerStateController } from "./PlayerStateController.js";
import { PlayerParticleController } from "./PlayerParticleController.js";
export class Player {
  constructor(game) {
    this.game = game;
    this.spriteWidth = 100;
    this.spriteHeight = 91.3;
    this.posX = 0;
    this.posY = this.game.height - this.spriteHeight - this.game.groundMargin;
    this.spriteSheet = document.getElementById("playerSprites");
    this.movement = new Movement(game);
    this.playerSpriteAnimations = new PlayerSpriteSheetAnimations(this);
    this.playerStateController = new PlayerStateController(this);
    this.playerParticleController = new PlayerParticleController(this);
  }
  update(pressedDownKeys, deltaTime) {
    //STATE HANDING
    this.playerStateController.currentState.handleKeyBoardInput(
      pressedDownKeys,
      this.game.keyboardConfig.keySettings
    );

    //MOVEMENT HANDLING
    this.movement.MotionHandling(this, pressedDownKeys);

    //COLLiSION HANDLING
    this.collisionDetection();

    //SPRITE ANIMATION HANDLING
    this.playerSpriteAnimations.deltaTime = deltaTime;
    this.playerSpriteAnimations.playerState =
      this.playerStateController.currentState.state;
    this.playerSpriteAnimations.animate();

    //PARTICLES HANDLING
    this.playerParticleController.update();
  }

  draw(context) {
    if (this.game.debugMode) {
      context.strokeStyle = "blue";
      context.strokeRect(
        this.posX,
        this.posY,
        this.spriteWidth,
        this.spriteHeight
      );
    }
    context.drawImage(
      this.spriteSheet,
      this.playerSpriteAnimations.frameX * this.spriteWidth,
      this.playerSpriteAnimations.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.posX,
      this.posY,
      this.spriteWidth,
      this.spriteHeight
    );

    this.playerParticleController.draw(context);
  }

  onGround() {
    //returns true if player is on ground
    //(might look a bit weird but thats cuz we're dealing wiht an inverted y axis)
    return (
      this.posY >= this.game.height - this.spriteHeight - this.game.groundMargin
    );
  }

  collisionDetection() {
    //player colliding with enemy detection
    this.game.enemyHandler.currentlyActiveEnemies.forEach((enemy) => {
      if (
        enemy.posX < this.posX + this.spriteWidth &&
        enemy.posX > this.posX &&
        enemy.posY < this.posY + this.spriteHeight &&
        enemy.posY > this.posY
      ) {
        enemy.markedForDeletion = true;
        if (
          this.playerStateController.currentState.state == "ROLLING" ||
          this.playerStateController.currentState.state == "DIVING"
        ) {
          this.game.score++;
        } else {
          let indexOfGotHit = this.playerStateController.stateNums["GOTHIT"];
          this.playerStateController.setState(indexOfGotHit);
        }
      }
    });
    //particles colliding with enemy detection
    this.game.enemyHandler.currentlyActiveEnemies.forEach((enemy) => {
      this.playerParticleController.currentlyActiveParticles.forEach(
        (particle) => {
          if (
            enemy.posX < particle.posX + particle.size &&
            enemy.posX > particle.posX &&
            enemy.posY < particle.posY + particle.size &&
            enemy.posY > particle.posY
          ) {
            enemy.markedForDeletion = true;
            this.game.score++;
          }
        }
      );
    });
  }
}
