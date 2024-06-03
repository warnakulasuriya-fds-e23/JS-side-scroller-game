export class PlayerMovementHandler {
  constructor(player) {
    this.player = player;
    this.game = player.game;
    this.keySettings = this.game.keyboardConfig.keySettings;
    this.xVelocity = 0;
    this.max_xVelocity = 10;
    this.yVelocity = 0;
    this.max_yVelocity = 10;
    this.g = 1; //graviational acceleration
  }

  boundaryHandling() {
    //stop player from going out of bounds from left side of screen
    if (this.player.posX < 0) {
      this.player.posX = 0;
    }

    //stops player from going out of bounds from right side of screen
    if (this.player.posX > this.game.width - this.player.spriteWidth) {
      this.player.posX = this.game.width - this.player.spriteWidth;
    }

    //stops player from going below the ground margin
    if (
      this.player.posY >
      this.game.height - this.game.groundMargin - this.player.spriteHeight
    ) {
      this.player.posY =
        this.game.height - this.game.groundMargin - this.player.spriteHeight;
    }
  }

  setPlayerSpeedMode(mode) {
    if (mode == "STOPPED") {
      this.max_xVelocity = 0;
    } else if (mode == "SLOW") {
      this.max_xVelocity = 5;
    } else if (mode == "NORMAL") {
      this.max_xVelocity = 10;
    } else if (mode == "FAST") {
      this.max_xVelocity = 20;
    }
  }
  horizontalMotion(pressedDownKeys) {
    if (this.player.playerStateHandler.currentState.state == "ROLLING") {
      this.setPlayerSpeedMode("FAST");
    } else if (this.player.playerStateHandler.currentState.state == "GOTHIT") {
      this.setPlayerSpeedMode("STOPPED");
    } else {
      this.setPlayerSpeedMode("NORMAL");
    }

    if (
      pressedDownKeys.includes(this.keySettings["FORWARD"]) &&
      !pressedDownKeys.includes(this.keySettings["CROUCH"])
    ) {
      this.xVelocity = this.max_xVelocity;
    } else if (
      pressedDownKeys.includes(this.keySettings["BACKWARD"]) &&
      !pressedDownKeys.includes(this.keySettings["CROUCH"])
    ) {
      this.xVelocity = -this.max_xVelocity;
    } else {
      this.xVelocity = 0;
    }
    this.player.posX += this.xVelocity; //motion along x axis
    this.boundaryHandling();
  }

  interuptJump() {
    /*will be executed if the player releases the jump button
    intended effect of interrupting the jump midway, is to make it so that 
    the longer the user presses Jump the higher the character will jump*/
    if (this.player.playerStateHandler.currentState.state == "JUMPING") {
      this.yVelocity = 0;
    }
  }
  //PLEASE NOTE!! : here we are dealing with an inverted y-axis
  verticalMotion(pressedDownKeys) {
    if (this.player.playerStateHandler.currentState.state == "DIVING") {
      this.yVelocity = 40;
    } else if (
      pressedDownKeys.includes(this.keySettings["JUMP"]) &&
      this.player.onGround() &&
      !pressedDownKeys.includes(this.keySettings["CROUCH"])
    ) {
      this.yVelocity = -28;
    }

    this.player.posY += this.yVelocity; //motion along y axis

    if (!this.player.onGround()) {
      this.yVelocity += this.g; //the is deceleration taking place (the g is added and not subtracted because y axis is inverted)
    } else this.yVelocity = 0; //final velocity (stops player from falling through the floor)

    this.boundaryHandling();
  }

  update(pressedDownKeys) {
    this.horizontalMotion(pressedDownKeys);
    this.verticalMotion(pressedDownKeys);
  }
}
