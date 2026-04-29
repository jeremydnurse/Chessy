import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadProgress,
  saveStepProgress,
  markComplete,
  resetLessonProgress,
  getLessonProgress,
} from '@/lib/learn/progress';

const KEY = 'chess.learnProgress.v1';

beforeEach(() => {
  localStorage.clear();
});

describe('loadProgress', () => {
  it('returns empty object when nothing stored', () => {
    expect(loadProgress()).toEqual({});
  });

  it('returns parsed progress', () => {
    const data = { 'italian-game': { completed: false, lastStep: 3 } };
    localStorage.setItem(KEY, JSON.stringify(data));
    expect(loadProgress()).toEqual(data);
  });

  it('clears and returns empty on invalid data', () => {
    localStorage.setItem(KEY, 'not json');
    expect(loadProgress()).toEqual({});
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it('clears and returns empty on wrong shape', () => {
    localStorage.setItem(KEY, JSON.stringify({ lesson: { bad: true } }));
    expect(loadProgress()).toEqual({});
    expect(localStorage.getItem(KEY)).toBeNull();
  });
});

describe('saveStepProgress', () => {
  it('creates new entry', () => {
    saveStepProgress('italian-game', 2);
    const result = getLessonProgress('italian-game');
    expect(result).toEqual({ completed: false, lastStep: 2 });
  });

  it('updates step without overwriting completed', () => {
    markComplete('italian-game', 10);
    saveStepProgress('italian-game', 5);
    const result = getLessonProgress('italian-game');
    expect(result?.completed).toBe(true);
    expect(result?.lastStep).toBe(5);
  });
});

describe('markComplete', () => {
  it('marks lesson as completed with timestamp', () => {
    markComplete('ruy-lopez', 8);
    const result = getLessonProgress('ruy-lopez');
    expect(result?.completed).toBe(true);
    expect(result?.lastStep).toBe(7);
    expect(result?.completedAt).toBeGreaterThan(0);
  });
});

describe('resetLessonProgress', () => {
  it('removes lesson progress', () => {
    saveStepProgress('italian-game', 3);
    resetLessonProgress('italian-game');
    expect(getLessonProgress('italian-game')).toBeNull();
  });

  it('does not affect other lessons', () => {
    saveStepProgress('italian-game', 3);
    saveStepProgress('ruy-lopez', 5);
    resetLessonProgress('italian-game');
    expect(getLessonProgress('ruy-lopez')).not.toBeNull();
  });
});

describe('getLessonProgress', () => {
  it('returns null for unknown lesson', () => {
    expect(getLessonProgress('nonexistent')).toBeNull();
  });
});
