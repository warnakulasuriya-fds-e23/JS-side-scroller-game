export class PlayerHealthHandler {
  constructor(player) {
    this.player = player;
    this.playerHealth = 100;
    this.maxHealth = 100;
    this.HealthPercentage = (this.playerHealth / this.maxHealth) * 100;
  }
  Heal(percent) {
    this.playerHealth += percent * this.maxHealth;
  }
  update() {
    this.HealthPercentage = (this.playerHealth / this.maxHealth) * 100;
  }
}
