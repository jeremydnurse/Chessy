# Chess vs Claude

Browser chess game. You play against Stockfish (labeled "Claude" in the UI). Drop, paste, or upload a screenshot of any board and the game loads that position via Claude vision.

## Features

- Standard chess rules via [chess.js](https://github.com/jhlywa/chess.js)
- Drag-drop board with [react-chessboard](https://github.com/Clariity/react-chessboard) v5
- Stockfish engine in a Web Worker, difficulty slider 1–20 (default 8)
- Screenshot recognition via Anthropic Claude Sonnet 4.6 (single serverless route)
- Position editor with raw-FEN paste-in for correcting recognition errors
- Move history, undo, flip board, resign, new game
- localStorage persistence

## Local development

```bash
npm install
cp .env.local.example .env.local
# edit .env.local and set ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000.

## Tests

```bash
npm test          # one-shot (Vitest)
npm run test:watch
npm run lint
npm run build
```

## How to play

- Drag a piece to make a move; legal moves are validated by chess.js, illegal ones snap back. Pawns auto-promote to queen.
- Use the **Upload screenshot** button, **Paste** button, drag-drop anywhere, or Cmd/Ctrl+V to load a position from any image.
- After recognition, you land in **Edit mode** — confirm the position (or correct it via the raw FEN field), pick whose turn it is, your color, and difficulty, then click **Start game**.
- The board mirrors to localStorage on every move. Reload restores exactly.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it on [vercel.com/new](https://vercel.com/new).
3. In **Settings → Environment Variables**, set `ANTHROPIC_API_KEY` for Production (and Preview if you want preview deploys to support recognition).
4. Trigger a deploy. Vercel auto-detects Next.js. The `postinstall` script copies the Stockfish worker into `public/`.

The only server-rendered route is `/api/recognize`. Everything else is static.

## Architecture

- Design spec: [docs/superpowers/specs/2026-04-26-chess-game-design.md](docs/superpowers/specs/2026-04-26-chess-game-design.md)
- Implementation plan: [docs/superpowers/plans/2026-04-26-chess-game.md](docs/superpowers/plans/2026-04-26-chess-game.md)

```
app/
├── layout.tsx, page.tsx            # client orchestrator
└── api/recognize/route.ts          # Claude vision endpoint (server)
components/
├── Board.tsx, ControlPanel.tsx, MoveHistory.tsx
├── UploadZone.tsx, EditMode.tsx, GameOverModal.tsx
lib/
├── game.ts        # chess.js wrapper (authoritative state)
├── engine.ts      # Stockfish Web Worker wrapper + difficulty mapping
├── persistence.ts # localStorage save/load/clear
├── fen.ts         # FEN validation + completion
└── image.ts       # base64 + canvas resize for uploads
public/stockfish/  # vendored worker (lite-single variant, ~7MB)
```

## Limitations (v1)

- Castling rights are inferred conservatively from imported positions (defaults to "all rights"), so Stockfish may attempt castling that wouldn't be legal in the original game.
- En-passant target isn't reconstructed from screenshots.
- No clocks, no online multiplayer, no PGN export. These are deferred.
