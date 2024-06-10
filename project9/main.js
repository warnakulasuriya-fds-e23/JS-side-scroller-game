import { KeyBoardConfiguration } from "./KeyboardConfig.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./Background.js";
import { UIHandler } from "./UIHandler.js";
import { EnemyHandler } from "./EnemyHandler.js";
import { CollisionHandler } from "./CollisionHandler.js";
import { PickUpHandler } from "./PickupHandler.js";
window.addEventListener("load", function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 500;
  let lastTime = 0; //last time stamp

  class Game {
    constructor(width, height) {
      this.keyboardConfig = new KeyBoardConfiguration();
      this.paused = false;
      this.width = width;
      this.height = height;
      this.score = 0;
      this.gameTime = 0;
      this.groundMargin = 80;
      this.speedFraction = 0;
      this.maxSpeed = 5;
      this.debugMode = false;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.enemyHandler = new EnemyHandler(this);
      this.UIHandler = new UIHandler(this);
      this.collisionHandler = new CollisionHandler(this);
      this.PickUpHandler = new PickUpHandler(this);
    }
    update(deltaTime) {
      this.gameTime += deltaTime;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      this.enemyHandler.update(deltaTime);
      this.UIHandler.update();
      this.collisionHandler.update(deltaTime);
      this.PickUpHandler.update(deltaTime);
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemyHandler.draw(context);
      this.UIHandler.draw(context);
      this.collisionHandler.draw(context);
      this.PickUpHandler.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);

  function animate(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (game.paused == false) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.update(deltaTime);
      game.draw(ctx);
    }

    requestAnimationFrame(animate); //this function passes the current time stamp to the animate function automatically
  }
  animate(0);
});
