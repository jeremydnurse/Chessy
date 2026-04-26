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

describe('mapSliderToEngine', () => {
  it('maps slider 1 to skill 0 / movetime 100', async () => {
    const { mapSliderToEngine } = await import('@/lib/engine');
    expect(mapSliderToEngine(1)).toEqual({ skill: 0, movetimeMs: 100 });
  });
  it('maps slider 8 to skill 7 / movetime 1000', async () => {
    const { mapSliderToEngine } = await import('@/lib/engine');
    expect(mapSliderToEngine(8)).toEqual({ skill: 7, movetimeMs: 1000 });
  });
  it('maps slider 20 to skill 19 / movetime 3000', async () => {
    const { mapSliderToEngine } = await import('@/lib/engine');
    expect(mapSliderToEngine(20)).toEqual({ skill: 19, movetimeMs: 3000 });
  });
  it('clamps out-of-range values', async () => {
    const { mapSliderToEngine } = await import('@/lib/engine');
    expect(mapSliderToEngine(0)).toEqual({ skill: 0, movetimeMs: 100 });
    expect(mapSliderToEngine(99)).toEqual({ skill: 19, movetimeMs: 3000 });
  });
});
