import { Movement } from "./Movement.js";
import { PlayerAnimationHandler } from "./playerAnimationHandler.js";
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
    this.playerHealth = 100;
    this.playerEnergy = 200;
    this.movement = new Movement(game);
    this.playerAnimationHandler = new PlayerAnimationHandler(this);
    this.playerStateController = new PlayerStateController(this);
    this.playerParticleController = new PlayerParticleController(this);
  }
  update(pressedDownKeys, deltaTime) {
    //STATE HANDLING
    this.playerStateController.currentState.handleKeyBoardInput(
      pressedDownKeys,
      this.game.keyboardConfig.keySettings
    );

    //MOVEMENT HANDLING
    this.movement.MotionHandling(this, pressedDownKeys);

    //SPRITE ANIMATION HANDLING

    this.playerAnimationHandler.update(deltaTime);

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
      this.playerAnimationHandler.frameX * this.spriteWidth,
      this.playerAnimationHandler.frameY * this.spriteHeight,
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
}
