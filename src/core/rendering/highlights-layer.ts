import type { Coordinate } from '../../types';
import { RenderingLayer } from './rendering-layer';

// جهت ها در axial
const HEX_DIRECTIONS = [
  { q: 0, r: 1 },
  { q: -1, r: 1 },
  { q: -1, r: 0 },
  { q: 0, r: -1 },
  { q: 1, r: -1 },
  { q: 1, r: 0 },
];

export class HighlightsLayer extends RenderingLayer {
  render() {
    const unit = this.game.selectedUnit;
    if (!unit) return;

    this.game.movementSystem.getHexCoordInMoveRange().forEach((coord) => {
      this.drawHighlight(coord, '#FFFFFF');
    });
    this.game.attackSystem.getHexCoordOfTargetsInAttackRange().forEach((coord) => {
      this.drawHighlight(coord, '#ff4444');
    });

    this.drawAttackBoundaryPolygon(this.game.attackSystem.getHexCoordInAttackRange());
  }

  drawHighlight(coordinate: Coordinate, color: string) {
    const ctx = this.game.ctx;
    const tileSize = this.game.renderSystem.tileSize;
    const { x: cx, y: cy } = this.game.renderSystem.axialToPixel(coordinate);

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + Math.PI / 6; // pointy-top
      const x = cx + tileSize * Math.cos(angle);
      const y = cy + tileSize * Math.sin(angle);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    ctx.globalAlpha = 0.2;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  drawAttackBoundaryPolygon(coords: Coordinate[], color: string = '#ff0000') {
    const ctx = this.game.ctx;
    const tileSize = this.game.renderSystem.tileSize;

    // سریع‌تر برای lookup
    const coordSet = new Set(coords.map((c) => `${c.q},${c.r}`));

    // یال‌های بیرونی
    // const edges = [];

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    coords.forEach((coord) => {
      for (let i = 0; i < 6; i++) {
        const dir = HEX_DIRECTIONS[i];
        const nq = coord.q + dir.q;
        const nr = coord.r + dir.r;

        // اگر همسایه داخل محدوده نیست → این یال مرزی است
        if (!coordSet.has(`${nq},${nr}`)) {
          const { x: cx, y: cy } = this.game.renderSystem.axialToPixel(coord);

          const angle1 = (Math.PI / 3) * i + Math.PI / 6;
          const angle2 = (Math.PI / 3) * ((i + 1) % 6) + Math.PI / 6;

          const x1 = cx + tileSize * Math.cos(angle1);
          const y1 = cy + tileSize * Math.sin(angle1);

          const x2 = cx + tileSize * Math.cos(angle2);
          const y2 = cy + tileSize * Math.sin(angle2);

          // edges.push({ x1, y1, x2, y2 });
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
      }
    });

    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 1;
    // مرتب‌سازی یال‌ها تا یک مسیر پیوسته تشکیل دهند
    // const polygon = this.orderEdgesIntoPolygon(edges);
    // if (!polygon.length) return;

    // ctx.strokeStyle = color;
    // ctx.lineWidth = 3;

    // ctx.beginPath();
    // ctx.moveTo(polygon[0].x, polygon[0].y);
    // for (let i = 1; i < polygon.length; i++) {
    //     ctx.lineTo(polygon[i].x, polygon[i].y);
    // }
    // ctx.closePath();
    // ctx.stroke();
  }

  // تبدیل یال‌ها به یک مسیر بسته
  // orderEdgesIntoPolygon(edges) {
  //     if (!edges.length) return [];

  //     // همه نقاط را جداگانه ذخیره کن
  //     let points = edges.map(e => ({ x: e.x1, y: e.y1 }))
  //         .concat(edges.map(e => ({ x: e.x2, y: e.y2 })));

  //     // حذف نقاط تکراری
  //     const key = p => `${p.x.toFixed(4)},${p.y.toFixed(4)}`;
  //     const map = new Map();
  //     points.forEach(p => map.set(key(p), p));
  //     points = [...map.values()];

  //     // مرتب‌سازی بر اساس زاویه نسبت به مرکز
  //     const cx = points.reduce((a, b) => a + b.x, 0) / points.length;
  //     const cy = points.reduce((a, b) => a + b.y, 0) / points.length;

  //     points.sort((a, b) =>
  //         Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx)
  //     );

  //     return points;
  // }
}
