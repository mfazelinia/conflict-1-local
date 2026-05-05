export type TerrainType = 'plain' | 'forest' | 'mountain' | 'water' | 'desert' | 'grass';

export interface TerrainProperties {
  color: string;
  moveCost: number;
  defenseBonus?: number;
  blocksMovement?: boolean;
  blocksSight?: boolean;
}
