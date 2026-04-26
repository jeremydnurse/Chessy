export interface BestMoveOptions {
  fen: string;
  skill: number; // 0..20
  movetimeMs: number;
  timeoutMs?: number;
}

// Not safe for parallel bestMove() calls — Stockfish processes commands serially
// and concurrent calls would garble the UCI command stream. The page only ever
// asks for one move at a time, so this is fine.
export class Engine {
  private worker: Worker;
  private listeners: ((line: string) => void)[] = [];
  private disposed = false;

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
        if (!this.disposed) this.worker = this.spawn();
        reject(new Error(`Engine timeout after ${timeoutMs}ms`));
      }, timeoutMs);

      this.send(`setoption name Skill Level value ${Math.max(0, Math.min(20, Math.floor(skill)))}`);
      this.send(`position fen ${fen}`);
      this.send(`go movetime ${movetimeMs}`);
    });
  }

  dispose() {
    this.disposed = true;
    try {
      this.worker.terminate();
    } catch {}
    this.listeners = [];
  }
}

export function mapSliderToEngine(slider: number): { skill: number; movetimeMs: number } {
  const clamped = Math.max(1, Math.min(20, Math.round(slider)));
  // Skill is just slider clamped to 0..19 (slider 1 → skill 0).
  const skill = Math.max(0, clamped - 1);
  // movetime: piecewise interpolation through these anchors.
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
