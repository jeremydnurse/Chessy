import { SignJWT, jwtVerify } from 'jose';

export interface MagicLinkPayload {
  email: string;
}

export const SESSION_COOKIE_NAME = 'chessy_session';

const ALLOWED_EMAILS = [
  'jeremydnurse@gmail.com',
  'nursedjm@gmail.com',
  'cpnurse@gmail.com',
];

export function isAllowedEmail(email: string): boolean {
  return ALLOWED_EMAILS.includes(email.trim().toLowerCase());
}

function encodeSecret(secret: string): Uint8Array {
  return new TextEncoder().encode(secret);
}

export async function generateMagicLink(
  email: string,
  secret: string,
  baseUrl: string,
): Promise<string> {
  const jwt = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(encodeSecret(secret));

  return `${baseUrl}/api/auth/verify?token=${jwt}`;
}

export async function verifyMagicLink(
  token: string,
  secret: string,
): Promise<MagicLinkPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodeSecret(secret));
    const { email } = payload as Record<string, unknown>;
    if (typeof email !== 'string') return null;
    return { email };
  } catch {
    return null;
  }
}
