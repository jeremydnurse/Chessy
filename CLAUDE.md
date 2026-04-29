# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Chessy — a browser chess game where you play against Stockfish (labeled "Claude" in the UI). Upload/paste/drop a screenshot of any board and Claude vision (Sonnet 4.6) reads the position. Everything except screenshot recognition runs client-side.

## Commands

```bash
npm run dev          # Start Next.js dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint (next/core-web-vitals + typescript)
npm test             # Vitest one-shot
npm run test:watch   # Vitest watch mode
npx vitest run tests/lib/game.test.ts          # Run a single test file
npx vitest run -t "should detect checkmate"    # Run a single test by name
npx tsc --noEmit     # Type check without emitting
```

The `postinstall` script copies the Stockfish WASM worker from `node_modules/stockfish` into `public/stockfish/`. If the worker is missing after install, re-run `npm run postinstall`.

## Environment

Copy `.env.local.example` to `.env.local` and set `ANTHROPIC_API_KEY`. This key is only used server-side by the `/api/recognize` route.

## Architecture

**Client-side (single page app):**
- `app/page.tsx` — top-level orchestrator. All game state lives here via refs and useState. Three modes: `play`, `edit`, `recognizing`.
- `lib/game.ts` — authoritative game state. Thin wrapper around chess.js. Nothing else mutates the board.
- `lib/engine.ts` — Stockfish Web Worker wrapper. Not safe for parallel `bestMove()` calls (one at a time). Difficulty slider 1-20 maps to Stockfish Skill Level 0-19 + variable movetime via `mapSliderToEngine()`.
- `lib/persistence.ts` — localStorage save/load under key `chess.gameState.v1`.
- `lib/fen.ts` — FEN validation, castling rights derivation from piece placement, completion of partial FEN strings.
- `lib/image.ts` — canvas-based resize to max 1024px long edge, JPEG base64 encode.

**Server-side (single route):**
- `app/api/recognize/route.ts` — POST `{imageBase64}` → `{fen, sideToMove, confidence, notes}`. Uses Anthropic SDK with `claude-sonnet-4-6`, tool_choice forced to `report_position`. Validates FEN placement server-side; returns low-confidence result (not 422) for positions that are illegal but parseable, so the editor can handle correction.

**Auth:**
- Magic-link email auth via `jose` (JWT) and `resend` (email delivery). Allowlist in `lib/auth.ts`. Middleware at `middleware.ts` bounces unauthenticated requests to `/auth`. Auth routes (`/api/auth/send-link`, `/api/auth/verify`) and static assets are excluded from the middleware matcher.

**Components:** `Board`, `ControlPanel`, `EditMode`, `GameOverModal`, `MoveHistory`, `SavedPositions`, `UploadZone` — all in `components/`. All are client components.

## Key patterns

- Game state flows one direction: `page.tsx` → `Game` class (ref) → render. The `force` counter triggers re-renders after mutations.
- Engine moves are triggered by a `useEffect` watching `[mode, humanColor, difficulty, gameFen]`. When it's not the human's turn, it calls `engine.bestMove()`.
- Undo removes two plies (human + engine) so the human is always on move after undo.
- The recognize route uses Anthropic tool_use (not raw JSON) to get structured output. The system prompt handles board orientation detection from file/rank labels.
- Castling rights are derived from piece positions (`deriveCastlingRights`), not hardcoded to "KQkq".

## Testing

Vitest with jsdom environment. Tests live in `tests/` mirroring the source structure. Setup file at `tests/setup.ts` patches `globalThis.localStorage` for Node 25 compatibility (Node's native stub lacks the full Web Storage API; the setup redirects to jsdom's implementation).

## Next.js version note

This uses Next.js 16 which has breaking changes from earlier versions. Per AGENTS.md: read the relevant guide in `node_modules/next/dist/docs/` before writing any code that touches Next.js APIs.

## Design docs

- Spec: `docs/superpowers/specs/2026-04-26-chess-game-design.md`
- Plan: `docs/superpowers/plans/2026-04-26-chess-game.md`

## Known limitations (v1)

- En-passant target not reconstructed from screenshots
- No clocks, multiplayer, PGN export, eval bar, or move sounds
- Auth allowlist is hardcoded in `lib/auth.ts`
