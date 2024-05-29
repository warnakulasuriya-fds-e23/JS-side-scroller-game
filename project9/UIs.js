class UIComponent {
  constructor(game) {
    this.game = game;
    this.player = game.player;
    this.verticalGap = 20;
  }
}

export class HealthComponenet extends UIComponent {
  constructor(game) {
    super(game);
    this.fontSize = 20;
    this.fontFamily = "Arial";
    this.fontColor = "black";
    this.healthPercent = this.game.player.playerHealthHandler.HealthPercentage;
  }
  HealthBarColor() {
    if (this.healthPercent > 75) return "green";
    else if (this.healthPercent > 50) return "yellow";
    else if (this.healthPercent > 25) return "orange";
    else return "red";
  }
  update() {
    this.healthPercent = this.game.player.playerHealthHandler.HealthPercentage;
  }
  draw(context) {
    context.save();
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.fontColor;
    context.fillText(
      "Health :(" + "                                      " + ")",
      20,
      this.verticalGap
    );
    context.fillStyle = this.HealthBarColor();
    context.fillRect(
      100,
      this.verticalGap / 2,
      200 * (this.healthPercent / 100),
      10
    );
    context.restore();
  }
}

export class EnergyComponent extends UIComponent {
  constructor(game) {
    super(game);
    this.fontSize = 20;
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
      this.verticalGap * 2
    );
    context.restore();
  }
}

export class ScoreComponent extends UIComponent {
  constructor(game) {
    super(game);
    this.fontSize = 20;
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
      "Score : <" + this.game.score + ">",
      20,
      this.verticalGap * 3
    );
    context.restore();
  }
}

export class TimeComponent extends UIComponent {
  constructor(game) {
    super(game);
    this.fontSize = 20;
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
    context.fillText(
      "Time : <" + this.timeToDisplay() + ">",
      20,
      this.verticalGap * 4
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
