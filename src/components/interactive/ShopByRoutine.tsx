'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Plus, 
  Heart,
  Flower2,
  Check,
  Star
} from 'lucide-react';
import { productsData } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface RoutineOption {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  routineSteps: string[];
  productIds: string[];
  bundleDiscountPercent: number;
}

const ROUTINE_OPTIONS: RoutineOption[] = [
  {
    id: 'postpartum-healing',
    tabLabel: '40-Day Postpartum Healing',
    badge: 'Postnatal Sacred Mandalam',
    title: 'The 40-Day Postpartum Recovery Routine',
    tagline: 'Deep tissue restoration, uterine toning, and herbal scar rejuvenation.',
    description: 'A traditional 3-step Ayurvedic routine designed to calm Vata dosha, ease back strain, and support firm abdominal recovery after birth.',
    routineSteps: [
      'Step 1: Warm Herbal Oil Massage on back and abdomen before bath',
      'Step 2: Restorative Postnatal Herbal Bath Foam & Rinse',
      'Step 3: Nourishing Maternal Body Butter applied before Cotton Belly Binding'
    ],
    productIds: ['maternal-body-butter', 'pregnancy-stretch-oil'],
    bundleDiscountPercent: 15,
  },
  {
    id: 'newborn-bath-sleep',
    tabLabel: 'Newborn Bath & Colic Routine',
    badge: 'Gentle Daily Infant Ritual',
    title: 'Newborn Bath, Skin & Colic Comfort Routine',
    tagline: 'Zero-chemical infant skincare for soothing digestion, dry skin, and peaceful sleep.',
    description: 'Cold-pressed traditional oils and pure herbal bath powders crafted specifically for delicate newborn barrier skin.',
    routineSteps: [
      'Step 1: 15-minute gentle massage with SEY Cold-Pressed Baby Oil to ease gas',
      'Step 2: Herbal Nalangu Maavu bath powder cleanser instead of harsh soap',
      'Step 3: Roll-on Ayurvedic colic balm gently applied clockwise on navel'
    ],
    productIds: ['sey-baby-massage-oil', 'nalangu-maavu', 'colic-relief-rollon'],
    bundleDiscountPercent: 12,
  },
  {
    id: 'pregnancy-comfort',
    tabLabel: 'Pregnancy Belly & Elasticity',
    badge: 'Trimester 2 & 3 Support',
    title: 'Pregnancy Belly Elasticity & Comfort Routine',
    tagline: 'Deep dermal hydration preventing stretch marks and calming itchy belly skin.',
    description: 'Infused with cold-pressed sweet almond, rosehip seed, and Gotu Kola to support expanding skin fibers naturally.',
    routineSteps: [
      'Step 1: Apply Pregnancy Stretch Oil after morning shower onto damp belly',
      'Step 2: Gentle circular upward strokes over thighs, breasts, and lower back',
      'Step 3: Lock in moisture at bedtime with Maternal Shea & Cocoa Body Butter'
    ],
    productIds: ['pregnancy-stretch-oil', 'maternal-body-butter'],
    bundleDiscountPercent: 10,
  },
];

