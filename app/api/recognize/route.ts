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

  const block = response.content.find((c: { type: string }) => c.type === 'text');
  const text = block && 'text' in block ? (block as { text: string }).text : '';
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
