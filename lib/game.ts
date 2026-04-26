import { Chess, Move } from 'chess.js';

export type GameResult =
  | { over: false }
  | { over: true; kind: 'checkmate'; winner: 'w' | 'b' }
  | { over: true; kind: 'stalemate' | 'draw' | 'threefold' | 'insufficient' | 'fiftymove' };

export class Game {
  private chess: Chess;

  constructor(fen?: string) {
    this.chess = fen ? new Chess(fen) : new Chess();
  }

  fen(): string {
    return this.chess.fen();
  }

  turn(): 'w' | 'b' {
    return this.chess.turn();
  }

  history(): string[] {
    return this.chess.history();
  }

  move(m: { from: string; to: string; promotion?: string }): boolean {
    try {
      const result = this.chess.move(m);
      return result !== null;
    } catch {
      return false;
    }
  }

  undo(): Move | null {
    return this.chess.undo() ?? null;
  }

  load(fen: string): void {
    this.chess.load(fen);
  }

  legalMovesFrom(square: string): string[] {
    return (this.chess.moves({ square: square as Parameters<Chess['moves']>[0]['square'], verbose: true }) as Move[])
      .map((m) => m.to);
  }

  result(): GameResult {
    if (this.chess.isCheckmate()) {
      return { over: true, kind: 'checkmate', winner: this.chess.turn() === 'w' ? 'b' : 'w' };
    }
    if (this.chess.isStalemate()) return { over: true, kind: 'stalemate' };
    if (this.chess.isThreefoldRepetition()) return { over: true, kind: 'threefold' };
    if (this.chess.isInsufficientMaterial()) return { over: true, kind: 'insufficient' };
    if (this.chess.isDrawByFiftyMoves()) return { over: true, kind: 'fiftymove' };
    if (this.chess.isDraw()) return { over: true, kind: 'draw' };
    return { over: false };
  }
}
