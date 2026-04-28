const KEY = 'chess.savedPositions.v1';

export interface SavedPosition {
  id: string;
  name: string;
  fen: string;
  savedAt: number;
}

function isSavedPosition(x: unknown): x is SavedPosition {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.name === 'string' &&
    typeof o.fen === 'string' &&
    typeof o.savedAt === 'number'
  );
}

function read(): SavedPosition[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.removeItem(KEY);
      return [];
    }
    return parsed.filter(isSavedPosition);
  } catch {
    localStorage.removeItem(KEY);
    return [];
  }
}

function write(list: SavedPosition[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // quota exceeded or no storage; ignore
  }
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function listSavedPositions(): SavedPosition[] {
  return read().sort((a, b) => b.savedAt - a.savedAt);
}

export function addSavedPosition(name: string, fen: string): SavedPosition[] {
  const trimmed = name.trim();
  if (!trimmed) return listSavedPositions();
  const entry: SavedPosition = { id: makeId(), name: trimmed, fen, savedAt: Date.now() };
  const list = [...read(), entry];
  write(list);
  return list.sort((a, b) => b.savedAt - a.savedAt);
}

export function deleteSavedPosition(id: string): SavedPosition[] {
  const list = read().filter((p) => p.id !== id);
  write(list);
  return list.sort((a, b) => b.savedAt - a.savedAt);
}
