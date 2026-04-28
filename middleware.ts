import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/auth';

export function middleware(request: NextRequest) {
  if (request.cookies.get(SESSION_COOKIE_NAME)) {
    return NextResponse.next();
  }
  // No session → bounce to /auth, except for /auth itself, the auth API, and
  // the Stockfish worker assets (which are excluded by the matcher below too,
  // but defence in depth).
  return NextResponse.redirect(new URL('/auth', request.url));
}

export const config = {
  matcher: [
    // Match everything except: Next internals, favicon, the stockfish worker
    // assets, the /auth page, and the /api/auth/* endpoints.
    '/((?!_next/static|_next/image|favicon\\.ico|stockfish/|auth$|auth/|api/auth/).*)',
  ],
};
