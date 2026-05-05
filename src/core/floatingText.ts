import type { Position } from '../types';

type FloatingTextType = 'damage';

export class FloatingText {
  value: string;
  type: FloatingTextType;
  x: number;
  y: number;
  opacity: number;

  constructor(value: string, type: FloatingTextType, position: Position) {
    this.value = value;
    this.type = type;
    this.x = position.x;
    this.y = position.y - 25;
    this.opacity = 1;
  }

  display(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = 'red';
    ctx.font = '18px Arial';
    ctx.fillText(this.value, this.x, this.y);
    ctx.globalAlpha = 1;
    this.opacity -= 0.05;
    this.y -= 1;
  }
}
