import React from 'react';
import classes from 'classnames';
import { observer } from 'mobx-react';
import TilePose, { poses } from './TilePose';

const Tile = ({ tile }) => {
  const tileClass = classes(
    'tile',
    `tile-${tile.score}`,
    { 'tile-removed': tile.mergeTileId }
  );

  return (
    <TilePose
      className={tileClass}
      pose={tile.isNew ? poses.onNew : poses.position}
      x={tile.x}
      y={tile.y}
      poseKey={`${tile.x}-${tile.y}`}
      // onPoseComplete={() => console.log(`complete tile-${tile.id}`)}
    >{tile.score}</TilePose>
  );
};

export default observer(Tile);