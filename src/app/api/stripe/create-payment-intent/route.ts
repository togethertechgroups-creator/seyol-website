import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripeServer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = 'inr', description, receiptEmail, metadata = {} } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'A valid payment amount is required.' },
        { status: 400 }
      );
    }

    // Stripe accepts amounts in the smallest currency unit (cents / paise)
    const amountInSmallestUnit = Math.round(Number(amount) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency: (currency || 'inr').toLowerCase(),
      description: description || 'SEYOL Sacred Mother & Baby Care',
      receipt_email: receiptEmail && receiptEmail.includes('@') ? receiptEmail : undefined,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        ...metadata,
        platform: 'SEYOL Care Web Application',
        createdAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });
  } catch (err: any) {
    console.error('Error creating Stripe PaymentIntent:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to create Stripe payment session.' },
      { status: 500 }
    );
  }
}
