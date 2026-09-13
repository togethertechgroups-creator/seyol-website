'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  Gift,
  Leaf,
  Flower2,
  ChevronRight,
  ChevronLeft,
  Truck,
  Award,
  Heart,
  Droplet
} from 'lucide-react';
import { productsData as fallbackProducts, bundlesData } from '../../data/products';
import { ProductCard } from '../../components/shared/ProductCard';
import { BundleBuilder } from '../../components/interactive/BundleBuilder';
import { AccordionFAQ } from '../../components/shared/AccordionFAQ';
import { useCart } from '../../context/CartContext';
import { useAdminData } from '../../context/AdminDataContext';
import { JourneyStage } from '../../types';

export default function ProductsPage() {
  const { products: adminProducts, productBannerSlides, productsSettings } = useAdminData();
  const products = adminProducts && adminProducts.length > 0 ? adminProducts : fallbackProducts;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart, openCart } = useCart();

  // Hero Carousel Slides from Admin
  const heroSlides = productBannerSlides && productBannerSlides.length > 0 ? productBannerSlides : [
    {
      id: 'slide-1',
      badge: productsSettings?.heroBadge || 'OFFICIAL SEYOL BOTANICAL FORMULATION',
      subtitle: productsSettings?.heroSubtitle || 'Nourishing, gentle, pure care for newborn baby massage & sweet sleep.',
      title: productsSettings?.heroTitle || 'Soothing Baby Massage Oil',
      productNames: 'Cold-Pressed Sweet Almond, Virgin Coconut & Calming Nilgiri Botanicals (200 ml)',
      ctaText: 'Shop Baby Oil >',
      categoryTarget: 'baby-massage',
      bgGradient: 'from-[#EFE7DB]/95 via-[#EFE7DB]/85 md:via-[#EFE7DB]/40 to-transparent',
      isLight: true,
      image: productsSettings?.heroImage || '/images/products-hero-banner.png',
    },
  ];

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Category navigation pills (Vilvah style)
  const categoryPills = [
    { id: 'all', label: 'All Products' },
    { id: 'baby-massage', label: 'Baby Massage Oils' },
    { id: 'bath-wellness', label: 'Bath Powders' },
    { id: 'digestive-relief', label: 'Colic Roll-Ons' },
    { id: 'mother-postpartum', label: 'Mother Postpartum Oils' },
    { id: 'bundles', label: 'Curated Combos' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'baby-massage') return p.category === 'baby-massage';
    if (selectedCategory === 'bath-wellness') return p.category === 'bath-wellness';
    if (selectedCategory === 'digestive-relief') return p.category === 'digestive-relief';
    if (selectedCategory === 'mother-postpartum') return p.category === 'mother-postpartum';
    return true;
  });

  const handleAddPrecuratedBundle = (bundle: typeof bundlesData[0]) => {
    const productsInBundle = products.filter((p) => bundle.productIds.includes(p.id));
    productsInBundle.forEach((prod) => {
      addToCart(
        {
          id: prod.id,
          title: prod.title,
          price: prod.price,
          volumeOrType: prod.volume,
          image: prod.image,
        },
        1
      );
    });
    openCart();
  };

  const slide = heroSlides[currentSlide];

  return (
    <div className="flex flex-col w-full font-sans bg-white text-[#3a1d1d]">
      
      {/* ========================================================================= */}
      {/* 1. HIGH-IMPACT PROMOTIONAL HERO BANNER (VILVAH HERO STYLE)                */}
      {/* ========================================================================= */}
      <section className="px-2 sm:px-4 lg:px-6 pt-8 sm:pt-10 lg:pt-11 max-w-[98%] 2xl:max-w-[1780px] mx-auto w-full">
        <div 
          className={`relative rounded-3xl sm:rounded-[36px] overflow-hidden min-h-[480px] sm:min-h-[520px] lg:min-h-[580px] ${slide.isLight ? 'bg-[#EFE7DB] text-[#3a1d1d]' : 'bg-[#1a382c] text-white'} transition-all duration-700 flex flex-col justify-between p-6 sm:p-12 lg:p-16 shadow-warm-lg border border-neutral-200/90`}
        >
          {/* Background image with continuous seamless blend */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-[center_right] sm:object-right"
            />
            {/* Seamless gradient overlay from left to right */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />
          </div>

          {/* Left Text Content */}
          <div className="relative z-10 max-w-xl lg:max-w-2xl space-y-4 sm:space-y-6">
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1 rounded-full ${slide.isLight ? 'bg-[#7B1131] text-white shadow-xs' : 'bg-white/15 backdrop-blur-md border border-white/30 text-gold-light'} text-[10px] sm:text-xs font-extrabold uppercase tracking-widest`}>
              <Sparkles className="w-3.5 h-3.5 text-gold-light" />
              <span>{slide.badge}</span>
            </div>

            <div className="space-y-2">
              <p className={`text-xs sm:text-sm md:text-base font-serif italic ${slide.isLight ? 'text-[#7B1131] font-semibold' : 'text-gold-light/95'}`}>
                "{slide.subtitle}"
              </p>
              <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight ${slide.isLight ? 'text-[#7B1131]' : 'text-white drop-shadow-md'}`}>
                {slide.title}
              </h1>
            </div>

            <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-lg ${slide.isLight ? 'text-neutral-700' : 'text-white/90'}`}>
              {slide.productNames}
            </p>

            {/* Big Vilvah-Style CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => setSelectedCategory(slide.categoryTarget || 'all')}
                className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#F5C242] hover:bg-[#e0b038] text-[#3a1d1d] font-extrabold text-sm sm:text-base shadow-warm-md hover:scale-105 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
              >
                <span>{slide.ctaText}</span>
              </button>
            </div>
          </div>

          {/* Bottom Slide Indicators */}
          <div className="relative z-10 flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-[#7B1131]' : 'w-2 bg-neutral-400/50 hover:bg-neutral-600'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                className={`w-9 h-9 rounded-full ${slide.isLight ? 'bg-white/80 hover:bg-white text-[#3a1d1d] border-neutral-300' : 'bg-black/40 hover:bg-black/70 text-white border-white/20'} border flex items-center justify-center transition-all cursor-pointer shadow-xs`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                className={`w-9 h-9 rounded-full ${slide.isLight ? 'bg-white/80 hover:bg-white text-[#3a1d1d] border-neutral-300' : 'bg-black/40 hover:bg-black/70 text-white border-white/20'} border flex items-center justify-center transition-all cursor-pointer shadow-xs`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HORIZONTAL CATEGORY PILL STRIP (BELOW HERO BANNER)                     */}
      {/* ========================================================================= */}
      <section className="bg-white/95 backdrop-blur-md border-y border-neutral-200 sticky top-16 z-30 shadow-2xs mt-4">
        <div className="max-w-[98%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-2 sm:space-x-3 whitespace-nowrap min-w-max">
            {categoryPills.map((pill) => {
              const isActive = selectedCategory === pill.id;

              return (
                <button
                  key={pill.id}
                  onClick={() => setSelectedCategory(pill.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 border cursor-pointer ${
                    isActive
                      ? 'bg-[#7B1131] text-white border-[#7B1131] shadow-2xs'
                      : 'bg-white hover:bg-[#FAF7F2] text-neutral-700 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <span>{pill.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TRUST BANNER STRIP (4-COLUMN BALANCED GRID)                            */}
      {/* ========================================================================= */}
      <section className="py-4 px-2 sm:px-4 lg:px-6 max-w-[98%] 2xl:max-w-[1780px] mx-auto w-full">
        <div className="bg-white border border-neutral-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div className="flex items-center justify-start sm:justify-center space-x-2">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-neutral-800">+34,500 Reviews</span>
          </div>

          <div className="flex items-center justify-start sm:justify-center space-x-2 font-bold text-neutral-700 sm:border-l sm:border-neutral-200 sm:pl-3">
            <Award className="w-4 h-4 text-[#7B1131] shrink-0" />
            <span className="truncate">AYUSH Certified 100% Herbal</span>
          </div>

          <div className="flex items-center justify-start sm:justify-center space-x-2 font-bold text-neutral-700 lg:border-l lg:border-neutral-200 lg:pl-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">Paediatrician Tested</span>
          </div>

          <div className="flex items-center justify-start sm:justify-center space-x-2 font-bold text-neutral-700 sm:border-l sm:border-neutral-200 sm:pl-3">
            <Truck className="w-4 h-4 text-[#7B1131] shrink-0" />
            <span className="truncate">Free Express Delivery Across India</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PRODUCTS CATALOGUE GRID                                                */}
      {/* ========================================================================= */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-[98%] 2xl:max-w-[1780px] mx-auto w-full">
        <div className="space-y-8">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-neutral-200">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#7B1131] mb-1">
                Handcrafted Apothecary Formulations
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3a1d1d]">
                {selectedCategory === 'all' ? 'All Traditional Herbal Formulations' : categoryPills.find(c => c.id === selectedCategory)?.label}
              </h2>
            </div>

            <div className="text-xs font-bold text-neutral-500">
              Showing {filteredProducts.length} certified items
            </div>
          </div>

          {/* Product Cards Grid (4 Columns for standard compact card width) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CURATED GIFT SETS & CONFINEMENT BUNDLES (COMBOS)                       */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-neutral-200">
        <div className="max-w-[98%] 2xl:max-w-[1780px] mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-neutral-200">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-[#7B1131] text-xs font-bold uppercase tracking-wider mb-2">
                <Gift className="w-3.5 h-3.5 text-gold-dark" />
                <span>Signature Confinement Combos</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3a1d1d]">
                Curated Gift Sets &amp; Confinement Combos
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Complete sets thoughtfully packaged in our signature keepsake boxes with tiered savings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {bundlesData.map((bundle) => (
              <div
                key={bundle.id}
                className="bg-[#FAF7F2] rounded-3xl border border-neutral-200/90 overflow-hidden p-6 shadow-warm-sm flex flex-col justify-between space-y-5 hover:shadow-warm-lg hover:border-[#7B1131]/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-neutral-900">
                    <img
                      src={bundle.image}
                      alt={bundle.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#7B1131] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {bundle.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3a1d1d]">
                    {bundle.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {bundle.subtitle}
                  </p>

                  <div className="space-y-1.5 text-xs text-neutral-700 bg-white p-3 rounded-2xl border border-neutral-200/80">
                    <div className="text-[10px] font-extrabold uppercase text-[#7B1131] tracking-wider">
                      Combo Includes:
                    </div>
                    {bundle.productIds.map((pid) => {
                      const p = products.find((x) => x.id === pid);
                      return (
                        <div key={pid} className="flex items-center space-x-1.5 text-neutral-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#7B1131] shrink-0" />
                          <span>{p?.title || pid}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-emerald-700 font-bold">
                      Save ₹{bundle.savings} ({bundle.savingsPercent}% Off)
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="font-serif font-extrabold text-xl text-[#7B1131]">
                        ₹{bundle.bundlePrice}
                      </span>
                      <span className="text-xs text-neutral-400 line-through">
                        ₹{bundle.originalPrice}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddPrecuratedBundle(bundle)}
                    className="px-5 py-2.5 rounded-full bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs shadow-warm-xs transition-all cursor-pointer active:scale-95"
                  >
                    Add Combo
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE BUNDLE BUILDER                                             */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[98%] 2xl:max-w-[1780px] mx-auto w-full">
        <BundleBuilder />
      </section>

      {/* ========================================================================= */}
      {/* 7. BOTANICAL QUALITY & FAQ ACCORDION                                      */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-neutral-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon-soft text-maroon text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>Purity &amp; Safety Assurance</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3a1d1d]">
              Product Safety &amp; Botanical FAQs
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              Everything you need to know about our traditional Siddha formulations and infant safety.
            </p>
          </div>
          <AccordionFAQ defaultCategory="products" />
        </div>
      </section>

    </div>
  );
}
