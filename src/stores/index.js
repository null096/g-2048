import { configure } from 'mobx';
import game from './game';

configure({ enforceActions: 'observed' });

export default {
  game: new game()
};