import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      amount,
      currency = 'inr',
      title,
      subtitle,
      customerName,
      customerEmail,
      customerPhone,
      orderType = 'product',
      shippingAddress,
      items,
      serviceDetails,
      notes,
    } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid payment amount' }, { status: 400 });
    }

    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const origin = `${protocol}://${host}`;

    // Stripe expects amounts in the smallest currency unit (paise / cents)
    const unitAmount = Math.round(amount * 100);

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    if (items && Array.isArray(items) && items.length > 0) {
      lineItems = items.map((item: any) => ({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: item.title || 'SEYOL Product',
            description: item.volumeOrType || undefined,
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: Number(item.quantity) || 1,
      }));
    } else {
      lineItems = [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: title || (orderType === 'service' ? 'SEYOL Service Booking' : 'SEYOL Product Order'),
              description: subtitle || `Official SEYOL Care - Client: ${customerName || 'Valued Customer'}`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ];
    }

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail && customerEmail.includes('@') ? customerEmail : undefined,
      metadata: {
        orderType,
        customerName: customerName || 'Valued Customer',
        customerPhone: customerPhone || '',
        customerEmail: customerEmail || '',
        shippingStreet: shippingAddress?.street || '',
        shippingCity: shippingAddress?.city || '',
        shippingState: shippingAddress?.state || '',
        shippingPincode: shippingAddress?.pincode || '',
        itemsJson: items ? JSON.stringify(items).slice(0, 450) : '',
        serviceDetailsJson: serviceDetails ? JSON.stringify(serviceDetails).slice(0, 450) : '',
        notes: notes || '',
        title: title || '',
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: orderType === 'service' ? `${origin}/book` : `${origin}/products`,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize Stripe checkout session' },
      { status: 500 }
    );
  }
}
