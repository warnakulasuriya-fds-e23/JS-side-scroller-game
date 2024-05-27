import { KeyBoardConfiguration } from "./KeyboardConfig.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./Background.js";
import { UI } from "./UI.js";
import { EnemyController } from "./EnemyController.js";
window.addEventListener("load", function () {
  const canvas = document.getElementById("mainCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;
  let lastTime = 0; //last time stamp

  class Game {
    constructor(width, height) {
      this.keyboardConfig = new KeyBoardConfiguration();
      this.width = width;
      this.height = height;
      this.score = 0;
      this.fontColor = "black";
      this.UI = new UI(this);
      this.groundMargin = 80;
      this.speedFraction = 0;
      this.maxSpeed = 5;
      this.background = new Background(this);
      this.player = new Player(this);
      this.debugMode = false;
      this.input = new InputHandler(this);
      this.currentlyActiveEnemies = [];
      this.enemyController = new EnemyController(this);
    }
    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      //handle enemies
      this.enemyController.EnemyHandler(deltaTime);
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemyController.DrawEnemies(context);
      this.UI.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);

  function animate(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(animate); //this function passes the current time stamp to the animate function
  }
  animate(0);
});
