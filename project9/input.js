export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      // if (
      //   (e.key == "ArrowUp" ||
      //     e.key == "ArrowDown" ||
      //     e.key == "ArrowLeft" ||
      //     e.key == "ArrowRight") &&
      //   this.keys.indexOf(e.key) == -1
      // ) {
      //   this.keys.push(e.key);
      // }

      if (
        (e.key == this.game.keyboardConfig.setKeys["JUMP"] ||
          e.key == this.game.keyboardConfig.setKeys["CROUCH"] ||
          e.key == this.game.keyboardConfig.setKeys["BACKWARD"] ||
          e.key == this.game.keyboardConfig.setKeys["FORWARD"]) &&
        this.keys.indexOf(e.key) == -1
      ) {
        this.keys.push(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.key == this.game.keyboardConfig.setKeys["JUMP"] ||
        e.key == this.game.keyboardConfig.setKeys["CROUCH"] ||
        e.key == this.game.keyboardConfig.setKeys["BACKWARD"] ||
        e.key == this.game.keyboardConfig.setKeys["FORWARD"]
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
