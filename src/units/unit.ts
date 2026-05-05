import type { Team } from '../core/team';
import type { Coordinate, Position } from '../types';

export class Unit {
  team: Team;
  q: number;
  r: number;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  move: number;
  attack: number;
  range: number;
  actionPoints: number;
  path: Coordinate[];
  speed: number;
  isSelected: boolean;

  constructor(team: Team, coords: Coordinate) {
    this.team = team;

    this.q = coords.q;
    this.r = coords.r;
    this.x = 0;
    this.y = 0;

    this.maxHp = 10;
    this.hp = this.maxHp;
    this.move = 4;
    this.attack = 3;
    this.range = 1;

    this.actionPoints = this.move;

    this.path = [];
    this.speed = 6;

    this.isSelected = false;
  }

  get coordinates(): Coordinate {
    return { q: this.q, r: this.r };
  }
  get position(): Position {
    return { x: this.x, y: this.y };
  }

  select() {
    this.isSelected = true;
  }
  deselect() {
    this.isSelected = false;
  }
}
