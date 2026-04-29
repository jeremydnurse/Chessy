'use client';

import { useState } from 'react';
import type { Lesson } from '@/lib/learn/types';
import { useLesson } from '@/lib/learn/useLesson';
import { Board } from '@/components/Board';
import { ExplanationPanel } from './ExplanationPanel';
import { LessonControls } from './LessonControls';
import { MoveIndicator } from './MoveIndicator';

interface LessonPlayerProps {
  lesson: Lesson;
  onBack: () => void;
}

export function LessonPlayer({ lesson, onBack }: LessonPlayerProps) {
  const {
    fen,
    orientation,
    currentStep,
    totalSteps,
    isComplete,
    feedback,
    isUserTurn,
    onMove,
    reset,
    goToStep,
  } = useLesson(lesson);

  const [showMoves, setShowMoves] = useState(false);

  // The next step the user needs to play (skip auto steps)
  const nextUserStep = (() => {
    const next = currentStep + 1;
    if (next >= totalSteps) return null;
    const step = lesson.mainLine[next];
    if (step.playedBy !== 'user') return null;
    return step;
  })();

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4">
      <div className="space-y-3">
        <div className="aspect-square max-w-[80vh] mx-auto w-full">
          <Board
            fen={fen}
            orientation={orientation}
            onMove={onMove}
            arePiecesDraggable={isUserTurn && !isComplete}
          />
        </div>
        <MoveIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          isComplete={isComplete}
          isUserTurn={isUserTurn}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <LessonControls
            currentStep={currentStep}
            totalSteps={totalSteps}
            isComplete={isComplete}
            onReset={reset}
            onBack={onBack}
            onPrevStep={() => goToStep(Math.max(0, currentStep - 1))}
            onNextStep={() => goToStep(currentStep + 1)}
          />
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showMoves}
              onChange={(e) => setShowMoves(e.target.checked)}
              className="rounded"
            />
            Show moves
          </label>
        </div>

        {showMoves && isUserTurn && nextUserStep && !isComplete && (
          <div className="p-3 rounded bg-blue-50 border border-blue-200 text-sm">
            <p className="font-medium text-blue-900">
              Next move: <span className="font-mono">{nextUserStep.moveSan}</span>
            </p>
            <p className="mt-1 text-blue-800">{nextUserStep.explanation}</p>
          </div>
        )}

        <div className="border rounded bg-white p-4 overflow-y-auto max-h-[60vh]">
          <ExplanationPanel
            lesson={lesson}
            feedback={feedback}
            isComplete={isComplete}
          />
        </div>
      </div>
    </div>
  );
}
