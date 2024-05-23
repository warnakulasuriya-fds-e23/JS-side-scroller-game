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
  }
  update(pressedDownKeys) {
    //horizontal movement
    this.x += this.xVelocity; //motion along x axis
    if (pressedDownKeys.includes("ArrowRight")) {
      this.xVelocity = this.max_xVelocity;
    } else if (pressedDownKeys.includes("ArrowLeft")) {
      this.xVelocity = -this.max_xVelocity;
    } else {
      this.xVelocity = 0;
    }

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }

    //vertical movement (REMEMBER THAT THE Y AXIS IS INVERTED)

    if (pressedDownKeys.includes("ArrowUp") && this.onGround()) {
      this.yVelocity -= 30; //intial upward velocity
    }
    this.y += this.yVelocity; //motion along y axis
    if (!this.onGround()) {
      this.yVelocity += this.g; //the is deceleration taking place (the g is added and not subtracted because y axis is inverted)
    } else this.yVelocity = 0; //final velocity (stops player from falling throught the floor)
  }

  draw(context) {
    context.drawImage(
      this.image,
      0,
      0,
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
}
