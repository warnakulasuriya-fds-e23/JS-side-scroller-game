const stateNums = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  IDLING: 4,
  ROLLING: 5,
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
  handleKeyBoardInput(pressedDownKeys, keySettings) {
    if (
      (pressedDownKeys.includes(keySettings["BACKWARD"]) ||
        pressedDownKeys.includes(keySettings["FORWARD"])) &&
      !pressedDownKeys.includes(keySettings["CROUCH"])
    ) {
      this.player.playerStateController.setState(stateNums.RUNNING);
    } else if (pressedDownKeys.includes(keySettings["JUMP"])) {
      this.player.playerStateController.setState(stateNums.JUMPING);
    } else if (
      pressedDownKeys.includes(keySettings["ROLL"]) &&
      !pressedDownKeys.includes(keySettings["CROUCH"])
    ) {
      this.player.playerStateController.setState(stateNums.ROLLING);
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
  handleKeyBoardInput(pressedDownKeys, keySettings) {
    if (pressedDownKeys.includes(keySettings["CROUCH"])) {
      this.player.playerStateController.setState(stateNums.SITTING);
    } else if (pressedDownKeys.includes(keySettings["JUMP"])) {
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
  handleKeyBoardInput(pressedDownKeys, keySettings) {
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
  handleKeyBoardInput(pressedDownKeys, keySettings) {
    if (this.player.onGround()) {
      if (pressedDownKeys.includes(keySettings["CROUCH"])) {
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
  handleKeyBoardInput(pressedDownKeys, keySettings) {
    if (
      pressedDownKeys.includes(keySettings["BACKWARD"]) ||
      pressedDownKeys.includes(keySettings["FORWARD"])
    ) {
      this.player.playerStateController.setState(stateNums.RUNNING);
    } else if (pressedDownKeys.includes(keySettings["CROUCH"])) {
      this.player.playerStateController.setState(stateNums.SITTING);
    } else if (pressedDownKeys.includes(keySettings["JUMP"])) {
      this.player.playerStateController.setState(stateNums.JUMPING);
    }
  }
}

export class Rolling extends State {
  constructor(player) {
    super("ROLLING");
    this.player = player;
  }
  activate() {
    console.log("Roll activate");
    this.player.playerSpriteAnimations.frameY = 6;
    this.player.game.speedFraction = 1;
  }
  handleKeyBoardInput(pressedDownKeys, keySettings) {
    if (
      pressedDownKeys.includes(keySettings["BACKWARD"]) ||
      pressedDownKeys.includes(keySettings["FORWARD"])
    ) {
      this.player.playerStateController.setState(stateNums.RUNNING);
    } else if (pressedDownKeys.includes(keySettings["CROUCH"])) {
      this.player.playerStateController.setState(stateNums.SITTING);
    } else if (pressedDownKeys.includes(keySettings["JUMP"])) {
      this.player.playerStateController.setState(stateNums.JUMPING);
    }
  }
}
