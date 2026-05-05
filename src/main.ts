import { Game } from './core/game';
import { GameMap } from './core/game-map';
import { Team } from './core/team';
import { sahra as mapData } from './maps/sahra';
import { Unit } from './units/unit';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const map = new GameMap(mapData);
const teams = [new Team('Blue', '#2F65AC', 'white'), new Team('Red', '#AC392F', 'white')];
const units = [
  new Unit(teams[0], { q: -2, r: -1 }),
  new Unit(teams[0], { q: -3, r: 1 }),
  new Unit(teams[1], { q: 2, r: 1 }),
  new Unit(teams[1], { q: 3, r: -1 }),
];

const game = new Game(ctx, map, teams, units);

const endTurnButton = document.getElementById('endTurn') as HTMLButtonElement;
endTurnButton.onclick = () => {
  game.turnSystem.endTurn();
};

function loop() {
  game.update();
  requestAnimationFrame(loop);
}

loop();
