import type { Game } from '../game';

export class RenderingLayer {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  render() {}
}
