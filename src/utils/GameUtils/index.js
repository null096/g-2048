class GameUtils {
  static getEmptyField({ x, y }) {
    return [...Array(y).fill([]).map(_ => [...Array(x)])];
  }

  static getRandomArrayIndex(max) {
    return ~~(Math.random() * max);
  }

  static getFieldCopy(field) {
    return [...Array(field.length).fill([])]
      .map((_, x) => [...field[x]]);
  }

  static getNewTile() {
    return { score: GameUtils.getScoreForNewTile() };
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
      line.forEach((cell, x) => {
        !cell && emptyTiles.push({ y, x });
      });
    });

    return emptyTiles;
  }
}

export default GameUtils;
