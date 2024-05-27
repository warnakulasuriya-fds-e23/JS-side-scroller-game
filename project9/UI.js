export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 40;
    this.fontFamily = "Arial";
  }
  draw(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontcolor;
    context.fillText("Score <" + this.game.score + ">", 20, 50);
  }
}
