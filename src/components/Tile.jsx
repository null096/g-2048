import React from 'react';
import classes from 'classnames';
import { observer } from 'mobx-react';
import TilePose from './TilePose';
import { TILE_POSES } from '../constants/animation';

const Tile = ({ tile }) => {
  const tileClass = classes(
    'tile',
    `tile-${tile.score}`,
    { 'tile-removed': tile.mergeTileId }
  );

  return (
    <TilePose
      className={tileClass}
      pose={tile.isNew ? TILE_POSES.onNew : TILE_POSES.position}
      initialPose={TILE_POSES.initialPose}
      x={tile.x}
      y={tile.y}
      poseKey={`${tile.x}-${tile.y}`}
    >{tile.score}</TilePose>
  );
};

export default observer(Tile);