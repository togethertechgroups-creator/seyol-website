import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { FifteenMinuteCallAppointment } from '@/types/appointment';

const dataFilePath = path.resolve(process.cwd(), 'src/data/appointments.json');

function getAppointments(): FifteenMinuteCallAppointment[] {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error('Error reading appointments file:', error);
  }
  return [];
}

function saveAppointments(appointments: FifteenMinuteCallAppointment[]) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(appointments, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing appointments file:', error);
  }
}

export async function GET() {
  try {
    const appointments = getAppointments();
    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

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
      whatsapp,
      email,
      country,
      preferredDate,
      preferredTime,
      stage,
      notes,
    } = body;

    // Validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json({ error: 'Full Name is required.' }, { status: 400 });
    }

    if (!whatsapp || typeof whatsapp !== 'string' || !whatsapp.trim()) {
      return NextResponse.json({ error: 'WhatsApp Number is required.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid Email Address is required.' }, { status: 400 });
    }

    if (!country || typeof country !== 'string' || !country.trim()) {
      return NextResponse.json({ error: 'Country is required.' }, { status: 400 });
    }

    if (!preferredDate) {
      return NextResponse.json({ error: 'Preferred Appointment Date is required.' }, { status: 400 });
    }

    if (!preferredTime) {
      return NextResponse.json({ error: 'Preferred Time is required.' }, { status: 400 });
    }

    if (!stage) {
      return NextResponse.json({ error: 'Current stage is required.' }, { status: 400 });
    }

    const newAppointment: FifteenMinuteCallAppointment = {
      id: `CALL-${Math.floor(10000 + Math.random() * 90000)}`,
      fullName: fullName.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim().toLowerCase(),
      country: country.trim(),
      preferredDate,
      preferredTime,
      stage,
      notes: notes ? notes.trim() : '',
      durationMinutes: 15,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const appointments = getAppointments();
    appointments.unshift(newAppointment);
    saveAppointments(appointments);

    console.log('[SEYOL 15-MIN CALL BOOKED]:', newAppointment);

    return NextResponse.json({
      success: true,
      message: '15-Minute Call booked successfully.',
      appointment: newAppointment,
    });
  } catch (error) {
    console.error('Error booking 15-minute call:', error);
    return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
    }

    const appointments = getAppointments();
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    appointments[index].status = status;
    saveAppointments(appointments);

    return NextResponse.json({ success: true, appointment: appointments[index] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Appointment ID required' }, { status: 400 });
    }

    let appointments = getAppointments();
    appointments = appointments.filter((a) => a.id !== id);
    saveAppointments(appointments);

    return NextResponse.json({ success: true, message: 'Appointment deleted.' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
  }
}
