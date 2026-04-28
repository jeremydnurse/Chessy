// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { isAllowedEmail, generateMagicLink, verifyMagicLink } from '@/lib/auth';

const SECRET = 'test-secret-at-least-32-characters-long';

describe('isAllowedEmail', () => {
  it('accepts whitelisted emails (exact match)', () => {
    expect(isAllowedEmail('jeremydnurse@gmail.com')).toBe(true);
    expect(isAllowedEmail('nursedjm@gmail.com')).toBe(true);
    expect(isAllowedEmail('cpnurse@gmail.com')).toBe(true);
  });
  it('is case-insensitive and trims', () => {
    expect(isAllowedEmail('  Jeremydnurse@Gmail.com  ')).toBe(true);
  });
  it('rejects non-whitelisted emails', () => {
    expect(isAllowedEmail('someone@gmail.com')).toBe(false);
    expect(isAllowedEmail('jeremydnurse@example.com')).toBe(false);
    expect(isAllowedEmail('')).toBe(false);
  });
});

describe('generateMagicLink / verifyMagicLink', () => {
  it('round-trips a token', async () => {
    const url = await generateMagicLink('jeremydnurse@gmail.com', SECRET, 'https://chessy.example');
    const token = new URL(url).searchParams.get('token');
    expect(token).toBeTruthy();
    const payload = await verifyMagicLink(token!, SECRET);
    expect(payload).toEqual({ email: 'jeremydnurse@gmail.com' });
  });
  it('rejects a token signed with a different secret', async () => {
    const url = await generateMagicLink('jeremydnurse@gmail.com', SECRET, 'https://chessy.example');
    const token = new URL(url).searchParams.get('token')!;
    expect(await verifyMagicLink(token, 'a-different-secret-32-bytes-long-xx')).toBeNull();
  });
  it('returns null for garbage tokens', async () => {
    expect(await verifyMagicLink('garbage', SECRET)).toBeNull();
  });
});
