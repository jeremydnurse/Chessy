'use client';

import { useState } from 'react';
import { openings } from '@/lib/learn/openings';
import { middlegameLessons } from '@/lib/learn/middlegame';
import { endgameLessons } from '@/lib/learn/endgame';
import { loadProgress } from '@/lib/learn/progress';
import type { Lesson, LearnProgress } from '@/lib/learn/types';
import { CategoryPicker, computeCounts } from '@/components/learn/CategoryPicker';
import { LessonList } from '@/components/learn/LessonList';
import { LessonPlayer } from '@/components/learn/LessonPlayer';

type Category = 'openings' | 'middlegame' | 'endgame';

type LearnView =
  | { screen: 'categories' }
  | { screen: 'lessons'; category: Category }
  | { screen: 'player'; lessonId: string };

const allLessons: Lesson[] = [...openings, ...middlegameLessons, ...endgameLessons];

const lessonIds = {
  openings: openings.map((o) => o.id),
  middlegame: middlegameLessons.map((m) => m.id),
  endgame: endgameLessons.map((e) => e.id),
};

const categoryTitles: Record<Category, string> = {
  openings: 'Openings',
  middlegame: 'Middle Game',
  endgame: 'Endgame',
};

function lessonsForCategory(category: Category): Lesson[] {
  if (category === 'openings') return openings;
  if (category === 'middlegame') return middlegameLessons;
  return endgameLessons;
}

export default function LearnPage() {
  const [view, setView] = useState<LearnView>({ screen: 'categories' });
  const [progress, setProgress] = useState<LearnProgress>(() =>
    typeof window !== 'undefined' ? loadProgress() : {},
  );

  function refreshProgress() {
    setProgress(loadProgress());
  }

  function navigateToCategory(category: Category) {
    refreshProgress();
    setView({ screen: 'lessons', category });
  }

  function navigateToLesson(lessonId: string) {
    setView({ screen: 'player', lessonId });
  }

  function navigateBack() {
    refreshProgress();
    if (view.screen === 'player') {
      // Find which category this lesson belongs to
      const lesson = allLessons.find((l) => l.id === view.lessonId);
      if (lesson) {
        const cat: Category = lesson.kind === 'opening' ? 'openings' : lesson.kind === 'middlegame' ? 'middlegame' : 'endgame';
        setView({ screen: 'lessons', category: cat });
      } else {
        setView({ screen: 'categories' });
      }
    } else {
      setView({ screen: 'categories' });
    }
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {view.screen === 'categories' && (
        <>
          <h1 className="text-2xl font-bold mb-6">Learn Chess</h1>
          <CategoryPicker
            counts={computeCounts(lessonIds, progress)}
            onSelect={navigateToCategory}
          />
        </>
      )}

      {view.screen === 'lessons' && (
        <LessonList
          lessons={lessonsForCategory(view.category)}
          progress={progress}
          onSelect={navigateToLesson}
          onBack={navigateBack}
          title={categoryTitles[view.category]}
        />
      )}

      {view.screen === 'player' && (() => {
        const lesson = allLessons.find((l) => l.id === view.lessonId);
        if (!lesson) return <p>Lesson not found.</p>;
        return <LessonPlayer key={lesson.id} lesson={lesson} onBack={navigateBack} />;
      })()}
    </div>
  );
}
