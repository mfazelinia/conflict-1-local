import type { Game } from '../game';
import type { Unit } from '../../units/unit';
import { FloatingText } from '../floatingText';

export class AttackSystem {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  attack(attacker: Unit, defender: Unit) {
    if (!this.checkTargetInRange(attacker, defender)) return;

    defender.hp -= attacker.attack;
    attacker.actionPoints = 0;

    if (defender.hp <= 0) {
      this.game.units = this.game.units.filter((u) => u !== defender);
    }

    this.game.deselectUnit();

    this.game.floatingTexts.push(new FloatingText(`-${attacker.attack}`, 'damage', defender.position));
  }

  checkTargetInRange(unit: Unit, target: Unit) {
    const dist = this.game.map.distance({ q: unit.q, r: unit.r }, { q: target.q, r: target.r });
    return dist <= unit.range;
  }

  getHexCoordInAttackRange() {
    const unit = this.game.selectedUnit;
    if (!unit) return [];

    return this.game.map.tiles
      .filter((tile) => !tile.terrain.blocksMovement)
      .filter((tile) => tile.distanceTo(unit.q, unit.r) <= unit.range)
      .map((tile) => tile.coordinates);
  }

  getHexCoordOfTargetsInAttackRange() {
    const unit = this.game.selectedUnit;
    if (!unit) return [];

    return this.game.map.tiles
      .filter((tile) => tile.distanceTo(unit.q, unit.r) <= unit.range)
      .filter((tile) => {
        for (const u of this.game.turnSystem.enemyUnits) {
          if (u.q == tile.q && u.r == tile.r) return true;
        }
        return false;
      })
      .map((tile) => tile.coordinates);
  }
}
