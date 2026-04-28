// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.fn().mockResolvedValue({ id: 'msg' });

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

async function callRoute(body: unknown) {
  // Re-import inside the test so process.env changes take effect.
  const { POST } = await import('@/app/api/auth/send-link/route');
  const req = new Request('http://localhost/api/auth/send-link', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  return POST(req as unknown as Parameters<typeof POST>[0]);
}

describe('POST /api/auth/send-link', () => {
  beforeEach(() => {
    sendMock.mockClear();
    process.env.JWT_SECRET = 'test-secret-at-least-32-characters-long';
    process.env.NEXT_PUBLIC_BASE_URL = 'https://chessy.example';
    process.env.RESEND_API_KEY = 'test-resend';
    process.env.EMAIL_FROM = 'noreply@idealstate.co';
    vi.resetModules();
  });

  it('sends an email when the address is whitelisted', async () => {
    const res = await callRoute({ email: 'jeremydnurse@gmail.com' });
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledOnce();
    const args = sendMock.mock.calls[0][0];
    expect(args.to).toBe('jeremydnurse@gmail.com');
    expect(args.html).toContain('https://chessy.example/api/auth/verify?token=');
  });

  it('returns 200 but does not send when the address is not whitelisted', async () => {
    const res = await callRoute({ email: 'random@example.com' });
    expect(res.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('returns 200 and does not send when email is missing', async () => {
    const res = await callRoute({});
    expect(res.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });
});
