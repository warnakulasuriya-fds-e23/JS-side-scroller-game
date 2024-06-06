export const stateNums = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  IDLING: 4,
  ROLLING: 5,
  DIVING: 6,
  GOTHIT: 7,
  HYPERSPEED: 8,
};

class State {
  constructor(player, state) {
    this.player = player;
    this.state = state;
  }
}

export class Sitting extends State {
  constructor(player) {
    super(player, "SITTING");
  }
  activate() {
    this.player.playerAnimationHandler.frameY = 5;
    this.player.game.speedFraction = 0;
  }
  update(pressedDownKeys, keySettings) {
    if (
      (pressedDownKeys.includes(keySettings["BACKWARD"]) ||
        pressedDownKeys.includes(keySettings["FORWARD"])) &&
      !pressedDownKeys.includes(keySettings["CROUCH"])
    ) {
      this.player.playerStateHandler.setState(stateNums.RUNNING);
    } else if (
      pressedDownKeys.includes(keySettings["JUMP"]) &&
      !pressedDownKeys.includes(keySettings["CROUCH"])
    ) {
      this.player.playerStateHandler.setState(stateNums.JUMPING);
    } else if (
      pressedDownKeys.includes(keySettings["ROLL"]) &&
      !pressedDownKeys.includes(keySettings["CROUCH"])
    ) {
      this.player.playerStateHandler.setState(stateNums.ROLLING);
    }
  }
}

export class Running extends State {
  constructor(player) {
    super(player, "RUNNING");
  }
  activate() {
    this.player.playerAnimationHandler.frameY = 3;
    this.player.game.speedFraction = 1;
  }
  update(pressedDownKeys, keySettings) {
    if (pressedDownKeys.includes(keySettings["CROUCH"])) {
      this.player.playerStateHandler.setState(stateNums.SITTING);
    } else if (pressedDownKeys.includes(keySettings["JUMP"])) {
      this.player.playerStateHandler.setState(stateNums.JUMPING);
    } else if (pressedDownKeys.includes(keySettings["ROLL"])) {
      this.player.playerStateHandler.setState(stateNums.ROLLING);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super(player, "JUMPING");
  }
  activate() {
    this.player.playerAnimationHandler.frameY = 1;
    this.player.game.speedFraction = 1;
  }
  update(pressedDownKeys, keySettings) {
    if (this.player.playerMovementHandler.yVelocity == 0) {
      this.player.playerStateHandler.setState(stateNums.FALLING);
    } else if (pressedDownKeys.includes(keySettings["ROLL"])) {
      this.player.playerStateHandler.setState(stateNums.ROLLING);
    } else if (pressedDownKeys.includes(keySettings["CROUCH"])) {
      this.player.playerStateHandler.setState(stateNums.DIVING);
    }
  }
}

export class Falling extends State {
  constructor(player) {
    super(player, "FALLING");
  }
  activate() {
    this.player.playerAnimationHandler.frameY = 2;
    this.player.game.speedFraction = 1;
  }
  update(pressedDownKeys, keySettings) {
    if (this.player.onGround()) {
      if (pressedDownKeys.includes(keySettings["CROUCH"])) {
        this.player.playerStateHandler.setState(stateNums.SITTING);
      } else {
        this.player.playerStateHandler.setState(stateNums.RUNNING);
      }
    } else if (pressedDownKeys.includes(keySettings["ROLL"])) {
      this.player.playerStateHandler.setState(stateNums.ROLLING);
    } else if (pressedDownKeys.includes(keySettings["CROUCH"])) {
      this.player.playerStateHandler.setState(stateNums.DIVING);
    }
  }
}

// so far idling has not been used yet but im keeping it just in case
export class Idling extends State {
  constructor(player) {
    super(player, "IDLING");
  }
  activate() {
    this.player.playerAnimationHandler.frameY = 0;
    this.player.game.speedFraction = 0;
  }
  update(pressedDownKeys, keySettings) {
    if (
      pressedDownKeys.includes(keySettings["BACKWARD"]) ||
      pressedDownKeys.includes(keySettings["FORWARD"])
    ) {
      this.player.playerStateHandler.setState(stateNums.RUNNING);
    } else if (pressedDownKeys.includes(keySettings["CROUCH"])) {
      this.player.playerStateHandler.setState(stateNums.SITTING);
    } else if (pressedDownKeys.includes(keySettings["JUMP"])) {
      this.player.playerStateHandler.setState(stateNums.JUMPING);
    }
  }
}

export class Rolling extends State {
  constructor(player) {
    super(player, "ROLLING");
  }
  activate() {
    if (this.player.playerEnergyHandler.playerEnergy > 20) {
      this.player.playerAnimationHandler.frameY = 6;
      this.player.game.speedFraction = 1;
    } else {
      if (this.player.onGround()) {
        this.player.playerStateHandler.setState(stateNums.RUNNING);
      } else {
        this.player.playerStateHandler.setState(stateNums.FALLING);
      }
    }
  }
  update(pressedDownKeys, keySettings) {
    if (
      !pressedDownKeys.includes(keySettings["ROLL"]) ||
      this.player.playerEnergyHandler.playerEnergy < 10
    ) {
      if (this.player.onGround()) {
        this.player.playerStateHandler.setState(stateNums.RUNNING);
      } else {
        this.player.playerStateHandler.setState(stateNums.FALLING);
      }
    }
  }
}

export class Diving extends State {
  constructor(player) {
    super(player, "DIVING");
  }
  activate() {
    if (this.player.playerEnergyHandler.playerEnergy > 100) {
      this.player.playerEnergyHandler.singleShotAttack(this.state);
      this.player.playerAnimationHandler.frameY = 6;
      this.player.game.speedFraction = 1;
    } else {
      if (this.player.onGround()) {
        this.player.playerStateHandler.setState(stateNums.RUNNING);
      } else {
        this.player.playerStateHandler.setState(stateNums.FALLING);
      }
    }
  }
  update(pressedDownKeys, keySettings) {
    if (this.player.onGround()) {
      if (!pressedDownKeys.includes(keySettings["ROLL"])) {
        this.player.playerParticleHandler.addSplashParticles();
        this.player.playerStateHandler.setState(stateNums.SITTING);
      } else {
        this.player.playerStateHandler.setState(stateNums.ROLLING);
      }
    }
  }
}

export class GotHit extends State {
  constructor(player) {
    super(player, "GOTHIT");
  }
  activate() {
    this.player.playerAnimationHandler.frameY = 4;
    this.player.game.speedFraction = 0;
  }
  update(pressedDownKeys, keySettings) {
    if (this.player.playerAnimationHandler.frameX >= 10) {
      if (this.player.onGround()) {
        this.player.playerStateHandler.setState(stateNums.RUNNING);
      } else {
        this.player.playerStateHandler.setState(stateNums.FALLING);
      }
    }
  }
}

export class HyperSpeed extends State {
  constructor(player) {
    super(player, "HYPERSPEED");
    this.timer = 0;
    this.timeLimit = 5000;
  }
  activate() {
    this.player.playerAnimationHandler.frameY = 6;
    this.player.game.speedFraction = 10;
  }
  update(pressedDownKeys, keySettings) {
    if (this.timer > this.timeLimit) {
      this.timer = 0;
      this.player.playerStateHandler.setState(stateNums.FALLING);
    } else if (this.player.playerStateHandler.deltaTime != null) {
      this.timer += this.player.playerStateHandler.deltaTime;
      console.log(this.timer);
    }
  }
}
