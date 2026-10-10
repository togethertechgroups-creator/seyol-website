import Stripe from 'stripe';

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_build';

export const stripe = new Stripe(STRIPE_SECRET, {
  apiVersion: '2025-02-24.acacia' as any,
});
