import pose from 'react-pose';
import {
  getTilePos,
  TILE_POSES,
  ON_NEW_TILE_DURATION,
  ON_TILE_POSITION_DURATION
} from '../constants/animation';

const TilePose = pose.div({
  [TILE_POSES.position]: {
    x: ({ x }) => getTilePos(x),
    y: ({ y }) => getTilePos(y),
    scale: 1,
    transition: {
      x: { duration: ON_TILE_POSITION_DURATION },
      y: { duration: ON_TILE_POSITION_DURATION },
      scale: { duration: 0 }
    }
  },
  [TILE_POSES.onNew]: {
    x: ({ x }) => getTilePos(x),
    y: ({ y }) => getTilePos(y),
    scale: .8,
    opacity: 0,
    transition: {
      x: { duration: 0 },
      y: { duration: 0 },
      scale: () => ({
        type: 'keyframes',
        times: [0, .5, 1],
        values: [.8, 1.1, 1],
        duration: ON_NEW_TILE_DURATION,
      }),
      opacity: () => ({
        type: 'keyframes',
        times: [0, .3],
        values: [0, 1],
        duration: ON_NEW_TILE_DURATION,
      })
    },
  },
  [TILE_POSES.initialPose]: {},
});

export default TilePose;
