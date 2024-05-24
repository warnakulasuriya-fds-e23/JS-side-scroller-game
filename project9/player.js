import { Sitting, Running, Jumping, Falling, Idling } from "./playerState.js";
import { MotionHandling } from "./Movement.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.image = document.getElementById("player");
    this.xVelocity = 0;
    this.max_xVelocity = 10;
    this.yVelocity = 0;
    this.max_yVelocity = 10;
    this.g = 1; //graviational acceleration
    this.states = [
      new Sitting(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
      new Idling(this),
    ];
    this.currentState = this.states[0];
    this.currentState.activate();
    this.frameX = 0; //x poisiton of selected sprite (top left corner point of sprite box)
    this.frameY = 0; //y position of selected sprite (top "" "")
  }
  update(pressedDownKeys) {
    //STATE HANDING
    this.currentState.handleKeyBoardInput(pressedDownKeys);

    //MOVEMENT HANDLING
    MotionHandling(this, pressedDownKeys);
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
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
    return this.y >= this.game.height - this.height;
  }

  setState(stateNum) {
    this.currentState = this.states[stateNum];
    this.currentState.activate();
  }
}
