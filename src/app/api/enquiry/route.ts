import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { SeyolCareEnquiry, EnquiryStatus } from '@/types/enquiry';

const dataFilePath = path.resolve(process.cwd(), 'src/data/enquiries.json');

function getEnquiries(): SeyolCareEnquiry[] {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error('Error reading enquiries.json:', error);
  }
  return [];
}

function saveEnquiries(enquiries: SeyolCareEnquiry[]) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(enquiries, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing enquiries.json:', error);
  }
}

// GET: Retrieve all enquiries for admin
export async function GET() {
  try {
    const enquiries = getEnquiries();
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

// POST: Submit a new enquiry from the frontend form
export async function POST(request: Request) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON request payload' }, { status: 400 });
    }

    const {
      fullName,
      email,
      whatsappCountryCode,
      whatsappNumber,
      country,
      selectedHelpOptions,
      journeyStage,
      message,
      hp_website,
    } = body;

    // 1. Honeypot check for bots
    if (hp_website) {
      return NextResponse.json({
        success: true,
        message: 'Enquiry received. Our team will contact you shortly.',
      });
    }

    // 2. Validate required fields
    const cleanName = (fullName || '').trim();
    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { error: 'Please enter your full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    const cleanEmail = (email || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const cleanCountry = (country || '').trim();
    if (!cleanCountry) {
      return NextResponse.json(
        { error: 'Please select your country of residence.' },
        { status: 400 }
      );
    }

    const cleanCountryCode = (whatsappCountryCode || '+91').trim();
    const cleanPhoneDigits = (whatsappNumber || '').replace(/[^\d]/g, '');
    if (!cleanPhoneDigits || cleanPhoneDigits.length < 6) {
      return NextResponse.json(
        { error: 'Please enter a valid WhatsApp phone number (minimum 6 digits).' },
        { status: 400 }
      );
    }

    if (!journeyStage || typeof journeyStage !== 'string' || !journeyStage.trim()) {
      return NextResponse.json(
        { error: 'Please select where you are in your journey.' },
        { status: 400 }
      );
    }

    // 3. Format WhatsApp representation
    const whatsappFull = `${cleanCountryCode} ${(whatsappNumber || '').trim()}`;

    // 4. Duplicate prevention: check for identical submission in last 60 seconds
    const existingEnquiries = getEnquiries();
    const sixtySecondsAgo = Date.now() - 60 * 1000;
    const isDuplicate = existingEnquiries.some((enq) => {
      const enqTime = new Date(enq.createdAt).getTime();
      return (
        enq.email.toLowerCase() === cleanEmail &&
        enqTime > sixtySecondsAgo
      );
    });

    if (isDuplicate) {
      return NextResponse.json(
        { error: 'We recently received your enquiry! Our care team is already reviewing it.' },
        { status: 429 }
      );
    }

    // 5. Build new enquiry record
    const id = `ENQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const newEnquiry: SeyolCareEnquiry = {
      id,
      fullName: cleanName,
      email: cleanEmail,
      whatsappCountryCode: cleanCountryCode,
      whatsappNumber: (whatsappNumber || '').trim(),
      whatsappFull,
      country: cleanCountry,
      selectedHelpOptions: Array.isArray(selectedHelpOptions) ? selectedHelpOptions : [],
      journeyStage: journeyStage.trim(),
      message: (message || '').trim(),
      createdAt: new Date().toISOString(),
      status: 'New',
      adminNotes: '',
    };

    // Save persistently to enquiries.json
    existingEnquiries.unshift(newEnquiry);
    saveEnquiries(existingEnquiries);

    console.log('[SEYOL CARE ENQUIRY RECEIVED]:', JSON.stringify(newEnquiry));

    // Optional email dispatch if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const helpSummary = newEnquiry.selectedHelpOptions.length > 0
          ? newEnquiry.selectedHelpOptions.map(h => `• [${h.category}] ${h.option}`).join('<br>')
          : 'None specified';

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'SEYOL Support <care@seyol.com>',
            to: ['hello@seyolpregnancycare.com'],
            subject: `New Care Guidance Request: ${cleanName} (${journeyStage})`,
            html: `
              <h2>New SEYOL Care Enquiry</h2>
              <p><strong>Name:</strong> ${cleanName}</p>
              <p><strong>Email:</strong> ${cleanEmail}</p>
              <p><strong>WhatsApp:</strong> ${whatsappFull}</p>
              <p><strong>Country:</strong> ${cleanCountry}</p>
              <p><strong>Journey Stage:</strong> ${journeyStage}</p>
              <p><strong>Support Requested:</strong><br>${helpSummary}</p>
              <p><strong>Message / Questions:</strong><br>${newEnquiry.message || 'No additional notes provided'}</p>
              <p><strong>Enquiry ID:</strong> ${id}</p>
            `,
          }),
        });
      } catch (err) {
        console.warn('Email dispatch provider failed, logged to system:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been received. Our senior care team will connect with you shortly.',
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error('Error handling enquiry request:', error);
    return NextResponse.json(
      { error: 'Failed to process enquiry. Please try again.' },
      { status: 500 }
    );
  }
}

// PATCH: Update enquiry status or notes (Admin)
export async function PATCH(request: Request) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON request payload' }, { status: 400 });
    }

    const { id, status, adminNotes } = body;
    if (!id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 });
    }

    const validStatuses: EnquiryStatus[] = ['New', 'Contacted', 'In Progress', 'Resolved'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const enquiries = getEnquiries();
    const index = enquiries.findIndex((e) => e.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    if (status) enquiries[index].status = status;
    if (typeof adminNotes === 'string') enquiries[index].adminNotes = adminNotes;

    saveEnquiries(enquiries);

    return NextResponse.json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiry: enquiries[index],
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

// DELETE: Remove an enquiry (Admin)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 });
    }

    const enquiries = getEnquiries();
    const filtered = enquiries.filter((e) => e.id !== id);

    if (filtered.length === enquiries.length) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    saveEnquiries(filtered);

    return NextResponse.json({
      success: true,
      message: 'Enquiry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
