'use client';
import { SavedPosition } from '@/lib/savedPositions';

export function SavedPositions({
  positions,
  onLoad,
  onDelete,
}: {
  positions: SavedPosition[];
  onLoad: (p: SavedPosition) => void;
  onDelete: (id: string) => void;
}) {
  if (positions.length === 0) {
    return <div className="p-4 text-sm text-gray-500 italic">No saved positions yet.</div>;
  }
  return (
    <ul className="p-2 text-sm flex flex-col gap-1 max-h-64 overflow-y-auto">
      {positions.map((p) => (
        <li
          key={p.id}
          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50"
        >
          <span className="flex-1 truncate" title={p.fen}>{p.name}</span>
          <button
            onClick={() => onLoad(p)}
            className="px-2 py-0.5 border rounded text-xs"
            aria-label={`Load ${p.name}`}
          >
            Load
          </button>
          <button
            onClick={() => onDelete(p.id)}
            className="px-2 py-0.5 border rounded text-xs text-red-700"
            aria-label={`Delete ${p.name}`}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
