import { NextResponse } from 'next/server';

/**
 * Chrome DevTools App-Specific Integration Endpoint
 *
 * This endpoint is requested by Chrome DevTools to check for developer tools
 * integration capabilities. We return a basic configuration to prevent 404 errors
 * while indicating this is a portfolio website without special DevTools integration.
 */

export async function GET() {
  const response = {
    type: 'web',
    title: 'Aditya Gambhir Portfolio',
    description: 'Portfolio website - no special DevTools integration',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    webSocketDebuggerUrl: null,
    devtoolsFrontendUrl: null,
  };

  return NextResponse.json(response, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'application/json',
    },
  });
}

// Handle other HTTP methods
export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
