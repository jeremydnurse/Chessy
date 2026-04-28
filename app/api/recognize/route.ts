import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { isValidPlacement, completeFen, describeFenValidity } from '@/lib/fen';

const SYSTEM_PROMPT = `You read chess board screenshots and report the position by calling the report_position tool.

ORIENTATION: Boards may be shown from either side. Always use the visible file/rank labels around the board edge as the source of truth, NOT the position of the labels in the image:
- The file letter ("a"-"h") under a column tells you which file that column is, regardless of which side of the image it appears on.
- The rank number ("1"-"8") next to a row tells you which rank that row is, regardless of which side of the image it appears on.
- A board displayed from Black's perspective will have file labels reading h-g-f-e-d-c-b-a left-to-right and rank 1 at the top. Re-map every piece accordingly so your output is always in standard FEN order.
- If labels aren't visible, assume White's perspective (a-file at left, rank 8 at top).

OUTPUT (always call the tool exactly once):
- "fen": piece-placement field only — 8 ranks separated by "/", rank 8 first. Uppercase = white, lowercase = black, digits 1-8 = empty squares.
- "sideToMove": "w" or "b". Default to "w" when not indicated.
- "confidence": 0..1. Use 0 if the board cannot be read.
- "notes": one short sentence MAX. Do NOT think out loud here — keep your reasoning to yourself.`;

const REPORT_TOOL = {
  name: 'report_position',
  description: 'Report the chess position read from the screenshot.',
  input_schema: {
    type: 'object' as const,
    properties: {
      fen: {
        type: 'string',
        description: 'Piece-placement field only: 8 ranks separated by "/", rank 8 first. No castling/en-passant/halfmove/fullmove fields.',
      },
      sideToMove: { type: 'string', enum: ['w', 'b'] },
      confidence: { type: 'number', description: '0..1' },
      notes: { type: 'string' },
    },
    required: ['fen', 'sideToMove', 'confidence', 'notes'],
  },
};

interface ParsedResponse {
  fen: string;
  sideToMove: 'w' | 'b';
  confidence: number;
  notes: string;
}

function isParsedResponse(x: unknown): x is ParsedResponse {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.fen === 'string' &&
    (o.sideToMove === 'w' || o.sideToMove === 'b') &&
    typeof o.confidence === 'number' &&
    typeof o.notes === 'string'
  );
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
      max_tokens: 2048,
      temperature: 0,
      system: SYSTEM_PROMPT,
      tools: [REPORT_TOOL],
      tool_choice: { type: 'tool', name: REPORT_TOOL.name },
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: body.imageBase64 } },
            { type: 'text', text: 'Read this chess position and report it via the report_position tool.' },
          ],
        },
      ],
    });
  } catch (e) {
    return NextResponse.json({ error: 'Vision call failed', detail: String(e) }, { status: 502 });
  }

  const toolBlock = response.content.find((c: { type: string }) => c.type === 'tool_use');
  const input = toolBlock && 'input' in toolBlock ? (toolBlock as { input: unknown }).input : null;
  if (!isParsedResponse(input)) {
    return NextResponse.json(
      { error: 'Model did not return valid tool call', raw: response.content },
      { status: 422 },
    );
  }
  const parsed = input;

  if (!isValidPlacement(parsed.fen)) {
    return NextResponse.json({ error: 'Invalid FEN placement', raw: parsed }, { status: 422 });
  }

  const full = completeFen(parsed.fen, parsed.sideToMove);
  const validity = describeFenValidity(full);
  if (!validity.valid) {
    // Hand the recognized position to the editor so the user can correct it,
    // rather than failing the request. Mark it low-confidence so the banner
    // tells the user what's wrong.
    const note = `illegal position: ${validity.reason}`;
    return NextResponse.json({
      ...parsed,
      confidence: Math.min(parsed.confidence, 0.3),
      notes: parsed.notes ? `${parsed.notes} (${note})` : note,
    });
  }

  return NextResponse.json(parsed);
}
