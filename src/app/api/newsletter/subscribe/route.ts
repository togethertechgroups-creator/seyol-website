import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, consent, source } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Process newsletter subscription / store contact
    return NextResponse.json({
      success: true,
      message: 'Subscription successful',
      data: { email, consent, source, subscribedAt: new Date().toISOString() }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

