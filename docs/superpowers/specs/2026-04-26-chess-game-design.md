# Chess Game — Design Spec

**Date:** 2026-04-26
**Status:** Approved (pending user review of this document)

## Goal

A simple, robust, interactive chess game playable in the browser, with two
distinguishing features:

1. Upload (or paste, or drop) a screenshot of any chess board and the game
   loads that position.
2. Choose which color you play, whose turn it is, and the engine's strength,
   then play against Stockfish.

Throughout the UI the AI opponent is labeled "Claude" for personality, but the
underlying engine is Stockfish.

## Non-goals (v1)

- Online multiplayer
- Time controls / clocks
- PGN export/import
- Multiple concurrent games
- Eval bar, move sounds, captured-piece display (deferred to v2)

## Stack

- **Next.js 14+ (App Router)**, TypeScript, Tailwind CSS
- **chess.js** — game state, move legality, FEN, end-of-game detection
- **react-chessboard** — board rendering, drag-and-drop, promotion picker
- **stockfish.wasm** — engine, run in a Web Worker
- **@anthropic-ai/sdk** — used only inside one serverless route for vision
- **Vercel** — deployment target. API key lives in `ANTHROPIC_API_KEY` env var.

## Architecture

```
┌──────────────────── Browser (Next.js client) ────────────────────┐
│                                                                  │
│  React UI ── chess.js (game state) ── react-chessboard           │
│       │                                                          │
│       └──── Web Worker ── stockfish.wasm                         │
│                                                                  │
│  Image upload / paste / drop ──► /api/recognize                  │
│                                                                  │
└──────────────────────────────┬───────────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                │  Vercel Serverless Function │
                │  /api/recognize             │
                │  → Anthropic SDK (vision)   │
                │  → validate FEN (chess.js)  │
                └─────────────────────────────┘
```

Everything except screenshot recognition is client-side. The page is fully
playable offline once loaded.

### Module boundaries

| Unit                       | Responsibility                                      |
|----------------------------|-----------------------------------------------------|
| `lib/game.ts`              | Wraps chess.js. Authoritative game state.           |
| `lib/engine.ts`            | Web Worker wrapper around stockfish.wasm.           |
| `lib/persistence.ts`       | Read/write game state to `localStorage`.            |
| `app/api/recognize/route.ts` | POST image → `{fen, sideToMove, confidence, notes}` |
| `components/Board.tsx`     | Renders `react-chessboard`, handles drag events.    |
| `components/ControlPanel.tsx` | Color/turn/difficulty controls + buttons.        |
| `components/MoveHistory.tsx` | Algebraic-notation sidebar.                       |
| `components/EditMode.tsx`  | Position editor used after screenshot import.       |
| `components/UploadZone.tsx` | File picker, paste button, drag-drop, paste listener. |

Each module has a small, focused interface. The board doesn't talk to the
engine directly — both go through `lib/game.ts`.

## UI Layout

```
┌───────────────────────────────────────────────────────────────┐
│  HEADER                                                       │
│  Chess  ·  [ Upload ]  [ Paste ]  [ New game ]                │
├──────────────────────────────────┬────────────────────────────┤
│                                  │  CONTROL PANEL             │
│                                  │  ──────────────            │
│            CHESSBOARD            │  Your color:  ○ W  ○ B     │
│        (react-chessboard)        │  Whose turn:  ○ W  ○ B     │
│                                  │  Difficulty:  ▬▬●▬▬  (8)   │
│                                  │  [ Flip ]  [ Undo ]        │
│                                  │  [ Resign ]                │
│                                  ├────────────────────────────┤
│                                  │  MOVE HISTORY              │
│                                  │  1. e4   e5                │
│                                  │  2. Nf3  Nc6               │
│                                  │  ...                       │
└──────────────────────────────────┴────────────────────────────┘
```

On narrow screens (< 768px) the control panel and move history stack below
the board.

## User flows

### Flow A — New game from start

1. Open page. Defaults: you are White, your turn, difficulty level 8.
2. Drag a White piece. chess.js validates; if legal the board updates.
3. The engine produces Black's reply within ~1 second.
4. Repeat. End-of-game modal appears on checkmate/stalemate/draw.

### Flow B — Screenshot import

1. User triggers an upload via any of:
   - **"Upload" button** (file picker)
   - **"Paste" button** (`navigator.clipboard.read()` — may prompt for permission)
   - **Drag-and-drop** any image onto the page
   - **Cmd/Ctrl+V** anywhere on the page (page-wide `paste` listener)
