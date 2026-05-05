import type { Tile } from '../tile';
import { TerrainConfigs } from '../terrain/terrain-configs';
import { RenderingLayer } from './rendering-layer';

export class MapLayer extends RenderingLayer {
  render(): void {
    const map = this.game.map;
    const ctx = this.game.ctx;

    ctx.fillStyle = TerrainConfigs[map.type].color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const tile of map.tiles) {
      this.drawTile(tile);
    }
  }

  drawTile(tile: Tile) {
    const ctx = this.game.ctx;
    const tileSize = this.game.renderSystem.tileSize;
    const { x: cx, y: cy } = this.game.renderSystem.axialToPixel(tile.coordinates);

    ctx.strokeStyle = '#00000022';
    ctx.lineWidth = 1;
    ctx.fillStyle = tile.terrain.color;

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + Math.PI / 6; // pointy-top
      const x = cx + tileSize * Math.cos(angle);
      const y = cy + tileSize * Math.sin(angle);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
  }
}
