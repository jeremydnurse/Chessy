'use client';

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
        <LessonControls
          currentStep={currentStep}
          totalSteps={totalSteps}
          isComplete={isComplete}
          onReset={reset}
          onBack={onBack}
          onPrevStep={() => goToStep(Math.max(0, currentStep - 1))}
          onNextStep={() => goToStep(currentStep + 1)}
        />
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
