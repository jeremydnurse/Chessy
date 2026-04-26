import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditMode } from '@/components/EditMode';

const STARTING = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

describe('EditMode', () => {
  it('shows the recognized confidence banner', () => {
    render(
      <EditMode
        recognized={{ fen: STARTING, sideToMove: 'w', confidence: 0.5, notes: 'hazy' }}
        onStart={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByText(/please double-check/i)).toBeInTheDocument();
    expect(screen.getByText(/hazy/i)).toBeInTheDocument();
  });

  it('emits a complete game config on Start', () => {
    const onStart = vi.fn();
    render(
      <EditMode
        recognized={{ fen: STARTING, sideToMove: 'w', confidence: 0.95, notes: '' }}
        onStart={onStart}
        onCancel={() => {}}
      />
    );
    fireEvent.click(screen.getByLabelText('Play as Black'));
    fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    expect(onStart).toHaveBeenCalledWith(expect.objectContaining({
      fen: expect.stringContaining(STARTING),
      humanColor: 'b',
      difficulty: expect.any(Number),
    }));
  });

  it('disables Start when FEN invalid', () => {
    render(
      <EditMode
        recognized={{ fen: STARTING, sideToMove: 'w', confidence: 1, notes: '' }}
        onStart={() => {}}
        onCancel={() => {}}
      />
    );
    fireEvent.change(screen.getByLabelText(/raw fen/i), { target: { value: 'garbage' } });
    expect(screen.getByRole('button', { name: /start game/i })).toBeDisabled();
  });
});
