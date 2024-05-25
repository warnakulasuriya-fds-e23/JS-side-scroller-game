import { Sitting, Running, Jumping, Falling, Idling } from "./playerStates.js";
export class PlayerStateController {
  constructor(player) {
    this.states = [
      new Sitting(player),
      new Running(player),
      new Jumping(player),
      new Falling(player),
      new Idling(player),
    ];
    this.currentState = this.states[0];
    this.currentState.activate();
  }
  setState(stateNum) {
    this.currentState = this.states[stateNum];
    this.currentState.activate();
  }
}
