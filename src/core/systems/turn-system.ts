import type { Unit } from '../../units/unit';
import type { Game } from '../game';

export class TurnSystem {
  game: Game;
  currentTeamIndex: number;

  constructor(game: Game) {
    this.game = game;
    this.currentTeamIndex = 1;
  }

  endTurn() {
    this.currentTeamIndex = this.currentTeamIndex === 1 ? 0 : 1;
    this.game.selectedUnit = null;
    for (const unit of this.game.units) {
      unit.actionPoints = unit.move;
      unit.deselect();
    }
    for (const tile of this.game.map.tiles) {
      tile.setActive(false);
    }

    const endTurnButton = document.getElementById('endTurn') as HTMLButtonElement;
    endTurnButton.style.backgroundColor = this.game.teams[this.currentTeamIndex].color;
    endTurnButton.style.color = this.game.teams[this.currentTeamIndex].textColor;
  }

  isCurrentTeamUnit(unit: Unit) {
    return unit.team == this.game.teams[this.currentTeamIndex];
  }

  get enemyUnits() {
    return this.game.units.filter((u) => !this.isCurrentTeamUnit(u));
  }
}
