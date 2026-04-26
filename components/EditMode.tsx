'use client';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { completeFen, isValidFen, isValidPlacement } from '@/lib/fen';

const STARTING_PLACEMENT = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

export interface RecognizedPosition {
  fen: string; // placement only
  sideToMove: 'w' | 'b';
  confidence: number;
  notes: string;
}

export interface StartConfig {
  fen: string; // full FEN
  humanColor: 'w' | 'b';
  difficulty: number;
}

export function EditMode({
  recognized,
  onStart,
  onCancel,
}: {
  recognized: RecognizedPosition;
  onStart: (cfg: StartConfig) => void;
  onCancel: () => void;
}) {
  const [placement, setPlacement] = useState(recognized.fen);
  const [sideToMove, setSideToMove] = useState<'w' | 'b'>(recognized.sideToMove);
  const [humanColor, setHumanColor] = useState<'w' | 'b'>('w');
  const [difficulty, setDifficulty] = useState(8);

  const fullFen = isValidPlacement(placement) ? completeFen(placement, sideToMove) : null;
  const fenValid = fullFen !== null && isValidFen(fullFen);

  const banner =
    recognized.confidence === 0
      ? { color: 'bg-red-100 text-red-800', text: `Couldn't read the board. ${recognized.notes}` }
      : recognized.confidence < 0.8
      ? { color: 'bg-yellow-100 text-yellow-800', text: `Please double-check the position. ${recognized.notes}` }
      : { color: 'bg-green-100 text-green-800', text: 'Position recognized.' };

  return (
    <div className="flex flex-col gap-4">
      <div className={`p-3 rounded ${banner.color}`}>{banner.text}</div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
        <div>
          <Chessboard
            options={{
              position: fenValid ? fullFen! : completeFen(STARTING_PLACEMENT, 'w'),
              allowDragging: false,
              boardOrientation: humanColor === 'w' ? 'white' : 'black',
            }}
          />
        </div>

        <div className="flex flex-col gap-3 p-4 border rounded bg-white min-w-[260px]">
          <label className="flex flex-col gap-1">
            <span>Raw FEN (placement only)</span>
            <input
              aria-label="Raw FEN"
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
              className="border px-2 py-1 font-mono text-xs"
            />
          </label>

          <fieldset>
            <legend className="font-medium">Whose turn</legend>
            <label className="mr-4">
              <input type="radio" name="stm" checked={sideToMove === 'w'} onChange={() => setSideToMove('w')} /> White
            </label>
            <label>
              <input type="radio" name="stm" checked={sideToMove === 'b'} onChange={() => setSideToMove('b')} /> Black
            </label>
          </fieldset>

          <fieldset>
            <legend className="font-medium">You play</legend>
            <label className="mr-4">
              <input type="radio" name="color" checked={humanColor === 'w'} onChange={() => setHumanColor('w')} aria-label="Play as White" /> White
            </label>
            <label>
              <input type="radio" name="color" checked={humanColor === 'b'} onChange={() => setHumanColor('b')} aria-label="Play as Black" /> Black
            </label>
          </fieldset>

          <label className="flex flex-col gap-1">
            <span>Difficulty: {difficulty}</span>
            <input
              type="range"
              min={1}
              max={20}
              value={difficulty}
              aria-label="Difficulty"
              onChange={(e) => setDifficulty(Number(e.target.value))}
            />
          </label>

          <div className="flex gap-2">
            <button
              onClick={() => setPlacement(STARTING_PLACEMENT)}
              className="px-3 py-1 border rounded"
            >
              Reset to start
            </button>
            <button
              disabled={!fenValid}
              onClick={() => onStart({ fen: fullFen!, humanColor, difficulty })}
              className="px-3 py-1 border rounded bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start game
            </button>
            <button onClick={onCancel} className="px-3 py-1 border rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
