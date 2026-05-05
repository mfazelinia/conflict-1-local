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

    ctx.beginPath();
    ctx.arc(x, y, unitSize, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = unit.team.color;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = unit.isSelected ? 3 : 2;
    ctx.fill();
    ctx.stroke();

    const hpRatio = unit.hp / unit.maxHp;
    ctx.beginPath();
    ctx.roundRect(x - unitSize, y - 1.6 * unitSize, 2 * unitSize, 0.3 * unitSize, unitSize);
    ctx.closePath();
    ctx.fillStyle = '#9C9C9C';
    ctx.strokeStyle = '#6E6E6E';
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(x - unitSize, y - 1.6 * unitSize, hpRatio * 2 * unitSize, 0.3 * unitSize, unitSize);
    ctx.closePath();
    ctx.fillStyle = '#57992E';
    ctx.fill();

    const img = new Image();
    img.src = 'src/assets/swordsman.svg';
    unitSize *= 1.2;
    ctx.drawImage(img, x - unitSize / 2, y - unitSize / 2, unitSize, unitSize);
  }

  roundRect(x: number, y: number, width: number, height: number, radius: number) {
    const ctx = this.game.ctx;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);

    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);

    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);

    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);

    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);

    ctx.closePath();
  }
}
