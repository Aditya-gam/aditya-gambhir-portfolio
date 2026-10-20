import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { logger } from '@/lib/logger';
import { sanitizeHtml, validateContactFormSubmission } from '@/lib/validation';

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string; // honeypot
  elapsedMs?: number; // time-trap
}

const CONTACT_TO = process.env.CONTACT_TO ?? 'gambhir.aditya19@gmail.com';
// Use a verified domain sender for live sends; resend.dev works for testing.
const CONTACT_FROM =
  process.env.CONTACT_FROM ?? 'Portfolio Contact <onboarding@resend.dev>';
const MIN_ELAPSED_MS = 1500;

function renderEmailHtml(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const { name, email, subject, message } = data;
  return `
  <div style="font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;color:#1c1830;">
    <div style="background:linear-gradient(115deg,#8b5cf6,#d94690,#6366f1);padding:20px 24px;border-radius:14px 14px 0 0;">
      <h2 style="margin:0;color:#fff;font-size:18px;">New portfolio message</h2>
    </div>
    <div style="border:1px solid #ece9f5;border-top:none;border-radius:0 0 14px 14px;padding:24px;">
      <p style="margin:0 0 6px;"><strong>Name:</strong> ${name}</p>
      <p style="margin:0 0 6px;"><strong>Email:</strong>
        <a href="mailto:${email}" style="color:#6d28d9;">${email}</a></p>
      <p style="margin:0 0 16px;"><strong>Subject:</strong> ${subject}</p>
      <div style="background:#faf9ff;border-left:4px solid #8b5cf6;border-radius:8px;padding:14px 16px;line-height:1.6;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <p style="margin:20px 0 0;color:#8a86a0;font-size:12px;">Sent from your portfolio contact form.</p>
    </div>
  </div>`;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      logger.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 503 },
      );
    }

    let body: ContactPayload;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 },
      );
    }

    // Spam traps — respond 200 so bots don't learn they were caught.
    if (body.company && body.company.trim().length > 0) {
      logger.warn('Contact honeypot triggered');
      return NextResponse.json({ message: 'Message sent successfully' });
    }
    if (typeof body.elapsedMs === 'number' && body.elapsedMs < MIN_ELAPSED_MS) {
      logger.warn('Contact time-trap triggered', { elapsedMs: body.elapsedMs });
      return NextResponse.json({ message: 'Message sent successfully' });
    }

    const validation = validateContactFormSubmission(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 },
      );
    }

    const name = body.name!.trim();
    const email = body.email!.trim();
    const subject = body.subject!.trim();
    const message = body.message!.trim();

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: renderEmailHtml({
        name: sanitizeHtml(name),
        email: sanitizeHtml(email),
        subject: sanitizeHtml(subject),
        message: sanitizeHtml(message),
      }),
    });

    if (error) {
      logger.error('Resend send failed', { error: error.message });
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    logger.error('Contact API request failed', {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 },
    );
  }
}

const methodNotAllowed = () =>
  NextResponse.json({ error: 'Method not allowed' }, { status: 405 });

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const PATCH = methodNotAllowed;
