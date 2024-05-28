export class Movement {
  constructor(game) {
    this.game = game;
    this.keySettings = game.keyboardConfig.keySettings;
    this.xVelocity = 0;
    this.max_xVelocity = 10;
    this.yVelocity = 0;
    this.max_yVelocity = 10;
    this.g = 1; //graviational acceleration
  }

  boundaryHandling(player) {
    //stop player from going out of bounds from left side of screen
    if (player.posX < 0) {
      player.posX = 0;
    }

    //stops player from going out of bounds from right side of screen
    if (player.posX > this.game.width - player.spriteWidth) {
      player.posX = this.game.width - player.spriteWidth;
    }

    //stops player from going below the ground margin
    if (
      player.posY >
      this.game.height - this.game.groundMargin - player.spriteHeight
    ) {
      player.posY =
        this.game.height - this.game.groundMargin - player.spriteHeight;
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
  horizontalMotion(player, pressedDownKeys) {
    if (player.playerStateController.currentState.state == "ROLLING") {
      this.setPlayerSpeedMode("FAST");
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
    player.posX += this.xVelocity; //motion along x axis
    this.boundaryHandling(player);
  }

  //PLEASE NOTE!! : here we are dealing with an inverted y-axis
  verticalMotion(player, pressedDownKeys) {
    if (player.playerStateController.currentState.state == "DIVING") {
      this.yVelocity = 40;
    } else if (
      pressedDownKeys.includes(this.keySettings["JUMP"]) &&
      player.onGround() &&
      !pressedDownKeys.includes(this.keySettings["CROUCH"])
    ) {
      this.yVelocity = -30;
    }

    player.posY += this.yVelocity; //motion along y axis

    if (!player.onGround()) {
      this.yVelocity += this.g; //the is deceleration taking place (the g is added and not subtracted because y axis is inverted)
    } else this.yVelocity = 0; //final velocity (stops player from falling throught the floor)

    this.boundaryHandling(player);
  }

  MotionHandling(player, pressedDownKeys) {
    this.horizontalMotion(player, pressedDownKeys);
    this.verticalMotion(player, pressedDownKeys);
  }
}
