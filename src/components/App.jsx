import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GameFieldBackground from './GameFieldBackground';
import GameField from './GameField';
import PopOver from './PopOver';
import { FIELD_SIZE_X, FIELD_SIZE_Y } from '../constants';

@inject('game')
@observer
class App extends Component {
  state = {
    isWinMessageShown: false
  };

  componentDidMount() {
    const {
      createField,
      subscribeOnWinChange
    } = this.props.game;

    createField({
      x: FIELD_SIZE_X,
      y: FIELD_SIZE_Y
    });
    this.onWinChangeDisposer = subscribeOnWinChange(this.onIsWinChange);
    document.addEventListener('keydown', this.onKeyPress, false);
  }

  componentWillUnmount() {
    this.onWinChangeDisposer();
    document.removeEventListener('keydown', this.onKeyPress, false);
  }

  onIsWinChange = ({ newValue }) => {
    if (newValue) this.setState({ isWinMessageShown: true });
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
      field,
      removed,
      isFieldFull,
      score,
      isMoveAvailable
    } = this.props.game;
    const {
      isWinMessageShown
    } = this.state;

    if (!field) return null;

    return (
      <div className="game-container">
        <div className="game-interface">

        </div>
        <div className="game">
          <GameField
            field={field}
            removed={removed}
          />
          <GameFieldBackground
            x={FIELD_SIZE_X}
            y={FIELD_SIZE_Y}
          />
          {/* <span>Score: {score}</span> */}
          {isWinMessageShown &&
            <PopOver
              title="You've done it!"
              description="description test"
            />
          }
          {/* {!isMoveAvailable && <span>Move isn't available</span>}
          {isFieldFull && <span>Game over!</span>} */}
        </div>
      </div>
    );
  }
}

export default App;
