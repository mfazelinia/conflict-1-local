import type { TerrainProperties, TerrainType } from './terrain-types';

export const TerrainConfigs: Record<TerrainType, TerrainProperties> = {
  plain: { color: '#E7D7A7', moveCost: 1 },
  forest: { color: '#228B22', moveCost: 2, defenseBonus: 1 },
  mountain: { color: '#A9A9A9', moveCost: 3, defenseBonus: 2, blocksMovement: true },
  water: { color: '#1E90FF', moveCost: 999, blocksMovement: true },
  desert: { color: '#EDC9AF', moveCost: 2 },
  grass: { color: '#A2D149', moveCost: 1 },
};
