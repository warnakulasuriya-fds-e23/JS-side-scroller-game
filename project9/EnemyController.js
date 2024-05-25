import { Fly, Plant } from "./enemy.js";
export class EnemyController {
  constructor(game) {
    this.game = game;
    this.enemySpawnTimer = 0;
    this.enemySpawnInterval = 1000; //in miliseconds
    this.currentlyActiveEnemies = [];
  }
  AddEnemy() {
    if (this.game.speedFraction > 0 && Math.random() < 0.5) {
      this.currentlyActiveEnemies.push(new Plant(this.game));
    }
    this.currentlyActiveEnemies.push(new Fly(this.game));
  }
  RemoveEnemy(enemy) {
    this.currentlyActiveEnemies.splice(
      this.currentlyActiveEnemies.indexOf(enemy),
      1
    );
  }

  DrawEnemies(context) {
    this.currentlyActiveEnemies.forEach((enemy) => {
      enemy.draw(context);
    });
  }
  UpdateEnemies(deltaTime) {
    this.currentlyActiveEnemies.forEach((enemy) => {
      enemy.update(deltaTime);
      if (enemy.markedForDeleteion == true) {
        this.RemoveEnemy(enemy);
      }
    });
  }
  EnemyHandler(deltaTime) {
    if (this.enemySpawnTimer > this.enemySpawnInterval) {
      this.AddEnemy();
      this.enemySpawnTimer = 0;
    } else {
      this.enemySpawnTimer += deltaTime;
    }
    this.UpdateEnemies(deltaTime);
  }
  //   addEnemy() {
  //     this.currentlyActiveEnemies.push(new fly(this));
  //   }
}
