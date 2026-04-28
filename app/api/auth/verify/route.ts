import { NextRequest, NextResponse } from 'next/server';
import { verifyMagicLink, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return NextResponse.redirect(new URL('/auth?error=invalid-link', request.url));
  }

  const payload = await verifyMagicLink(token, secret);
  if (!payload) {
    return NextResponse.redirect(new URL('/auth?error=invalid-link', request.url));
  }

  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.set(SESSION_COOKIE_NAME, JSON.stringify({ email: payload.email }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
  return response;
}
