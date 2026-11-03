import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      try {
        const formData = await request.formData();
        body = Object.fromEntries(formData.entries());
      } catch {
        body = {};
      }
    }

    const { fullName, email, phone, helpTopic, message, consent } = body;

    if (!fullName || !email || !helpTopic || !message) {
      return NextResponse.json(
        { error: 'Full name, email, help topic and message are required.' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: 'Please accept the privacy policy to submit your enquiry.' },
        { status: 400 }
      );
    }

    const enquiryRecord = {
      timestamp: new Date().toISOString(),
      fullName,
      email,
      phone: phone || 'Not provided',
      helpTopic,
      message,
    };

    console.log('[SEYOL GUIDANCE ENQUIRY RECEIVED]:', enquiryRecord);

    return NextResponse.json({
      success: true,
      message: 'Enquiry received successfully.',
      data: enquiryRecord,
    });
  } catch (error) {
    console.error('Error handling guidance enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to process enquiry.' },
      { status: 500 }
    );
  }
}

