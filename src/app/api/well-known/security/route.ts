import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
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
