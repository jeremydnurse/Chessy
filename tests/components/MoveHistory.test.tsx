import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MoveHistory } from '@/components/MoveHistory';

describe('MoveHistory', () => {
  it('renders pairs as numbered rows', () => {
    render(<MoveHistory moves={['e4', 'e5', 'Nf3', 'Nc6', 'Bb5']} />);
    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('e4')).toBeInTheDocument();
    expect(screen.getByText('e5')).toBeInTheDocument();
    expect(screen.getByText('2.')).toBeInTheDocument();
    expect(screen.getByText('Nf3')).toBeInTheDocument();
    expect(screen.getByText('Nc6')).toBeInTheDocument();
    expect(screen.getByText('3.')).toBeInTheDocument();
    expect(screen.getByText('Bb5')).toBeInTheDocument();
  });

  it('shows placeholder when empty', () => {
    render(<MoveHistory moves={[]} />);
    expect(screen.getByText(/no moves yet/i)).toBeInTheDocument();
  });
});
