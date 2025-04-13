import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const verified = verifyToken(token);

  if (!verified) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
