import pose from 'react-pose';
import cssVars from '../styles/variables.scss';

const tileSize = parseInt(cssVars.tileSize);
const spaceBetweenTiles = parseInt(cssVars.spaceBetweenTiles);
const getTilePos = p => (p + 1) * spaceBetweenTiles + p * tileSize;
const getTileTransfrom = (x, y) =>
  `translate3d(${getTilePos(x)}px, ${getTilePos(y)}px, 0)`;
export const poses = {
  position: 'position',
  onNew: 'onNew'
};

const TilePose = pose.div({
  [poses.position]: {
    transform: ({ x, y }) => {
      console.log('position', x, y);
      return getTileTransfrom(x, y);
    },
    scale: 1,
    transition: {
      transform: {
        duration: 800
      },
      scale: { duration: 0 }
    }
  },
  [poses.onNew]: {
    transform: ({ x, y }) => getTileTransfrom(x, y),
    scale: .8
    // opacity: 1,
    // transition: {
    //   transform: ({ x, y }) => {
    //     console.log('onnew', x, y);
    //     return ({
    //       type: 'keyframes',
    //       times: [0, .5, 1],
    //       values: [
    //         `scale(.8) ${getTileTransfrom(x, y)}`,
    //         `scale(1.2) ${getTileTransfrom(x, y)}`,
    //         getTileTransfrom(x, y, 0)
    //       ],
    //       duration: 1000
    //     })
    //   },
    //   opacity: () => ({
    //     type: 'keyframes',
    //     times: [.1],
    //     values: [1],
    //     duration: 1000,
    //   }),
    // }
  },
});

export default TilePose;
