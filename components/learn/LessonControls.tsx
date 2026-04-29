'use client';

interface LessonControlsProps {
  currentStep: number;
  totalSteps: number;
  isComplete: boolean;
  onReset: () => void;
  onBack: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export function LessonControls({
  currentStep,
  totalSteps,
  isComplete,
  onReset,
  onBack,
  onPrevStep,
  onNextStep,
}: LessonControlsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onBack}
        className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50"
      >
        Back to lessons
      </button>
      <button
        onClick={onReset}
        className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50"
      >
        Restart
      </button>
      <button
        onClick={onPrevStep}
        disabled={currentStep < 0}
        className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50 disabled:opacity-40"
      >
        Prev
      </button>
      <button
        onClick={onNextStep}
        disabled={currentStep + 1 >= totalSteps || isComplete}
        className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50 disabled:opacity-40"
      >
        Skip
      </button>
    </div>
  );
}
