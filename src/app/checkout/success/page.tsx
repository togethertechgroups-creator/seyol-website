'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Package,
  Calendar,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import { useCart } from '@/context/CartContext';
import { ProductOrder } from '@/types';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  const { orders, addOrder } = useAdminData();
  const { clearCart } = useCart();

  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<{
    orderNumber: string;
    amount: number;
    currency: string;
    customerName: string;
    customerPhone: string;
    orderType: 'product' | 'service';
    title: string;
  } | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setErrorMsg('No checkout session found. Please complete checkout to place an order.');
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    fetch(`/api/stripe/verify-session?sessionId=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (isCancelled) return;

        if (data.error || !data.isPaid) {
          setErrorMsg(data.error || 'Payment has not been completed or was interrupted.');
          setIsLoading(false);
          return;
        }

        const meta = data.metadata || {};
        const orderType = (meta.orderType || 'product') as 'product' | 'service';
        const customerName = meta.customerName || data.customerName || 'Valued Customer';
        const customerPhone = meta.customerPhone || '';
        const customerEmail = meta.customerEmail || data.customerEmail || 'client@seyolcare.com';
        const orderNumber = `SEY-${Date.now().toString().slice(-6)}`;
        const amount = data.amountTotal || 0;
        const currency = (data.currency || 'inr').toUpperCase();
        const title = meta.title || (orderType === 'service' ? 'Sacred Service Booking' : 'Product Order');

        // Check if this payment intent was already recorded to avoid duplicates
        const existingOrder = orders.find(
          (o) => o.stripePaymentIntentId === data.paymentIntentId || o.stripePaymentIntentId === sessionId
        );

        if (!existingOrder) {
          let items: any[] = [];
          if (meta.itemsJson) {
            try {
              items = JSON.parse(meta.itemsJson);
            } catch (e) {}
          }
          if (items.length === 0) {
            items = [
              {
                productId: `item-${Date.now()}`,
                title: title,
                volumeOrType: orderType === 'service' ? 'In-Home Care Service' : 'Organic Mother & Baby Care',
                price: amount,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
              },
            ];
          }

          let serviceDetails: any = undefined;
          if (meta.serviceDetailsJson) {
            try {
              serviceDetails = JSON.parse(meta.serviceDetailsJson);
            } catch (e) {}
          }

          const newOrder: ProductOrder = {
            id: `ord-${Date.now()}`,
            orderNumber,
            createdAt: new Date().toISOString(),
            customerName,
            customerPhone,
            customerEmail,
            shippingAddress: {
              street: meta.shippingStreet || 'Official SEYOL Address',
              city: meta.shippingCity || (currency === 'SGD' ? 'Singapore' : 'Chennai'),
              state: meta.shippingState || (currency === 'SGD' ? 'Singapore' : 'Tamil Nadu'),
              pincode: meta.shippingPincode || (currency === 'SGD' ? '238801' : '600020'),
            },
            items,
            subtotal: amount,
            discount: 0,
            shippingFee: 0,
            totalAmount: amount,
            paymentMethod: 'stripe',
            paymentStatus: 'paid', // Real Stripe live payment confirmed!
            orderStatus: 'confirmed',
            orderType,
            currency,
            stripePaymentIntentId: data.paymentIntentId || sessionId,
            notes: meta.notes || `Live Stripe Verified Payment: ${title}`,
            serviceDetails,
            timeline: [
              {
                status: 'confirmed',
                timestamp: new Date().toISOString(),
                note: `Order Confirmed! Real Stripe Payment of ${currency} ${amount} Verified (Stripe ID: ${
                  data.paymentIntentId || sessionId
                })`,
                actor: 'Stripe Live Gateway',
              },
            ],
          };

          addOrder(newOrder);
          clearCart();
        }

        setOrderDetails({
          orderNumber,
          amount,
          currency,
          customerName,
          customerPhone,
          orderType,
          title,
        });
        setIsVerified(true);
      })
      .catch((err) => {
        if (isCancelled) return;
        setErrorMsg(err.message || 'Verification failed. Please contact care team.');
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FAF6F0] flex items-center justify-center mb-4 border border-[#E8DCC4]">
          <Loader2 className="w-8 h-8 animate-spin text-[#7B1131]" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-[#3a1d1d] mb-2">
          Verifying Payment with Stripe...
        </h2>
        <p className="text-sm text-neutral-600 max-w-md">
          Please wait while we confirm your transaction securely with your bank. Do not close this window.
        </p>
      </div>
    );
  }

  if (errorMsg || !isVerified) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4 border border-red-200">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-[#3a1d1d] mb-2">
          Payment Not Verified
        </h2>
        <p className="text-sm text-neutral-600 max-w-md mb-6">
          {errorMsg || 'No completed payment was received. If money was debited, it will be refunded or contact us.'}
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs tracking-wider uppercase transition-colors"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const currencySymbol = orderDetails?.currency === 'SGD' ? 'SGD $' : '₹';
  const whatsappMsg = encodeURIComponent(
    `Hello SEYOL Team, I have completed payment for Order #${orderDetails?.orderNumber} (${orderDetails?.title}) of ${currencySymbol}${orderDetails?.amount}. Please confirm my booking!`
  );

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#FAF6F0] to-white py-16 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-[#E8DCC4] shadow-warm-lg text-center space-y-6">
        {/* Animated Green Badge */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-4 border-emerald-50 shadow-inner animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
            ✓ Live Payment Succeeded
          </span>
          <h1 className="font-serif font-bold text-3xl text-[#3a1d1d] mb-2">
            Payment &amp; Order Confirmed!
          </h1>
          <p className="text-sm text-[#6d534a]">
            Thank you, <strong className="text-[#3a1d1d]">{orderDetails?.customerName}</strong>. Your payment was verified by Stripe and your care request is now registered in our system.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#FAF6F0] rounded-2xl p-5 border border-[#E8DCC4] text-left space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-[#E8DCC4]/60 pb-2.5">
            <span className="text-[#8B6B4D] font-medium">Order / Booking Ref:</span>
            <span className="font-mono font-bold text-[#3a1d1d]">#{orderDetails?.orderNumber}</span>
          </div>

          <div className="flex items-center justify-between text-xs border-b border-[#E8DCC4]/60 pb-2.5">
            <span className="text-[#8B6B4D] font-medium">Item / Service:</span>
            <span className="font-semibold text-[#3a1d1d]">{orderDetails?.title}</span>
          </div>

          <div className="flex items-center justify-between text-xs border-b border-[#E8DCC4]/60 pb-2.5">
            <span className="text-[#8B6B4D] font-medium">Amount Paid (Verified):</span>
            <span className="font-serif font-extrabold text-lg text-emerald-800">
              {currencySymbol}{orderDetails?.amount.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[#8B6B4D] font-medium">Gateway Status:</span>
            <span className="font-bold text-emerald-800 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Paid (Stripe Live)</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <a
            href={`https://wa.me/919840793262?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-sm tracking-wide shadow-warm-md hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Instant Coordination on WhatsApp</span>
          </a>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Link
              href="/portal"
              className="py-3 px-4 rounded-xl border border-[#D5C2A5] text-[#3a1d1d] hover:bg-[#FAF6F0] font-bold text-xs transition-colors flex items-center justify-center space-x-1"
            >
              <span>View Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/"
              className="py-3 px-4 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        <div className="text-[11px] text-neutral-400 pt-2 flex items-center justify-center space-x-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Payment secured by Stripe Live Gateway &amp; RBI Compliant Standards</span>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#7B1131]" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
