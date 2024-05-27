export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keySettings = this.game.keyboardConfig.keySettings;
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (
        (e.key == this.keySettings["JUMP"] ||
          e.key == this.keySettings["CROUCH"] ||
          e.key == this.keySettings["BACKWARD"] ||
          e.key == this.keySettings["FORWARD"] ||
          e.key == this.keySettings["ROLL"]) &&
        this.keys.indexOf(e.key) == -1
      ) {
        this.keys.push(e.key);
      } else if (e.key == this.keySettings["DEBUGMODE"]) {
        this.game.debugMode = !this.game.debugMode;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.key == this.keySettings["JUMP"] ||
        e.key == this.keySettings["CROUCH"] ||
        e.key == this.keySettings["BACKWARD"] ||
        e.key == this.keySettings["FORWARD"] ||
        e.key == this.keySettings["ROLL"]
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
