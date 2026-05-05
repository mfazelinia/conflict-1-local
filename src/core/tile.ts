import { TerrainConfigs } from './terrain/terrain-configs.js';
import type { TerrainProperties, TerrainType } from './terrain/terrain-types.js';

export class Tile {
  terrainType: TerrainType;
  terrain: TerrainProperties;
  q: number;
  r: number;
  isActive: boolean;

  constructor(q: number, r: number, type: TerrainType) {
    this.q = q;
    this.r = r;
    this.terrainType = type;
    this.terrain = TerrainConfigs[type];
    this.isActive = false;
  }

  get coordinates() {
    return { q: this.q, r: this.r };
  }

  distanceTo(q: number, r: number) {
    return (Math.abs(this.q - q) + Math.abs(this.q + this.r - q - r) + Math.abs(this.r - r)) / 2;
  }

  setActive(state: boolean) {
    this.isActive = state;
  }
}
