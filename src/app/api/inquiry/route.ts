import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import { sendEmail, getInquiryNotificationEmail } from '@/lib/email';

// Rate limiting map (in-memory, resets on deploy)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // max inquiries per window
const RATE_WINDOW = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, company, gst, email, phone, product, quantity, message } = body;

    // Validation
    if (!name || !email || !phone || !product) {
      return NextResponse.json(
        { error: 'Name, email, phone, and product are required.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const inquiry = {
      name: String(name).trim().slice(0, 200),
      company: company ? String(company).trim().slice(0, 200) : '',
      gst: gst ? String(gst).trim().slice(0, 20) : '',
      email: String(email).trim().toLowerCase().slice(0, 200),
      phone: String(phone).trim().slice(0, 20),
      product: String(product).trim().slice(0, 500),
      quantity: quantity ? String(quantity).trim().slice(0, 200) : '',
      message: message ? String(message).trim().slice(0, 2000) : '',
      status: 'new' as const,
      createdAt: new Date(),
      ip,
    };

    // Store in MongoDB
    const db = await getDatabase();
    await db.collection(COLLECTIONS.INQUIRIES).insertOne(inquiry);

    // Send notification email (fire and forget)
    const emailData = getInquiryNotificationEmail(inquiry);
    sendEmail(emailData).catch(console.error);

    return NextResponse.json(
      { success: true, message: 'Inquiry submitted successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
