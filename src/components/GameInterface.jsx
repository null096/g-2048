import React from 'react';
import ScorePose from './ScorePose';

const GameInterface = ({ score }) => {
  return (
    <div className="game-interface">
      <div className="game-score">
        Score: {' '}
        <ScorePose
          className="score"
          pose={'scoreUpdate'}
          poseKey={score}
        >{score}</ScorePose>
      </div>
    </div>
  );
}

export default GameInterface;
