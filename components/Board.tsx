'use client';

import React from 'react';
import { Chessboard } from 'react-chessboard';
import type { PieceDropHandlerArgs } from 'react-chessboard';

export interface BoardProps {
  fen: string;
  orientation: 'white' | 'black';
  onMove: (from: string, to: string, promotion?: string) => boolean;
  lastMove?: { from: string; to: string };
  arePiecesDraggable?: boolean;
}

/** Returns true when a pawn on the given square has reached the last rank. */
function isPawnPromotion(pieceType: string, targetSquare: string): boolean {
  const rank = targetSquare[1];
  // wP reaching rank 8, or bP reaching rank 1
  if (pieceType === 'wP' && rank === '8') return true;
  if (pieceType === 'bP' && rank === '1') return true;
  return false;
}

export function Board({
  fen,
  orientation,
  onMove,
  lastMove,
  arePiecesDraggable = true,
}: BoardProps): React.JSX.Element {
  // Build per-square styles for last-move highlighting
  const squareStyles: Record<string, React.CSSProperties> = {};
  if (lastMove) {
    const highlight: React.CSSProperties = {
      backgroundColor: 'rgba(255, 255, 0, 0.4)',
    };
    squareStyles[lastMove.from] = highlight;
    squareStyles[lastMove.to] = highlight;
  }

  function handlePieceDrop({
    piece,
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs): boolean {
    // targetSquare is null when the piece is dropped off the board
    if (!targetSquare) return false;

    const promotion = isPawnPromotion(piece.pieceType, targetSquare)
      ? 'q'
      : undefined;

    return onMove(sourceSquare, targetSquare, promotion);
  }

  return (
    <Chessboard
      options={{
        position: fen,
        boardOrientation: orientation,
        allowDragging: arePiecesDraggable,
        squareStyles,
        onPieceDrop: handlePieceDrop,
      }}
    />
  );
}
