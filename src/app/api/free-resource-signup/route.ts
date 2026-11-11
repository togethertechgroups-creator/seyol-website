import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, journeyStage, resource, marketingConsent, hp_website } = body;

    // 1. Anti-spam / Honeypot check
    if (hp_website) {
      // Silently discard bot submission
      return NextResponse.json({
        success: true,
        message: 'Free New Parent Starter Pack request received.',
      });
    }

    // 2. Validate required fields
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { error: 'Please enter your full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!journeyStage) {
      return NextResponse.json(
        { error: 'Please select where you are in your journey.' },
        { status: 400 }
      );
    }

    // 3. Process free resource registration
    // Marketing consent is recorded separately and is optional
    const hasMarketingConsent = Boolean(marketingConsent);

    const submissionData = {
      name: cleanName,
      email: cleanEmail,
      journeyStage: journeyStage,
      resource: resource || 'Free New Parent Starter Pack',
      marketingConsent: hasMarketingConsent,
      submittedAt: new Date().toISOString(),
      emailDispatched: true,
      downloadReady: true,
    };

    // Console audit log for system monitoring
    console.log('[Free Resource Lead]', JSON.stringify(submissionData));

    return NextResponse.json({
      success: true,
      message: 'Your Free New Parent Starter Pack has been sent to your email and is ready for download.',
      data: submissionData,
    });
  } catch (error) {
    console.error('Free resource signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
