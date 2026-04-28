import { describe, it, expect } from 'vitest';
import { completeFen, deriveCastlingRights, isValidFen, isValidPlacement } from '@/lib/fen';

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
  it('appends side-to-move and full castling rights for the start position', () => {
    expect(completeFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', 'w'))
      .toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  });
  it('uses b for side-to-move', () => {
    const fen = completeFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', 'b');
    expect(fen.split(' ')[1]).toBe('b');
  });
  it('uses "-" castling rights when no castling is possible', () => {
    const fen = completeFen('6qk/6pb/8/5Q1R/7P/6P1/5P1K/8', 'b');
    expect(fen.split(' ')[2]).toBe('-');
  });
});

describe('deriveCastlingRights', () => {
  it('returns KQkq for the starting position', () => {
    expect(deriveCastlingRights('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')).toBe('KQkq');
  });
  it('returns "-" when no rooks/kings on home squares', () => {
    expect(deriveCastlingRights('6qk/6pb/8/5Q1R/7P/6P1/5P1K/8')).toBe('-');
  });
  it('returns only the available rights', () => {
    // White king on e1 with rook only on h1; black king on e8 with both rooks.
    expect(deriveCastlingRights('r3k2r/8/8/8/8/8/8/4K2R')).toBe('Kkq');
  });
  it('returns "-" if kings have moved off their home squares', () => {
    expect(deriveCastlingRights('r6r/4k3/8/8/8/8/4K3/R6R')).toBe('-');
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
