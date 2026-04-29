'use client';

import type { LearnProgress } from '@/lib/learn/types';

type Category = 'openings' | 'middlegame' | 'endgame';

interface CategoryPickerProps {
  counts: Record<Category, { total: number; completed: number }>;
  onSelect: (category: Category) => void;
}

const categories: { key: Category; label: string; description: string }[] = [
  {
    key: 'openings',
    label: 'Openings',
    description: 'Learn the classic opening sequences and understand the strategy behind every move.',
  },
  {
    key: 'middlegame',
    label: 'Middle Game',
    description: 'Master strategic concepts, tactical patterns, and planning techniques.',
  },
  {
    key: 'endgame',
    label: 'Endgame',
    description: 'Practice essential checkmates, pawn endings, rook endings, and key principles.',
  },
];

export function CategoryPicker({ counts, onSelect }: CategoryPickerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {categories.map(({ key, label, description }) => {
        const { total, completed } = counts[key];
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="text-left p-6 border rounded-lg bg-white hover:border-blue-400 hover:shadow transition-all"
          >
            <h3 className="text-lg font-semibold">{label}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
            <div className="mt-4 text-sm text-gray-500">
              {completed} / {total} completed
            </div>
            {total > 0 && (
              <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-green-500 transition-all"
                  style={{ width: `${(completed / total) * 100}%` }}
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function computeCounts(
  lessonIds: { openings: string[]; middlegame: string[]; endgame: string[] },
  progress: LearnProgress,
): Record<Category, { total: number; completed: number }> {
  function count(ids: string[]) {
    return {
      total: ids.length,
      completed: ids.filter((id) => progress[id]?.completed).length,
    };
  }
  return {
    openings: count(lessonIds.openings),
    middlegame: count(lessonIds.middlegame),
    endgame: count(lessonIds.endgame),
  };
}
