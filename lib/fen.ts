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

// Derive castling rights from the placement. Castling is only possible if the
// king is on its home square and the relevant rook is on its corner — having
// "KQkq" hardcoded for arbitrary positions can confuse Stockfish.
export function deriveCastlingRights(placement: string): string {
  const ranks = placement.split('/');
  if (ranks.length !== 8) return '-';
  const expand = (rank: string): string => {
    let out = '';
    for (const ch of rank) out += /[1-8]/.test(ch) ? '.'.repeat(Number(ch)) : ch;
    return out;
  };
  const rank1 = expand(ranks[7]);
  const rank8 = expand(ranks[0]);
  let rights = '';
  if (rank1[4] === 'K' && rank1[7] === 'R') rights += 'K';
  if (rank1[4] === 'K' && rank1[0] === 'R') rights += 'Q';
  if (rank8[4] === 'k' && rank8[7] === 'r') rights += 'k';
  if (rank8[4] === 'k' && rank8[0] === 'r') rights += 'q';
  return rights || '-';
}

export function completeFen(placement: string, sideToMove: 'w' | 'b'): string {
  return `${placement} ${sideToMove} ${deriveCastlingRights(placement)} - 0 1`;
}

export function isValidFen(fen: string): boolean {
  try {
    new Chess(fen);
    return true;
  } catch {
    return false;
  }
}

export type FenValidity = { valid: true } | { valid: false; reason: string };

export function describeFenValidity(fen: string): FenValidity {
  try {
    new Chess(fen);
    return { valid: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    // Strip the noisy "Invalid FEN: " prefix chess.js adds.
    return { valid: false, reason: message.replace(/^Invalid FEN:\s*/i, '') };
  }
}
