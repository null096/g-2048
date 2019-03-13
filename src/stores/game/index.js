import { observable, action } from 'mobx';
import GameUtils from '../../utils/GameUtils';
import { dirTypes } from '../../utils/GameUtils/constants';

class game {
  @observable field = null;
  @observable isFieldFull = false;
  @observable removed = null;
  @observable isWin = false;
  @observable score = 0;

  @action resetGame = () => {
    this.field = null;
    this.isFieldFull = false;
    this.removed = null;
    this.isWin = false;
    this.score = 0;
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
      isWinCheck
    } = GameUtils;
    const res = mergeTilesTo(this.field, { dir });
    if (isFieldsEqual(this.field, res.field)) return;
    const {
      field,
      isFieldFull
    } = addTile({ field: res.field, amount: 1 });
    const isWin = isWinCheck(field);

    this.field = field;
    this.isFieldFull = isFieldFull;
    this.removed = res.removed;
    this.isWin = isWin;
    this.score = this.score + res.score;
  }

  @action mergeToLeft = this.mergeTiles({ dir: dirTypes.toLeft });
  @action mergeToRight = this.mergeTiles({ dir: dirTypes.toRight });
  @action mergeToUp = this.mergeTiles({ dir: dirTypes.toUp });
  @action mergeToDown = this.mergeTiles({ dir: dirTypes.toDown });
}

export default game;
