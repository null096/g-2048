import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GameFieldBackground from './GameFieldBackground';
import GameField from './GameField';
import PopOver from './PopOver';
import GameInterface from './GameInterface';
import { FIELD_SIZE_X, FIELD_SIZE_Y } from '../constants';

@inject('game')
@observer
class App extends Component {
  state = {
    isWinMessageShown: false,
    isMoveAvailableMessageShown: false,
  };

  componentDidMount() {
    const {
      subscribeOnWin,
      subscribeOnIsMoveAvailable
    } = this.props.game;

    this.createNewField();
    this.onWinChangeDisposer = subscribeOnWin(this.onIsWinChange);
    this.onIsMoveAvailableDisposer = subscribeOnIsMoveAvailable(
      this.onIsMoveAvailable
    );
    document.addEventListener('keydown', this.onKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress, false);
    this.onWinChangeDisposer();
    this.onIsMoveAvailableDisposer();
  }

  createNewField = () => {
    const { createField } = this.props.game;

    createField({
      x: FIELD_SIZE_X,
      y: FIELD_SIZE_Y
    });
  }

  onIsWinChange = ({ newValue }) => {
    if (newValue) this.setState({ isWinMessageShown: true });
  }

  onIsMoveAvailable = ({ newValue }) => {
    if (!newValue) this.setState({ isMoveAvailableMessageShown: true });
  }

  onWinMessageClose = () => {
    this.setState({ isWinMessageShown: false });
  }

  onMoveAvailableMessageClose = () => {
    this.setState({ isMoveAvailableMessageShown: false });
    this.createNewField();
  }

  onKeyPress = (ev) => {
    const {
      mergeToLeft,
      mergeToRight,
      mergeToUp,
      mergeToDown
    } = this.props.game;
    const { keyCode } = ev;
    const {
      isWinMessageShown,
      isMoveAvailableMessageShown
    } = this.state;

    if (isWinMessageShown || isMoveAvailableMessageShown) return;

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
      score
    } = this.props.game;
    const {
      isWinMessageShown,
      isMoveAvailableMessageShown
    } = this.state;

    if (!field) return null;

    return (
      <div className="game-container">
        <GameInterface
          score={score}
        />
        <div className="game">
          <GameField
            field={field}
            removed={removed}
          />
          <GameFieldBackground
            x={FIELD_SIZE_X}
            y={FIELD_SIZE_Y}
          />
          {isWinMessageShown &&
            <PopOver
              title="You Won!"
              onClose={this.onWinMessageClose}
            />
          }
          {isMoveAvailableMessageShown &&
            <PopOver
              title={'Game over'}
              onClose={this.onMoveAvailableMessageClose}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
