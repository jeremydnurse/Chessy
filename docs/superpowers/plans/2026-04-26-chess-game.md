# Chess Game Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js chess web app deployed to Vercel where the user plays Stockfish (labeled "Claude" in UI), with the ability to upload/paste/drop a screenshot and have Claude vision read the position into the board.

**Architecture:** Next.js 14 App Router on Vercel. All game logic and the engine run in the browser; one serverless route (`/api/recognize`) calls Claude vision to translate a screenshot into a FEN. State lives in chess.js, mirrored to localStorage. Stockfish runs in a Web Worker.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, chess.js, react-chessboard, stockfish (npm), @anthropic-ai/sdk, Vitest, React Testing Library.

**Reference spec:** `docs/superpowers/specs/2026-04-26-chess-game-design.md`

---

## File Structure

```
Chess/
├── app/
│   ├── layout.tsx              # root layout
│   ├── page.tsx                # main page wires everything together
│   ├── globals.css             # Tailwind imports
│   └── api/
│       └── recognize/
│           └── route.ts        # POST image → {fen, sideToMove, ...}
├── components/
│   ├── Board.tsx               # react-chessboard wrapper
│   ├── ControlPanel.tsx        # color/turn/difficulty + buttons
│   ├── MoveHistory.tsx         # algebraic notation sidebar
│   ├── UploadZone.tsx          # file/paste/drop/Cmd+V input
│   ├── EditMode.tsx            # post-recognition position editor
│   └── GameOverModal.tsx       # checkmate/stalemate/draw modal
├── lib/
│   ├── game.ts                 # chess.js wrapper (authoritative state)
│   ├── engine.ts               # Stockfish Web Worker wrapper
│   ├── persistence.ts          # localStorage save/load/clear
│   └── fen.ts                  # FEN validation + completion helpers
├── tests/
│   ├── lib/{game,persistence,fen}.test.ts
│   ├── api/recognize.test.ts
│   └── components/{UploadZone,EditMode,ControlPanel,MoveHistory}.test.tsx
├── public/
│   └── stockfish/              # stockfish worker assets if needed
├── .env.local.example
├── .gitignore
├── next.config.mjs
├── package.json
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

Each `lib/*` file has one responsibility and pure(-ish) functions where possible. Components only do rendering + local state — game truth always flows through `lib/game.ts`.

---

## Task 1: Initialize Next.js project and core dependencies

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore`, `.env.local.example`, `README.md`

- [ ] **Step 1: Scaffold Next.js**

Working directory is `/Users/jeremynurse/projects/Chess` (already exists, empty).

Run:
```bash
cd /Users/jeremynurse/projects/Chess
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir=false --import-alias="@/*" --no-turbopack --use-npm --yes
```

Expected: Creates `app/`, `package.json`, etc. Answer "yes" to "directory not empty" (the docs/ folder is fine to keep).

If the command prompts interactively, accept all defaults: TypeScript yes, ESLint yes, Tailwind yes, App Router yes, no `src/` directory, import alias `@/*`.

- [ ] **Step 2: Install runtime dependencies**

```bash
npm install chess.js react-chessboard @anthropic-ai/sdk
npm install --save-dev stockfish
```

(`stockfish` ships a worker file we'll load. We install it as devDependency since the worker file gets copied to `public/` by a script — but it can be a regular dependency if your bundler imports it. Use `dependencies` if `--save-dev` causes deploy issues; revisit in Task 8.)

- [ ] **Step 3: Add `.env.local.example`**

Create `.env.local.example`:
```
# Anthropic API key for screenshot recognition.
# Set the same value in Vercel's Environment Variables panel for production.
ANTHROPIC_API_KEY=sk-ant-...
```

- [ ] **Step 4: Update `.gitignore`**

Append to `.gitignore`:
```
.env.local
.env*.local
.vercel
```

(create-next-app already adds `.next`, `node_modules`, etc.)

- [ ] **Step 5: Replace default `app/page.tsx` with a placeholder**

Overwrite `app/page.tsx`:
```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold">Chess — coming online</h1>
    </main>
  );
}
```

- [ ] **Step 6: Verify dev server boots**

Run:
```bash
npm run dev
```
Expected: server starts on http://localhost:3000, page shows "Chess — coming online". Stop with Ctrl+C.

- [ ] **Step 7: Init git and commit**

```bash
cd /Users/jeremynurse/projects/Chess
git init
git add .
git commit -m "chore: scaffold Next.js + Tailwind + core deps"
```

---

## Task 2: Set up Vitest + React Testing Library

**Files:**
- Create: `vitest.config.ts`, `tests/setup.ts`
- Modify: `package.json` (add scripts), `tsconfig.json` (include tests)

- [ ] **Step 1: Install test deps**

```bash
npm install --save-dev vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 2: Create `vitest.config.ts`**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
```

- [ ] **Step 3: Create `tests/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 4: Add scripts to `package.json`**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Add a smoke test**

Create `tests/smoke.test.ts`:
```ts
import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run tests**

```bash
npm test
```
Expected: 1 test passes.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "test: add Vitest + RTL with passing smoke test"
```

---

## Task 3: FEN validation + completion helper (`lib/fen.ts`)

**Files:**
- Create: `lib/fen.ts`, `tests/lib/fen.test.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/lib/fen.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { completeFen, isValidFen, isValidPlacement } from '@/lib/fen';

describe('isValidPlacement', () => {
  it('accepts the starting placement', () => {
    expect(isValidPlacement('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')).toBe(true);
  });
  it('rejects placement with too few ranks', () => {
    expect(isValidPlacement('rnbqkbnr/pppppppp')).toBe(false);
  });
  it('rejects placement with bad piece char', () => {
    expect(isValidPlacement('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBZKBNR')).toBe(false);
  });
});

describe('completeFen', () => {
  it('appends side-to-move and default fields', () => {
    expect(completeFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', 'w'))
      .toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  });
  it('uses b for side-to-move', () => {
    const fen = completeFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', 'b');
    expect(fen.split(' ')[1]).toBe('b');
  });
});

describe('isValidFen', () => {
  it('accepts a valid full FEN', () => {
    expect(isValidFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')).toBe(true);
  });
  it('rejects an illegal position (two black kings)', () => {
    expect(isValidFen('rnbqkbnk/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')).toBe(false);
  });
});
```

- [ ] **Step 2: Run, expect failures**

```bash
npm test -- tests/lib/fen.test.ts
```
Expected: all tests fail with "Cannot find module '@/lib/fen'".

- [ ] **Step 3: Implement `lib/fen.ts`**

Create `lib/fen.ts`:
```ts
import { Chess } from 'chess.js';

const PIECE_RE = /^[prnbqkPRNBQK1-8]+$/;

export function isValidPlacement(placement: string): boolean {
  const ranks = placement.split('/');
  if (ranks.length !== 8) return false;
  for (const rank of ranks) {
    if (!PIECE_RE.test(rank)) return false;
    let count = 0;
    for (const ch of rank) {
      count += /[1-8]/.test(ch) ? Number(ch) : 1;
    }
    if (count !== 8) return false;
  }
  return true;
}

export function completeFen(placement: string, sideToMove: 'w' | 'b'): string {
  return `${placement} ${sideToMove} KQkq - 0 1`;
}

export function isValidFen(fen: string): boolean {
  try {
    new Chess(fen);
    return true;
  } catch {
    return false;
  }
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- tests/lib/fen.test.ts
```
Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/fen.ts tests/lib/fen.test.ts
git commit -m "feat(fen): add validation and completion helpers"
```

---

## Task 4: Game state wrapper (`lib/game.ts`)

**Files:**
- Create: `lib/game.ts`, `tests/lib/game.test.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/lib/game.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { Game } from '@/lib/game';

describe('Game', () => {
  it('starts at the standard position', () => {
    const g = new Game();
    expect(g.turn()).toBe('w');
    expect(g.fen().startsWith('rnbqkbnr/pppppppp')).toBe(true);
    expect(g.history()).toEqual([]);
  });

  it('applies a legal move and returns true', () => {
    const g = new Game();
    expect(g.move({ from: 'e2', to: 'e4' })).toBe(true);
    expect(g.turn()).toBe('b');
    expect(g.history()).toEqual(['e4']);
  });

  it('rejects an illegal move and returns false', () => {
    const g = new Game();
    expect(g.move({ from: 'e2', to: 'e5' })).toBe(false);
    expect(g.history()).toEqual([]);
  });

  it('undoes the last move', () => {
    const g = new Game();
    g.move({ from: 'e2', to: 'e4' });
    g.undo();
    expect(g.history()).toEqual([]);
    expect(g.turn()).toBe('w');
  });

  it('loads a FEN', () => {
    const g = new Game();
    const fen = 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2';
    g.load(fen);
    expect(g.fen()).toBe(fen);
  });

  it('detects checkmate', () => {
    const g = new Game();
    // Fool's mate
    g.move({ from: 'f2', to: 'f3' });
    g.move({ from: 'e7', to: 'e5' });
    g.move({ from: 'g2', to: 'g4' });
    g.move({ from: 'd8', to: 'h4' });
    expect(g.result()).toEqual({ over: true, kind: 'checkmate', winner: 'b' });
  });

  it('reports legal moves from a square', () => {
    const g = new Game();
    expect(new Set(g.legalMovesFrom('e2'))).toEqual(new Set(['e3', 'e4']));
  });
});
```

- [ ] **Step 2: Run, expect failures**

```bash
npm test -- tests/lib/game.test.ts
```
Expected: all fail with "Cannot find module '@/lib/game'".

- [ ] **Step 3: Implement `lib/game.ts`**

Create `lib/game.ts`:
```ts
import { Chess, Move } from 'chess.js';

export type GameResult =
  | { over: false }
  | { over: true; kind: 'checkmate'; winner: 'w' | 'b' }
  | { over: true; kind: 'stalemate' | 'draw' | 'threefold' | 'insufficient' | 'fiftymove' };

export class Game {
  private chess: Chess;

  constructor(fen?: string) {
    this.chess = fen ? new Chess(fen) : new Chess();
  }

  fen(): string {
    return this.chess.fen();
  }

  turn(): 'w' | 'b' {
    return this.chess.turn();
  }

  history(): string[] {
    return this.chess.history();
  }

  move(m: { from: string; to: string; promotion?: string }): boolean {
    try {
      const result = this.chess.move(m);
      return result !== null;
    } catch {
      return false;
    }
  }

  undo(): Move | null {
    return this.chess.undo();
  }

  load(fen: string): void {
    this.chess.load(fen);
  }

  legalMovesFrom(square: string): string[] {
    return this.chess
      .moves({ square: square as never, verbose: true })
      .map((m) => (m as Move).to);
  }

  result(): GameResult {
    if (this.chess.isCheckmate()) {
      return { over: true, kind: 'checkmate', winner: this.chess.turn() === 'w' ? 'b' : 'w' };
    }
    if (this.chess.isStalemate()) return { over: true, kind: 'stalemate' };
    if (this.chess.isThreefoldRepetition()) return { over: true, kind: 'threefold' };
    if (this.chess.isInsufficientMaterial()) return { over: true, kind: 'insufficient' };
    if (this.chess.isDraw()) return { over: true, kind: 'draw' };
    return { over: false };
  }
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- tests/lib/game.test.ts
```
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add lib/game.ts tests/lib/game.test.ts
git commit -m "feat(game): chess.js wrapper with move/undo/result helpers"
```

---

## Task 5: localStorage persistence (`lib/persistence.ts`)

**Files:**
- Create: `lib/persistence.ts`, `tests/lib/persistence.test.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/lib/persistence.test.ts`:
```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { saveGameState, loadGameState, clearGameState, GameState } from '@/lib/persistence';

const sample: GameState = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  humanColor: 'w',
  difficulty: 8,
  resigned: false,
};

describe('persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when nothing is saved', () => {
    expect(loadGameState()).toBeNull();
  });

  it('saves and loads round-trip', () => {
    saveGameState(sample);
    expect(loadGameState()).toEqual(sample);
  });

  it('returns null and clears on corrupt data', () => {
    localStorage.setItem('chess.gameState.v1', '{not json');
    expect(loadGameState()).toBeNull();
    expect(localStorage.getItem('chess.gameState.v1')).toBeNull();
  });

  it('clears state', () => {
    saveGameState(sample);
    clearGameState();
    expect(loadGameState()).toBeNull();
  });
});
```

- [ ] **Step 2: Run, expect failures**

```bash
npm test -- tests/lib/persistence.test.ts
```
Expected: all fail.

- [ ] **Step 3: Implement `lib/persistence.ts`**

Create `lib/persistence.ts`:
```ts
const KEY = 'chess.gameState.v1';

export interface GameState {
  fen: string;
  humanColor: 'w' | 'b';
  difficulty: number;
  resigned: boolean;
}

function isGameState(x: unknown): x is GameState {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.fen === 'string' &&
    (o.humanColor === 'w' || o.humanColor === 'b') &&
    typeof o.difficulty === 'number' &&
    typeof o.resigned === 'boolean'
  );
}

export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // quota exceeded or no storage; ignore
  }
}

export function loadGameState(): GameState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isGameState(parsed)) {
      localStorage.removeItem(KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(KEY);
    return null;
  }
}

export function clearGameState(): void {
  localStorage.removeItem(KEY);
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- tests/lib/persistence.test.ts
```
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add lib/persistence.ts tests/lib/persistence.test.ts
git commit -m "feat(persistence): localStorage save/load/clear with corruption guard"
```

---

## Task 6: Recognition API route (`/api/recognize`)

**Files:**
- Create: `app/api/recognize/route.ts`, `tests/api/recognize.test.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/api/recognize.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockCreate = vi.fn();

vi.mock('@anthropic-ai/sdk', () => ({
  default: class {
    messages = { create: mockCreate };
  },
}));

async function callRoute(body: unknown) {
  const { POST } = await import('@/app/api/recognize/route');
  const req = new Request('http://localhost/api/recognize', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  return POST(req);
}

describe('POST /api/recognize', () => {
  beforeEach(() => {
    mockCreate.mockReset();
    process.env.ANTHROPIC_API_KEY = 'test-key';
  });

  it('returns 400 when imageBase64 missing', async () => {
    const res = await callRoute({});
    expect(res.status).toBe(400);
  });

  it('returns parsed JSON when Claude responds with valid FEN', async () => {
    mockCreate.mockResolvedValue({
      content: [{
        type: 'text',
        text: JSON.stringify({
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
          sideToMove: 'w',
          confidence: 0.9,
          notes: '',
        }),
      }],
    });
    const res = await callRoute({ imageBase64: 'iVBORw0KG...' });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.fen).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    expect(data.sideToMove).toBe('w');
    expect(data.confidence).toBe(0.9);
  });

  it('returns 422 when Claude returns invalid placement', async () => {
    mockCreate.mockResolvedValue({
      content: [{
        type: 'text',
        text: JSON.stringify({ fen: 'garbage', sideToMove: 'w', confidence: 0.5, notes: '' }),
      }],
    });
    const res = await callRoute({ imageBase64: 'x' });
    expect(res.status).toBe(422);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it('returns 502 when SDK throws', async () => {
    mockCreate.mockRejectedValue(new Error('boom'));
    const res = await callRoute({ imageBase64: 'x' });
    expect(res.status).toBe(502);
  });
});
```

- [ ] **Step 2: Run, expect failures**

```bash
npm test -- tests/api/recognize.test.ts
```
Expected: all fail with module not found.

- [ ] **Step 3: Implement the route**

Create `app/api/recognize/route.ts`:
```ts
import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { isValidPlacement, completeFen, isValidFen } from '@/lib/fen';

const SYSTEM_PROMPT = `You read chess board screenshots. Output strict JSON matching this schema:
{"fen": string, "sideToMove": "w"|"b", "confidence": number 0-1, "notes": string}.
"fen" is the piece-placement field only (8 ranks, top to bottom, separated by "/").
Do not include castling rights, en-passant, halfmove, or fullmove fields.
If you cannot read the board, set "confidence" to 0 and put a brief explanation in "notes".
If the side-to-move indicator isn't visible, default "sideToMove" to "w".
Return ONLY the JSON object, no prose, no markdown fences.`;

interface ParsedResponse {
  fen: string;
  sideToMove: 'w' | 'b';
  confidence: number;
  notes: string;
}

function parseModelText(text: string): ParsedResponse | null {
  const trimmed = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
  try {
    const obj = JSON.parse(trimmed);
    if (
      typeof obj.fen === 'string' &&
      (obj.sideToMove === 'w' || obj.sideToMove === 'b') &&
      typeof obj.confidence === 'number' &&
      typeof obj.notes === 'string'
    ) {
      return obj;
    }
    return null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  let body: { imageBase64?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.imageBase64 || typeof body.imageBase64 !== 'string') {
    return NextResponse.json({ error: 'imageBase64 is required' }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  let response;
  try {
    response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: body.imageBase64 } },
            { type: 'text', text: 'Read this chess position.' },
          ],
        },
      ],
    });
  } catch (e) {
    return NextResponse.json({ error: 'Vision call failed', detail: String(e) }, { status: 502 });
  }

  const block = response.content.find((c) => c.type === 'text');
  const text = block && 'text' in block ? block.text : '';
  const parsed = parseModelText(text);
  if (!parsed) {
    return NextResponse.json({ error: 'Model did not return valid JSON', raw: text }, { status: 422 });
  }

  if (!isValidPlacement(parsed.fen)) {
    return NextResponse.json({ error: 'Invalid FEN placement', raw: parsed }, { status: 422 });
  }

  const full = completeFen(parsed.fen, parsed.sideToMove);
  if (!isValidFen(full)) {
    return NextResponse.json({ error: 'Constructed FEN is illegal', raw: parsed }, { status: 422 });
  }

  return NextResponse.json(parsed);
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- tests/api/recognize.test.ts
```
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add app/api/recognize/route.ts tests/api/recognize.test.ts
git commit -m "feat(api): /api/recognize calls Claude vision and validates FEN"
```

---

## Task 7: Stockfish Web Worker wrapper (`lib/engine.ts`)

**Files:**
- Create: `lib/engine.ts`, `public/stockfish/stockfish.js` (copied), `tests/lib/engine.test.ts`

Note: stockfish.wasm/js files must be served as static assets so the browser can spawn a Worker for them. The simplest path is to copy from `node_modules/stockfish` into `public/stockfish/`.

- [ ] **Step 1: Inspect the installed stockfish package**

```bash
ls node_modules/stockfish/src/
```
Expected: shows files like `stockfish.js`, `stockfish.wasm`, `stockfish.worker.js` (exact names vary by version).

- [ ] **Step 2: Copy stockfish assets to `public/stockfish/`**

```bash
mkdir -p public/stockfish
cp node_modules/stockfish/src/* public/stockfish/
```

(If filenames differ, copy whatever is there. The wrapper below loads `/stockfish/stockfish.js` — rename if needed so that path resolves.)

- [ ] **Step 3: Add a postinstall script to keep `public/` in sync**

In `package.json`, add to `"scripts"`:
```json
"postinstall": "mkdir -p public/stockfish && cp -R node_modules/stockfish/src/. public/stockfish/"
```

- [ ] **Step 4: Write engine tests (with mocked Worker)**

Create `tests/lib/engine.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

class FakeWorker {
  onmessage: ((e: MessageEvent) => void) | null = null;
  postMessage = vi.fn((msg: string) => {
    queueMicrotask(() => {
      if (msg.startsWith('go ')) {
        this.onmessage?.({ data: 'bestmove e2e4' } as MessageEvent);
      }
    });
  });
  terminate = vi.fn();
}

beforeEach(() => {
  // @ts-expect-error global
  globalThis.Worker = FakeWorker;
});

describe('Engine', () => {
  it('returns the bestmove', async () => {
    const { Engine } = await import('@/lib/engine');
    const engine = new Engine();
    const move = await engine.bestMove({
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      skill: 8,
      movetimeMs: 100,
    });
    expect(move).toBe('e2e4');
    engine.dispose();
  });

  it('rejects on timeout and respawns the worker', async () => {
    class HangingWorker {
      onmessage: ((e: MessageEvent) => void) | null = null;
      postMessage = vi.fn();
      terminate = vi.fn();
    }
    // @ts-expect-error global
    globalThis.Worker = HangingWorker;

    const { Engine } = await import('@/lib/engine');
    const engine = new Engine();
    await expect(
      engine.bestMove({
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        skill: 8,
        movetimeMs: 50,
        timeoutMs: 100,
      })
    ).rejects.toThrow(/timeout/i);
    engine.dispose();
  });
});
```

- [ ] **Step 5: Run, expect failures**

```bash
npm test -- tests/lib/engine.test.ts
```
Expected: fail with module not found.

- [ ] **Step 6: Implement `lib/engine.ts`**

Create `lib/engine.ts`:
```ts
export interface BestMoveOptions {
  fen: string;
  skill: number; // 0..20
  movetimeMs: number;
  timeoutMs?: number;
}

export class Engine {
  private worker: Worker;
  private listeners: ((line: string) => void)[] = [];

  constructor() {
    this.worker = this.spawn();
  }

  private spawn(): Worker {
    const w = new Worker('/stockfish/stockfish.js');
    w.onmessage = (e: MessageEvent) => {
      const line = typeof e.data === 'string' ? e.data : '';
      for (const l of this.listeners) l(line);
    };
    w.postMessage('uci');
    w.postMessage('isready');
    return w;
  }

  private send(cmd: string) {
    this.worker.postMessage(cmd);
  }

  private addListener(fn: (line: string) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  bestMove(opts: BestMoveOptions): Promise<string> {
    const { fen, skill, movetimeMs, timeoutMs = movetimeMs + 5000 } = opts;
    return new Promise((resolve, reject) => {
      let settled = false;
      const remove = this.addListener((line) => {
        if (settled) return;
        if (line.startsWith('bestmove ')) {
          const move = line.split(' ')[1];
          settled = true;
          remove();
          clearTimeout(timer);
          resolve(move);
        }
      });

      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        remove();
        try {
          this.worker.terminate();
        } catch {}
        this.worker = this.spawn();
        reject(new Error(`Engine timeout after ${timeoutMs}ms`));
      }, timeoutMs);

      this.send(`setoption name Skill Level value ${Math.max(0, Math.min(20, Math.floor(skill)))}`);
      this.send(`position fen ${fen}`);
      this.send(`go movetime ${movetimeMs}`);
    });
  }

  dispose() {
    try {
      this.worker.terminate();
    } catch {}
    this.listeners = [];
  }
}
```

- [ ] **Step 7: Run tests**

```bash
npm test -- tests/lib/engine.test.ts
```
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add lib/engine.ts tests/lib/engine.test.ts public/stockfish package.json
git commit -m "feat(engine): Stockfish Web Worker wrapper with timeout and respawn"
```

---

## Task 8: Difficulty mapping helper

**Files:**
- Modify: `lib/engine.ts` (add `mapSliderToEngine`), `tests/lib/engine.test.ts`

- [ ] **Step 1: Add failing test for slider mapping**

Append to `tests/lib/engine.test.ts`:
```ts
describe('mapSliderToEngine', () => {
  it('maps slider 1 to skill 0 / movetime 100', async () => {
    const { mapSliderToEngine } = await import('@/lib/engine');
    expect(mapSliderToEngine(1)).toEqual({ skill: 0, movetimeMs: 100 });
  });
  it('maps slider 8 to skill 8 / movetime 1000', async () => {
    const { mapSliderToEngine } = await import('@/lib/engine');
    expect(mapSliderToEngine(8)).toEqual({ skill: 8, movetimeMs: 1000 });
  });
  it('maps slider 20 to skill 20 / movetime 3000', async () => {
    const { mapSliderToEngine } = await import('@/lib/engine');
    expect(mapSliderToEngine(20)).toEqual({ skill: 20, movetimeMs: 3000 });
  });
  it('clamps out-of-range values', async () => {
    const { mapSliderToEngine } = await import('@/lib/engine');
    expect(mapSliderToEngine(0)).toEqual({ skill: 0, movetimeMs: 100 });
    expect(mapSliderToEngine(99)).toEqual({ skill: 20, movetimeMs: 3000 });
  });
});
```

- [ ] **Step 2: Run, expect new failures**

```bash
npm test -- tests/lib/engine.test.ts
```
Expected: 4 new failures.

- [ ] **Step 3: Add `mapSliderToEngine` to `lib/engine.ts`**

Append to `lib/engine.ts`:
```ts
export function mapSliderToEngine(slider: number): { skill: number; movetimeMs: number } {
  const clamped = Math.max(1, Math.min(20, Math.round(slider)));
  // Skill is just slider clamped to 0..20 (slider 1 → skill 0).
  const skill = Math.max(0, clamped - 1);
  // movetime: piecewise interpolation through the spec's anchors.
  const anchors: [number, number][] = [
    [1, 100], [5, 300], [8, 1000], [14, 1500], [20, 3000],
  ];
  let movetimeMs = anchors[0][1];
  for (let i = 0; i < anchors.length - 1; i++) {
    const [x0, y0] = anchors[i];
    const [x1, y1] = anchors[i + 1];
    if (clamped >= x0 && clamped <= x1) {
      const t = (clamped - x0) / (x1 - x0);
      movetimeMs = Math.round(y0 + t * (y1 - y0));
      break;
    }
    if (clamped > x1) movetimeMs = y1;
  }
  return { skill, movetimeMs };
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- tests/lib/engine.test.ts
```
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add lib/engine.ts tests/lib/engine.test.ts
git commit -m "feat(engine): difficulty slider → skill+movetime mapping"
```

---

## Task 9: Board component (`components/Board.tsx`)

**Files:**
- Create: `components/Board.tsx`

This is a thin wrapper around react-chessboard that the page composes. We don't unit-test it directly (drag/drop testing is brittle); coverage comes via integration tests in Task 14.

- [ ] **Step 1: Implement the component**

Create `components/Board.tsx`:
```tsx
'use client';
import { Chessboard } from 'react-chessboard';

export interface BoardProps {
  fen: string;
  orientation: 'white' | 'black';
  onMove: (from: string, to: string, promotion?: string) => boolean;
  lastMove?: { from: string; to: string };
  arePiecesDraggable?: boolean;
}

export function Board({ fen, orientation, onMove, lastMove, arePiecesDraggable = true }: BoardProps) {
  const customSquareStyles: Record<string, React.CSSProperties> = {};
  if (lastMove) {
    customSquareStyles[lastMove.from] = { backgroundColor: 'rgba(255, 255, 0, 0.3)' };
    customSquareStyles[lastMove.to] = { backgroundColor: 'rgba(255, 255, 0, 0.4)' };
  }

  return (
    <Chessboard
      position={fen}
      boardOrientation={orientation}
      arePiecesDraggable={arePiecesDraggable}
      customSquareStyles={customSquareStyles}
      onPieceDrop={(sourceSquare, targetSquare, piece) => {
        // piece looks like 'wP', 'bQ', etc. Promotion picker handled separately.
        const promotion =
          piece.endsWith('P') &&
          ((targetSquare.endsWith('8') && piece.startsWith('w')) ||
            (targetSquare.endsWith('1') && piece.startsWith('b')))
            ? 'q'
            : undefined;
        return onMove(sourceSquare, targetSquare, promotion);
      }}
    />
  );
}
```

Note: `react-chessboard` v4+ may require a different prop shape. If TypeScript complains, run `npm ls react-chessboard` to confirm version, then adapt prop names to the installed API. The above matches v4.x; v5 uses `options={{ position, ... }}` instead.

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Board.tsx
git commit -m "feat(ui): Board component wrapping react-chessboard"
```

---

## Task 10: Control panel component (`components/ControlPanel.tsx`)

**Files:**
- Create: `components/ControlPanel.tsx`, `tests/components/ControlPanel.test.tsx`

- [ ] **Step 1: Write failing test**

Create `tests/components/ControlPanel.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ControlPanel } from '@/components/ControlPanel';

describe('ControlPanel', () => {
  it('emits color change', () => {
    const onChange = vi.fn();
    render(
      <ControlPanel
        humanColor="w"
        difficulty={8}
        onColorChange={onChange}
        onDifficultyChange={() => {}}
        onFlip={() => {}}
        onUndo={() => {}}
        onResign={() => {}}
        onNewGame={() => {}}
      />
    );
    fireEvent.click(screen.getByLabelText('Play as Black'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('emits difficulty change', () => {
    const onChange = vi.fn();
    render(
      <ControlPanel
        humanColor="w"
        difficulty={8}
        onColorChange={() => {}}
        onDifficultyChange={onChange}
        onFlip={() => {}}
        onUndo={() => {}}
        onResign={() => {}}
        onNewGame={() => {}}
      />
    );
    fireEvent.change(screen.getByLabelText(/difficulty/i), { target: { value: '15' } });
    expect(onChange).toHaveBeenCalledWith(15);
  });

  it('fires action button callbacks', () => {
    const flip = vi.fn(); const undo = vi.fn(); const resign = vi.fn(); const newGame = vi.fn();
    render(
      <ControlPanel
        humanColor="w"
        difficulty={8}
        onColorChange={() => {}}
        onDifficultyChange={() => {}}
        onFlip={flip}
        onUndo={undo}
        onResign={resign}
        onNewGame={newGame}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /flip/i }));
    fireEvent.click(screen.getByRole('button', { name: /undo/i }));
    fireEvent.click(screen.getByRole('button', { name: /resign/i }));
    fireEvent.click(screen.getByRole('button', { name: /new game/i }));
    expect(flip).toHaveBeenCalled();
    expect(undo).toHaveBeenCalled();
    expect(resign).toHaveBeenCalled();
    expect(newGame).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run, expect failures**

```bash
npm test -- tests/components/ControlPanel.test.tsx
```
Expected: fail with module not found.

- [ ] **Step 3: Implement `components/ControlPanel.tsx`**

Create `components/ControlPanel.tsx`:
```tsx
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
}

export function ControlPanel(props: ControlPanelProps) {
  const {
    humanColor, difficulty,
    onColorChange, onDifficultyChange,
    onFlip, onUndo, onResign, onNewGame,
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
        <button onClick={onResign} className="px-3 py-1 border rounded">Resign</button>
        <button onClick={onNewGame} className="px-3 py-1 border rounded">New game</button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- tests/components/ControlPanel.test.tsx
```
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add components/ControlPanel.tsx tests/components/ControlPanel.test.tsx
git commit -m "feat(ui): ControlPanel with color/difficulty/actions"
```

---

## Task 11: Move history component (`components/MoveHistory.tsx`)

**Files:**
- Create: `components/MoveHistory.tsx`, `tests/components/MoveHistory.test.tsx`

- [ ] **Step 1: Write failing test**

Create `tests/components/MoveHistory.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MoveHistory } from '@/components/MoveHistory';

describe('MoveHistory', () => {
  it('renders pairs as numbered rows', () => {
    render(<MoveHistory moves={['e4', 'e5', 'Nf3', 'Nc6', 'Bb5']} />);
    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('e4')).toBeInTheDocument();
    expect(screen.getByText('e5')).toBeInTheDocument();
    expect(screen.getByText('2.')).toBeInTheDocument();
    expect(screen.getByText('Nf3')).toBeInTheDocument();
    expect(screen.getByText('Nc6')).toBeInTheDocument();
    expect(screen.getByText('3.')).toBeInTheDocument();
    expect(screen.getByText('Bb5')).toBeInTheDocument();
  });

  it('shows placeholder when empty', () => {
    render(<MoveHistory moves={[]} />);
    expect(screen.getByText(/no moves yet/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run, expect failures**

```bash
npm test -- tests/components/MoveHistory.test.tsx
```
Expected: fail.

- [ ] **Step 3: Implement**

Create `components/MoveHistory.tsx`:
```tsx
'use client';

export function MoveHistory({ moves }: { moves: string[] }) {
  if (moves.length === 0) {
    return <div className="p-4 text-sm text-gray-500 italic">No moves yet.</div>;
  }
  const pairs: { num: number; white: string; black?: string }[] = [];
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push({ num: i / 2 + 1, white: moves[i], black: moves[i + 1] });
  }
  return (
    <ol className="p-4 font-mono text-sm overflow-y-auto max-h-64 grid grid-cols-[2rem_1fr_1fr] gap-x-2">
      {pairs.map((p) => (
        <li key={p.num} className="contents">
          <span className="text-gray-500">{p.num}.</span>
          <span>{p.white}</span>
          <span>{p.black ?? ''}</span>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- tests/components/MoveHistory.test.tsx
```
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add components/MoveHistory.tsx tests/components/MoveHistory.test.tsx
git commit -m "feat(ui): MoveHistory sidebar"
```

---

## Task 12: UploadZone component (`components/UploadZone.tsx`)

**Files:**
- Create: `components/UploadZone.tsx`, `tests/components/UploadZone.test.tsx`

UploadZone is a controlled component: it produces a base64 JPEG (resized to 1024 px long edge) and calls `onImage(base64)`. It exposes file picker, paste button, drag-drop, and a global `paste` listener.

- [ ] **Step 1: Add image-resize helper**

Create `lib/image.ts`:
```ts
export async function resizeAndEncode(file: Blob, maxLongEdge = 1024): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxLongEdge / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No 2d context');
  ctx.drawImage(bitmap, 0, 0, w, h);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
  return dataUrl.slice(dataUrl.indexOf(',') + 1);
}
```

- [ ] **Step 2: Write failing test for UploadZone (file path only — clipboard/drop are jsdom-hostile)**

Create `tests/components/UploadZone.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UploadZone } from '@/components/UploadZone';

vi.mock('@/lib/image', () => ({
  resizeAndEncode: vi.fn(async () => 'BASE64DATA'),
}));

describe('UploadZone', () => {
  it('calls onImage when a file is selected', async () => {
    const onImage = vi.fn();
    render(<UploadZone onImage={onImage} />);
    const file = new File(['x'], 'board.png', { type: 'image/png' });
    const input = screen.getByLabelText(/upload screenshot/i) as HTMLInputElement;
    await userEvent.upload(input, file);
    expect(onImage).toHaveBeenCalledWith('BASE64DATA');
  });
});
```

- [ ] **Step 3: Run, expect failures**

```bash
npm test -- tests/components/UploadZone.test.tsx
```
Expected: fail.

- [ ] **Step 4: Implement `components/UploadZone.tsx`**

Create `components/UploadZone.tsx`:
```tsx
'use client';
import { useEffect, useRef } from 'react';
import { resizeAndEncode } from '@/lib/image';

export function UploadZone({ onImage }: { onImage: (base64: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleBlob(blob: Blob) {
    const b64 = await resizeAndEncode(blob);
    onImage(b64);
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) await handleBlob(f);
    e.target.value = '';
  }

  async function onPasteButton() {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const type = item.types.find((t) => t.startsWith('image/'));
        if (type) {
          const blob = await item.getType(type);
          await handleBlob(blob);
          return;
        }
      }
    } catch (e) {
      console.error('Clipboard read failed', e);
    }
  }

  useEffect(() => {
    function onPaste(e: ClipboardEvent) {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const it of items) {
        if (it.type.startsWith('image/')) {
          const file = it.getAsFile();
          if (file) handleBlob(file);
          return;
        }
      }
    }
    function onDrop(e: DragEvent) {
      e.preventDefault();
      const f = e.dataTransfer?.files?.[0];
      if (f && f.type.startsWith('image/')) handleBlob(f);
    }
    function onDragOver(e: DragEvent) { e.preventDefault(); }
    window.addEventListener('paste', onPaste);
    window.addEventListener('drop', onDrop);
    window.addEventListener('dragover', onDragOver);
    return () => {
      window.removeEventListener('paste', onPaste);
      window.removeEventListener('drop', onDrop);
      window.removeEventListener('dragover', onDragOver);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <label className="px-3 py-1 border rounded cursor-pointer">
        Upload screenshot
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          aria-label="Upload screenshot"
          className="hidden"
          onChange={onFileChange}
        />
      </label>
      <button onClick={onPasteButton} className="px-3 py-1 border rounded">
        Paste
      </button>
    </div>
  );
}
```

- [ ] **Step 5: Run tests**

```bash
npm test -- tests/components/UploadZone.test.tsx
```
Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add components/UploadZone.tsx lib/image.ts tests/components/UploadZone.test.tsx
git commit -m "feat(ui): UploadZone with file/paste/drop and image resize"
```

---

## Task 13: EditMode component (`components/EditMode.tsx`)

**Files:**
- Create: `components/EditMode.tsx`, `tests/components/EditMode.test.tsx`

EditMode displays the recognized FEN, lets the user edit it via text input + a "load standard position" / "clear board" button, plus the color/turn/difficulty toggles, then emits the final config on "Start game".

(For v1 we keep the editor minimal: editable raw FEN text + buttons. A full drag-piece-from-palette editor is deferred — the FEN field is the primary correction tool, and react-chessboard renders live as the FEN changes.)

- [ ] **Step 1: Write failing test**

Create `tests/components/EditMode.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditMode } from '@/components/EditMode';

const STARTING = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

describe('EditMode', () => {
  it('shows the recognized confidence banner', () => {
    render(
      <EditMode
        recognized={{ fen: STARTING, sideToMove: 'w', confidence: 0.5, notes: 'hazy' }}
        onStart={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByText(/please double-check/i)).toBeInTheDocument();
    expect(screen.getByText(/hazy/i)).toBeInTheDocument();
  });

  it('emits a complete game config on Start', () => {
    const onStart = vi.fn();
    render(
      <EditMode
        recognized={{ fen: STARTING, sideToMove: 'w', confidence: 0.95, notes: '' }}
        onStart={onStart}
        onCancel={() => {}}
      />
    );
    fireEvent.click(screen.getByLabelText('Play as Black'));
    fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    expect(onStart).toHaveBeenCalledWith(expect.objectContaining({
      fen: expect.stringContaining(STARTING),
      humanColor: 'b',
      difficulty: expect.any(Number),
    }));
  });

  it('disables Start when FEN invalid', () => {
    render(
      <EditMode
        recognized={{ fen: STARTING, sideToMove: 'w', confidence: 1, notes: '' }}
        onStart={() => {}}
        onCancel={() => {}}
      />
    );
    fireEvent.change(screen.getByLabelText(/raw fen/i), { target: { value: 'garbage' } });
    expect(screen.getByRole('button', { name: /start game/i })).toBeDisabled();
  });
});
```

- [ ] **Step 2: Run, expect failures**

```bash
npm test -- tests/components/EditMode.test.tsx
```
Expected: fail.

- [ ] **Step 3: Implement `components/EditMode.tsx`**

Create `components/EditMode.tsx`:
```tsx
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
            position={fenValid ? fullFen! : completeFen(STARTING_PLACEMENT, 'w')}
            arePiecesDraggable={false}
            boardOrientation={humanColor === 'w' ? 'white' : 'black'}
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
```

- [ ] **Step 4: Run tests**

```bash
npm test -- tests/components/EditMode.test.tsx
```
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add components/EditMode.tsx tests/components/EditMode.test.tsx
git commit -m "feat(ui): EditMode for post-recognition position correction"
```

---

## Task 14: Game-over modal (`components/GameOverModal.tsx`)

**Files:**
- Create: `components/GameOverModal.tsx`

- [ ] **Step 1: Implement**

Create `components/GameOverModal.tsx`:
```tsx
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
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/GameOverModal.tsx
git commit -m "feat(ui): GameOverModal"
```

---

## Task 15: Main page wiring (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx` (add metadata title)

This is the orchestration layer — it owns React state, wires events between Board / ControlPanel / MoveHistory / UploadZone / EditMode / GameOverModal, and drives the engine.

- [ ] **Step 1: Update `app/layout.tsx` metadata**

Replace the `metadata` export at the top of `app/layout.tsx` with:
```tsx
export const metadata = {
  title: 'Chess vs Claude',
  description: 'Play Stockfish in the browser. Drop a screenshot to start from any position.',
};
```

- [ ] **Step 2: Replace `app/page.tsx` with the orchestrator**

Overwrite `app/page.tsx`:
```tsx
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Board } from '@/components/Board';
import { ControlPanel } from '@/components/ControlPanel';
import { MoveHistory } from '@/components/MoveHistory';
import { UploadZone } from '@/components/UploadZone';
import { EditMode, RecognizedPosition, StartConfig } from '@/components/EditMode';
import { GameOverModal } from '@/components/GameOverModal';
import { Game, GameResult } from '@/lib/game';
import { Engine, mapSliderToEngine } from '@/lib/engine';
import { saveGameState, loadGameState, clearGameState } from '@/lib/persistence';

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

  // Restore from localStorage once on mount.
  useEffect(() => {
    const saved = loadGameState();
    if (saved) {
      gameRef.current.load(saved.fen);
      setHumanColor(saved.humanColor);
      setDifficulty(saved.difficulty);
      setOrientation(saved.humanColor === 'w' ? 'white' : 'black');
    }
    engineRef.current = new Engine();
    return () => engineRef.current?.dispose();
  }, []);

  // Persist after every render where we mutated.
  function persist() {
    saveGameState({
      fen: gameRef.current.fen(),
      humanColor,
      difficulty,
      resigned: false,
    });
  }

  function rerender() {
    force((n) => n + 1);
  }

  const result: GameResult = gameRef.current.result();

  // Trigger engine when it's the engine's turn.
  useEffect(() => {
    if (mode !== 'play') return;
    if (result.over) return;
    if (gameRef.current.turn() === humanColor) return;
    const engine = engineRef.current;
    if (!engine) return;

    const { skill, movetimeMs } = mapSliderToEngine(difficulty);
    engine
      .bestMove({ fen: gameRef.current.fen(), skill, movetimeMs })
      .then((uci) => {
        const from = uci.slice(0, 2);
        const to = uci.slice(2, 4);
        const promotion = uci.length > 4 ? uci.slice(4, 5) : undefined;
        const ok = gameRef.current.move({ from, to, promotion });
        if (ok) {
          setLastMove({ from, to });
          persist();
          rerender();
        }
      })
      .catch((e) => {
        console.error('Engine error', e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, humanColor, difficulty, gameRef.current.fen()]);

  function onMove(from: string, to: string, promotion?: string): boolean {
    if (mode !== 'play') return false;
    if (result.over) return false;
    if (gameRef.current.turn() !== humanColor) return false;
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
        setRecognizeError(data.error ?? 'Recognition failed');
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
    setMode('play');
    persist();
    rerender();
  }

  function onNewGame() {
    gameRef.current = new Game();
    setLastMove(undefined);
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

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="flex items-center gap-3 p-3 border-b bg-white">
        <h1 className="text-lg font-semibold mr-auto">Chess vs Claude</h1>
        <UploadZone onImage={onImage} />
        <button onClick={onNewGame} className="px-3 py-1 border rounded">New game</button>
      </header>

      {recognizeError && (
        <div className="p-3 bg-red-100 text-red-800">{recognizeError}</div>
      )}

      {mode === 'recognizing' && (
        <div className="p-3 bg-blue-50 text-blue-800">Reading the board…</div>
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

      {mode === 'play' && (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4 p-4">
          <div className="aspect-square max-w-[80vh] mx-auto w-full">
            <Board
              fen={gameRef.current.fen()}
              orientation={orientation}
              onMove={onMove}
              lastMove={lastMove}
              arePiecesDraggable={!result.over && gameRef.current.turn() === humanColor}
            />
          </div>
          <div className="flex flex-col gap-4">
            <ControlPanel
              humanColor={humanColor}
              difficulty={difficulty}
              onColorChange={(c) => {
                setHumanColor(c);
                setOrientation(c === 'w' ? 'white' : 'black');
                persist();
              }}
              onDifficultyChange={(d) => { setDifficulty(d); persist(); }}
              onFlip={() => setOrientation((o) => (o === 'white' ? 'black' : 'white'))}
              onUndo={onUndo}
              onResign={onResign}
              onNewGame={onNewGame}
            />
            <div className="border rounded bg-white">
              <h2 className="px-4 pt-4 font-medium">Move history</h2>
              <MoveHistory moves={gameRef.current.history()} />
            </div>
          </div>
        </div>
      )}

      <GameOverModal
        result={result}
        onPlayAgain={onNewGame}
        onEditPosition={() => {
          setRecognized({
            fen: gameRef.current.fen().split(' ')[0],
            sideToMove: gameRef.current.turn(),
            confidence: 1,
            notes: '',
          });
          setMode('edit');
        }}
      />
    </main>
  );
}
```

- [ ] **Step 3: Run dev server and smoke-test**

```bash
npm run dev
```

Open http://localhost:3000. Verify:
- Board renders at the standard position.
- You can drag e2→e4. The engine replies within ~1s.
- Difficulty slider works.
- "New game" resets the board.
- Reload restores the last position.

(Note: image upload will only work end-to-end once `ANTHROPIC_API_KEY` is set in `.env.local`. Test that in Task 17.)

Stop the dev server with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat(app): wire Board, ControlPanel, MoveHistory, EditMode, engine, persistence"
```

---

## Task 16: Final test sweep + lint

**Files:** none new

- [ ] **Step 1: Run the full test suite**

```bash
npm test
```
Expected: all tests pass.

- [ ] **Step 2: Run typecheck**

```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```
Expected: 0 errors. Fix any warnings if trivial.

- [ ] **Step 4: Build**

```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git diff --cached --quiet || git commit -m "chore: lint/type fixes from final sweep"
```

---

## Task 17: README and Vercel deployment notes

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace `README.md`**

Overwrite `README.md`:
````markdown
# Chess vs Claude

Browser chess game. You play against Stockfish (labeled "Claude"). Drop, paste, or upload a screenshot of any board and the game loads that position via Claude vision.

## Features

- Standard chess rules via [chess.js](https://github.com/jhlywa/chess.js)
- Drag-drop board with [react-chessboard](https://github.com/Clariity/react-chessboard)
- Stockfish engine in a Web Worker (difficulty slider, 1–20)
- Screenshot recognition via Anthropic Claude (Sonnet 4.6)
- Position editor with raw FEN paste-in
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
npm test
```

## Deploy to Vercel

1. Push to a GitHub repo.
2. Import the repo into Vercel (https://vercel.com/new).
3. In **Settings → Environment Variables**, set `ANTHROPIC_API_KEY` for Production (and Preview if you want preview deploys to support recognition).
4. Trigger a deploy. Vercel auto-detects Next.js.

## Architecture

See [docs/superpowers/specs/2026-04-26-chess-game-design.md](docs/superpowers/specs/2026-04-26-chess-game-design.md) for the full design spec and [docs/superpowers/plans/2026-04-26-chess-game.md](docs/superpowers/plans/2026-04-26-chess-game.md) for the build plan.
````

- [ ] **Step 2: Manual end-to-end test**

With `ANTHROPIC_API_KEY` set in `.env.local`:
```bash
npm run dev
```
Take a screenshot of any chess position (chess.com, lichess, a photo), paste with Cmd+V on the page. Verify Edit Mode appears with the position. Adjust if needed. Click "Start game". Play a few moves.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: README with setup, tests, and Vercel deployment"
```

---

## Self-Review (executed before finalizing this plan)

**Spec coverage:**
- ✅ Next.js + Vercel — Task 1
- ✅ chess.js wrapper — Task 4
- ✅ react-chessboard wrapper — Task 9
- ✅ stockfish.wasm Web Worker — Task 7
- ✅ difficulty slider 1–20 → skill+movetime — Task 8
- ✅ /api/recognize with Claude vision + FEN validation — Task 6
- ✅ FEN helpers — Task 3
- ✅ Upload + Paste button + drag-drop + Cmd+V listener — Task 12
- ✅ Edit Mode with raw FEN edit, color/turn/difficulty, confidence banner — Task 13
- ✅ Game-over modal — Task 14
- ✅ ControlPanel (color, difficulty, flip, undo, resign, new game) — Task 10
- ✅ Move history — Task 11
- ✅ localStorage persistence — Task 5
- ✅ Engine timeout + respawn — Task 7
- ✅ Mobile responsive — handled via Tailwind grids in page + components (md: breakpoints)
- ✅ Vercel env var — Task 17 README, Task 1 .env.local.example
- ✅ Page-level orchestration — Task 15
- ✅ chess.js draw detection (threefold, 50-move, insufficient) — Task 4 result()

**Placeholder scan:** No "TBD"/"TODO"/"implement later" remain. Every code step has the actual code.

**Type/name consistency:**
- `Game.move` signature `{ from, to, promotion? }` matches use in page.tsx and Board.
- `Engine.bestMove` signature matches use in page.tsx.
- `RecognizedPosition` shape matches API response in `/api/recognize` and EditMode.
- `StartConfig` exported from EditMode and consumed in page.tsx.
- `GameResult` exported from `lib/game.ts`, consumed in `GameOverModal` and page.tsx.

No issues found.
