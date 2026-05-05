import type { Unit } from '../../units/unit';
import type { Game } from '../game';
import type { Tile } from '../tile';

export class InputSystem {
  game: Game;

  constructor(game: Game) {
    this.game = game;
    game.ctx.canvas.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e: PointerEvent) {
    const canvas = this.game.ctx.canvas;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { q, r } = this.game.renderSystem.pixelToAxial(x, y);

    const tile = this.game.map.getTile(q, r);
    if (!tile) return;

    const unit = this.game.getUnitAt(q, r);
    if (!this.game.selectedUnit) {
      if (unit && this.game.turnSystem.isCurrentTeamUnit(unit)) {
        this.selectUnit(unit);
      } else {
        return;
      }
    } else {
      if (!unit) {
        this.moveUnitTo(tile);
      } else if (unit !== this.game.selectedUnit) {
        if (this.game.turnSystem.isCurrentTeamUnit(unit)) {
          this.selectUnit(unit);
        } else {
          this.game.attackSystem.attack(this.game.selectedUnit, unit);
        }
      } else {
        this.game.deselectUnit();
      }
    }
  }

  selectUnit(unit: Unit) {
    if (!this.game.turnSystem.isCurrentTeamUnit(unit)) return;
    if (unit.actionPoints <= 0) return;
    this.game.selectedUnit = unit;
    unit.select();
  }

  moveUnitTo(tile: Tile) {
    const unit = this.game.selectedUnit;
    if (!unit) return;
    // this.game.selectedUnit = null
    // unit.deselect()
    // unit.moveTo(tile.q, tile.r)
    this.game.movementSystem.moveUnit(unit, tile);
    this.game.deselectUnit();
  }

  // computeMoveRange(unit) {
  //   let frontier = [{ q: unit.q, r: unit.r, cost: 0 }];
  //   let visited = new Set();
  //   let result = [];

  //   const key = (q, r) => `${q},${r}`;

  //   while (frontier.length > 0) {
  //     let { q, r, cost } = frontier.shift();
  //     let tile = this.game.map.get(q, r);

  //     if (!tile) continue;
  //     if (cost > unit.move) continue;
  //     if (visited.has(key(q, r))) continue;

  //     visited.add(key(q, r));
  //     result.push({ q, r });

  //     for (let n of this.game.map.neighbors(q, r)) {
  //       let nc = cost + n.terrain.moveCost;
  //       frontier.push({ q: n.q, r: n.r, cost: nc });
  //     }
  //   }

  //   return result;
  // }

  // computeAttackRange(unit) {

  //   let tiles = [];

  //   for (let dq = -unit.range; dq <= unit.range; dq++) {
  //     for (let dr = -unit.range; dr <= unit.range; dr++) {

  //       let q = unit.q + dq;
  //       let r = unit.r + dr;

  //       let dist = Math.abs(dq) + Math.abs(dr);

  //       if (dist <= unit.range) {
  //         tiles.push({ q, r });
  //       }

  //     }
  //   }

  //   return tiles;
  // }
}
