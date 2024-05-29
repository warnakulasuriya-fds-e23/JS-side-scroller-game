import { ScoreComponent, TimeComponent, HealthComponenet } from "./UIs.js";
export class UIHandler {
  constructor(game) {
    this.game = game;
    this.currentlyActiveUIComponents = [
      new ScoreComponent(game),
      new TimeComponent(game),
      new HealthComponenet(game),
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
}
