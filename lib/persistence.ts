const KEY = 'chess.gameState.v1';

export interface GameState {
  fen: string;
  humanColor: 'w' | 'b';
  difficulty: number;
  resigned: boolean;
}

function isGameState(x: unknown): x is GameState {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.fen === 'string' &&
    (o.humanColor === 'w' || o.humanColor === 'b') &&
    typeof o.difficulty === 'number' &&
    typeof o.resigned === 'boolean'
  );
}

export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // quota exceeded or no storage; ignore
  }
}

export function loadGameState(): GameState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isGameState(parsed)) {
      localStorage.removeItem(KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(KEY);
    return null;
  }
}

export function clearGameState(): void {
  localStorage.removeItem(KEY);
}
