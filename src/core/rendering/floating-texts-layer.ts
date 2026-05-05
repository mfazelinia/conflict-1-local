import { RenderingLayer } from './rendering-layer';

export class FloatingTextsLayer extends RenderingLayer {
  render() {
    const floatingTexts = this.game.floatingTexts;
    for (const ft of floatingTexts) {
      ft.display(this.game.ctx);
    }
    this.game.floatingTexts = floatingTexts.filter((ft) => ft.opacity > 0);
  }
}
