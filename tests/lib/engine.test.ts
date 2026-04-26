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
  vi.resetModules();
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
