import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { isValidPlacement, completeFen, isValidFen } from '@/lib/fen';

const SYSTEM_PROMPT = `You read chess board screenshots and report the position by calling the report_position tool.
- "fen": piece-placement field only — 8 ranks separated by "/", top rank (rank 8) first. Uppercase = white, lowercase = black, digits 1-8 = empty squares.
- "sideToMove": "w" or "b". Default to "w" when not indicated in the image.
- "confidence": 0..1. Use 0 if the board cannot be read; put a brief explanation in "notes".
- Always call the tool exactly once.`;

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
  if (!isValidFen(full)) {
    return NextResponse.json({ error: 'Constructed FEN is illegal', raw: parsed }, { status: 422 });
  }

  return NextResponse.json(parsed);
}
