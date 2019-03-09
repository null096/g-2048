import { observable, action } from 'mobx';
import GameUtils from '../../utils/GameUtils';

class game {
  @observable field = null;

  @action createField({ x = 4, y = 4 } = {}) {
    const emptyField = GameUtils.getEmptyField({ x, y });
    const newField = GameUtils.addTile({ field: emptyField, amount: 2 });
    this.field = newField;
  }
}

export default game;
