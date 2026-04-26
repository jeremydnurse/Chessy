import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UploadZone } from '@/components/UploadZone';

vi.mock('@/lib/image', () => ({
  resizeAndEncode: vi.fn(async () => 'BASE64DATA'),
}));

describe('UploadZone', () => {
  it('calls onImage when a file is selected', async () => {
    const onImage = vi.fn();
    render(<UploadZone onImage={onImage} />);
    const file = new File(['x'], 'board.png', { type: 'image/png' });
    const input = screen.getByLabelText(/upload screenshot/i) as HTMLInputElement;
    await userEvent.upload(input, file);
    // resizeAndEncode is async; await a microtask flush
    await new Promise((r) => setTimeout(r, 0));
    expect(onImage).toHaveBeenCalledWith('BASE64DATA');
  });
});
