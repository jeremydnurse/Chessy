'use client';

import type { Lesson } from '@/lib/learn/types';
import type { LessonFeedback } from '@/lib/learn/useLesson';

interface ExplanationPanelProps {
  lesson: Lesson;
  feedback: LessonFeedback | null;
  isComplete: boolean;
}

export function ExplanationPanel({
  lesson,
  feedback,
  isComplete,
}: ExplanationPanelProps) {
  const extraInfo = lesson.kind === 'opening'
    ? { label: 'Key Ideas', items: lesson.keyIdeas, mistakesLabel: 'Common Mistakes', mistakes: lesson.commonMistakes }
    : lesson.kind === 'middlegame'
      ? { label: 'Key Points', items: lesson.keyPoints, mistakesLabel: null, mistakes: [] }
      : { label: 'Key Principles', items: lesson.keyPrinciples, mistakesLabel: null, mistakes: [] };

  return (
    <div className="space-y-4 text-sm">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">{lesson.name}</h2>
        {lesson.kind === 'opening' && (
          <span className="text-xs text-gray-500">{lesson.eco} &middot; {lesson.category}</span>
        )}
        {lesson.kind === 'middlegame' && (
          <span className="text-xs text-gray-500 capitalize">{lesson.subcategory}</span>
        )}
        {lesson.kind === 'endgame' && (
          <span className="text-xs text-gray-500">{lesson.category}</span>
        )}
        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
          lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
          lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {lesson.difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700">{lesson.description}</p>

      {/* Feedback */}
      {feedback && (
        <div className={`p-3 rounded ${
          feedback.kind === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
        }`}>
          {feedback.kind === 'correct' ? (
            <p className="text-green-800">{feedback.explanation}</p>
          ) : (
            <div className="text-amber-800">
              <p className="font-medium">The correct move is {feedback.expected}</p>
              <p className="mt-1">{feedback.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Completion */}
      {isComplete && (
        <div className="p-3 bg-green-50 border border-green-200 rounded text-green-800 font-medium">
          Lesson complete! You can restart or go back to pick another lesson.
        </div>
      )}

      {/* Key ideas / points / principles */}
      <details open className="group">
        <summary className="font-medium cursor-pointer select-none">{extraInfo.label}</summary>
        <ul className="mt-2 space-y-1 pl-4 list-disc text-gray-600">
          {extraInfo.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </details>

      {/* Common mistakes (openings only) */}
      {extraInfo.mistakesLabel && extraInfo.mistakes.length > 0 && (
        <details className="group">
          <summary className="font-medium cursor-pointer select-none">{extraInfo.mistakesLabel}</summary>
          <ul className="mt-2 space-y-1 pl-4 list-disc text-gray-600">
            {extraInfo.mistakes.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </details>
      )}
    </div>
  );
}
