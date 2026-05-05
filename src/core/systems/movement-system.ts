import type { Coordinate } from '../../types';
import type { Unit } from '../../units/unit';
import type { Game } from '../game';
import type { Tile } from '../tile';

export class MovementSystem {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  moveUnit(unit: Unit, tile: Tile) {
    if (tile.terrain.blocksMovement) return;
    const moveCost =
      (Math.abs(unit.q - tile.q) + Math.abs(unit.q + unit.r - tile.q - tile.r) + Math.abs(unit.r - tile.r)) / 2;
    if (moveCost > unit.actionPoints) return;
    unit.actionPoints -= moveCost;
    unit.path = [...this.findPath(unit.coordinates, tile.coordinates)];
  }

  update() {
    for (const unit of this.game.units) {
      this.updateUnit(unit);
    }
  }

  updateUnit(unit: Unit) {
    if (unit.path.length === 0) return;

    let next = unit.path[0];
    let target = this.game.renderSystem.axialToPixel(next);

    let dx = target.x - unit.x;
    let dy = target.y - unit.y;

    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 2) {
      unit.q = next.q;
      unit.r = next.r;
      unit.path.shift();
      // unit.actionPoints--;
      return;
    }

    unit.x += dx / unit.speed;
    unit.y += dy / unit.speed;
  }

  cost() {
    return 1; //tile.terrain.moveCost;
  }

  findPath(start: Coordinate, goal: Coordinate) {
    let frontier: { tile: Coordinate; cost: number }[] = [{ tile: start, cost: 0 }];
    let cameFrom: Record<string, Coordinate | null> = {};
    let costSoFar: Record<string, number> = {};
    let key = (t: Coordinate) => `${t.q},${t.r}`;

    cameFrom[key(start)] = null;
    costSoFar[key(start)] = 0;

    while (frontier.length > 0) {
      frontier.sort((a, b) => a.cost - b.cost);
      let current = frontier.shift()?.tile;

      if (!current || current === goal) break;

      for (let next of this.game.filterOutOccupiedTiles(this.game.map.neighbors(current))) {
        let newCost = costSoFar[key(current)] + this.cost();
        if (costSoFar[key(next)] === undefined || newCost < costSoFar[key(next)]) {
          costSoFar[key(next)] = newCost;
          frontier.push({ tile: next, cost: newCost });
          cameFrom[key(next)] = current;
        }
      }
    }

    let path = [];
    let c: Coordinate | null = goal;
    while (c) {
      path.push(c);
      c = cameFrom[key(c)];
    }
    return path.reverse();
  }

  distanceBetween(start: Coordinate, goal: Coordinate) {
    return this.findPath(start, goal).length - 1;
  }

  getHexCoordInMoveRange() {
    const unit = this.game.selectedUnit;
    if (!unit) return [];

    return this.game.map.tiles
      .filter((tile) => !tile.terrain.blocksMovement)
      .filter((tile) => this.distanceBetween(unit, tile) <= unit.actionPoints)
      .filter((tile) => {
        for (const u of this.game.units) {
          if (u.q == tile.q && u.r == tile.r) return false;
        }
        return true;
      })
      .map((tile) => tile.coordinates);
  }
}
