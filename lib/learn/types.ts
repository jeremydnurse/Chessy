export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

// --- Lesson steps ---

export interface LessonStep {
  moveSan: string;
  explanation: string;
  playedBy: 'user' | 'auto';
}

// --- Openings ---

export interface OpeningVariation {
  name: string;
  moves: string[];
  description: string;
}

export interface OpeningLesson {
  id: string;
  kind: 'opening';
  name: string;
  eco: string;
  category: string;
  difficulty: Difficulty;
  description: string;
  keyIdeas: string[];
  commonMistakes: string[];
  mainLine: LessonStep[];
  variations: OpeningVariation[];
  userColor: 'w' | 'b';
}

// --- Middle game ---

export type MiddlegameSubcategory = 'strategic' | 'tactical';

export interface MiddlegameLesson {
  id: string;
  kind: 'middlegame';
  name: string;
  subcategory: MiddlegameSubcategory;
  difficulty: Difficulty;
  description: string;
  startingFen: string;
  mainLine: LessonStep[];
  userColor: 'w' | 'b';
  keyPoints: string[];
}

// --- Endgame ---

export interface EndgameLesson {
  id: string;
  kind: 'endgame';
  name: string;
  category: string;
  difficulty: Difficulty;
  description: string;
  startingFen: string;
  mainLine: LessonStep[];
  userColor: 'w' | 'b';
  keyPrinciples: string[];
}

// --- Union ---

export type Lesson = OpeningLesson | MiddlegameLesson | EndgameLesson;

// --- Progress ---

export interface LessonProgress {
  completed: boolean;
  lastStep: number;
  completedAt?: number;
}

export type LearnProgress = Record<string, LessonProgress>;
