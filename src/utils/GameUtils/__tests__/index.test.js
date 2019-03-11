import GameUtils from '../index';
import Tile from '../Tile';
import { dirTypes } from '../constants';

describe('Game Utils', () => {
  const createLine = (scores) =>
    scores.map(score => score ? new Tile({ score }) : score);
  const {
    mergeTileLine,
    rotateFieldToRight,
    reverseFieldLines,
    rotateFieldToLeft,
    mergeTilesTo
  } = GameUtils;
  const isLineMergeWorksCorrectly = (e, r) => {
    const exp = createLine(e);
    const to = createLine(r);
    expect(mergeTileLine(exp)).toEqual(to);
  };
  const isRotateToTheRightWorksCorrectly = (e, to) => {
    const exp = rotateFieldToRight(e);
    expect(exp).toEqual(to);
  };
  const isReverseFieldWorksCorrectly = (e, to) => {
    const exp = reverseFieldLines(e);
    expect(exp).toEqual(to);
  };
  const isRotateToTheLeftWorksCorrectly = (e, to) => {
    const exp = rotateFieldToLeft(e);
    expect(exp).toEqual(to);
  };

  describe('Line merge', () => {
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

  describe('Rotate field to the right works correctly', () => {
    const c = createLine;
    const r = isRotateToTheRightWorksCorrectly;

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
    it('with 2x4 matrix', () => {
      r(
        [
          c([2,         4,          8,          16]),
          c([undefined, 2,          64,         undefined]),
        ],
        [
          c([undefined,  2]),
          c([2,          4]),
          c([64,         8]),
          c([undefined,  16]),
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

  describe('Rotate field to the left works correctly', () => {
    const l = isRotateToTheLeftWorksCorrectly;
    const c = createLine;

    it('with 4x4 matrix', () => {
      l(
        [
          c([undefined, undefined,    8,          undefined]),
          c([undefined, 2,            undefined,  2]),
          c([16,        undefined,    8,          undefined]),
          c([undefined, undefined,    undefined,  2])
        ],
        [
          c([undefined, 2,          undefined,  2]),
          c([8,         undefined,  8,          undefined]),
          c([undefined, 2,          undefined,  undefined]),
          c([undefined, undefined,  16,         undefined]),
        ]);
    });
    it('with 3x4 matrix', () => {
      l(
        [
          c([undefined, undefined,    8,          undefined]),
          c([undefined, 2,            undefined,  32]),
          c([16,        undefined,    4,          undefined])
        ],
        [
          c([undefined, 32,         undefined]),
          c([8,         undefined,  4]),
          c([undefined, 2,          undefined]),
          c([undefined, undefined,  16])
        ]);
    });
    it('with 2x4 matrix', () => {
      l(
        [
          c([2,         4,          8,          16]),
          c([undefined, 2,          64,         undefined]),
        ],
        [
          c([16,  undefined]),
          c([8,   64]),
          c([4,   2]),
          c([2,   undefined]),
        ]);
    });
  });

  describe('Field merge works correctly', () => {
    const mergeTilesToLeft = (e, to) => {
      const exp = mergeTilesTo(e, { dir: dirTypes.toLeft });
      expect(exp).toEqual(to);
    };
    const mergeTilesToUp = (e, to) => {
      const exp = mergeTilesTo(e, { dir: dirTypes.toUp });
      expect(exp).toEqual(to);
    };
    const mergeTilesToRight = (e, to) => {
      const exp = mergeTilesTo(e, { dir: dirTypes.toRight });
      expect(exp).toEqual(to);
    };
    const mergeTilesToDown = (e, to) => {
      const exp = mergeTilesTo(e, { dir: dirTypes.toDown });
      expect(exp).toEqual(to);
    };
    const c = createLine;
    const l = mergeTilesToLeft;
    const r = mergeTilesToRight;
    const u = mergeTilesToUp;
    const d = mergeTilesToDown;

    it('To the left', () => {
      l(
        [
          c([undefined, undefined,  8,          undefined]),
          c([undefined, 2,          undefined,  2]),
          c([16,        undefined,  8,          undefined]),
          c([undefined, undefined,  undefined,  2])
        ],
        [
          c([8,   undefined,  undefined,  undefined]),
          c([4,   undefined,  undefined,  undefined]),
          c([16,  8,          undefined,  undefined]),
          c([2,   undefined,  undefined,  undefined])
        ]);
    });

    it('To the right', () => {
      r(
        [
          c([undefined, undefined,  8,          undefined]),
          c([undefined, 2,          undefined,  2]),
          c([16,        undefined,  8,          undefined]),
          c([undefined, undefined,  undefined,  2])
        ],
        [
          c([undefined, undefined,  undefined,  8]),
          c([undefined, undefined,  undefined,  4]),
          c([undefined, undefined,  16,         8]),
          c([undefined, undefined,  undefined,  2])
        ]);
    });

    it('To the up', () => {
      u(
        [
          c([undefined, undefined,  8,          undefined]),
          c([undefined, 2,          undefined,  2]),
          c([16,        undefined,  8,          undefined]),
          c([undefined, undefined,  undefined,  2])
        ],
        [
          c([16,        2,          16,         4]),
          c([undefined, undefined,  undefined,  undefined]),
          c([undefined, undefined,  undefined,  undefined]),
          c([undefined, undefined,  undefined,  undefined])
        ]);
    });

    it('To the down', () => {
      d(
        [
          c([undefined, undefined,  8,          undefined]),
          c([undefined, 2,          undefined,  2]),
          c([16,        undefined,  8,          undefined]),
          c([undefined, undefined,  undefined,  2])
        ],
        [
          c([undefined, undefined,  undefined,  undefined]),
          c([undefined, undefined,  undefined,  undefined]),
          c([undefined, undefined,  undefined,  undefined]),
          c([16,        2,          16,         4])
        ]);
    });

    it('Complex merges', () => {
      u(
        [
          c([64, 2, 8,          1024]),
          c([64, 2, undefined,  512]),
          c([64, 4, undefined,  512]),
          c([64, 8, 8,          512])
        ],
        [
          c([128,       4,          16,         1024]),
          c([128,       4,          undefined,  1024]),
          c([undefined, 8,          undefined,  512]),
          c([undefined, undefined,  undefined,  undefined])
        ]);

      d(
        [
          c([64, 2, 8,          1024]),
          c([64, 2, undefined,  512]),
          c([64, 4, undefined,  512]),
          c([64, 8, 8,          512])
        ],
        [
          c([undefined, undefined,  undefined,  undefined]),
          c([undefined, 4,          undefined,  1024]),
          c([128,       4,          undefined,  512]),
          c([128,       8,          16,         1024])
        ]);
    });
  });
});