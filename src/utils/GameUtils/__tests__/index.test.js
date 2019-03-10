import GameUtils from '../index';
import Tile from '../Tile';

describe('Game Utils', () => {
  const createLine = (scores) =>
    scores.map(score => score ? new Tile({ score }) : score);
  const { mergeTileLine } = GameUtils;
  const isLineMergeWorksCorrectly = (e, r) => {
    const exp = createLine(e);
    const to = createLine(r);
    expect(mergeTileLine(exp)).toEqual(to);
  }

  it('Line merge works correctly', () => {
    const l = isLineMergeWorksCorrectly;

    l([2, 2, undefined, undefined],
      [4, undefined, undefined, undefined]);

    l([4, 2, undefined, undefined],
      [4, 2, undefined, undefined]);

    l([undefined, 2, undefined, 2],
      [4, undefined, undefined, undefined]);

    l([undefined, 4, undefined, 2],
      [4, 2, undefined, undefined]);

    l([8, 8, 8, 8],
      [16, 16, undefined, undefined]);

    l([undefined, undefined, undefined],
      [undefined, undefined, undefined]);

    l([8, undefined, 4, 4],
      [8, 8, undefined, undefined]);

    l([2, 2, undefined, 2],
      [4, 2, undefined, undefined]);

    l([undefined, undefined, 2, 4],
      [2, 4, undefined, undefined]);

    l([8, undefined, undefined, 8],
      [16, undefined, undefined, undefined]);

    l([undefined, 8, 4, 2],
      [8, 4, 2, undefined]);

    l([undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined]);

    l([undefined, undefined, undefined, 8],
      [8, undefined, undefined, undefined]);

    l([undefined, 2, undefined, undefined],
      [2, undefined, undefined, undefined]);

    l([64, 128, undefined, 128],
      [64, 256, undefined, undefined]);

    l([undefined, 2, 2, 2],
      [4, 2, undefined, undefined]);

    l([], []);
  });
});