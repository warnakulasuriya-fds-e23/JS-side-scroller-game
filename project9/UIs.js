class UIComponent {
  constructor(game) {
    this.game = game;
    this.player = game.player;
  }
}

export class ScoreComponent extends UIComponent {
  constructor(game) {
    super(game);
    this.fontSize = 40;
    this.fontFamily = "Arial";
    this.fontColor = "black";
  }
  update() {}
  draw(context) {
    context.save();
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.fontColor;
    context.fillText("Score : <" + this.game.score + ">", 20, 50);
    context.restore();
  }
}

export class TimeComponent extends UIComponent {
  constructor(game) {
    super(game);
    this.fontSize = 40;
    this.fontFamily = "Arial";
    this.fontColor = "black";
  }
  timeToDisplay() {
    let totSeconds = this.game.gameTime / 1000;
    let hours = Math.floor(totSeconds / 3600);
    let minutes = Math.floor((totSeconds % 3600) / 60);
    let seconds = Math.floor((totSeconds % 3600) % 60);
    return hours + "h : " + minutes + "m : " + seconds + "s";
  }
  update() {}
  draw(context) {
    context.save();
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.fontColor;
    context.fillText("Time : <" + this.timeToDisplay() + ">", 20, 80);
    context.restore();
  }
}

export class HealthComponenet extends UIComponent {
  constructor(game) {
    super(game);
    this.fontSize = 40;
    this.fontFamily = "Arial";
    this.fontColor = "black";
  }
  update() {}
  draw(context) {
    context.save();
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.fontColor;
    context.fillText("Health : <" + this.player.playerHealth + ">", 20, 110);
    context.restore();
  }
}

export class EnergyComponent extends UIComponent {
  constructor(game) {
    super(game);
    this.fontSize = 40;
    this.fontFamily = "Arial";
    this.fontColor = "black";
  }
  update() {}
  draw(context) {
    context.save();
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.fontColor;
    context.fillText(
      "Energy : <" +
        this.player.playerEnergyHandler.playerEnergy.toFixed(0) +
        ">",
      20,
      140
    );
    context.restore();
  }
}

export class PauseScreen extends UIComponent {
  constructor(game) {
    super(game);
    this.fontSize = 100;
    this.fontFamily = "Arial";
    this.fontColor = "red";
  }
  Actitavte() {
    let canvas = document.getElementById("gameCanvas");
    let context = canvas.getContext("2d");
    context.save();
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "center";
    context.fillStyle = this.fontColor;
    context.fillText("-PAUSED-", 250, 300);
    context.restore();
  }
}
