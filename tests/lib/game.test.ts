import { describe, it, expect } from 'vitest';
import { Game } from '@/lib/game';

describe('Game', () => {
  it('starts at the standard position', () => {
    const g = new Game();
    expect(g.turn()).toBe('w');
    expect(g.fen().startsWith('rnbqkbnr/pppppppp')).toBe(true);
    expect(g.history()).toEqual([]);
  });

  it('applies a legal move and returns true', () => {
    const g = new Game();
    expect(g.move({ from: 'e2', to: 'e4' })).toBe(true);
    expect(g.turn()).toBe('b');
    expect(g.history()).toEqual(['e4']);
  });

  it('rejects an illegal move and returns false', () => {
    const g = new Game();
    expect(g.move({ from: 'e2', to: 'e5' })).toBe(false);
    expect(g.history()).toEqual([]);
  });

  it('undoes the last move', () => {
    const g = new Game();
    g.move({ from: 'e2', to: 'e4' });
    g.undo();
    expect(g.history()).toEqual([]);
    expect(g.turn()).toBe('w');
  });

  it('loads a FEN', () => {
    const g = new Game();
    const fen = 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2';
    g.load(fen);
    expect(g.fen()).toBe(fen);
  });

  it('detects checkmate', () => {
    const g = new Game();
    // Fool's mate
    g.move({ from: 'f2', to: 'f3' });
    g.move({ from: 'e7', to: 'e5' });
    g.move({ from: 'g2', to: 'g4' });
    g.move({ from: 'd8', to: 'h4' });
    expect(g.result()).toEqual({ over: true, kind: 'checkmate', winner: 'b' });
  });

  it('reports legal moves from a square', () => {
    const g = new Game();
    expect(new Set(g.legalMovesFrom('e2'))).toEqual(new Set(['e3', 'e4']));
  });
});
