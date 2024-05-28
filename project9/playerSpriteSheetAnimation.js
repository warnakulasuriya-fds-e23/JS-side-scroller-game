const totalFramesPerState = {
  SITTING: 5,
  RUNNING: 9,
  JUMPING: 7,
  FALLING: 7,
  IDLING: 7,
  ROLLING: 7,
  DIVING: 7,
  GOTHIT: 11,
};

export class PlayerSpriteSheetAnimations {
  constructor(player) {
    this.player = player;
    this.frameX = 0;
    this.frameY = 0;
    this.playerstate = "SITTING";
    this.maxFrames = totalFramesPerState[this.playerstate];
    this.deltaTime = 16;

    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }

  animate() {
    this.playerstate = this.player.playerStateController.currentState.state;
    this.maxFrames = totalFramesPerState[this.playerstate];
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrames - 1) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += this.deltaTime;
    }
  }
}
