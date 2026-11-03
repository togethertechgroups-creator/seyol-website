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

    const { fullName, email, phone, interest, experience, message, consent } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: 'Full name and email are required.' },
        { status: 400 }
      );
    }

    const applicationDetails = {
      timestamp: new Date().toISOString(),
      fullName,
      email,
      phone: phone || 'Not provided',
      interest: interest || 'Training Programme',
      experience: experience || 'Not specified',
      message: message || '',
      consent: !!consent,
      recipientEmail: 'hello@seyolpregnancycare.com'
    };

    console.log('[SEYOL CAREERS & TRAINING APPLICATION RECEIVED]:', applicationDetails);

    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: 'SEYOL Careers <noreply@seyolpregnancycare.com>',
            to: ['hello@seyolpregnancycare.com'],
            subject: `New SEYOL Career/Training Application from ${fullName} (${interest})`,
            html: `
              <h2>New SEYOL Career & Training Application</h2>
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Interest:</strong> ${interest}</p>
              <p><strong>Experience:</strong> ${experience || 'N/A'}</p>
              <p><strong>Background & Goals:</strong></p>
              <blockquote>${message || 'None provided'}</blockquote>
              <p><small>Submitted on ${new Date().toLocaleString()}</small></p>
            `
          })
        });
      } catch (err) {
        console.error('[Resend Email Error - Careers Apply]:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your application has been received. Our team will review your enquiry shortly.',
      data: applicationDetails
    });
  } catch (error: any) {
    console.error('[CAREERS APPLY ROUTE ERROR]:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your application.' },
      { status: 500 }
    );
  }
}
