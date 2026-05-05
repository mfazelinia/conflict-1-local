import type { Unit } from '../units/unit';
import type { FloatingText } from './floatingText';
import type { GameMap } from './game-map';
import type { Team } from './team';
import { AttackSystem } from './systems/attack-system';
import { TurnSystem } from './systems/turn-system';
import { InputSystem } from './systems/input-system';
import { MovementSystem } from './systems/movement-system';
import { RenderSystem } from './systems/render-system';
import type { Coordinate } from '../types';

export class Game {
  ctx: CanvasRenderingContext2D;
  map: GameMap;
  teams: Team[];
  units: Unit[];
  selectedUnit: Unit | null;
  floatingTexts: FloatingText[];
  turnSystem: TurnSystem;
  attackSystem: AttackSystem;
  inputSystem: InputSystem;
  movementSystem: MovementSystem;
  renderSystem: RenderSystem;

  constructor(ctx: CanvasRenderingContext2D, map: GameMap, teams: Team[], units: Unit[]) {
    this.ctx = ctx;
    this.map = map;
    this.teams = teams;
    this.units = units;
    this.turnSystem = new TurnSystem(this);
    this.renderSystem = new RenderSystem(this);
    this.inputSystem = new InputSystem(this);
    this.movementSystem = new MovementSystem(this);
    this.attackSystem = new AttackSystem(this);
    this.selectedUnit = null;
    this.floatingTexts = [];

    window.addEventListener('resize', () => this.resizeCanvas());
    this.resizeCanvas();
  }

  resizeCanvas() {
    const canvas = this.ctx.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.renderSystem.offsetX = window.innerWidth / 2;
    this.renderSystem.offsetY = window.innerHeight / 2;

    const [cols, rows] = this.map.size;
    const sizeFromWidth = canvas.width / (Math.sqrt(3) * (cols + 2));
    const sizeFromHeight = canvas.height / (1.5 * (rows - 1) + 6);
    this.renderSystem.tileSize = Math.min(sizeFromWidth, sizeFromHeight);

    for (const unit of this.units) {
      const { x, y } = this.renderSystem.axialToPixel(unit.coordinates);
      unit.x = x;
      unit.y = y;
    }
  }

  update() {
    this.movementSystem.update();
    this.renderSystem.render();
  }

  getUnitAt(q: number, r: number) {
    return this.units.find((unit) => unit.q == q && unit.r == r);
  }

  selectUnit(unit: Unit) {
    if (!this.turnSystem.isCurrentTeamUnit(unit)) return;
    if (unit.actionPoints <= 0) return;
    this.deselectUnit();
    this.selectedUnit = unit;
    unit.select();
  }

  deselectUnit() {
    if (!this.selectedUnit) return;
    this.selectedUnit.deselect();
    this.selectedUnit = null;
  }

  isOccupied(coord: Coordinate) {
    return this.units.findIndex((unit) => unit.q == coord.q && unit.r == coord.r) > -1;
  }

  filterOutOccupiedTiles(coords: Coordinate[]) {
    return coords.filter((coord) => !this.isOccupied(coord));
  }
}
