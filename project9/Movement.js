export class Movement {
  constructor() {
    this.xVelocity = 0;
    this.max_xVelocity = 10;
    this.yVelocity = 0;
    this.max_yVelocity = 10;
    this.g = 1; //graviational acceleration
  }
  horizontalMotion(player, pressedDownKeys) {
    player.x += player.xVelocity; //motion along x axis
    if (pressedDownKeys.includes("ArrowRight")) {
      player.xVelocity = player.max_xVelocity;
    } else if (pressedDownKeys.includes("ArrowLeft")) {
      player.xVelocity = -player.max_xVelocity;
    } else {
      player.xVelocity = 0;
    }

    if (player.x < 0) {
      player.x = 0;
    }

    if (player.x > player.game.width - player.width) {
      player.x = player.game.width - player.width;
    }
  }

  //PLEASE NOTE!! : here we are dealing with an inverted y-axis
  verticalMotion(player, pressedDownKeys) {
    if (pressedDownKeys.includes("ArrowUp") && player.onGround())
      player.yVelocity = -30;
    player.y += player.yVelocity; //motion along y axis
    if (!player.onGround()) {
      player.yVelocity += player.g; //the is deceleration taking place (the g is added and not subtracted because y axis is inverted)
    } else player.yVelocity = 0; //final velocity (stops player from falling throught the floor)
  }

  MotionHandling(player, pressedDownKeys) {
    this.horizontalMotion(player, pressedDownKeys);
    this.verticalMotion(player, pressedDownKeys);
  }
}
