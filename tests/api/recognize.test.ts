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
