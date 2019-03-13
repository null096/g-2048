import Tools from '../Tools';
import Tile from './Tile';
import arraySort from 'array-sort';
import { DIR_TYPES, WIN_SCORE } from '../../constants/index';

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

  static getNewTile({
    score = GameUtils.getScoreForNewTile(),
  } = {}) {
    return new Tile({
      score,
      isNew: true
    });
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
    const {
      getRandomArrayIndex,
      getNewTile,
      getFieldCopy,
      getEmptyTiles
    } = GameUtils;
    if (amount < 1) return field;

    const emptyTiles = getEmptyTiles(field);
    if (amount > emptyTiles.length) {
      return { isFieldFull: true, field };
    }

    const fieldCopy = getFieldCopy(field);
    while (amount--) {
      const randIndex = getRandomArrayIndex(emptyTiles.length);
      const { x, y } = emptyTiles[randIndex];
      emptyTiles.splice(randIndex, 1);
      fieldCopy[y][x] = getNewTile();
    }

    return { field: fieldCopy };
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
      reverseFieldLines,
      rotateFieldToRight,
      rotateFieldToLeft,
      applyMerge
    } = GameUtils;

    switch (dir) {
      case DIR_TYPES.toLeft:
        return applyMerge({ field });

      case DIR_TYPES.toRight:
        return applyMerge({
          field,
          rotateFn: reverseFieldLines,
          rotateBackFn: reverseFieldLines
        });

      case DIR_TYPES.toUp:
        return applyMerge({
          field,
          rotateFn: rotateFieldToLeft,
          rotateBackFn: rotateFieldToRight
        });

      case DIR_TYPES.toDown:
        return applyMerge({
          field,
          rotateFn: rotateFieldToRight,
          rotateBackFn: rotateFieldToLeft
        });

      default: return new Error('Wrong direction');
    }
  }

  static applyMerge({
    field,
    rotateFn = x => x,
    rotateBackFn = x => x,
  }) {
    const {
      mergeAllLines,
    } = GameUtils;
    let rotated, removed, res;

    rotated = rotateFn(field);
    res = mergeAllLines(rotated);
    rotated = rotateBackFn(res.field);
    removed = rotateBackFn(res.removed);
    return {
      field: rotated,
      removed,
      score: res.score
    };
  }

  static getFlattenTilesWithPositions({ field, removed }) {
    const {
      addPositionForFieldTiles,
      addPositionForRemovedTiles,
    } = GameUtils;
    const newField = addPositionForFieldTiles(field);
    const newRemoved = addPositionForRemovedTiles(field, removed);
    const flatten = [
      ...newField,
      ...(newRemoved || [])
    ].flat(1);

    return arraySort(flatten.filter(Boolean), 'id');
  }

  static addPositionForRemovedTiles(field, removed) {
    if (!removed) return;
    const {
      getFieldCopy,
      getTilesPosition
    } = GameUtils;
    const removedCopy = getFieldCopy(removed);
    const tilesPos = getTilesPosition(field);

    return removedCopy.map((line) =>
      line.map((tile) => {
        if (!tile) return tile;
        const pos = tilesPos[tile.mergeTileId];

        return new Tile({
          ...tile,
          x: pos.x,
          y: pos.y
        });
      })
    );
  }

  static addPositionForFieldTiles(field) {
    const {
      getFieldCopy,
    } = GameUtils;
    const fieldCopy = getFieldCopy(field);

    return fieldCopy.map((line, y) =>
      line.map((tile, x) =>
        tile ? new Tile({ ...tile, y, x }) : tile)
    );
  }

  static getTilesPosition(field) {
    const res = {};

    field.forEach((line, y) => {
      line.forEach((tile, x) => {
        if (tile) res[tile.id] = { x, y };
      });
    });

    return res;
  }

  static resetPropsOnField(field, props) {
    const {
      getFieldCopy,
    } = GameUtils;
    const fieldCopy = getFieldCopy(field);

    return fieldCopy.map((line) =>
      line.map(tile => {
        if (!tile) return tile;
        props.forEach((key) => {
          tile[key] = undefined;
        });
        return tile;
      })
    );
  }

  static mergeAllLines = (field) => {
    const {
      getFieldLength,
      getEmptyField,
      mergeTileLine,
      resetPropsOnField
    } = GameUtils;
    const fieldCopy = resetPropsOnField(field, ['isNew']);
    const { xLen, yLen } = getFieldLength(fieldCopy);
    const removed = getEmptyField({ x: xLen, y: yLen });
    const gameData = {
      removed,
      score: 0
    };

    fieldCopy.map((line, lineY) => mergeTileLine({
      line,
      lineY,
      gameData
    }));

    return {
      field: fieldCopy,
      ...gameData
    };
  }

  static mergeTileLine({
    line,
    lineY,
    gameData
  }) {
    const { getNewTile } = GameUtils;
    const removedLine = gameData.removed[lineY];
    let first = 0;

    for (let second = 1; second < line.length; second++) {
      if (line[first] && line[second]
        && line[first].score === line[second].score
      ) {
        const newTileScore = line[first].score * 2;
        const newTile = getNewTile({ score: newTileScore });

        removedLine[first] = new Tile({
          ...line[first],
          mergeTileId: newTile.id
        });
        removedLine[second] = new Tile({
          ...line[second],
          mergeTileId: newTile.id
        });
        gameData.score += newTileScore;

        line[first] = newTile;
        line[second] = undefined;
        first++;
      } else if (line[second]) {
        if (line[first]) {
          first++;
        }
        line[first] = line[second];
        if (first !== second) {
          line[second] = undefined;
        }
      }
    }

    return line;
  }

  static rotateRL = ({ to }) => (field) => {
    const { yLen, xLen } = GameUtils.getFieldLength(field);
    const newField = GameUtils.getEmptyField({
      x: yLen,
      y: xLen
    });

    switch (to) {
      case DIR_TYPES.right:
        field.forEach((line, y) => {
          line.forEach((tile, x) => {
            newField[x][yLen - y - 1] = GameUtils.getTileCopy(tile);
          });
        });
        break;
      case DIR_TYPES.left:
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

  static rotateFieldToRight = GameUtils.rotateRL({ to: DIR_TYPES.right });

  static rotateFieldToLeft = GameUtils.rotateRL({ to: DIR_TYPES.left });

  static reverseFieldLines = (field) => {
    const newField = GameUtils.getFieldCopy(field);
    return newField.map(line => line.reverse());
  }

  static isFieldsEqual(first, second, toCompare = ['id']) {
    const {
      getFieldLength
    } = GameUtils;
    const {
      xLen: xFirst,
      yLen: yFirst
    } = getFieldLength(first);
    const {
      xLen: xSecond,
      yLen: ySecond
    } = getFieldLength(second);

    if (xFirst !== xSecond || yFirst !== ySecond) return false;

    return first.every((line, y) =>
      line.every((tile, x) => {
        const secondTile = second[y][x];
        if (!tile || !secondTile) return tile === secondTile;
        return toCompare.every(key => tile[key] === secondTile[key]);
      })
    );
  }

  static isWinCheck(field, tileScore = WIN_SCORE) {
    return field.some(line =>
      line.some(tile => tile ? tile.score >= tileScore : false
      )
    );
  }

  static isAnyTileEmpty(field) {
    return field.some(line => line.some(tile => !tile));
  }

  static isFieldHasMergeableTiles(field) {
    const { getObjectProp: getProp } = Tools;

    return field.some((line, y) =>
      line.some((tile, x) => {
        if (!tile) return false;
        const tilesAround = [
          getProp(field, y - 1, x),
          getProp(field, y + 1, x),
          getProp(field, y, x - 1),
          getProp(field, y, x + 1)
        ]
          .filter(Boolean)
          .map(x => x.score);

        return tilesAround.includes(tile.score);
      })
    );
  }

  static isMoveAvailableCheck(field) {
    const {
      isAnyTileEmpty,
      isFieldHasMergeableTiles
    } = GameUtils;
    if (isAnyTileEmpty(field)) return true;

    return isFieldHasMergeableTiles(field);
  }
}

export default GameUtils;
