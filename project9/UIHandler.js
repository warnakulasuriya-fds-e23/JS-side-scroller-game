import {
  ScoreComponent,
  TimeComponent,
  HealthComponenet,
  EnergyComponent,
  PauseScreen,
} from "./UIs.js";
export class UIHandler {
  constructor(game) {
    this.game = game;
    this.currentlyActiveUIComponents = [
      new ScoreComponent(game),
      new TimeComponent(game),
      new HealthComponenet(game),
      new EnergyComponent(game),
    ];
  }
  update() {
    this.currentlyActiveUIComponents.forEach((UIComp) => {
      UIComp.update();
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
