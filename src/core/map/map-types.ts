import type { TerrainType } from '../terrain/terrain-types';

export interface MapConfig {
  name: string;
  size: [number, number];
  type: TerrainType;
  terrains: { q: number; r: number; type: TerrainType }[];
}
