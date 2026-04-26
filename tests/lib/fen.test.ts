import { describe, it, expect } from 'vitest';
import { completeFen, isValidFen, isValidPlacement } from '@/lib/fen';

describe('isValidPlacement', () => {
  it('accepts the starting placement', () => {
    expect(isValidPlacement('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')).toBe(true);
  });
  it('rejects placement with too few ranks', () => {
    expect(isValidPlacement('rnbqkbnr/pppppppp')).toBe(false);
  });
  it('rejects placement with bad piece char', () => {
    expect(isValidPlacement('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBZKBNR')).toBe(false);
  });
});

describe('completeFen', () => {
  it('appends side-to-move and default fields', () => {
    expect(completeFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', 'w'))
      .toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  });
  it('uses b for side-to-move', () => {
    const fen = completeFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', 'b');
    expect(fen.split(' ')[1]).toBe('b');
  });
});

describe('isValidFen', () => {
  it('accepts a valid full FEN', () => {
    expect(isValidFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')).toBe(true);
  });
  it('rejects an illegal position (two black kings)', () => {
    expect(isValidFen('rnbqkbnk/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')).toBe(false);
  });
});
