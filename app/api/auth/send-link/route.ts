import { NextRequest, NextResponse } from 'next/server';
import { generateMagicLink, isAllowedEmail } from '@/lib/auth';
import { sendMagicLinkEmail } from '@/lib/email';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = (typeof body.email === 'string' ? body.email : '').trim().toLowerCase();

  // Uniform success response — never reveal which emails are allowed.
  const ok = () => NextResponse.json({ success: true });

  if (!email) return ok();
  if (!isAllowedEmail(email)) return ok();

  // Rate limit: 5 per email per hour.
  const now = Date.now();
  const limit = rateLimitMap.get(email);
  if (limit && limit.resetAt > now && limit.count >= 5) return ok();
  if (!limit || limit.resetAt <= now) {
    rateLimitMap.set(email, { count: 1, resetAt: now + 3600_000 });
  } else {
    limit.count++;
  }

  const secret = process.env.JWT_SECRET;
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000').trim();

  if (!secret) {
    console.error('JWT_SECRET not configured');
    return ok();
  }

  const magicLinkUrl = await generateMagicLink(email, secret, baseUrl);
  await sendMagicLinkEmail(email, magicLinkUrl);

  return ok();
}
