'use client';
import { useEffect, useRef, useState } from 'react';
import { Board } from '@/components/Board';
import { ControlPanel } from '@/components/ControlPanel';
import { MoveHistory } from '@/components/MoveHistory';
import { UploadZone } from '@/components/UploadZone';
import { EditMode, RecognizedPosition, StartConfig } from '@/components/EditMode';
import { GameOverModal } from '@/components/GameOverModal';
import { SavedPositions } from '@/components/SavedPositions';
import { Game, GameResult } from '@/lib/game';
import { Engine, mapSliderToEngine } from '@/lib/engine';
import { saveGameState, loadGameState, clearGameState } from '@/lib/persistence';
import {
  SavedPosition,
  listSavedPositions,
  addSavedPosition,
  deleteSavedPosition,
} from '@/lib/savedPositions';

type Mode = 'play' | 'edit' | 'recognizing';

export default function Home() {
  const gameRef = useRef<Game>(new Game());
  const engineRef = useRef<Engine | null>(null);
  const [, force] = useState(0);
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const [humanColor, setHumanColor] = useState<'w' | 'b'>('w');
  const [difficulty, setDifficulty] = useState(8);
  const [mode, setMode] = useState<Mode>('play');
  const [recognized, setRecognized] = useState<RecognizedPosition | null>(null);
  const [recognizeError, setRecognizeError] = useState<string | null>(null);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | undefined>();
  const [savedPositions, setSavedPositions] = useState<SavedPosition[]>([]);
  const [engineStatus, setEngineStatus] = useState<
    { kind: 'idle' } | { kind: 'thinking' } | { kind: 'error'; message: string }
  >({ kind: 'idle' });

  // Restore from localStorage and spawn engine on mount.
  useEffect(() => {
    const saved = loadGameState();
    if (saved) {
      gameRef.current.load(saved.fen);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHumanColor(saved.humanColor);
       
      setDifficulty(saved.difficulty);
       
      setOrientation(saved.humanColor === 'w' ? 'white' : 'black');
    }
    engineRef.current = new Engine();
    setSavedPositions(listSavedPositions());
    return () => engineRef.current?.dispose();
  }, []);

  function persist(over?: { humanColor?: 'w' | 'b'; difficulty?: number; fen?: string }) {
    saveGameState({
      fen: over?.fen ?? gameRef.current.fen(),
      humanColor: over?.humanColor ?? humanColor,
      difficulty: over?.difficulty ?? difficulty,
      resigned: false,
    });
  }

  function rerender() {
    force((n) => n + 1);
  }

  // Read game state from the ref for rendering. The `force` counter above
  // triggers re-renders whenever game state changes, so these reads are safe.
  // eslint-disable-next-line react-hooks/refs
  const result: GameResult = gameRef.current.result();
  // eslint-disable-next-line react-hooks/refs
  const gameFen = gameRef.current.fen();
  // eslint-disable-next-line react-hooks/refs
  const gameTurn = gameRef.current.turn();
  // eslint-disable-next-line react-hooks/refs
  const gameMoves = gameRef.current.history();

  // Trigger engine when it's the engine's turn.
  useEffect(() => {
    if (mode !== 'play') return;
    if (result.over) return;
    if (gameTurn === humanColor) return;
    const engine = engineRef.current;
    if (!engine) return;

    const { skill, movetimeMs } = mapSliderToEngine(difficulty);
    setEngineStatus({ kind: 'thinking' });
    engine
      .bestMove({ fen: gameFen, skill, movetimeMs })
      .then((uci) => {
        const from = uci.slice(0, 2);
        const to = uci.slice(2, 4);
        const promotion = uci.length > 4 ? uci.slice(4, 5) : undefined;

        const ok = gameRef.current.move({ from, to, promotion });
        if (ok) {
          setLastMove({ from, to });
          persist();
          setEngineStatus({ kind: 'idle' });
          rerender();
        } else {
          setEngineStatus({
            kind: 'error',
            message: `Engine suggested an illegal move: ${uci}`,
          });
        }
      })
      .catch((e) => {
        console.error('Engine error', e);
        setEngineStatus({ kind: 'error', message: String(e?.message ?? e) });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, humanColor, difficulty, gameFen]);

  function onMove(from: string, to: string, promotion?: string): boolean {
    if (mode !== 'play') return false;
    if (result.over) return false;
    if (gameTurn !== humanColor) return false;
     
    const ok = gameRef.current.move({ from, to, promotion });
    if (ok) {
      setLastMove({ from, to });
      persist();
      rerender();
    }
    return ok;
  }

  async function onImage(base64: string) {
    setMode('recognizing');
    setRecognizeError(null);
    try {
      const res = await fetch('/api/recognize', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64 }),
      });
      const data = await res.json();
      if (!res.ok) {
        const detail = typeof data.raw === 'string' ? `: ${data.raw.slice(0, 300)}` : '';
        setRecognizeError(`${data.error ?? 'Recognition failed'}${detail}`);
        setMode('play');
        return;
      }
      setRecognized(data);
      setMode('edit');
    } catch (e) {
      setRecognizeError(String(e));
      setMode('play');
    }
  }

  function onStartFromEdit(cfg: StartConfig) {

    gameRef.current.load(cfg.fen);
    setHumanColor(cfg.humanColor);
    setDifficulty(cfg.difficulty);
    setOrientation(cfg.humanColor === 'w' ? 'white' : 'black');
    setLastMove(undefined);
    setEngineStatus({ kind: 'idle' });
    setMode('play');
    persist({ humanColor: cfg.humanColor, difficulty: cfg.difficulty, fen: cfg.fen });
    rerender();
  }

  function onNewGame() {

    gameRef.current = new Game();
    setLastMove(undefined);
    setEngineStatus({ kind: 'idle' });
    clearGameState();
    setMode('play');
    rerender();
  }

  function onUndo() {
    // Undo two plies so the human is on move again.
     
    gameRef.current.undo();
     
    if (gameRef.current.turn() !== humanColor) gameRef.current.undo();
    setLastMove(undefined);
    persist();
    rerender();
  }

  function onResign() {
    if (confirm('Resign this game?')) onNewGame();
  }

  function onEditCurrent() {
    setRecognized({
      fen: gameFen.split(' ')[0],
      sideToMove: gameTurn,
      confidence: 1,
      notes: '',
    });
    setMode('edit');
  }

  function onSavePosition() {
    const name = prompt('Name this position:');
    if (name === null) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    setSavedPositions(addSavedPosition(trimmed, gameFen));
  }

  function onLoadPosition(p: SavedPosition) {
    gameRef.current.load(p.fen);
    setLastMove(undefined);
    setMode('play');
    persist({ fen: p.fen });
    rerender();
  }

  function onDeletePosition(id: string) {
    setSavedPositions(deleteSavedPosition(id));
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex items-center gap-3 p-3 bg-white">
        <UploadZone onImage={onImage} />
        <button onClick={onNewGame} className="px-3 py-1 border rounded">New game</button>
      </div>

      {recognizeError && (
        <div className="p-3 bg-red-100 text-red-800">{recognizeError}</div>
      )}

      {mode === 'recognizing' && (
        <div className="p-3 bg-blue-50 text-blue-800">Reading the board&hellip;</div>
      )}

      {mode === 'edit' && recognized && (
        <div className="p-4">
          <EditMode
            recognized={recognized}
            onStart={onStartFromEdit}
            onCancel={() => setMode('play')}
          />
        </div>
      )}

      {mode === 'play' && engineStatus.kind === 'error' && (
        <div className="p-3 bg-red-100 text-red-800 text-sm">
          Engine error: {engineStatus.message}
        </div>
      )}
      {mode === 'play' && engineStatus.kind === 'thinking' && (
        <div className="p-2 bg-blue-50 text-blue-800 text-sm text-center">
          Engine thinking…
        </div>
      )}

      {mode === 'play' && (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4 p-4">
          <div className="aspect-square max-w-[80vh] mx-auto w-full">
            <Board
              fen={gameFen}
              orientation={orientation}
              onMove={onMove}
              lastMove={lastMove}
              arePiecesDraggable={!result.over && gameTurn === humanColor}
            />
          </div>
          <div className="flex flex-col gap-4">
            <ControlPanel
              humanColor={humanColor}
              difficulty={difficulty}
              onColorChange={(c) => {
                setHumanColor(c);
                setOrientation(c === 'w' ? 'white' : 'black');
                persist({ humanColor: c });
              }}
              onDifficultyChange={(d) => { setDifficulty(d); persist({ difficulty: d }); }}
              onFlip={() => setOrientation((o) => (o === 'white' ? 'black' : 'white'))}
              onUndo={onUndo}
              onResign={onResign}
              onNewGame={onNewGame}
              onEdit={onEditCurrent}
              onSavePosition={onSavePosition}
            />
            <div className="border rounded bg-white">
              <h2 className="px-4 pt-4 font-medium">Move history</h2>
              <MoveHistory moves={gameMoves} />
            </div>
            <div className="border rounded bg-white">
              <h2 className="px-4 pt-4 font-medium">Saved positions</h2>
              <SavedPositions
                positions={savedPositions}
                onLoad={onLoadPosition}
                onDelete={onDeletePosition}
              />
            </div>
          </div>
        </div>
      )}

      <GameOverModal
        result={result}
        onPlayAgain={onNewGame}
        onEditPosition={onEditCurrent}
        onUndo={onUndo}
      />
    </main>
  );
}
