class Tile {
  static uuid = (function* () {
    let id = 1;
    while (1) yield id++;
  })()

  constructor({
    score,
    id = Tile.uuid.next().value,
    x,
    y,
    mergeTileId
  }) {
    this.score = score;
    this.id = id;
    this.x = x;
    this.y = y;
    this.mergeTileId = mergeTileId;
  }
}

export default Tile;