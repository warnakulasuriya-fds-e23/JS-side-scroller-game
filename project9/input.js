export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (
        (e.key == this.game.keyboardConfig.keySettings["JUMP"] ||
          e.key == this.game.keyboardConfig.keySettings["CROUCH"] ||
          e.key == this.game.keyboardConfig.keySettings["BACKWARD"] ||
          e.key == this.game.keyboardConfig.keySettings["FORWARD"]) &&
        this.keys.indexOf(e.key) == -1
      ) {
        this.keys.push(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.key == this.game.keyboardConfig.keySettings["JUMP"] ||
        e.key == this.game.keyboardConfig.keySettings["CROUCH"] ||
        e.key == this.game.keyboardConfig.keySettings["BACKWARD"] ||
        e.key == this.game.keyboardConfig.keySettings["FORWARD"]
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
