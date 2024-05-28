import { CollisionAnimationHandler } from "./CollisionAnimationHandler";

export class CollisionHandler {
  constructor(game) {
    this.game = game;
    this.collisionAnimationHandler = new CollisionAnimationHandler(game);
  }
}
