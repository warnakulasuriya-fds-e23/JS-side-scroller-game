const stateNums = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  IDLING: 4,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class Sitting extends State {
  constructor(player) {
    super("SITTING");
    this.player = player;
  }
  activate() {
    this.player.playerSpriteAnimations.frameY = 5;
    this.player.game.speedFraction = 0;
  }
  handleKeyBoardInput(pressedDownKeys) {
    if (
      (pressedDownKeys.includes("ArrowLeft") ||
        pressedDownKeys.includes("ArrowRight")) &&
      !pressedDownKeys.includes("ArrowDown")
    ) {
      this.player.playerStateController.setState(stateNums.RUNNING);
    } else if (pressedDownKeys.includes("ArrowUp")) {
      this.player.playerStateController.setState(stateNums.JUMPING);
    }
  }
}

export class Running extends State {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }
  activate() {
    this.player.playerSpriteAnimations.frameY = 3;
    this.player.game.speedFraction = 1;
  }
  handleKeyBoardInput(pressedDownKeys) {
    if (pressedDownKeys.includes("ArrowDown")) {
      this.player.playerStateController.setState(stateNums.SITTING);
    } else if (pressedDownKeys.includes("ArrowUp")) {
      this.player.playerStateController.setState(stateNums.JUMPING);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }
  activate() {
    this.player.playerSpriteAnimations.frameY = 1;
    this.player.game.speedFraction = 1;
  }
  handleKeyBoardInput(pressedDownKeys) {
    if (this.player.movement.yVelocity == 0) {
      this.player.playerStateController.setState(stateNums.FALLING);
    }
  }
}

export class Falling extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }
  activate() {
    this.player.playerSpriteAnimations.frameY = 2;
    this.player.game.speedFraction = 1;
  }
  handleKeyBoardInput(pressedDownKeys) {
    if (this.player.onGround()) {
      if (pressedDownKeys.includes("ArrowDown")) {
        this.player.playerStateController.setState(stateNums.SITTING);
      } else {
        this.player.playerStateController.setState(stateNums.RUNNING);
      }
    }
  }
}

// so far idling has not been used yet but im keeping it just in case
export class Idling extends State {
  constructor(player) {
    super("IDLING");
    this.player = player;
  }
  activate() {
    this.player.playerSpriteAnimations.frameY = 0;
    this.player.game.speedFraction = 0;
  }
  handleKeyBoardInput(pressedDownKeys) {
    if (
      pressedDownKeys.includes("ArrowLeft") ||
      pressedDownKeys.includes("ArrowRight")
    ) {
      this.player.playerStateController.setState(stateNums.RUNNING);
    } else if (pressedDownKeys.includes("ArrowDown")) {
      this.player.playerStateController.setState(stateNums.SITTING);
    } else if (pressedDownKeys.includes("ArrowUp")) {
      this.player.playerStateController.setState(stateNums.JUMPING);
    }
  }
}
