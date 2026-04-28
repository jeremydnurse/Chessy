'use client';

export interface ControlPanelProps {
  humanColor: 'w' | 'b';
  difficulty: number;
  onColorChange: (c: 'w' | 'b') => void;
  onDifficultyChange: (d: number) => void;
  onFlip: () => void;
  onUndo: () => void;
  onResign: () => void;
  onNewGame: () => void;
  onEdit: () => void;
  onSavePosition: () => void;
}

export function ControlPanel(props: ControlPanelProps) {
  const {
    humanColor, difficulty,
    onColorChange, onDifficultyChange,
    onFlip, onUndo, onResign, onNewGame,
    onEdit, onSavePosition,
  } = props;

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-white">
      <fieldset>
        <legend className="font-medium">You play</legend>
        <label className="mr-4">
          <input
            type="radio"
            name="color"
            checked={humanColor === 'w'}
            onChange={() => onColorChange('w')}
            aria-label="Play as White"
          />
          {' '}White
        </label>
        <label>
          <input
            type="radio"
            name="color"
            checked={humanColor === 'b'}
            onChange={() => onColorChange('b')}
            aria-label="Play as Black"
          />
          {' '}Black
        </label>
      </fieldset>

      <label className="flex flex-col gap-1">
        <span className="font-medium">Difficulty: {difficulty}</span>
        <input
          type="range"
          min={1}
          max={20}
          value={difficulty}
          aria-label="Difficulty"
          onChange={(e) => onDifficultyChange(Number(e.target.value))}
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <button onClick={onFlip} className="px-3 py-1 border rounded">Flip</button>
        <button onClick={onUndo} className="px-3 py-1 border rounded">Undo</button>
        <button onClick={onEdit} className="px-3 py-1 border rounded">Edit</button>
        <button onClick={onSavePosition} className="px-3 py-1 border rounded">Save FEN</button>
        <button onClick={onResign} className="px-3 py-1 border rounded">Resign</button>
        <button onClick={onNewGame} className="px-3 py-1 border rounded">New game</button>
      </div>
    </div>
  );
}
