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

    const { name, email, phone, supportType, preferredContact, notes } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    // Format enquiry details for care team
    const enquiryDetails = {
      timestamp: new Date().toISOString(),
      fullName: name,
      emailAddress: email,
      phoneNumber: phone || 'Not provided',
      supportType: supportType || "I'm not sure — please guide me",
      preferredContactMethod: preferredContact || 'Email',
      additionalNotes: notes || 'No additional notes provided',
      recipientEmail: 'hello@seyolpregnancycare.com'
    };

    console.log('[SEYOL CARE ENQUIRY RECEIVED]:', enquiryDetails);

    // If an SMTP or email service provider (e.g. Resend / SendGrid / Nodemailer) is configured in environment variables:
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: 'SEYOL Support <care@seyol.com>',
            to: ['hello@seyolpregnancycare.com'],
            subject: `New Care Consultation Request: ${name} (${supportType})`,
            html: `
              <h2>New Consultation Request - SEYOL Guide</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Support Needed:</strong> ${supportType}</p>
              <p><strong>Preferred Contact Method:</strong> ${preferredContact}</p>
              <p><strong>Notes:</strong> ${notes || 'None'}</p>
            `
          })
        });
      } catch (err) {
        console.warn('Email dispatch provider failed, logged to system:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation request received successfully.',
      data: enquiryDetails
    });
  } catch (error) {
    console.error('Error handling enquiry request:', error);
    return NextResponse.json(
      { error: 'Failed to process consultation request.' },
      { status: 500 }
    );
  }
}
