import { useState, useRef, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import type { Lesson, LessonStep } from './types';
import { saveStepProgress, markComplete } from './progress';

export type LessonFeedback =
  | { kind: 'correct'; explanation: string }
  | { kind: 'incorrect'; expected: string; explanation: string };

export interface UseLessonReturn {
  fen: string;
  orientation: 'white' | 'black';
  currentStep: number;
  totalSteps: number;
  isComplete: boolean;
  currentExplanation: string | null;
  feedback: LessonFeedback | null;
  isUserTurn: boolean;
  onMove: (from: string, to: string, promotion?: string) => boolean;
  reset: () => void;
  goToStep: (n: number) => void;
}

function startingFen(lesson: Lesson): string {
  if (lesson.kind === 'opening') {
    return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  }
  return lesson.startingFen;
}

export function useLesson(lesson: Lesson): UseLessonReturn {
  const chessRef = useRef(new Chess(startingFen(lesson)));
  const [currentStep, setCurrentStep] = useState(-1);
  const [fen, setFen] = useState(startingFen(lesson));
  const [feedback, setFeedback] = useState<LessonFeedback | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const autoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const steps: LessonStep[] = lesson.mainLine;
  const totalSteps = steps.length;
  const orientation: 'white' | 'black' = lesson.userColor === 'w' ? 'white' : 'black';

  // Is it the user's turn to move?
  const nextStep = currentStep + 1;
  const isUserTurn = nextStep < totalSteps && steps[nextStep].playedBy === 'user';

  // The explanation shown is from the most recently played step
  const currentExplanation = currentStep >= 0 && currentStep < totalSteps
    ? steps[currentStep].explanation
    : null;

  // Play an auto move after a delay
  const playAutoMove = useCallback((stepIndex: number) => {
    const step = steps[stepIndex];
    if (!step || step.playedBy !== 'auto') return;

    autoPlayTimer.current = setTimeout(() => {
      const chess = chessRef.current;
      try {
        chess.move(step.moveSan);
      } catch {
        // If the move fails, the data is wrong — skip it
        return;
      }
      setFen(chess.fen());
      setCurrentStep(stepIndex);
      setFeedback({ kind: 'correct', explanation: step.explanation });
      saveStepProgress(lesson.id, stepIndex);

      if (stepIndex + 1 >= totalSteps) {
        setIsComplete(true);
        markComplete(lesson.id, totalSteps);
      }
    }, 400);
  }, [lesson.id, steps, totalSteps]);

  // After step changes, check if next move is auto
  useEffect(() => {
    if (isComplete) return;
    const next = currentStep + 1;
    if (next < totalSteps && steps[next].playedBy === 'auto') {
      playAutoMove(next);
    }
    return () => {
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    };
  }, [currentStep, isComplete, totalSteps, steps, playAutoMove]);

  // On mount, if the very first move is auto, play it
  useEffect(() => {
    if (currentStep === -1 && totalSteps > 0 && steps[0].playedBy === 'auto') {
      playAutoMove(0);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onMove(from: string, to: string, promotion?: string): boolean {
    if (isComplete) return false;

    const next = currentStep + 1;
    if (next >= totalSteps) return false;

    const step = steps[next];
    if (step.playedBy !== 'user') return false;

    // Convert {from, to} to SAN by attempting the move on a scratch instance
    const scratch = new Chess(chessRef.current.fen());
    let san: string;
    try {
      const result = scratch.move({ from, to, promotion });
      san = result.san;
    } catch {
      return false; // illegal move
    }

    if (san === step.moveSan) {
      // Correct move
      chessRef.current.move(step.moveSan);
      setFen(chessRef.current.fen());
      setCurrentStep(next);
      setFeedback({ kind: 'correct', explanation: step.explanation });
      saveStepProgress(lesson.id, next);

      if (next + 1 >= totalSteps) {
        setIsComplete(true);
        markComplete(lesson.id, totalSteps);
      }
      return true;
    }

    // Wrong move
    setFeedback({
      kind: 'incorrect',
      expected: step.moveSan,
      explanation: step.explanation,
    });
    return false;
  }

  function reset() {
    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    const fen0 = startingFen(lesson);
    chessRef.current = new Chess(fen0);
    setCurrentStep(-1);
    setFen(fen0);
    setFeedback(null);
    setIsComplete(false);
  }

  function goToStep(n: number) {
    if (n < 0 || n >= totalSteps) return;
    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);

    // Replay from the start up to step n
    const fen0 = startingFen(lesson);
    const chess = new Chess(fen0);
    for (let i = 0; i <= n; i++) {
      try {
        chess.move(steps[i].moveSan);
      } catch {
        // If replay fails partway, stop here
        chessRef.current = chess;
        setCurrentStep(i - 1);
        setFen(chess.fen());
        setFeedback(null);
        setIsComplete(false);
        return;
      }
    }
    chessRef.current = chess;
    setCurrentStep(n);
    setFen(chess.fen());
    setFeedback({ kind: 'correct', explanation: steps[n].explanation });
    setIsComplete(n + 1 >= totalSteps);
  }

  return {
    fen,
    orientation,
    currentStep,
    totalSteps,
    isComplete,
    currentExplanation,
    feedback,
    isUserTurn,
    onMove,
    reset,
    goToStep,
  };
}
