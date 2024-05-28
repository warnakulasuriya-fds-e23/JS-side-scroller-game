import { UI } from "./UIs.js";
export class UIHandler {
  constructor(game) {
    this.game = game;
    this.currentlyActiveUIComponents = [new UI(game)];
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
