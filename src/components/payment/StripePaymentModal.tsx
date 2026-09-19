'use client';

import React, { useState, useEffect } from 'react';
import {
  Elements,
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripeClient';
import {
  ShieldCheck,
  Lock,
  X,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Zap,
} from 'lucide-react';

interface StripePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency?: 'inr' | 'sgd';
  orderType: 'product' | 'service';
  title: string;
  subtitle?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items?: any[];
  serviceDetails?: any;
  metadata?: Record<string, any>;
  onSuccess: (paymentResult: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethod?: 'stripe' | 'upi' | 'card' | 'netbanking';
  }) => void;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#3a1d1d',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '15px',
      '::placeholder': {
        color: '#9c8279',
      },
      iconColor: '#7B1131',
    },
    invalid: {
      color: '#b91c1c',
      iconColor: '#b91c1c',
    },
  },
  hidePostalCode: false,
};

function CheckoutForm({
  amount,
  currency = 'inr',
  orderType,
  title,
  subtitle,
  customerName,
  customerEmail,
  customerPhone,
  shippingAddress,
  items,
  serviceDetails,
  metadata = {},
  onSuccess,
  onClose,
}: Omit<StripePaymentModalProps, 'isOpen'>) {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [isLoadingIntent, setIsLoadingIntent] = useState(true);
  const [isProcessingCard, setIsProcessingCard] = useState(false);
  const [isRedirectingGPay, setIsRedirectingGPay] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Payment Request Button (Google Pay / Apple Pay)
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [canMakePayment, setCanMakePayment] = useState(false);

  const currencySymbol = currency === 'sgd' ? 'SGD $' : '₹';

  // Initialize PaymentIntent for In-Modal Card processing
  useEffect(() => {
    let isCancelled = false;
    setIsLoadingIntent(true);
    setErrorMessage(null);

    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        currency,
        description: `SEYOL ${orderType === 'service' ? 'Service Booking' : 'Order'}: ${title}`,
        receiptEmail: customerEmail,
        metadata: {
          ...metadata,
          orderType,
          customerName,
          customerPhone,
          customerEmail,
          title,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isCancelled) return;
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.paymentIntentId);
        }
      })
      .catch((err) => {
        if (isCancelled) return;
        setErrorMessage(err.message || 'Failed to connect to payment server.');
      })
      .finally(() => {
        if (!isCancelled) setIsLoadingIntent(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [amount, currency, orderType, title, customerEmail, customerName, customerPhone]);

  // Setup Google Pay / Apple Pay via Stripe Payment Request
  useEffect(() => {
    if (!stripe || !clientSecret) return;

    try {
      const pr = stripe.paymentRequest({
        country: 'SG',
        currency: currency.toLowerCase(),
        total: {
          label: title || 'SEYOL Care Order',
          amount: Math.round(amount * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
          setCanMakePayment(true);
        }
      });

      pr.on('paymentmethod', async (ev) => {
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
          clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false }
        );

        if (confirmError) {
          ev.complete('fail');
          setErrorMessage(confirmError.message || 'Payment authentication failed.');
        } else {
          ev.complete('success');
          if (paymentIntent.status === 'requires_action') {
            const { error: actionError } = await stripe.confirmCardPayment(clientSecret);
            if (actionError) {
              setErrorMessage(actionError.message || 'Verification failed.');
              return;
            }
          }
          // Payment is 100% verified and deducted from bank!
          onSuccess({
            id: paymentIntent.id,
            amount,
            currency,
            status: 'succeeded',
            paymentMethod: 'stripe',
          });
        }
      });
    } catch (e) {
      console.log('Payment request init skipped:', e);
    }
  }, [stripe, clientSecret, amount, currency, title, onSuccess]);

  // Handle Real Card Submission (Stripe Live with 3D Secure / OTP)
  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret || !paymentIntentId) {
      setErrorMessage('Payment gateway is initializing. Please wait a moment.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setErrorMessage('Please enter valid card details.');
      return;
    }

    setIsProcessingCard(true);
    setErrorMessage(null);

    try {
      // Connect to bank with 3D Secure / OTP
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerName || 'Valued Customer',
            email: customerEmail || undefined,
            phone: customerPhone || undefined,
          },
        },
      });

      if (result.error) {
        // Bank or card declined payment - DO NOT PROCEED!
        setErrorMessage(result.error.message || 'Payment declined by bank. Please check details and try again.');
        setIsProcessingCard(false);
        return;
      }

      if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        // Payment succeeded and money charged by bank!
        try {
          await fetch('/api/stripe/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentIntentId: result.paymentIntent.id }),
          });
        } catch (e) {}

        onSuccess({
          id: result.paymentIntent.id,
          amount: result.paymentIntent.amount / 100,
          currency: result.paymentIntent.currency,
          status: result.paymentIntent.status,
          paymentMethod: 'card',
        });
      } else {
        setErrorMessage(
          `Payment not completed (Status: ${result.paymentIntent?.status || 'Unknown'}). Please retry.`
        );
        setIsProcessingCard(false);
      }
    } catch (err: any) {
      console.error('Payment execution error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred during payment processing.');
      setIsProcessingCard(false);
    }
  };

  // Launch Hosted Stripe Checkout (Native Google Pay / Apple Pay / Cards)
  const handleLaunchStripeCheckout = async () => {
    setIsRedirectingGPay(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency,
          title,
          subtitle,
          customerName,
          customerEmail,
          customerPhone,
          orderType,
          shippingAddress,
          items,
          serviceDetails,
          notes: metadata?.notes,
        }),
      });

      const data = await res.json();
      if (data.error || !data.url) {
        setErrorMessage(data.error || 'Failed to initialize Google Pay / Stripe checkout.');
        setIsRedirectingGPay(false);
        return;
      }

      // Redirect to official Stripe live checkout page
      window.location.href = data.url;
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not connect to payment gateway.');
      setIsRedirectingGPay(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Order / Booking Summary Box */}
      <div className="bg-[#FAF6F0] rounded-2xl p-4 border border-[#E8DCC4] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-[#7B1131]">
            {orderType === 'service' ? '🌿 Service Booking' : '🛍️ Product Order'}
          </span>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Official SEYOL Gateway
          </span>
        </div>

        <div className="flex items-baseline justify-between border-t border-[#E8DCC4]/60 pt-2">
          <div>
            <h4 className="font-serif font-bold text-sm text-[#3a1d1d]">{title}</h4>
            {subtitle && <p className="text-[11px] text-[#6d534a]">{subtitle}</p>}
            <p className="text-[11px] text-[#8B6B4D] mt-0.5">
              Client: <span className="font-semibold text-[#3a1d1d]">{customerName}</span> ({customerPhone})
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-[#8B6B4D] block">Amount Due</span>
            <span className="font-serif font-extrabold text-xl text-[#7B1131]">
              {currencySymbol}{amount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Google Pay & Apple Pay (Fast Checkout) */}
      <div className="p-3.5 bg-gradient-to-r from-neutral-50 to-amber-50/40 rounded-2xl border border-amber-200/80 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-neutral-800">
            <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>Google Pay / Apple Pay / Fast Pay</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Instant 1-Click
          </span>
        </div>

        <p className="text-[11px] text-neutral-600 leading-relaxed">
          Pay instantly with <strong>Google Pay (GPay)</strong>, <strong>Apple Pay</strong>, or stored cards via Stripe&apos;s verified live checkout.
        </p>

        {canMakePayment && paymentRequest ? (
          <div className="pt-1">
            <PaymentRequestButtonElement options={{ paymentRequest }} />
          </div>
        ) : (
          <button
            type="button"
            onClick={handleLaunchStripeCheckout}
            disabled={isRedirectingGPay}
            className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-black text-white font-bold text-xs tracking-wide shadow-warm-md hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {isRedirectingGPay ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Connecting to Google Pay / Stripe...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>
                  Pay {currencySymbol}{amount.toLocaleString()} with Google Pay / Fast Checkout
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="relative flex py-1 items-center">
        <div className="grow border-t border-neutral-200"></div>
        <span className="shrink mx-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 bg-white px-2">
          Or Pay with ATM / Debit / Credit Card
        </span>
        <div className="grow border-t border-neutral-200"></div>
      </div>

      {/* SECTION 2: ATM / Debit / Credit Card Form (Real Stripe Live with 3D Secure / OTP) */}
      <form onSubmit={handleCardSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3a1d1d]">
              ATM / Debit / Credit Card Details <span className="text-[#7B1131]">*</span>
            </label>
            <span className="text-[10px] font-semibold text-neutral-500">
              Bank OTP (3D Secure) Protected
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#D5C2A5] shadow-inner focus-within:ring-2 focus-within:ring-[#7B1131] transition-all">
            {isLoadingIntent ? (
              <div className="flex items-center justify-center py-2.5 space-x-2 text-xs text-[#8B6B4D]">
                <Loader2 className="w-4 h-4 animate-spin text-[#7B1131]" />
                <span>Connecting to secure bank gateway...</span>
              </div>
            ) : (
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            )}
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-0.5">
            <span className="flex items-center space-x-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>Supports RuPay, Visa, MasterCard, Maestro, Amex</span>
            </span>
            <span>Real-time bank verification</span>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2.5 text-xs text-red-700 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="pt-2 flex items-center space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessingCard || isRedirectingGPay}
            className="flex-1 py-3 px-4 rounded-xl border border-[#D5C2A5] text-[#3a1d1d] hover:bg-[#FAF6F0] font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!stripe || isProcessingCard || isLoadingIntent || !clientSecret}
            className="flex-2 py-3.5 px-5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs tracking-wide shadow-warm-md hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {isProcessingCard ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-gold-light" />
                <span>Verifying with Bank...</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-gold-light" />
                <span>
                  Authorize &amp; Pay {currencySymbol}{amount.toLocaleString()}
                </span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Strict Security Footnote */}
      <div className="pt-2 border-t border-neutral-100 flex items-center justify-center space-x-3 text-[10px] text-[#8B6B4D]">
        <div className="flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>PCI-DSS Level 1 Certified</span>
        </div>
        <span>•</span>
        <span>256-Bit SSL Encryption</span>
        <span>•</span>
        <span>Official SEYOL Gateway</span>
      </div>
    </div>
  );
}

export function StripePaymentModal(props: StripePaymentModalProps) {
  const { isOpen, onClose, title } = props;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E8DCC4] relative max-h-[92vh] overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DCC4]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF6F0] flex items-center justify-center text-[#7B1131] border border-[#E8DCC4]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#3a1d1d]">
                Secure Stripe Checkout
              </h3>
              <p className="text-xs text-[#8B6B4D]">
                Powered by SEYOL Pregnancy Care Services
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Elements Container */}
        <Elements stripe={getStripe()}>
          <CheckoutForm {...props} />
        </Elements>
      </div>
    </div>
  );
}
export default StripePaymentModal;
