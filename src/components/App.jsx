import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GameFieldBackground from './GameFieldBackground';
import GameField from './GameField';
import { FIELD_SIZE_X, FIELD_SIZE_Y } from '../constants';

@inject('game')
@observer
class App extends Component {
  componentDidMount() {
    const {
      createField,
    } = this.props.game;

    createField({
      x: FIELD_SIZE_X,
      y: FIELD_SIZE_Y
    });
    document.addEventListener('keydown', this.onKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress, false);
  }

  onKeyPress = (ev) => {
    const {
      mergeToLeft,
      mergeToRight,
      mergeToUp,
      mergeToDown
    } = this.props.game;
    const { keyCode } = ev;

    switch (true) {
      // "A", left arrow
      case [65, 37].includes(keyCode):
        mergeToLeft();
        break;
      // "W", up arrow
      case [87, 38].includes(keyCode):
        mergeToUp();
        break;
      // "S", down arrow
      case [83, 40].includes(keyCode):
        mergeToDown();
        break;
      // "D", right arrow
      case [68, 39].includes(keyCode):
        mergeToRight();
        break;
      default: return;
    }
  }

  render() {
    const {
      game: {
        field,
        removed
      }
    } = this.props;

    if (!field) return null;

    return (
      <div className="game">
        <GameField
          field={field}
          removed={removed}
        />
        <GameFieldBackground
          x={FIELD_SIZE_X}
          y={FIELD_SIZE_Y}
        />
      </div>
    );
  }
}

export default App;
