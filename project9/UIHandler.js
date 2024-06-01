import {
  HealthComponenet,
  EnergyComponent,
  ScoreComponent,
  TimeComponent,
  HitPopup,
  HealthUpPopUp,
  PauseScreen,
} from "./UIs.js";
export class UIHandler {
  constructor(game) {
    this.game = game;
    this.currentlyActiveUIComponents = [
      new HealthComponenet(game),
      new EnergyComponent(game),
      new ScoreComponent(game),
      new TimeComponent(game),
    ];
  }
  addHitPopUp(enemy) {
    this.currentlyActiveUIComponents.push(new HitPopup(enemy));
  }
  addHealthUpPopUp(pickUp) {
    this.currentlyActiveUIComponents.push(new HealthUpPopUp(pickUp));
  }
  update() {
    this.currentlyActiveUIComponents.forEach((UIComp, index) => {
      UIComp.update();
      if (UIComp.markedForDeletion == true) {
        this.currentlyActiveUIComponents.splice(index, 1);
      }
    });
  }
  draw(context) {
    this.currentlyActiveUIComponents.forEach((UIComp) => {
      UIComp.draw(context);
    });
  }
  pauseScreen() {
    let pauseScreen = new PauseScreen(this.game);
    pauseScreen.Actitavte();
  }
}
