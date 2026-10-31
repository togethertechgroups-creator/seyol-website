import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, resource, consent } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: 'Consent is required to receive the resource.' },
        { status: 400 }
      );
    }

    // Process free resource signup (log, integrate with CRM/newsletter, etc.)
    return NextResponse.json({
      success: true,
      message: 'Free resource request submitted successfully.',
      data: {
        name,
        email,
        resource,
        consent,
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

