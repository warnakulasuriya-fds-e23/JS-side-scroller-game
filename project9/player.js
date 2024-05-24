import { Movement } from "./Movement.js";
import { PlayerSpriteSheetAnimations } from "./playerSpriteSheetAnimation.js";
import { PlayerStateController } from "./PlayerStateController.js";
export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.spriteSheet = document.getElementById("player");
    this.movement = new Movement();
    this.playerSpriteAnimations = new PlayerSpriteSheetAnimations(this);
    this.playerStateController = new PlayerStateController(this);
  }
  update(pressedDownKeys, deltaTime) {
    //STATE HANDING
    this.playerStateController.currentState.handleKeyBoardInput(
      pressedDownKeys
    );

    //MOVEMENT HANDLING
    this.movement.MotionHandling(this, pressedDownKeys);

    //sprite animation
    this.playerSpriteAnimations.deltaTime = deltaTime;
    this.playerSpriteAnimations.playerState =
      this.playerStateController.currentState.state;
    this.playerSpriteAnimations.animate();
  }

  draw(context) {
    context.drawImage(
      this.spriteSheet,
      this.playerSpriteAnimations.frameX * this.width,
      this.playerSpriteAnimations.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  onGround() {
    //returns true if player is on ground
    //(might look a bit weird but thats cuz we're dealing wiht an inverted y axis)
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }
}
