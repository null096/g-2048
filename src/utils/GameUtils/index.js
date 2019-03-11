import Tile from './Tile';
import { dirTypes } from './constants';

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
    return line.map(GameUtils.getTileCopy);
  }

  static getTileCopy(tile) {
    return tile ? new Tile({ ...tile }) : tile;
  }

  static getNewTile() {
    return new Tile({ score: GameUtils.getScoreForNewTile() });
  }

  static getScoreForNewTile() {
    return Math.random() > 0.9090909 ? 4 : 2;
  }

  static getFieldLength(field) {
    return {
      xLen: field[0].length,
      yLen: field.length
    };
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
    const {
      mergeAllLines,
      reverseFieldLines,
      rotateFieldToRight,
      rotateFieldToLeft
    } = GameUtils;
    let rotated, merged;

    switch (dir) {
      case dirTypes.toLeft:
        return mergeAllLines(field);

      case dirTypes.toRight:
        rotated = reverseFieldLines(field);
        merged = mergeAllLines(rotated);
        return reverseFieldLines(merged);

      case dirTypes.toUp:
        rotated = rotateFieldToLeft(field);
        merged = mergeAllLines(rotated);
        return rotateFieldToRight(merged);

      case dirTypes.toDown:
        rotated = rotateFieldToRight(field);
        merged = mergeAllLines(rotated);
        return rotateFieldToLeft(merged);

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

  static rotateRL = ({ to }) => (field) => {
    const { yLen, xLen } = GameUtils.getFieldLength(field);
    const newField = GameUtils.getEmptyField({
      x: yLen,
      y: xLen
    });

    switch (to) {
      case dirTypes.right:
        field.forEach((line, y) => {
          line.forEach((tile, x) => {
            newField[x][yLen - y - 1] = GameUtils.getTileCopy(tile);
          });
        });
        break;
      case dirTypes.left:
        field.forEach((line, y) => {
          line.forEach((tile, x) => {
            newField[xLen - x - 1][y] = GameUtils.getTileCopy(tile);
          });
        });
        break;
      default: return new Error('Wrong direction');
    }
    return newField;
  }

  static rotateFieldToRight = GameUtils.rotateRL({ to: dirTypes.right });

  static rotateFieldToLeft = GameUtils.rotateRL({ to: dirTypes.left });

  static reverseFieldLines(field) {
    const newField = GameUtils.getFieldCopy(field);
    return newField.map(line => line.reverse());
  }
}

export default GameUtils;
