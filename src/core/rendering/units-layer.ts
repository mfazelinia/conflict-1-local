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
    // axial → pixel
    const x = unit.x; //tileSize * (Math.sqrt(3) * unit.q + (Math.sqrt(3) / 2) * unit.r) + this.game.renderSystem.offsetX;
    const y = unit.y; //tileSize * (1.5 * unit.r) + this.game.renderSystem.offsetY;
    let unitSize = tileSize * 0.55;
    if (unit.isSelected) unitSize *= 1.2;

    // رنگ از تیم
    ctx.fillStyle = unit.team.color;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = unit.isSelected ? 2 : 1;

    // دایره بازیکن
    ctx.beginPath();
    ctx.arc(x, y, unitSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // متن (مثل شماره بازیکن)
    // ctx.fillStyle = this.team.textColor;
    // ctx.font = `${size * 0.5}px sans-serif`;
    // ctx.textAlign = 'center';
    // ctx.textBaseline = 'middle';
    // ctx.fillText(this.id, x, y);
  }
}
