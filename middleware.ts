import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle security.txt requests (Chrome DevTools now handled by API route)
  if (pathname === '/.well-known/security.txt') {
    const securityTxt = `Contact: mailto:gambhir.aditya19@gmail.com
Preferred-Languages: en
Canonical: ${process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin}/.well-known/security.txt`;

    return new NextResponse(securityTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

  // Continue with normal request processing
  return NextResponse.next();
}

export const config = {
  matcher: '/.well-known/:path*',
};
