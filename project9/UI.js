export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 40;
    this.fontFamily = "Arial";
    this.fontColor = "black";
  }
  draw(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.fontColor;
    context.fillText("Score : <" + this.game.score + ">", 20, 50);
  }
}
