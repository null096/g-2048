import Tile from './Tile';

class GameUtils {
  static getEmptyField({ x, y }) {
    return [...Array(y).fill([]).map(_ => [...Array(x)])];
  }

  static getRandomArrayIndex(max) {
    return ~~(Math.random() * max);
  }

  static getFieldCopy(field) {
    return new Array(field.length).fill([])
      .map((_, x) => GameUtils.getLineCopy(field[x]));
  }

  static getLineCopy(line) {
    return line.map(tile => tile ? new Tile({ ...tile }) : tile);
  }

  static getNewTile() {
    return new Tile({ score: GameUtils.getScoreForNewTile() });
  }

  static getScoreForNewTile() {
    return Math.random() > 0.9090909 ? 4 : 2;
  }

  static addTile({ field, amount = 1 }) {
    if (amount < 1) return field;

    const emptyTiles = GameUtils.getEmptyTiles(field);
    if (amount > emptyTiles.length) {
      throw new Error('Field is full');
    }

    const fieldCopy = GameUtils.getFieldCopy(field);
    while (amount--) {
      const randIndex = GameUtils.getRandomArrayIndex(emptyTiles.length);
      const { x, y } = emptyTiles[randIndex];
      emptyTiles.splice(randIndex, 1);
      fieldCopy[y][x] = GameUtils.getNewTile();
    }

    return fieldCopy;
  }

  static getEmptyTiles(field) {
    const emptyTiles = [];

    field.forEach((line, y) => {
      line.forEach((tile, x) => {
        !tile && emptyTiles.push({ y, x });
      });
    });

    return emptyTiles;
  }

  static mergeTilesTo(field, { dir }) {
    switch (dir) {
      case 'rtl':
        return GameUtils.mergeAllLines(field);
      default: return new Error('Wrong direction');
    }
  }

  static mergeAllLines(field) {
    return field.map(line => GameUtils.mergeTileLine(line));
  }

  static mergeTileLine(line) {
    const lineCopy = GameUtils.getLineCopy(line);
    let first = 0;

    for (let second = 1; second < lineCopy.length; second++) {
      if (lineCopy[first] && lineCopy[second]
        && lineCopy[first].score === lineCopy[second].score
      ) {
        lineCopy[first] = new Tile({ score: lineCopy[first].score * 2 });
        lineCopy[second] = undefined;
        first++;
      } else if (lineCopy[second]) {
        if (lineCopy[first]) {
          first++;
        }
        lineCopy[first] = lineCopy[second];
        if (first !== second) {
          lineCopy[second] = undefined;
        }
      }
    }

    return lineCopy;
  }

  static rotateFieldToRight(field) {
    const xLen = field[0].length
    const yLen = field.length;
    const newField = GameUtils.getEmptyField({
      x: yLen,
      y: xLen
    });

    field.forEach((line, y) => {
      line.forEach((tile, x) => {
        newField[x][yLen - y - 1] = tile;
      });
    });

    return newField;
  }
}

export default GameUtils;
