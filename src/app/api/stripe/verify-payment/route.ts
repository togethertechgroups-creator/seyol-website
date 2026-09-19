import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripeServer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { paymentIntentId } = body;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'paymentIntentId is required.' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      return NextResponse.json({
        verified: true,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        paymentIntentId: paymentIntent.id,
        created: paymentIntent.created,
      });
    } else {
      return NextResponse.json({
        verified: false,
        status: paymentIntent.status,
        message: `Payment is currently in ${paymentIntent.status} state.`,
      });
    }
  } catch (err: any) {
    console.error('Error verifying Stripe PaymentIntent:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to verify payment with Stripe.' },
      { status: 500 }
    );
  }
}
