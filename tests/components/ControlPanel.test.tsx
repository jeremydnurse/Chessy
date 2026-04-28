import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ControlPanel } from '@/components/ControlPanel';

describe('ControlPanel', () => {
  it('emits color change', () => {
    const onChange = vi.fn();
    render(
      <ControlPanel
        humanColor="w"
        difficulty={8}
        onColorChange={onChange}
        onDifficultyChange={() => {}}
        onFlip={() => {}}
        onUndo={() => {}}
        onResign={() => {}}
        onNewGame={() => {}}
        onEdit={() => {}}
        onSavePosition={() => {}}
      />
    );
    fireEvent.click(screen.getByLabelText('Play as Black'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('emits difficulty change', () => {
    const onChange = vi.fn();
    render(
      <ControlPanel
        humanColor="w"
        difficulty={8}
        onColorChange={() => {}}
        onDifficultyChange={onChange}
        onFlip={() => {}}
        onUndo={() => {}}
        onResign={() => {}}
        onNewGame={() => {}}
        onEdit={() => {}}
        onSavePosition={() => {}}
      />
    );
    fireEvent.change(screen.getByLabelText(/difficulty/i), { target: { value: '15' } });
    expect(onChange).toHaveBeenCalledWith(15);
  });

  it('fires action button callbacks', () => {
    const flip = vi.fn(); const undo = vi.fn(); const resign = vi.fn(); const newGame = vi.fn();
    render(
      <ControlPanel
        humanColor="w"
        difficulty={8}
        onColorChange={() => {}}
        onDifficultyChange={() => {}}
        onFlip={flip}
        onUndo={undo}
        onResign={resign}
        onNewGame={newGame}
        onEdit={() => {}}
        onSavePosition={() => {}}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /flip/i }));
    fireEvent.click(screen.getByRole('button', { name: /undo/i }));
    fireEvent.click(screen.getByRole('button', { name: /resign/i }));
    fireEvent.click(screen.getByRole('button', { name: /new game/i }));
    expect(flip).toHaveBeenCalled();
    expect(undo).toHaveBeenCalled();
    expect(resign).toHaveBeenCalled();
    expect(newGame).toHaveBeenCalled();
  });

  it('fires edit and save callbacks', () => {
    const edit = vi.fn();
    const save = vi.fn();
    render(
      <ControlPanel
        humanColor="w"
        difficulty={8}
        onColorChange={() => {}}
        onDifficultyChange={() => {}}
        onFlip={() => {}}
        onUndo={() => {}}
        onResign={() => {}}
        onNewGame={() => {}}
        onEdit={edit}
        onSavePosition={save}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /^edit$/i }));
    fireEvent.click(screen.getByRole('button', { name: /save fen/i }));
    expect(edit).toHaveBeenCalled();
    expect(save).toHaveBeenCalled();
  });
});
