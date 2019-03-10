import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GameFieldBackground from './GameFieldBackground';
import GameField from './GameField';
import { FIELD_SIZE_X, FIELD_SIZE_Y } from '../constants';

@inject('game')
@observer
class App extends Component {
  componentDidMount() {
    this.props.game.createField({
      x: FIELD_SIZE_X,
      y: FIELD_SIZE_Y
    });
  }

  render() {
    const { game: { field } } = this.props;

    if (!field) return null;

    return (
      <div className="game">
        <GameField field={field} />
        <GameFieldBackground
          x={FIELD_SIZE_X}
          y={FIELD_SIZE_Y}
        />
      </div>
    );
  }
}

export default App;
