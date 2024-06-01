export class PlayerHealthHandler {
  constructor(player) {
    this.player = player;
    this.playerHealth = 100;
    this.maxHealth = 100;
    this.HealthPercentage = (this.playerHealth / this.maxHealth) * 100;
  }
  Heal(amount) {
    if (this.playerHealth + amount <= this.maxHealth) {
      this.playerHealth += amount;
    } else {
      this.playerHealth = this.maxHealth;
    }
  }
  update() {
    this.HealthPercentage = (this.playerHealth / this.maxHealth) * 100;
  }
}
