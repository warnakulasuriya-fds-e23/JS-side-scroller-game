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
    this.player.frameY = 5;
  }
  handleKeyBoardInput(pressedDownKeys) {
    if (
      (pressedDownKeys.includes("ArrowLeft") ||
        pressedDownKeys.includes("ArrowRight")) &&
      !pressedDownKeys.includes("ArrowDown")
    ) {
      this.player.setState(stateNums.RUNNING);
    } else if (pressedDownKeys.includes("ArrowUp")) {
      this.player.setState(stateNums.JUMPING);
    } else if (pressedDownKeys.length == 0) {
      this.player.setState(stateNums.IDLING);
    }
  }
}

export class Running extends State {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }
  activate() {
    this.player.frameY = 3;
  }
  handleKeyBoardInput(pressedDownKeys) {
    if (pressedDownKeys.includes("ArrowDown")) {
      this.player.setState(stateNums.SITTING);
    } else if (pressedDownKeys.includes("ArrowUp")) {
      this.player.setState(stateNums.JUMPING);
    } else if (pressedDownKeys.length == 0) {
      this.player.setState(stateNums.IDLING);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }
  activate() {
    this.player.frameY = 1;
  }
  handleKeyBoardInput(pressedDownKeys) {
    if (this.player.yVelocity == 0) {
      this.player.setState(stateNums.FALLING);
    }
  }
}

export class Falling extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }
  activate() {
    this.player.frameY = 2;
  }
  handleKeyBoardInput(pressedDownKeys) {
    if (this.player.onGround()) {
      if (
        pressedDownKeys.includes("ArrowLeft") ||
        pressedDownKeys.includes("ArrowRight")
      ) {
        this.player.setState(stateNums.RUNNING);
      } else if (pressedDownKeys.includes("ArrowDown")) {
        this.player.setState(stateNums.SITTING);
      } else {
        this.player.setState(stateNums.IDLING);
      }
    }
  }
}

export class Idling extends State {
  constructor(player) {
    super("IDLING");
    this.player = player;
  }
  activate() {
    this.player.frameY = 0;
  }
  handleKeyBoardInput(pressedDownKeys) {
    if (
      pressedDownKeys.includes("ArrowLeft") ||
      pressedDownKeys.includes("ArrowRight")
    ) {
      this.player.setState(stateNums.RUNNING);
    } else if (pressedDownKeys.includes("ArrowDown")) {
      this.player.setState(stateNums.SITTING);
    } else if (pressedDownKeys.includes("ArrowUp")) {
      this.player.setState(stateNums.JUMPING);
    }
  }
}
