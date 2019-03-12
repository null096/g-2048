import pose from 'react-pose';
import cssVars from '../styles/variables.scss';

const tileSize = parseInt(cssVars.tileSize);
const spaceBetweenTiles = parseInt(cssVars.spaceBetweenTiles);
const getTilePos = p => (p + 1) * spaceBetweenTiles + p * tileSize;

const TilePose = pose.div({
  position: {
    transform: ({ x, y }) =>
      `translate3d(${getTilePos(x)}px, ${getTilePos(y)}px, 0)`,
    transition: {
      transform: {
        duration: 175
      }
    }
  },
});

export default TilePose;
