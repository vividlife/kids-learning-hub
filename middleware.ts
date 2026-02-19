import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const session = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  const pathname = request.nextUrl.pathname

  // Protect learning related pages
  const protectedPaths = [
    '/learning',
    '/learn',
    '/practice',
    '/vocabulary',
    '/ai'
  ];

  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtectedPath &amp;&amp; !session) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/learning/:path*',
    '/learn/:path*',
    '/practice/:path*',
    '/vocabulary/:path*',
    '/ai/:path*',
  ],
};
