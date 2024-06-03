import { stateNums } from "./playerStates.js";
import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Idling,
  Rolling,
  Diving,
  GotHit,
  HyperSpeed,
} from "./playerStates.js";

export class PlayerStateHandler {
  constructor(player) {
    this.player = player;
    this.states = [
      new Sitting(player),
      new Running(player),
      new Jumping(player),
      new Falling(player),
      new Idling(player),
      new Rolling(player),
      new Diving(player),
      new GotHit(player),
      new HyperSpeed(player),
    ];
    this.stateNums = stateNums;
    this.previousState = this.states[4];
    this.currentState = this.states[0];
    this.currentState.activate();
  }
  setState(stateNum) {
    this.previousState = this.currentState;
    this.currentState = this.states[stateNum];
    this.currentState.activate();
  }

  update(pressedDownKeys) {
    this.currentState.update(pressedDownKeys, this.player.keySettings);
  }
}
