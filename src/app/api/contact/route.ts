import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import mongoClientPromise from '@/lib/mongodb';
import { logger } from '@/lib/logger';

// TypeScript interfaces for better type safety
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  captchaToken: string;
}

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: Date;
  ipAddress?: string;
}

// Database configuration
const DB_NAME = 'portfolio_messages';
const COLLECTION_NAME = 'contacts';

// Validation constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_SUBJECT_LENGTH = 3;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 2000;

/**
 * Validates environment variables required for the contact API
 */
function validateEnvironmentVariables(): void {
  const requiredVars = [
    'MONGODB_URI',
    'RECAPTCHA_SECRET_KEY',
    'EMAIL_USER',
    'EMAIL_PASS',
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`,
    );
  }
}

/**
 * Validates the contact form data
 */
function validateContactForm(data: Partial<ContactFormData>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push('Name is required');
  } else if (data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.push('Invalid email format');
  }

  if (!data.subject?.trim()) {
    errors.push('Subject is required');
  } else if (data.subject.trim().length < MIN_SUBJECT_LENGTH) {
    errors.push('Subject must be at least 3 characters long');
  }

  if (!data.message?.trim()) {
    errors.push('Message is required');
  } else if (data.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.push(
      `Message must be at least ${MIN_MESSAGE_LENGTH} characters long`,
    );
  } else if (data.message.trim().length > MAX_MESSAGE_LENGTH) {
    errors.push(`Message must not exceed ${MAX_MESSAGE_LENGTH} characters`);
  }

  if (!data.captchaToken) {
    errors.push('reCAPTCHA verification is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Verifies reCAPTCHA token with Google's API
 */
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY!;
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
      },
    );

    if (!response.ok) {
      throw new Error('Failed to verify reCAPTCHA');
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    logger.error('reCAPTCHA verification failed', {
      error: error instanceof Error ? error.message : String(error),
    });
    return false;
  }
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 */
function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sends email using nodemailer
 */
async function sendEmail(data: ContactFormData): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const sanitizedName = sanitizeHtml(data.name.trim());
  const sanitizedEmail = sanitizeHtml(data.email.trim());
  const sanitizedSubject = sanitizeHtml(data.subject.trim());
  const sanitizedMessage = sanitizeHtml(data.message.trim());

  const recipient = 'gambhir.aditya19@gmail.com';
  const senderAddress =
    process.env.EMAIL_USER === recipient
      ? 'adityajune196@gmail.com'
      : process.env.EMAIL_USER!;

  await transporter.sendMail({
    from: senderAddress,
    to: recipient,
    subject: sanitizedSubject,
    replyTo: sanitizedEmail,
    text: `Name: ${data.name.trim()}\nEmail: ${data.email.trim()}\nSubject: ${data.subject.trim()}\n\nMessage:\n${data.message.trim()}`,
    html: `
      <div style="font-family: 'Poppins', system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: hsl(var(--foreground, 14% 0 0)); background-color: hsl(var(--background, 100% 0 0));">
        <h2 style="color: hsl(var(--foreground, 14% 0 0)); border-bottom: 2px solid hsl(var(--primary, 45% 0.18 145)); padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="background-color: hsl(var(--muted, 97% 0 0)); padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid hsl(var(--border, 89% 0 0));">
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}" style="color: hsl(var(--primary, 45% 0.18 145));">${sanitizedEmail}</a></p>
          <p><strong>Subject:</strong> ${sanitizedSubject}</p>
        </div>
        <div style="margin: 20px 0;">
          <h3 style="color: hsl(var(--foreground, 14% 0 0));">Message:</h3>
          <div style="background-color: hsl(var(--card, 100% 0 0)); padding: 15px; border-left: 4px solid hsl(var(--primary, 45% 0.18 145)); border-radius: 6px; border: 1px solid hsl(var(--border, 89% 0 0));">
            ${sanitizedMessage.replace(/\n/g, '<br>')}
          </div>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid hsl(var(--border, 89% 0 0)); color: hsl(var(--muted-foreground, 45% 0 0)); font-size: 12px;">
          <p>This message was sent from your portfolio contact form.</p>
        </div>
      </div>
    `,
  });
}

/**
 * Saves contact message to MongoDB
 */
async function saveContactMessage(
  data: ContactFormData,
  ipAddress?: string,
): Promise<void> {
  const client = await mongoClientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection<ContactMessage>(COLLECTION_NAME);

  const contactMessage: ContactMessage = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    subject: data.subject.trim(),
    message: data.message.trim(),
    timestamp: new Date(),
    ...(ipAddress && { ipAddress }),
  };

  await collection.insertOne(contactMessage);
}

/**
 * GET handler - returns method not allowed
 */
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

/**
 * POST handler for contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    validateEnvironmentVariables();

    // Parse request body
    let body: Partial<ContactFormData>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 },
      );
    }

    // Validate form data
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.errors,
        },
        { status: 400 },
      );
    }

    const formData = body as ContactFormData;

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(formData.captchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 403 },
      );
    }

    // Get client IP address for logging
    const ipAddress =
      request.headers.get('x-forwarded-for') ??
      request.headers.get('x-real-ip') ??
      'unknown';

    // Send email and save to database concurrently
    await Promise.all([
      sendEmail(formData),
      saveContactMessage(formData, ipAddress),
    ]);

    return NextResponse.json(
      {
        message: 'Message sent successfully',
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    logger.error('Contact API request failed', {
      error: error instanceof Error ? error.message : String(error),
    });

    // Don't expose internal error details to clients
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 },
    );
  }
}

/**
 * Handle other HTTP methods
 */
export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
