import type { LearnProgress, LessonProgress } from './types';

const KEY = 'chess.learnProgress.v1';

function isLearnProgress(x: unknown): x is LearnProgress {
  if (!x || typeof x !== 'object' || Array.isArray(x)) return false;
  for (const v of Object.values(x as Record<string, unknown>)) {
    if (!v || typeof v !== 'object') return false;
    const p = v as Record<string, unknown>;
    if (typeof p.completed !== 'boolean') return false;
    if (typeof p.lastStep !== 'number') return false;
    if (p.completedAt !== undefined && typeof p.completedAt !== 'number') return false;
  }
  return true;
}

export function loadProgress(): LearnProgress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!isLearnProgress(parsed)) {
      localStorage.removeItem(KEY);
      return {};
    }
    return parsed;
  } catch {
    localStorage.removeItem(KEY);
    return {};
  }
}

function save(progress: LearnProgress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    // quota exceeded; ignore
  }
}

export function saveStepProgress(lessonId: string, step: number): void {
  const progress = loadProgress();
  const existing = progress[lessonId];
  progress[lessonId] = {
    completed: existing?.completed ?? false,
    lastStep: step,
    completedAt: existing?.completedAt,
  };
  save(progress);
}

export function markComplete(lessonId: string, totalSteps: number): void {
  const progress = loadProgress();
  progress[lessonId] = {
    completed: true,
    lastStep: totalSteps - 1,
    completedAt: Date.now(),
  };
  save(progress);
}

export function resetLessonProgress(lessonId: string): void {
  const progress = loadProgress();
  delete progress[lessonId];
  save(progress);
}

export function getLessonProgress(lessonId: string): LessonProgress | null {
  return loadProgress()[lessonId] ?? null;
}
