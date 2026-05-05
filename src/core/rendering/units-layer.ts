import type { Unit } from '../../units/unit';
import { RenderingLayer } from './rendering-layer';

export class UnitsLayer extends RenderingLayer {
  render() {
    for (const unit of this.game.units) {
      this.draw(unit);
    }
  }

  draw(unit: Unit) {
    const ctx = this.game.ctx;
    const tileSize = this.game.renderSystem.tileSize;
    const x = unit.x;
    const y = unit.y;

    let unitSize = tileSize * 0.55;
    if (unit.isSelected) unitSize *= 1.2;

    ctx.fillStyle = unit.team.color;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = unit.isSelected ? 3 : 2;

    ctx.beginPath();
    ctx.arc(x, y, unitSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    const img = new Image();
    img.src = 'src/assets/swordsman.svg';
    unitSize *= 1.2;
    ctx.drawImage(img, x - unitSize / 2, y - unitSize / 2, unitSize, unitSize);
  }
}
