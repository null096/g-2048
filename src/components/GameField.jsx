import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class GameField extends Component {
  render() {
    const { field } = this.props;

    return (
      <div className="cells-container">
        {field.map((line, y) =>
          line.map((cell, x) =>
            !!(cell && cell.score)
              ?
              <div
                className={`cell cell-${cell.score} cell-position-${x}-${y}`}
                key={`cell-${x}-${y}`}
              >{cell.score}</div>
              : null
          )
        )}
      </div>
    );
  }
}

export default GameField;
