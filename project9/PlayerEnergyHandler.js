const _SingleShotAttacks = ["DIVING"];
const _FullAutoAttacks = ["ROLLING"];
const SingleShotAttackCosts = {
  DIVING: 50,
};
const FullAutoAttackCosts = {
  ROLLING: 0.5,
};

//SingleAttacks will have a singular energy consumption per activation
//ContinousAttacks will have a energy consumption rate as long as attack is ongoing

export class PlayerEnergyHandler {
  constructor(player) {
    this.player = player;
    this.playerEnergy = 200;
    this.maxEnergy = 200;
    this.energyPercent = (this.playerEnergy / this.maxEnergy) * 100;
    this.regeneration = 0.25;
  }

  singleShotAttack(currentStateName) {
    this.playerEnergy -= SingleShotAttackCosts[currentStateName];
  }
  fullAutoAttack(currentStateName) {
    this.playerEnergy -= FullAutoAttackCosts[currentStateName];
  }
  update() {
    this.energyPercent = (this.playerEnergy / this.maxEnergy) * 100;
    let currentPlayerStateName =
      this.player.playerStateHandler.currentState.state;
    if (_FullAutoAttacks.includes(currentPlayerStateName)) {
      this.fullAutoAttack(currentPlayerStateName);
    } else {
      if (this.playerEnergy < 200) {
        this.playerEnergy += this.regeneration;
      }
    }
  }
}
