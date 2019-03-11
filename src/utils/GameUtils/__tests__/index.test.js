import GameUtils from '../index';
import Tile from '../Tile';

describe('Game Utils', () => {
  const createLine = (scores) =>
    scores.map(score => score ? new Tile({ score }) : score);
  const {
    mergeTileLine,
    rotateFieldToRight,
    reverseFieldLines
  } = GameUtils;
  const isLineMergeWorksCorrectly = (e, r) => {
    const exp = createLine(e);
    const to = createLine(r);
    expect(mergeTileLine(exp)).toEqual(to);
  };
  const isRotateWorksCorrectly = (e, to) => {
    const exp = rotateFieldToRight(e);
    expect(exp).toEqual(to);
  };
  const isReverseFieldWorksCorrectly = (e, to) => {
    const exp = reverseFieldLines(e);
    expect(exp).toEqual(to);
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

  describe('Rotate field to the right works correctly', () => {
    const c = createLine;
    const r = isRotateWorksCorrectly;

    it('with 4x4 matrix', () => {
      r(
        [
          c([undefined, undefined,    8,          undefined]),
          c([undefined, 2,            undefined,  2]),
          c([16,        undefined,    8,          undefined]),
          c([undefined, undefined,    undefined,  2])
        ],
        [
          c([undefined, 16,         undefined,    undefined]),
          c([undefined, undefined,  2,            undefined]),
          c([undefined, 8,          undefined,    8]),
          c([2,         undefined,  2,            undefined])
        ]);
    });
    it('with 3x4 matrix', () => {
      r(
        [
          c([2,         4,          8,          16]),
          c([undefined, 2,          64,         undefined]),
          c([undefined, undefined,  undefined,  4]),
        ],
        [
          c([undefined, undefined,  2]),
          c([undefined, 2,          4]),
          c([undefined, 64,         8]),
          c([4,         undefined,  16]),
        ]);
    });
  });

  describe('Reverse field works correctly', () => {
    const r = isReverseFieldWorksCorrectly;
    const c = createLine;

    it('with 4x4 matrix', () => {
      r(
        [
          c([undefined, undefined,    8,          undefined]),
          c([undefined, 2,            undefined,  2]),
          c([16,        undefined,    8,          undefined]),
          c([undefined, undefined,    undefined,  2])
        ],
        [
          c([undefined, 8,          undefined,  undefined]),
          c([2,         undefined,  2,          undefined]),
          c([undefined, 8,          undefined,  16]),
          c([2,         undefined,  undefined,  undefined])
        ]);
    });
    it('with 3x4 matrix', () => {
      r(
        [
          c([2,         4,          8,          16]),
          c([undefined, 2,          64,         undefined]),
          c([undefined, undefined,  undefined,  4]),
        ],
        [
          c([16,        8,          4,          2]),
          c([undefined, 64,         2,          undefined]),
          c([4,         undefined,  undefined,  undefined]),
        ]);
    });
  });
});