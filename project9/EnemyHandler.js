import { Fly, Plant, Spider_Big } from "./enemy.js";
export class EnemyHandler {
  constructor(game) {
    this.game = game;
    this.player = this.game.player;
    this.enemySpawnTimer = 0;
    this.enemySpawnInterval = 1000; //in miliseconds
    this.currentlyActiveEnemies = [];
  }
  AddEnemy() {
    if (this.game.speedFraction > 0 && Math.random() < 0.5) {
      this.currentlyActiveEnemies.push(new Plant(this.game));
    }
    if (this.game.speedFraction > 0 && Math.random() > 0.6) {
      this.currentlyActiveEnemies.push(new Spider_Big(this.game));
    }
    if (this.game.speedFraction > 0 && Math.random() > 0.5) {
      this.currentlyActiveEnemies.push(new Fly(this.game));
    }
  }
  AddEnemiesAtHyperSpeed() {
    if (Math.random() < 0.1 && Math.random() > 0) {
      this.currentlyActiveEnemies.push(new Plant(this.game));
    }
    if (Math.random() < 0.1 && Math.random() > 0) {
      this.currentlyActiveEnemies.push(new Spider_Big(this.game));
    }
    if (Math.random() < 0.1 && Math.random() > 0) {
      this.currentlyActiveEnemies.push(new Fly(this.game));
    }
  }
  RemoveEnemy(enemy) {
    this.currentlyActiveEnemies.splice(
      this.currentlyActiveEnemies.indexOf(enemy),
      1
    );
  }
  UpdateAllEnemies(deltaTime) {
    this.currentlyActiveEnemies.forEach((enemy) => {
      enemy.update(deltaTime);
      if (enemy.markedForDeletion == true) {
        this.RemoveEnemy(enemy);
      }
    });
  }
  update(deltaTime) {
    if (this.player.playerStateHandler.currentState.state != "HYPERSPEED") {
      if (this.enemySpawnTimer > this.enemySpawnInterval) {
        this.AddEnemy();
        this.enemySpawnTimer = 0;
      } else {
        this.enemySpawnTimer += deltaTime;
      }
    } else {
      this.AddEnemiesAtHyperSpeed();
    }
    this.UpdateAllEnemies(deltaTime);
  }
  draw(context) {
    this.currentlyActiveEnemies.forEach((enemy) => {
      enemy.draw(context);
    });
  }
}
