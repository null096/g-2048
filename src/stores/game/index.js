import { observable, action } from 'mobx';
import GameUtils from '../../utils/GameUtils';
import { dirTypes } from '../../utils/GameUtils/constants';

class game {
  @observable field = null;

  @action createField = ({ x = 4, y = 4 } = {}) => {
    const { getEmptyField, addTile } = GameUtils;
    const emptyField = getEmptyField({ x, y });
    const newField = addTile({ field: emptyField, amount: 2 });
    this.field = newField;
  }

  mergeTiles = ({ dir }) => () => {
    const { mergeTilesTo } = GameUtils;
    const merged = mergeTilesTo(this.field, { dir });
    this.field = merged;
  }

  @action mergeToLeft = this.mergeTiles({ dir: dirTypes.toLeft });
  @action mergeToRight = this.mergeTiles({ dir: dirTypes.toRight });
  @action mergeToUp = this.mergeTiles({ dir: dirTypes.toUp });
  @action mergeToDown = this.mergeTiles({ dir: dirTypes.toDown });
}

export default game;
