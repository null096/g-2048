import { observable, action, observe } from 'mobx';
import GameUtils from '../../utils/GameUtils';
import { DIR_TYPES } from '../../constants';

class game {
  @observable field = null;
  @observable isFieldFull = false;
  @observable removed = null;
  @observable isAlreadyWin = false;
  @observable isWin = false;
  @observable score = 0;
  @observable isMoveAvailable = true;

  @action resetGame = () => {
    this.field = null;
    this.isFieldFull = false;
    this.removed = null;
    this.isAlreadyWin = false;
    this.isWin = false;
    this.score = 0;
    this.isMoveAvailable = true;
  }

  @action createField = ({ x = 4, y = 4 } = {}) => {
    this.resetGame();
    const { getEmptyField, addTile } = GameUtils;
    const emptyField = getEmptyField({ x, y });
    const { field } = addTile({ field: emptyField, amount: 2 });
    this.field = field;
  }

  mergeTiles = ({ dir }) => () => {
    const {
      mergeTilesTo,
      addTile,
      isFieldsEqual,
      isWinCheck,
      isMoveAvailableCheck
    } = GameUtils;
    const res = mergeTilesTo(this.field, { dir });
    if (isFieldsEqual(this.field, res.field)) return;
    const {
      field,
      isFieldFull
    } = addTile({ field: res.field, amount: 1 });
    const isMoveAvailable = isMoveAvailableCheck(field);

    const isWin = isWinCheck(field);
    if (this.isAlreadyWin) {
      this.isWin = false;
    }
    if (isWin && !this.isAlreadyWin) {
      this.isWin = isWin;
      this.isAlreadyWin = true;
    }

    this.field = field;
    this.isFieldFull = isFieldFull;
    this.removed = res.removed;
    this.score = this.score + res.score;
    this.isMoveAvailable = isMoveAvailable;
  }

  subscribeOnWinChange = (listener) => {
    return observe(this, 'isWin', listener);
  }

  @action mergeToLeft = this.mergeTiles({ dir: DIR_TYPES.toLeft });
  @action mergeToRight = this.mergeTiles({ dir: DIR_TYPES.toRight });
  @action mergeToUp = this.mergeTiles({ dir: DIR_TYPES.toUp });
  @action mergeToDown = this.mergeTiles({ dir: DIR_TYPES.toDown });
}

export default game;
