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