export const ShopByRoutine: React.FC = () => {
  const [activeRoutineId, setActiveRoutineId] = useState<string>('postpartum-healing');
  const [addedAllSuccess, setAddedAllSuccess] = useState(false);
  const { addToCart, openCart } = useCart();

  const currentRoutine = ROUTINE_OPTIONS.find((r) => r.id === activeRoutineId) || ROUTINE_OPTIONS[0];

  const routineProducts = productsData.filter((p) => currentRoutine.productIds.includes(p.id));
  const rawTotalPrice = routineProducts.reduce((sum, p) => sum + p.price, 0);
  const discountedTotalPrice = Math.round(rawTotalPrice * (1 - currentRoutine.bundleDiscountPercent / 100));

  const handleAddBundle = () => {
    routineProducts.forEach((prod) => {
      addToCart({
        id: prod.id,
        title: prod.title,
        price: prod.price,
        volumeOrType: prod.volume,
        image: prod.image,
      });
    });
    setAddedAllSuccess(true);
    setTimeout(() => setAddedAllSuccess(false), 2500);
  };

  return (
    <div className="w-full space-y-8 font-sans">
      
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>SEY by SEYOL Formulations</span>
        </div>
        <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown tracking-tight">
          Shop by{' '}
          <span className="font-serif italic font-normal text-maroon">Routine</span>
        </h2>
        <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-brown/85 max-w-3xl mx-auto leading-relaxed">
          Discover our 100% natural, AYUSH-certified cold-pressed botanical formulations bundled into daily ritual sequences for mother and newborn.
        </p>
      </div>

      {/* Routine Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 bg-cream rounded-full border border-cream-border max-w-fit mx-auto">
        {ROUTINE_OPTIONS.map((routine) => {
          const isActive = activeRoutineId === routine.id;
          return (
            <button
              key={routine.id}
              onClick={() => setActiveRoutineId(routine.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-maroon text-cream-light shadow-warm-md scale-[1.02]'
                  : 'text-brown hover:text-maroon hover:bg-white/80'
              }`}
            >
              {routine.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Routine Showcase Container */}
      <div className="bg-white rounded-3xl sm:rounded-[36px] border border-cream-border p-6 sm:p-10 lg:p-12 shadow-warm-md space-y-10 animate-fadeIn">
        
        {/* Routine Story & Sequence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-cream-border/80 pb-8">
          <div className="lg:col-span-7 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-maroon text-[11px] font-bold uppercase tracking-wider">
              {currentRoutine.badge}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-brown tracking-tight">
              {currentRoutine.title}
            </h3>
            <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">
              {currentRoutine.description}
            </p>

            <div className="flex items-center space-x-4 pt-2 text-xs text-brown-muted font-medium">
              <span className="flex items-center space-x-1 text-gold-dark font-bold">
                <ShieldCheck className="w-4 h-4 text-gold-dark" />
                <span>100% AYUSH Certified</span>
              </span>
              <span>•</span>
              <span>Zero Parabens & Mineral Oil</span>
              <span>•</span>
              <span>Handcrafted in Small Batches</span>
            </div>
          </div>

          {/* Routine Steps Box */}
          <div className="lg:col-span-5 bg-cream p-5 rounded-2xl border border-cream-border space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-maroon flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>Recommended Application Sequence</span>
            </h4>
            <div className="space-y-2">
              {currentRoutine.routineSteps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-brown">
                  <span className="w-5 h-5 rounded-full bg-maroon text-cream-light font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products in this routine */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h4 className="font-serif text-xl font-bold text-brown">
              Products in this Routine Bundle ({routineProducts.length} Items)
            </h4>

            {/* Bundle Add CTA */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-brown-muted line-through">₹{rawTotalPrice}</span>
                <span className="font-serif font-bold text-base text-maroon ml-2">₹{discountedTotalPrice}</span>
                <span className="text-[10px] font-bold text-green-700 ml-1">({currentRoutine.bundleDiscountPercent}% OFF Bundle)</span>
              </div>
              <button
                onClick={handleAddBundle}
                className="px-5 py-2.5 rounded-full bg-maroon hover:bg-maroon-dark text-cream-light text-xs font-bold shadow-warm-sm hover:scale-105 transition-all flex items-center space-x-1.5 cursor-pointer shimmer-button"
              >
                {addedAllSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-gold-light" />
                    <span>Bundle Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 text-gold-light" />
                    <span>Add Entire Routine</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {routineProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-cream/40 rounded-2xl p-5 border border-cream-border flex flex-col justify-between space-y-4 hover:border-maroon/40 transition-all group"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-cream-dark">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-extrabold uppercase tracking-wider text-maroon shadow-xs">
                      {prod.category}
                    </span>
                  </div>

                  <div>
                    <h5 className="font-serif font-bold text-base text-brown group-hover:text-maroon transition-colors">
                      {prod.title}
                    </h5>
                    <p className="text-xs text-brown-muted line-clamp-2 mt-1">
                      {prod.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-brown-muted pt-1">
                    <span>{prod.volume}</span>
                    <span className="font-serif font-bold text-base text-maroon">₹{prod.price}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-cream-border flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart({
                        id: prod.id,
                        title: prod.title,
                        price: prod.price,
                        volumeOrType: prod.volume,
                        image: prod.image,
                      });
                      openCart();
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light text-xs font-bold transition-all text-center cursor-pointer"
                  >
                    + Add to Bag
                  </button>

                  <Link
                    href={`/products#${prod.slug}`}
                    className="py-2 px-3 rounded-xl bg-white hover:bg-cream-dark text-brown text-xs font-bold border border-cream-border text-center transition-all"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
