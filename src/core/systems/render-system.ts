import type { Game } from '../game';
import type { RenderingLayer } from '../rendering/rendering-layer';
import { HighlightsLayer } from '../rendering/highlights-layer';
import { UnitsLayer } from '../rendering/units-layer';
import { FloatingTextsLayer } from '../rendering/floating-texts-layer';
import { MapLayer } from '../rendering/map-layer';
import type { Coordinate } from '../../types';

export class RenderSystem {
  game: Game;
  tileSize: number;
  offsetX: number;
  offsetY: number;
  layers: RenderingLayer[];

  constructor(game: Game) {
    this.game = game;
    this.layers = [new MapLayer(game), new HighlightsLayer(game), new UnitsLayer(game), new FloatingTextsLayer(game)];
    this.tileSize = 30;

    const canvas = game.ctx.canvas;
    this.offsetX = canvas.width / 2;
    this.offsetY = canvas.height / 2;
  }

  render() {
    for (const l of this.layers) l.render();
  }

  axialToPixel({ q, r }: Coordinate) {
    const x = this.tileSize * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r) + this.offsetX;
    const y = this.tileSize * ((3 / 2) * r) + this.offsetY;
    return { x, y };
  }

  pixelToAxial(x: number, y: number) {
    const q = ((Math.sqrt(3) / 3) * (x - this.offsetX) - (1 / 3) * (y - this.offsetY)) / this.tileSize;
    const r = ((2 / 3) * (y - this.offsetY)) / this.tileSize;
    return this.axialRound(q, r);
  }

  axialRound(q: number, r: number) {
    let x = q;
    let z = r;
    let y = -x - z;

    let rx = Math.round(x);
    let ry = Math.round(y);
    let rz = Math.round(z);

    const x_diff = Math.abs(rx - x);
    const y_diff = Math.abs(ry - y);
    const z_diff = Math.abs(rz - z);

    if (x_diff > y_diff && x_diff > z_diff) {
      rx = -ry - rz;
    } else if (y_diff > z_diff) {
      ry = -rx - rz;
    } else {
      rz = -rx - ry;
    }

    return { q: rx, r: rz };
  }
}
