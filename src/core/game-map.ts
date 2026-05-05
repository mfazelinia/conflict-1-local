import type { Coordinate } from '../types/game.type.js';
import type { MapConfig } from './map/map-types.js';
import type { TerrainType } from './terrain/terrain-types.js';
import { Tile } from './tile.js';

export class GameMap {
  name: string;
  type: TerrainType;
  tiles: Tile[] = [];

  constructor(mapConfig: MapConfig) {
    this.name = mapConfig.name;
    this.type = mapConfig.type;

    const tileSize = 30;
    const qMax = (mapConfig.size[0] - 1) / 2;
    const rMax = (mapConfig.size[1] - 1) / 2;

    for (let r = -rMax; r <= rMax; r++) {
      for (let q = -qMax - Math.floor(r / 2); q <= qMax - Math.floor((r + 1) / 2); q++) {
        const tileProps = mapConfig.terrains.find((i) => i.q == q && i.r == r);
        this.tiles.push(new Tile(q, r, tileSize, tileProps?.type ?? mapConfig.type));
      }
    }
  }

  getTile(q: number, r: number) {
    return this.tiles.find((tile) => tile.q == q && tile.r == r);
  }

  neighbors(q: number, r: number): Tile[] {
    const dirs = [
      [+1, 0],
      [0, +1],
      [-1, +1],
      [-1, 0],
      [0, -1],
      [+1, -1],
    ];
    return dirs
      .map(([dq, dr]) => this.getTile(q + dq, r + dr))
      .filter((t) => !!t)
      .filter((t) => !t.terrain.blocksMovement);
  }

  distance(coord1: Coordinate, coord2: Coordinate) {
    return (
      (Math.abs(coord1.q - coord2.q) +
        Math.abs(coord1.r - coord2.r) +
        Math.abs(coord1.q + coord1.r - coord2.q - coord2.r)) /
      2
    );
  }
}
