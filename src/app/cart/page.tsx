'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck, 
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const {
    cart,
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
    openCart,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);
  const [couponSuccess, setCouponSuccess] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(false);
    setCouponSuccess(false);

    if (!couponInput.trim()) return;

    if (applyCoupon(couponInput)) {
      setCouponSuccess(true);
      setCouponInput('');
    } else {
      setCouponError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-neutral-900 pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#7B1131] hover:text-[#5A0C24] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Continue Shopping</span>
          </Link>
          <span className="text-xs text-neutral-500">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </span>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#7B1131] tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-neutral-600 mt-1.5">
            Review your traditional postpartum formulations, baby oils, and maternal care essentials.
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-[#E8DFD0] p-10 sm:p-16 text-center shadow-warm-xs max-w-2xl mx-auto my-8">
            <div className="w-20 h-20 rounded-full bg-[#FAF5F7] text-[#7B1131] border border-[#E8D7DC] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#7B1131] mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-sm text-neutral-600 max-w-md mx-auto mb-8 leading-relaxed">
              Looks like you haven&apos;t added any items yet. Discover our handcrafted herbal postpartum oils, bathing powders, and newborn bundles.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white font-heading font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer"
            >
              <span>Explore SEYOL Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Cart Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-3xl border border-[#E8DFD0] shadow-warm-xs overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
                  <h2 className="font-heading font-bold text-base sm:text-lg text-[#7B1131]">
                    Items in Cart ({totalItems})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-xs font-semibold text-neutral-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-neutral-100">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#FAF6EE]/50 transition-colors"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#FAF6EE] border border-[#E8DFD0] shrink-0">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#7B1131]">
                              <ShoppingBag className="w-6 h-6" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-heading font-bold text-sm sm:text-base text-neutral-900 truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            ₹{item.price.toLocaleString('en-IN')} per unit
                          </p>
                          <div className="sm:hidden font-bold text-[#7B1131] text-sm mt-1">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controller & Price */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="flex items-center border border-[#DCD3C4] rounded-xl bg-white shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-[#7B1131] hover:bg-[#FAF6EE] rounded-l-xl transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-9 text-center text-xs font-bold text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-[#7B1131] hover:bg-[#FAF6EE] rounded-r-xl transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="hidden sm:block text-right w-24">
                          <span className="font-heading font-bold text-base text-[#7B1131]">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.title}`}
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white rounded-2xl p-3.5 border border-[#E8DFD0] flex items-center gap-3 shadow-2xs">
                  <Truck className="w-5 h-5 text-[#7B1131] shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-neutral-800">Quick Delivery</div>
                    <div className="text-neutral-500 text-[11px]">Chennai &amp; All India</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3.5 border border-[#E8DFD0] flex items-center gap-3 shadow-2xs">
                  <ShieldCheck className="w-5 h-5 text-[#7B1131] shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-neutral-800">100% Traditional</div>
                    <div className="text-neutral-500 text-[11px]">Handcrafted herbal care</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3.5 border border-[#E8DFD0] flex items-center gap-3 shadow-2xs">
                  <Lock className="w-5 h-5 text-[#7B1131] shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-neutral-800">Secure Checkout</div>
                    <div className="text-neutral-500 text-[11px]">UPI, Cards &amp; NetBanking</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl border border-[#E8DFD0] p-6 shadow-warm-xs space-y-5">
                <h2 className="font-heading font-bold text-lg text-[#7B1131] pb-3 border-b border-neutral-100">
                  Order Summary
                </h2>

                {/* Subtotal, discount, shipping, total */}
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-neutral-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center text-green-700">
                      <span>Discount ({appliedCoupon})</span>
                      <span className="font-semibold">-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-neutral-600">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-green-700">Calculated at Checkout</span>
                  </div>

                  <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                    <span className="font-heading font-bold text-base text-neutral-900">Total</span>
                    <div className="text-right">
                      <span className="font-heading font-extrabold text-2xl text-[#7B1131]">
                        ₹{total.toLocaleString('en-IN')}
                      </span>
                      <div className="text-[10px] text-neutral-500">Includes all applicable taxes</div>
                    </div>
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="pt-2 border-t border-neutral-100">
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Have a promo code?
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-green-50 border border-green-200 text-xs text-green-800">
                      <div className="flex items-center gap-1.5 font-bold">
                        <Tag className="w-3.5 h-3.5" />
                        <span>{appliedCoupon} Applied</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-600 hover:underline font-semibold cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          setCouponError(false);
                        }}
                        placeholder="e.g. SEYOL10"
                        className="flex-1 px-3 py-2 rounded-xl bg-[#FAF6EE] border border-[#DCD3C4] text-xs uppercase placeholder:normal-case focus:border-[#7B1131] outline-none"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#7B1131] hover:bg-[#5A0C24] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponError && (
                    <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Invalid promo code. Try &ldquo;SEYOL10&rdquo; for 10% off.</span>
                    </p>
                  )}
                  {couponSuccess && (
                    <p className="text-[11px] text-green-700 mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Coupon applied successfully!</span>
                    </p>
                  )}
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={openCart}
                  className="w-full py-3.5 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white font-heading font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[11px] text-neutral-500">
                  ⚡ Seamless delivery across Tamil Nadu, Singapore, Malaysia &amp; Global.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
