'use client';

interface MoveIndicatorProps {
  currentStep: number;
  totalSteps: number;
  isComplete: boolean;
  isUserTurn: boolean;
}

export function MoveIndicator({
  currentStep,
  totalSteps,
  isComplete,
  isUserTurn,
}: MoveIndicatorProps) {
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>
          {isComplete
            ? 'Lesson complete!'
            : isUserTurn
              ? 'Your turn — make the correct move'
              : 'Waiting for opponent...'}
        </span>
        <span>{Math.min(currentStep + 1, totalSteps)} / {totalSteps}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            isComplete ? 'bg-green-500' : 'bg-blue-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
