import type { MapConfig } from '../core/map/map-types';

export const sahra: MapConfig = {
  name: 'صحرا',
  size: [13, 9],
  type: 'plain',
  terrains: [
    { q: 0, r: 0, type: 'mountain' },
    { q: 1, r: 1, type: 'grass' },
    { q: 1, r: 2, type: 'grass' },
    { q: 2, r: 2, type: 'water' },
  ],
};
