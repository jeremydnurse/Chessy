import { describe, it, expect, beforeEach } from 'vitest';
import {
  listSavedPositions,
  addSavedPosition,
  deleteSavedPosition,
} from '@/lib/savedPositions';

const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

describe('savedPositions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts empty', () => {
    expect(listSavedPositions()).toEqual([]);
  });

  it('adds a position and returns it', () => {
    const list = addSavedPosition('Opening', FEN);
    expect(list).toHaveLength(1);
    expect(list[0]).toMatchObject({ name: 'Opening', fen: FEN });
    expect(list[0].id).toBeTruthy();
    expect(listSavedPositions()).toHaveLength(1);
  });

  it('persists across reads (simulating session reload)', () => {
    addSavedPosition('Mid', FEN);
    expect(listSavedPositions()).toHaveLength(1);
  });

  it('rejects empty/whitespace names', () => {
    addSavedPosition('   ', FEN);
    expect(listSavedPositions()).toEqual([]);
  });

  it('trims names', () => {
    const list = addSavedPosition('  Endgame  ', FEN);
    expect(list[0].name).toBe('Endgame');
  });

  it('deletes by id', () => {
    const list = addSavedPosition('A', FEN);
    const id = list[0].id;
    const after = deleteSavedPosition(id);
    expect(after).toEqual([]);
    expect(listSavedPositions()).toEqual([]);
  });

  it('returns newest-first', async () => {
    addSavedPosition('First', FEN);
    await new Promise((r) => setTimeout(r, 2));
    addSavedPosition('Second', FEN);
    const list = listSavedPositions();
    expect(list[0].name).toBe('Second');
    expect(list[1].name).toBe('First');
  });

  it('survives corrupt storage', () => {
    localStorage.setItem('chess.savedPositions.v1', '{not json');
    expect(listSavedPositions()).toEqual([]);
    expect(localStorage.getItem('chess.savedPositions.v1')).toBeNull();
  });
});
