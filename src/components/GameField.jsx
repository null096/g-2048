import React, { Component } from 'react';
import { observer } from 'mobx-react';
import GameUtils from '../utils/GameUtils';
import Tile from './Tile';

@observer
class GameField extends Component {
  render() {
    const { field, removed } = this.props;
    const { getFlattenTilesWithPositions } = GameUtils;
    const parsedField = getFlattenTilesWithPositions({ field, removed });

    return (
      <div className="tiles-container">
        {parsedField.map(tile => (
          <Tile
            key={`tile-${tile.id}`}
            tile={tile}
          />
        ))}
      </div>
    );
  }
}

export default GameField;
