import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLesson } from '@/lib/learn/useLesson';
import type { OpeningLesson, MiddlegameLesson } from '@/lib/learn/types';

beforeEach(() => {
  localStorage.clear();
  vi.useFakeTimers();
});

const italianGame: OpeningLesson = {
  id: 'test-italian',
  kind: 'opening',
  name: 'Italian Game',
  eco: 'C50',
  category: "King's Pawn",
  difficulty: 'beginner',
  description: 'Test opening',
  keyIdeas: [],
  commonMistakes: [],
  userColor: 'w',
  variations: [],
  mainLine: [
    { moveSan: 'e4', explanation: 'Control the center', playedBy: 'user' },
    { moveSan: 'e5', explanation: 'Black mirrors', playedBy: 'auto' },
    { moveSan: 'Nf3', explanation: 'Develop knight, attack e5', playedBy: 'user' },
    { moveSan: 'Nc6', explanation: 'Defend e5', playedBy: 'auto' },
  ],
};

const tacticalLesson: MiddlegameLesson = {
  id: 'test-fork',
  kind: 'middlegame',
  name: 'Knight Fork',
  subcategory: 'tactical',
  difficulty: 'beginner',
  description: 'Test tactical lesson',
  // Position where Nf7 forks king and rook
  startingFen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 4 4',
  userColor: 'w',
  keyPoints: [],
  mainLine: [
    { moveSan: 'Nxf7', explanation: 'Fork the king and rook', playedBy: 'user' },
  ],
};

describe('useLesson', () => {
  describe('initialization', () => {
    it('starts at step -1 with standard FEN for openings', () => {
      const { result } = renderHook(() => useLesson(italianGame));
      expect(result.current.currentStep).toBe(-1);
      expect(result.current.fen).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
      expect(result.current.orientation).toBe('white');
      expect(result.current.isComplete).toBe(false);
      expect(result.current.totalSteps).toBe(4);
    });

    it('uses custom FEN for middlegame lessons', () => {
      const { result } = renderHook(() => useLesson(tacticalLesson));
      expect(result.current.fen).toBe(tacticalLesson.startingFen);
    });
  });

  describe('correct moves', () => {
    it('accepts the correct user move and advances', () => {
      const { result } = renderHook(() => useLesson(italianGame));

      // User plays e4 (e2 to e4)
      let accepted: boolean;
      act(() => {
        accepted = result.current.onMove('e2', 'e4');
      });
      expect(accepted!).toBe(true);
      expect(result.current.currentStep).toBe(0);
      expect(result.current.feedback?.kind).toBe('correct');
    });

    it('auto-plays the opponent move after correct user move', () => {
      const { result } = renderHook(() => useLesson(italianGame));

      // User plays e4
      act(() => {
        result.current.onMove('e2', 'e4');
      });
      expect(result.current.currentStep).toBe(0);

      // Auto-play e5 after 400ms
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current.currentStep).toBe(1);
      expect(result.current.feedback?.kind).toBe('correct');
    });
  });

  describe('incorrect moves', () => {
    it('rejects a wrong move and shows feedback', () => {
      const { result } = renderHook(() => useLesson(italianGame));

      // User plays d4 instead of e4
      let accepted: boolean;
      act(() => {
        accepted = result.current.onMove('d2', 'd4');
      });
      expect(accepted!).toBe(false);
      expect(result.current.currentStep).toBe(-1);
      expect(result.current.feedback?.kind).toBe('incorrect');
      if (result.current.feedback?.kind === 'incorrect') {
        expect(result.current.feedback.expected).toBe('e4');
      }
    });

    it('rejects moves when it is not user turn', () => {
      const { result } = renderHook(() => useLesson(italianGame));

      // Play e4 (correct)
      act(() => {
        result.current.onMove('e2', 'e4');
      });
      // Now it's auto's turn — user move should be rejected
      let accepted: boolean;
      act(() => {
        accepted = result.current.onMove('d2', 'd4');
      });
      expect(accepted!).toBe(false);
    });
  });

  describe('completion', () => {
    it('marks lesson complete after all steps', () => {
      const { result } = renderHook(() => useLesson(italianGame));

      // Step 0: user plays e4
      act(() => { result.current.onMove('e2', 'e4'); });
      // Step 1: auto e5
      act(() => { vi.advanceTimersByTime(500); });
      // Step 2: user plays Nf3
      act(() => { result.current.onMove('g1', 'f3'); });
      // Step 3: auto Nc6
      act(() => { vi.advanceTimersByTime(500); });

      expect(result.current.isComplete).toBe(true);
      expect(result.current.currentStep).toBe(3);
    });

    it('saves progress to localStorage on completion', () => {
      const { result } = renderHook(() => useLesson(tacticalLesson));

      act(() => { result.current.onMove('e5', 'f7'); });

      expect(result.current.isComplete).toBe(true);
      const stored = JSON.parse(localStorage.getItem('chess.learnProgress.v1')!);
      expect(stored['test-fork'].completed).toBe(true);
    });
  });

  describe('reset', () => {
    it('resets to initial state', () => {
      const { result } = renderHook(() => useLesson(italianGame));

      act(() => { result.current.onMove('e2', 'e4'); });
      act(() => { vi.advanceTimersByTime(500); });

      act(() => { result.current.reset(); });

      expect(result.current.currentStep).toBe(-1);
      expect(result.current.fen).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
      expect(result.current.isComplete).toBe(false);
      expect(result.current.feedback).toBeNull();
    });
  });

  describe('goToStep', () => {
    it('replays to a specific step', () => {
      const { result } = renderHook(() => useLesson(italianGame));

      act(() => { result.current.goToStep(1); });

      expect(result.current.currentStep).toBe(1);
      // After e4 e5, the FEN should reflect both moves played
      expect(result.current.fen).toContain('rnbqkbnr'); // pieces still in starting-ish position
      expect(result.current.feedback?.kind).toBe('correct');
    });

    it('ignores out-of-range steps', () => {
      const { result } = renderHook(() => useLesson(italianGame));

      act(() => { result.current.goToStep(99); });
      expect(result.current.currentStep).toBe(-1);

      act(() => { result.current.goToStep(-1); });
      expect(result.current.currentStep).toBe(-1);
    });
  });

  describe('isUserTurn', () => {
    it('is true when next step is user move', () => {
      const { result } = renderHook(() => useLesson(italianGame));
      // Step 0 is user move (e4)
      expect(result.current.isUserTurn).toBe(true);
    });

    it('is false when next step is auto move', () => {
      const { result } = renderHook(() => useLesson(italianGame));
      act(() => { result.current.onMove('e2', 'e4'); });
      // Step 1 is auto move (e5)
      expect(result.current.isUserTurn).toBe(false);
    });
  });
});
