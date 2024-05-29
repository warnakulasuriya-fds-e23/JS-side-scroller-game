import {
  HealthComponenet,
  EnergyComponent,
  ScoreComponent,
  TimeComponent,
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
