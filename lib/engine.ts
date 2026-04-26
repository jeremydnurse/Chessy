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
