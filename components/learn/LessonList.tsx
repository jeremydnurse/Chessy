'use client';

import type { Lesson, LearnProgress } from '@/lib/learn/types';

interface LessonListProps {
  lessons: Lesson[];
  progress: LearnProgress;
  onSelect: (lessonId: string) => void;
  onBack: () => void;
  title: string;
}

function groupLabel(lesson: Lesson): string {
  if (lesson.kind === 'opening') return lesson.category;
  if (lesson.kind === 'middlegame') return lesson.subcategory === 'strategic' ? 'Strategic Concepts' : 'Tactical Patterns';
  return lesson.category;
}

export function LessonList({ lessons, progress, onSelect, onBack, title }: LessonListProps) {
  // Group lessons by their sub-category
  const groups = new Map<string, Lesson[]>();
  for (const lesson of lessons) {
    const label = groupLabel(lesson);
    const list = groups.get(label) ?? [];
    list.push(lesson);
    groups.set(label, list);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50"
        >
          Back
        </button>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      {Array.from(groups.entries()).map(([group, items]) => (
        <div key={group}>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">{group}</h3>
          <div className="space-y-1">
            {items.map((lesson) => {
              const done = progress[lesson.id]?.completed;
              return (
                <button
                  key={lesson.id}
                  onClick={() => onSelect(lesson.id)}
                  className="w-full text-left px-4 py-3 border rounded bg-white hover:border-blue-400 hover:shadow-sm transition-all flex items-center gap-3"
                >
                  <span className={`text-lg ${done ? 'text-green-500' : 'text-gray-300'}`}>
                    {done ? '\u2713' : '\u25CB'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">{lesson.name}</span>
                    {lesson.kind === 'opening' && (
                      <span className="ml-2 text-xs text-gray-400">{lesson.eco}</span>
                    )}
                  </div>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {lesson.difficulty}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
