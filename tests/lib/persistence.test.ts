import { describe, it, expect, beforeEach } from 'vitest';
import { saveGameState, loadGameState, clearGameState, GameState } from '@/lib/persistence';

const sample: GameState = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  humanColor: 'w',
  difficulty: 8,
  resigned: false,
};

describe('persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when nothing is saved', () => {
    expect(loadGameState()).toBeNull();
  });

  it('saves and loads round-trip', () => {
    saveGameState(sample);
    expect(loadGameState()).toEqual(sample);
  });

  it('returns null and clears on corrupt data', () => {
    localStorage.setItem('chess.gameState.v1', '{not json');
    expect(loadGameState()).toBeNull();
    expect(localStorage.getItem('chess.gameState.v1')).toBeNull();
  });

  it('clears state', () => {
    saveGameState(sample);
    clearGameState();
    expect(loadGameState()).toBeNull();
  });
});
