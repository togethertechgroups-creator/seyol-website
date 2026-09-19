'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles, 
  Tag, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Truck,
  Lock,
  Loader2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAdminData } from '../../context/AdminDataContext';
import { ProductOrder } from '../../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    total,
    totalItems,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { addOrder } = useAdminData();

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ProductOrder | null>(null);

  // Customer Details Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '',
    paymentMethod: 'stripe' as 'stripe' | 'cod' | 'whatsapp',
    notes: '',
  });

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(false);
    if (!applyCoupon(couponInput)) {
      setCouponError(true);
    } else {
      setCouponInput('');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.street) {
      alert('Please fill in your Name, Phone Number, and Delivery Address.');
      return;
    }

    if (formData.paymentMethod === 'stripe') {
      setIsSubmitting(true);
      fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'inr',
          title: `SEYOL Order (${cart.length} item${cart.length > 1 ? 's' : ''})`,
          subtitle: cart.map((i) => `${i.title} (${i.volumeOrType}) x${i.quantity}`).join(', '),
          customerName: formData.name.trim(),
          customerEmail: formData.email.trim() || 'customer@seyolcare.com',
          customerPhone: formData.phone.trim(),
          orderType: 'product',
          shippingAddress: {
            street: formData.street.trim(),
            city: formData.city.trim() || 'Chennai',
            state: formData.state.trim() || 'Tamil Nadu',
            pincode: formData.pincode.trim() || '600001',
          },
          items: cart.map((item) => ({
            productId: item.id,
            title: item.title,
            volumeOrType: item.volumeOrType,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          notes: formData.notes.trim(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error || !data.url) {
            alert(data.error || 'Failed to start payment. Please try again.');
            setIsSubmitting(false);
            return;
          }
          // Straight to Stripe Checkout payment page!
          window.location.href = data.url;
        })
        .catch((err) => {
          alert(err.message || 'Payment connection error. Please try again.');
          setIsSubmitting(false);
        });
      return;
    }

    if (formData.paymentMethod === 'cod') {
      setIsSubmitting(true);
      const randomDigits = Math.floor(10000 + Math.random() * 90000);
      const orderNum = `SEY-${randomDigits}`;
      const orderId = `ord-${Date.now()}`;

      const newOrder: ProductOrder = {
        id: orderId,
        orderNumber: orderNum,
        createdAt: new Date().toISOString(),
        customerName: formData.name.trim(),
        customerPhone: formData.phone.trim(),
        customerEmail: formData.email.trim() || 'customer@seyolcare.com',
        shippingAddress: {
          street: formData.street.trim(),
          city: formData.city.trim() || 'Chennai',
          state: formData.state.trim() || 'Tamil Nadu',
          pincode: formData.pincode.trim() || '600001',
        },
        items: cart.map((item) => ({
          productId: item.id,
          title: item.title,
          volumeOrType: item.volumeOrType,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal: subtotal,
        discount: discount,
        shippingFee: 0,
        totalAmount: total,
        paymentMethod: 'cod',
        paymentStatus: 'cod',
        orderStatus: 'pending',
        orderType: 'product',
        currency: 'INR',
        notes: formData.notes.trim(),
        timeline: [
          {
            status: 'pending',
            timestamp: new Date().toISOString(),
            note: 'Order placed with Cash on Delivery',
            actor: 'Customer'
          }
        ]
      };

      setTimeout(() => {
        addOrder(newOrder);
        setConfirmedOrder(newOrder);
        clearCart();
        setIsSubmitting(false);
        setStep('success');
      }, 500);
      return;
    }

    if (formData.paymentMethod === 'whatsapp') {
      window.open(getWhatsAppLink(), '_blank');
      return;
    }
  };

  const handleStripePaymentSuccess = (paymentIntent: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethod?: 'stripe' | 'upi' | 'card' | 'netbanking';
  }) => {
    setIsSubmitting(true);

    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderNum = `SEY-${randomDigits}`;
    const orderId = `ord-${Date.now()}`;
    const methodUsed = paymentIntent.paymentMethod || 'stripe';

    const newOrder: ProductOrder = {
      id: orderId,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      customerName: formData.name.trim(),
      customerPhone: formData.phone.trim(),
      customerEmail: formData.email.trim() || 'customer@seyolcare.com',
      shippingAddress: {
        street: formData.street.trim(),
        city: formData.city.trim() || 'Chennai',
        state: formData.state.trim() || 'Tamil Nadu',
        pincode: formData.pincode.trim() || '600001',
      },
      items: cart.map((item) => ({
        productId: item.id,
        title: item.title,
        volumeOrType: item.volumeOrType,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      subtotal: subtotal,
      discount: discount,
      shippingFee: 0,
      totalAmount: total,
      paymentMethod: methodUsed as any,
      paymentStatus: 'paid', // SUCCESS!
      orderStatus: 'confirmed',
      orderType: 'product',
      currency: 'INR',
      stripePaymentIntentId: paymentIntent.id,
      notes: formData.notes.trim(),
      timeline: [
        {
          status: 'confirmed',
          timestamp: new Date().toISOString(),
          note: `Payment of ₹${total} verified via ${methodUsed.toUpperCase()} (Ref: ${paymentIntent.id})`,
          actor: 'SEYOL Payment Gateway'
        }
      ]
    };

    // Add directly to admin system ONLY after verified payment
    addOrder(newOrder);
    setConfirmedOrder(newOrder);
    clearCart();
    setIsSubmitting(false);
    setStep('success');
  };

  // WhatsApp checkout message generator
  const getWhatsAppLink = () => {
    if (confirmedOrder) {
      const itemsList = confirmedOrder.items
        .map((item) => `- ${item.title} (${item.volumeOrType}) x${item.quantity} = ₹${item.price * item.quantity}`)
        .join('%0A');
      const message = `Hello SEYOL Care Team!%0A%0AI have placed Order *#${confirmedOrder.orderNumber}* for ₹${confirmedOrder.totalAmount}.%0A%0A*Customer:* ${confirmedOrder.customerName}%0A*Phone:* ${confirmedOrder.customerPhone}%0A*Delivery Address:* ${confirmedOrder.shippingAddress.street}, ${confirmedOrder.shippingAddress.city} - ${confirmedOrder.shippingAddress.pincode}%0A*Payment Mode:* ${confirmedOrder.paymentMethod.toUpperCase()}%0A%0A*Items:*%0A${itemsList}%0A%0APlease confirm my delivery dispatch!`;
      return `https://wa.me/919840000000?text=${message}`;
    }

    const itemsList = cart
      .map((item) => `- ${item.title} (${item.volumeOrType}) x${item.quantity} = ₹${item.price * item.quantity}`)
      .join('%0A');
    const message = `Hello SEYOL Care Team! I would like to confirm my order:%0A%0A${itemsList}%0A%0ASubtotal: ₹${subtotal}%0ADiscount: ₹${discount}%0ATotal Payable: ₹${total}%0A%0APlease assist me with dispatch and payment confirmation.`;
    return `https://wa.me/919840000000?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-maroon-dark/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-light shadow-2xl flex flex-col border-l border-cream-border animate-slideLeft">
          {/* Header */}
          <div className="p-5 bg-cream border-b border-cream-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {step === 'checkout' && (
                <button
                  onClick={() => setStep('cart')}
                  className="p-1 -ml-1 rounded-full text-brown-muted hover:text-maroon hover:bg-cream-dark transition-colors mr-1 cursor-pointer"
                  title="Back to Basket"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <ShoppingBag className="w-5 h-5 text-maroon" />
              <h2 className="font-serif text-lg font-bold text-brown">
                {step === 'checkout'
                  ? 'Delivery & Checkout'
                  : step === 'success'
                  ? 'Order Confirmed'
                  : `Your Basket (${totalItems})`}
              </h2>
            </div>
            <button
              onClick={() => {
                closeCart();
                if (step === 'success') setStep('cart');
              }}
              aria-label="Close Basket"
              className="p-1.5 rounded-full text-brown-muted hover:text-maroon hover:bg-cream-dark transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bundle Tier Notification Bar (Only in cart step) */}
          {step === 'cart' && (
            <div className="bg-gold-soft border-b border-gold-border px-4 py-2.5 text-xs text-brown">
              {totalItems === 0 ? (
                <span>Add any 2 products for 10% bundle savings, or 3+ for 15% off.</span>
              ) : totalItems === 1 ? (
                <span className="font-medium text-maroon">
                  Add 1 more product to unlock <strong className="text-gold-dark">10% automatic bundle savings!</strong>
                </span>
              ) : totalItems === 2 ? (
                <span className="font-medium text-maroon">
                  🎉 10% bundle savings applied! Add 1 more for <strong className="text-gold-dark">15% off</strong>.
                </span>
              ) : (
                <span className="font-medium text-maroon">
                  ✨ Maximum 15% routine bundle savings applied!
                </span>
              )}
            </div>
          )}

          {/* Main Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* STEP 3: SUCCESS */}
            {step === 'success' && confirmedOrder ? (
              <div className="py-6 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#7B1131] bg-gold/20 px-3 py-1 rounded-full">
                    Order #{confirmedOrder.orderNumber}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#3a1d1d] mt-3">
                    Thank You, {confirmedOrder.customerName}!
                  </h3>
                  <p className="text-xs text-brown-muted max-w-xs mx-auto mt-1">
                    Your order details have been securely submitted to our Care Matron &amp; fulfillment dashboard.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-cream-border text-left text-xs space-y-2.5 shadow-xs">
                  <div className="flex justify-between border-b border-cream-border/60 pb-2">
                    <span className="text-brown-muted">Total Amount:</span>
                    <span className="font-bold text-maroon text-sm font-serif">₹{confirmedOrder.totalAmount}</span>
                  </div>
                  <div className="flex justify-between border-b border-cream-border/60 pb-2">
                    <span className="text-brown-muted">Payment Mode:</span>
                    <span className="font-bold uppercase text-brown">{confirmedOrder.paymentMethod}</span>
                  </div>
                  {confirmedOrder.stripePaymentIntentId && (
                    <div className="flex justify-between border-b border-cream-border/60 pb-2">
                      <span className="text-brown-muted">Stripe Reference:</span>
                      <span className="font-mono font-bold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {confirmedOrder.stripePaymentIntentId}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-cream-border/60 pb-2">
                    <span className="text-brown-muted">Contact Phone:</span>
                    <span className="font-semibold text-brown">{confirmedOrder.customerPhone}</span>
                  </div>
                  <div>
                    <span className="text-brown-muted block mb-0.5">Shipping Address:</span>
                    <p className="text-brown font-medium">
                      {confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} - {confirmedOrder.shippingAddress.pincode}
                    </p>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-warm-md hover:bg-[#1EBE5D] transition-colors"
                  >
                    <span>Instant WhatsApp Order Tracking</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      setStep('cart');
                      closeCart();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-cream-dark text-brown hover:bg-gold hover:text-maroon font-bold text-xs transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : step === 'checkout' ? (
              /* STEP 2: CHECKOUT FORM */
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 animate-fadeIn text-xs">
                <div className="bg-white p-4 rounded-2xl border border-cream-border space-y-3 shadow-2xs">
                  <div className="flex items-center space-x-2 font-bold text-maroon border-b border-cream-border/60 pb-2">
                    <User className="w-4 h-4 text-gold-dark" />
                    <span>Customer &amp; Contact Details</span>
                  </div>

                  <div>
                    <label className="font-bold text-brown block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sundaram"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-cream-light border border-cream-border focus:ring-1 focus:ring-maroon font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-brown block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98401 23456"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-cream-light border border-cream-border focus:ring-1 focus:ring-maroon font-mono font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-brown block mb-1">Email (Optional)</label>
                      <input
                        type="email"
                        placeholder="e.g. priya@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-cream-light border border-cream-border focus:ring-1 focus:ring-maroon font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-cream-border space-y-3 shadow-2xs">
                  <div className="flex items-center space-x-2 font-bold text-maroon border-b border-cream-border/60 pb-2">
                    <MapPin className="w-4 h-4 text-gold-dark" />
                    <span>Delivery Address</span>
                  </div>

                  <div>
                    <label className="font-bold text-brown block mb-1">Street Address / House No *</label>
                    <input
                      type="text"
                      required
                      placeholder="Flat/House No, Building, Street name"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-cream-light border border-cream-border focus:ring-1 focus:ring-maroon font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="font-bold text-brown block mb-1">City *</label>
                      <input
                        type="text"
                        required
                        placeholder="Chennai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-cream-light border border-cream-border focus:ring-1 focus:ring-maroon font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-brown block mb-1">State *</label>
                      <input
                        type="text"
                        required
                        placeholder="Tamil Nadu"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-cream-light border border-cream-border focus:ring-1 focus:ring-maroon font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-brown block mb-1">Pincode *</label>
                      <input
                        type="text"
                        required
                        placeholder="600020"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-cream-light border border-cream-border focus:ring-1 focus:ring-maroon font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-cream-border space-y-3 shadow-2xs">
                  <div className="flex items-center space-x-2 font-bold text-maroon border-b border-cream-border/60 pb-2">
                    <CreditCard className="w-4 h-4 text-gold-dark" />
                    <span>Payment Method</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'stripe', label: 'Online Payment (Cards / GPay / NetBanking)', icon: '💳', badge: 'Instant' },
                      { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                      { id: 'whatsapp', label: 'WhatsApp Order', icon: '💬' },
                    ].map((m) => (
                      <label
                        key={m.id}
                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          formData.paymentMethod === m.id
                            ? 'bg-gold-soft border-gold-dark text-maroon font-bold ring-1 ring-gold'
                            : 'bg-cream-light border-cream-border hover:bg-white text-brown'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={m.id}
                            checked={formData.paymentMethod === m.id}
                            onChange={() => setFormData({ ...formData, paymentMethod: m.id as any })}
                            className="sr-only"
                          />
                          <span>{m.icon}</span>
                          <span className="text-[11px]">{m.label}</span>
                        </div>
                        {m.badge && (
                          <span className="text-[9px] bg-[#7B1131] text-cream-light px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                            {m.badge}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>

                  <div>
                    <label className="font-bold text-brown block mb-1">Care &amp; Delivery Notes (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Leave package at security, infant asleep"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-cream-light border border-cream-border focus:ring-1 focus:ring-maroon text-[11px]"
                    />
                  </div>
                </div>
              </form>
            ) : cart.length === 0 ? (
              /* STEP 1: EMPTY CART */
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream-dark/60 text-maroon mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 opacity-50" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brown">Your Basket is Empty</h3>
                <p className="text-xs text-brown-muted max-w-xs mx-auto">
                  Explore our handcrafted SEY infant oils, gentle Nalangu Maavu bath powders, and digital Fourth Trimester workbooks.
                </p>
                <div className="pt-2">
                  <button
                    onClick={closeCart}
                    className="px-5 py-2.5 rounded-xl bg-maroon text-cream-light font-semibold text-xs hover:bg-maroon-dark transition-colors cursor-pointer"
                  >
                    Browse SEY Store
                  </button>
                </div>
              </div>
            ) : (
              /* STEP 1: CART ITEMS LIST */
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex space-x-3 p-3 bg-cream rounded-xl border border-cream-border"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0 border border-cream-border"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-xs font-bold text-brown leading-tight">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="text-brown-muted hover:text-maroon ml-2 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-brown-muted">
                        {item.volumeOrType}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-cream-border/60">
                      <div className="flex items-center space-x-2 border border-cream-border rounded-lg bg-cream-light px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="text-brown hover:text-maroon p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-brown px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="text-brown hover:text-maroon p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-xs text-maroon">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Action Breakdown */}
          {cart.length > 0 && step !== 'success' && (
            <div className="p-5 bg-cream border-t border-cream-border space-y-3">
              {/* Coupon Code Box (Only in cart step) */}
              {step === 'cart' && (
                <>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-gold-soft border border-gold-border px-3 py-2 rounded-lg text-xs">
                      <div className="flex items-center space-x-1.5 text-maroon font-semibold">
                        <Tag className="w-3.5 h-3.5 text-gold-dark" />
                        <span>Coupon '{appliedCoupon}' Applied (10% Extra)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-brown-muted hover:text-maroon text-[11px] underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. SEYOL10)"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          setCouponError(false);
                        }}
                        className="flex-1 px-3 py-2 rounded-lg bg-cream-light border border-cream-border text-xs focus:outline-none focus:ring-1 focus:ring-gold uppercase"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 rounded-lg bg-cream-dark text-brown hover:bg-gold hover:text-maroon-dark text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponError && (
                    <div className="text-[11px] text-maroon">
                      Invalid coupon code. Try 'SEYOL10' or 'MOTHERHOOD'.
                    </div>
                  )}
                </>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-brown-muted pt-2 border-t border-cream-border">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brown">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-maroon font-semibold">
                    <span>Routine &amp; Bundle Savings</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Dispatched Shipping</span>
                  <span className="text-gold-dark font-medium">FREE Across India</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-maroon pt-1 border-t border-cream-border">
                  <span>Total Payable</span>
                  <span className="text-base">₹{total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                {step === 'cart' ? (
                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full py-3 px-4 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs tracking-wide shadow-warm-sm transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Proceed to Delivery &amp; Address</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs tracking-wide shadow-warm-md transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Redirecting to Payment...</span>
                      </span>
                    ) : formData.paymentMethod === 'stripe' ? (
                      <>
                        <CreditCard className="w-4 h-4 text-gold-light" />
                        <span>Proceed to Payment (₹{total})</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-gold-light" />
                        <span>Place Order Now (₹{total})</span>
                      </>
                    )}
                  </button>
                )}

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1a8e45] font-semibold text-xs text-center block transition-colors"
                >
                  Need Help? Order Directly on WhatsApp
                </a>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-brown-muted pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
                <span>100% Traditional Ayush Certified Formulations &amp; Secure Dispatch</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
