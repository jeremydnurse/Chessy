'use client';
import { GameResult } from '@/lib/game';

export function GameOverModal({
  result,
  onPlayAgain,
  onEditPosition,
}: {
  result: GameResult;
  onPlayAgain: () => void;
  onEditPosition: () => void;
}) {
  if (!result.over) return null;
  const title =
    result.kind === 'checkmate' ? `Checkmate — ${result.winner === 'w' ? 'White' : 'Black'} wins` :
    result.kind === 'stalemate' ? 'Stalemate' :
    result.kind === 'threefold' ? 'Draw by threefold repetition' :
    result.kind === 'fiftymove' ? 'Draw by 50-move rule' :
    result.kind === 'insufficient' ? 'Draw — insufficient material' :
    'Draw';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 min-w-[300px]">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex gap-2 justify-end">
          <button onClick={onEditPosition} className="px-3 py-1 border rounded">Edit position</button>
          <button onClick={onPlayAgain} className="px-3 py-1 border rounded bg-blue-600 text-white">Play again</button>
        </div>
      </div>
    </div>
  );
}
