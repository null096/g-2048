import React from 'react';
import GameUtils from '../utils/GameUtils';

const GameFieldBackground = ({ x, y }) => {
  const fakeGameField = GameUtils.getEmptyField({ x, y });

  return (
    <div className="field">
      {fakeGameField.map((line, i) =>
        <div className="field-line" key={`field-line-${i}`}>
          {line.map((_, j) =>
            <div className="empty-tile" key={`empty-tile-${j}`}></div>
          )}
        </div>
      )}
    </div>
  )
}

export default GameFieldBackground;
