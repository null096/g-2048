import cssVars from '../styles/variables.scss';

const tileSize = parseInt(cssVars.tileSize);
const spaceBetweenTiles = parseInt(cssVars.spaceBetweenTiles);

export const getTilePos = p =>
  (p + 1) * spaceBetweenTiles + p * tileSize;
export const TILE_POSES = {
  position: 'position',
  onNew: 'onNew',
  initialPose: 'initialPose'
};
export const ON_NEW_TILE_DURATION = 250;
export const ON_TILE_POSITION_DURATION = 175;