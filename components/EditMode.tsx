'use client';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import type { PieceDropHandlerArgs } from 'react-chessboard';
import { completeFen, isValidFen, isValidPlacement } from '@/lib/fen';

const STARTING_PLACEMENT = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
const EMPTY_PLACEMENT = '8/8/8/8/8/8/8/8';

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

function placementToBoard(placement: string): string[][] {
  return placement.split('/').map((rank) => {
    const row: string[] = [];
    for (const ch of rank) {
      if (/[1-8]/.test(ch)) {
        for (let i = 0; i < Number(ch); i++) row.push('');
      } else {
        row.push(ch);
      }
    }
    while (row.length < 8) row.push('');
    return row.slice(0, 8);
  });
}

function boardToPlacement(board: string[][]): string {
  return board
    .map((rank) => {
      let s = '';
      let empty = 0;
      for (const cell of rank) {
        if (cell === '') {
          empty++;
        } else {
          if (empty) {
            s += empty;
            empty = 0;
          }
          s += cell;
        }
      }
      if (empty) s += empty;
      return s;
    })
    .join('/');
}

function squareToIndex(sq: string): [file: number, rank: number] {
  const file = sq.charCodeAt(0) - 97; // a=0..h=7
  const rank = 8 - Number(sq[1]);     // rank 8 → row 0, rank 1 → row 7
  return [file, rank];
}

function pieceTypeToFen(pieceType: string): string {
  // 'wP' → 'P', 'bQ' → 'q'
  const color = pieceType[0];
  const letter = pieceType[1];
  return color === 'w' ? letter.toUpperCase() : letter.toLowerCase();
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

  function handleEditDrop({ piece, sourceSquare, targetSquare }: PieceDropHandlerArgs): boolean {
    if (!isValidPlacement(placement)) return false;
    const board = placementToBoard(placement);
    const [sFile, sRank] = squareToIndex(sourceSquare);
    board[sRank][sFile] = '';
    if (targetSquare) {
      const [tFile, tRank] = squareToIndex(targetSquare);
      board[tRank][tFile] = pieceTypeToFen(piece.pieceType);
    }
    setPlacement(boardToPlacement(board));
    return true;
  }

  function setPieceOnSquare(square: string, fenChar: string) {
    if (!isValidPlacement(placement)) return;
    const board = placementToBoard(placement);
    const [file, rank] = squareToIndex(square);
    board[rank][file] = fenChar;
    setPlacement(boardToPlacement(board));
  }

  const [paletteSelection, setPaletteSelection] = useState<string | null>(null);

  function onSquareClick(square: string) {
    if (paletteSelection === null) return;
    setPieceOnSquare(square, paletteSelection);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className={`p-3 rounded ${banner.color}`}>{banner.text}</div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
        <div className="flex flex-col gap-2">
          <div className="max-w-[60vh] mx-auto w-full">
            <Chessboard
              options={{
                position: fenValid ? fullFen! : completeFen(STARTING_PLACEMENT, 'w'),
                allowDragging: true,
                allowDragOffBoard: true,
                boardOrientation: humanColor === 'w' ? 'white' : 'black',
                boardStyle: { aspectRatio: '1 / 1', width: '100%', height: 'auto' },
                onPieceDrop: handleEditDrop,
                onSquareClick: ({ square }) => onSquareClick(square),
              }}
            />
          </div>
          <PalettePicker selected={paletteSelection} onSelect={setPaletteSelection} />
          <p className="text-xs text-gray-500 text-center">
            Drag pieces to move or off-board to remove. Click a palette piece, then click a square to place it. Click again to clear.
          </p>
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

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPlacement(STARTING_PLACEMENT)}
              className="px-3 py-1 border rounded"
            >
              Start position
            </button>
            <button
              onClick={() => setPlacement(EMPTY_PLACEMENT)}
              className="px-3 py-1 border rounded"
            >
              Clear board
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

const PALETTE: { label: string; fen: string }[] = [
  { label: '♙', fen: 'P' }, { label: '♘', fen: 'N' }, { label: '♗', fen: 'B' },
  { label: '♖', fen: 'R' }, { label: '♕', fen: 'Q' }, { label: '♔', fen: 'K' },
  { label: '♟', fen: 'p' }, { label: '♞', fen: 'n' }, { label: '♝', fen: 'b' },
  { label: '♜', fen: 'r' }, { label: '♛', fen: 'q' }, { label: '♚', fen: 'k' },
];

function PalettePicker({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (fenChar: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-1 p-2 border rounded bg-white">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`px-2 py-1 text-xs rounded ${selected === null ? 'bg-blue-600 text-white' : 'border'}`}
      >
        Erase
      </button>
      {PALETTE.map((p) => (
        <button
          key={p.fen}
          type="button"
          onClick={() => onSelect(p.fen)}
          className={`w-8 h-8 text-2xl leading-none rounded ${selected === p.fen ? 'bg-blue-600 text-white' : 'border bg-gray-50'}`}
          title={`Place ${p.fen}`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