2. Client resizes the image (max 1024 px long edge) and base64-encodes as JPEG.
3. POST to `/api/recognize`.
4. Server returns `{fen, sideToMove, confidence, notes}`.
5. Page enters **Edit Mode**:
   - Recognized position renders.
   - Side palette: 12 piece types + "empty square" — drag onto squares.
   - Pieces on the board are draggable (move or remove off-board).
   - Text input for raw FEN paste/edit.
   - Toggles for whose color the user plays, whose turn it is, difficulty.
   - Banner color reflects confidence: green ≥ 0.8, yellow < 0.8, red = 0
     (also surfaces the model's `notes` text).
6. **Start game** locks the board and begins normal play. If it's the engine's
   turn first, it makes its move immediately.

### Game over

When chess.js reports `isCheckmate`/`isStalemate`/`isDraw`, a modal shows the
result with **Play again** (resets to start) and **Edit position** (returns to
Edit Mode pre-loaded with the final position).

## Screenshot recognition

### Endpoint

`POST /api/recognize` — body: `{ imageBase64: string }` — returns:

```json
{
  "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  "sideToMove": "w",
  "confidence": 0.95,
  "notes": ""
}
```

### Prompt strategy

System prompt (Anthropic SDK, `claude-sonnet-4-6`, vision):

> You read chess board screenshots. Output strict JSON matching the schema:
> `{fen: string, sideToMove: "w"|"b", confidence: number 0-1, notes: string}`.
> `fen` is the piece-placement field only (ranks 8 down to 1, separated by `/`).
> Do not include castling rights, en-passant, halfmove, or fullmove fields.
> If you cannot read the board, set `confidence` to 0 and put a brief
> explanation in `notes`. If the side-to-move indicator isn't visible, default
> `sideToMove` to "w".

### Server-side validation

Before returning, the route constructs a full FEN by appending
`<sideToMove> KQkq - 0 1` to the piece-placement string and feeds it to
`new Chess(fullFen)`. If chess.js throws, the route returns HTTP 422 with
the raw model output so the user can paste-edit a corrected FEN manually.

### Imported-position caveats

- Castling rights default to "all rights" — Stockfish may attempt castling
  that wouldn't be legal in the original game. Acceptable for casual play.
- En-passant target is never reconstructed.
- These are documented in a small info-tooltip in Edit Mode.

## Engine integration

### Loading

`stockfish.wasm` initialized on page mount in a Web Worker. UI shows a small
"engine warming up…" indicator for the ~500ms it takes. If it's the engine's
turn before the worker is ready, the move is queued and fires once ready.

### Move generation

Every time it becomes the engine's turn, the worker is sent:
- `position fen <currentFen>`
- `go movetime 1000` (default; tunable per difficulty — see below)

The first `bestmove <uci>` reply is applied via chess.js.

### Difficulty mapping

The slider exposes a single 1–20 control mapped to two underlying parameters:

| Slider | Stockfish `Skill Level` | `movetime` (ms) |
|--------|------------------------|------------------|
| 1      | 0                      | 100              |
| 5      | 3                      | 300              |
| 8      | 8                      | 1000 (default)   |
| 14     | 14                     | 1500             |
| 20     | 20                     | 3000             |

(Linear-ish interpolation between rows.)

### Crash / hang handling

- If no `bestmove` arrives within `movetime + 5s`, terminate the worker and
  re-spawn. Surface a toast: "Engine restarted." Player can resume.
- If the engine returns a UCI move chess.js rejects, log it and pick a random
  legal move as a fallback. (Should never happen, but belt-and-braces.)

## State, persistence, and reset

- Single source of truth: `lib/game.ts` (a class wrapping chess.js plus
  metadata: human color, difficulty, turn-indicator).
- Mirrored to `localStorage` after every move. Reload restores exactly.
- **New game** clears localStorage and resets to the standard starting position
  with default settings.
- **Resign** ends the current game (modal) but keeps settings.

## Robustness summary

| Concern                    | Handling                                            |
|----------------------------|-----------------------------------------------------|
| Illegal user move          | chess.js rejects; piece snaps back                  |
| Promotion                  | react-chessboard built-in picker                    |
| Engine slow to start       | Indicator + queued move                             |
| Engine hang                | 5s timeout, worker re-spawn, toast                  |
| Engine returns illegal UCI | Log + fallback to random legal move                 |
| Recognition error          | HTTP 422, raw output surfaced, manual FEN escape    |
| Low recognition confidence | Yellow banner; user must review in Edit Mode        |
| Network failure on upload  | Toast with retry button                             |
| Page reload mid-game       | localStorage restore                                |
| Threefold / 50-move draw   | chess.js detects, end-of-game modal fires           |
| Mobile / touch             | Tailwind responsive; react-chessboard handles touch |

## Out of scope for v1

- Eval bar, captured pieces, sounds, hint button (v2 — "Loaded" tier)
- PGN export/import
- Time controls
- Multiplayer
- Account / cloud sync (single-device localStorage only)

## Open questions

None blocking. Defaults baked in:
- Default difficulty: 8
- Default human color: White
- Default starting turn: White
- Vision model: `claude-sonnet-4-6`
- Image max long-edge before upload: 1024 px

## Deployment

- Vercel project, single environment (production). Preview deploys per PR.
- Environment variable: `ANTHROPIC_API_KEY` (server-side only).
- No database, no auth, no other services.
