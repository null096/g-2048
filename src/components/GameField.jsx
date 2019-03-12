import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classes from 'classnames';
import GameUtils from '../utils/GameUtils';

@observer
class GameField extends Component {
  render() {
    const { field, removed } = this.props;
    const { getFlattenTilesWithPositions } = GameUtils;
    const parsedField = getFlattenTilesWithPositions({ field, removed });

    return (
      <div className="cells-container">
        {parsedField.map(tile => {
          const tileClass = classes(
            'cell',
            `cell-${tile.score}`,
            `cell-position-${tile.x}-${tile.y}`,
            { 'cell-removed': tile.mergeTileId }
          );

          return (
            <div
              className={tileClass}
              key={`cell-${tile.id}`}
            >{tile.score}</div>
          );
        })}
      </div>
    );
  }
}

export default GameField;
