import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';

// GET — inquiries are now sent directly to Telegram, no DB storage
export async function GET(request: NextRequest) {
  const admin = authenticateRequest(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    inquiries: [],
    pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    message: 'Inquiries are now sent directly to Telegram. Check your Telegram bot for new inquiries.',
  });
}

// PATCH — no longer applicable
export async function PATCH(request: NextRequest) {
  const admin = authenticateRequest(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(
    { error: 'Database storage has been removed. Inquiries are sent to Telegram.' },
    { status: 410 }
  );
}

// DELETE — no longer applicable
export async function DELETE(request: NextRequest) {
  const admin = authenticateRequest(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(
    { error: 'Database storage has been removed. Inquiries are sent to Telegram.' },
    { status: 410 }
  );
}
