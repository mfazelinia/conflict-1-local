import type { MapConfig } from '../core/map/map-types';
import type { Coordinate } from '../types';

const createLake = ({ q, r }: Coordinate): MapConfig['terrains'] => [
  { q: q, r: r - 1, type: 'grass' },
  { q: q + 1, r: r - 1, type: 'grass' },
  { q: q + 1, r: r, type: 'grass' },
  { q: q - 1, r: r, type: 'grass' },
  { q: q, r: r, type: 'water' },
  { q: q - 1, r: r + 1, type: 'grass' },
  { q: q, r: r + 1, type: 'mountain' },
];

export const sahra: MapConfig = {
  name: 'صحرا',
  size: [21, 13],
  type: 'plain',
  terrains: [{ q: 0, r: 0, type: 'mountain' }, ...createLake({ q: 3, r: 3 }), ...createLake({ q: -3, r: -3 })],
};
