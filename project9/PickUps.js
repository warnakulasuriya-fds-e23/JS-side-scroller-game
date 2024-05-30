class PickUp {
  constructor(game) {
    this.game = game;
  }
}

export class HealthPickUp extends PickUp {
  constructor(game) {
    super(game);
    this.pickUpImage = document.getElementById("");
  }
  update() {}
  draw(context) {}
}
