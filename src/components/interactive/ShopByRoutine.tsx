'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Heart, Baby } from 'lucide-react';

interface RoutineProduct {
  id: string;
  name: string;
  subtitle: string;
  categoryTag: string;
  price: string;
  volume: string;
  image: string;
  link: string;
  keyBenefit: string;
}

interface RoutineCategory {
  id: 'baby-care' | 'mother-recovery';
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  products: RoutineProduct[];
}

const ROUTINE_CATEGORIES: RoutineCategory[] = [
  // =========================================================================
  // 1. BABY CARE ROUTINE (6 PRODUCTS)
  // =========================================================================
  {
    id: 'baby-care',
    title: 'Baby Care Routine',
    badge: 'NEWBORN & INFANT CARE',
    icon: Baby,
    description:
      'Gentle everyday rituals designed for your baby’s delicate skin, safe bath-time comfort, and peaceful sleep.',
    products: [
      {
        id: 'soothing-baby-massage-oil',
        name: 'Soothing Baby Massage Oil',
        subtitle: 'Cold-pressed sweet almond, virgin coconut & calming Nilgiri botanicals for daily touch.',
        categoryTag: 'Baby Massage',
        price: '₹680',
        volume: '200 ml',
        image: '/images/products-hero-banner.png',
        link: '/products/soothing-baby-massage-oil',
        keyBenefit: '100% Edible-Grade Botanicals',
      },
      {
        id: 'nourishing-baby-massage-oil',
        name: 'Nourishing Baby Massage Oil',
        subtitle: 'Fortified herbal sesame base infused with Ashwagandha & Bala roots to support motor growth.',
        categoryTag: 'Strengthening Massage',
        price: '₹740',
        volume: '200 ml',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
        link: '/products/nourishing-baby-massage-oil-traditional-herbal',
        keyBenefit: 'Supports Muscle & Bone Tone',
      },
      {
        id: 'gentle-baby-bath-powder',
        name: 'Gentle Baby Bath Powder',
        subtitle: 'Micro-milled green gram, white turmeric, sandalwood & rose petals (Nalangu Maavu).',
        categoryTag: 'Daily Bathing',
        price: '₹520',
        volume: '250 g',
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
        link: '/products/gentle-baby-bath-powder-nalangu-maavu',
        keyBenefit: 'Soap-Free Nalangu Maavu',
      },
      {
        id: 'traditional-sambirani-set',
        name: 'Traditional Sambirani Care Set',
        subtitle: 'Pure Benzoin dhoop resin, brass fumer & charcoal to safely dry baby’s hair and keep warmth.',
        categoryTag: 'Bath Drying Ritual',
        price: '₹580',
        volume: 'Complete Dhoop Kit',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
        link: '/products',
        keyBenefit: 'Prevents Post-Bath Chills',
      },
      {
        id: 'tummy-comfort-roll-on',
        name: 'Tummy Comfort Roll-On',
        subtitle: 'Pure Hing (Asafoetida), Ajwain & sweet fennel in coconut carrier oil for infant colic.',
        categoryTag: 'Digestive Comfort',
        price: '₹390',
        volume: '40 ml',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800',
        link: '/products/colic-relief-tummy-roll-on',
        keyBenefit: 'Fast Colic & Gas Relief',
      },
      {
        id: 'ayurvedic-baby-kajal',
        name: 'Ayurvedic Baby Kajal',
        subtitle: 'Pure cold-pressed castor oil, organic cow ghee & almond soot for cooling eye care.',
        categoryTag: 'Traditional Eye Care',
        price: '₹350',
        volume: '5 g',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
        link: '/products',
        keyBenefit: '100% Herbal & Lead-Free',
      },
    ],
  },

  // =========================================================================
  // 2. MOTHER'S POSTPARTUM RECOVERY ROUTINE (3 PRODUCTS)
  // =========================================================================
  {
    id: 'mother-recovery',
    title: "Mother's Postpartum Recovery Routine",
    badge: 'SACRED 40-DAY CONFINEMENT',
    icon: Heart,
    description:
      'Time-honoured South Indian herbal therapies formulated to restore physical strength, relieve muscular aches, and nourish new mothers.',
    products: [
      {
        id: 'traditional-prasava-legiyam',
        name: 'Traditional Prasava Legiyam',
        subtitle: 'Ancient postpartum medicinal jam formulated with dry ginger, black pepper & jaggery.',
        categoryTag: 'Postpartum Nutrition',
        price: '₹750',
        volume: '400 g',
        image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800',
        link: '/products',
        keyBenefit: 'Aids Digestion & Lactation',
      },
      {
        id: 'restorative-mother-massage-oil',
        name: 'Restorative Mother Massage Oil',
        subtitle: 'Fortified herbal sesame oil enriched with 28 classical Ayurvedic herbs for uterine toning.',
        categoryTag: 'Maternal Abhyanga',
        price: '₹890',
        volume: '300 ml',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
        link: '/products/restorative-mother-postpartum-massage-oil',
        keyBenefit: '28 Classical Healing Herbs',
      },
      {
        id: 'rejuvenating-herbal-bath-sachet',
        name: 'Rejuvenating Herbal Bath Sachet',
        subtitle: 'Vethu Kuli steeping sachets with Nirgundi, Eucalyptus, Neem & Tamarind leaves.',
        categoryTag: 'Herbal Sitz Bath',
        price: '₹650',
        volume: 'Pack of 10 Sachets',
        image: 'https://images.unsplash.com/photo-1512290900672-1f5be1c6e1dc?auto=format&fit=crop&q=80&w=800',
        link: '/products/warming-mother-herbal-bath-sachet-vethu-kuli',
        keyBenefit: 'Soothes Perineal Soreness',
      },
    ],
  },
];

export function ShopByRoutine() {
  const [activeTab, setActiveTab] = useState<'baby-care' | 'mother-recovery'>('baby-care');

  const currentCategory =
    ROUTINE_CATEGORIES.find((cat) => cat.id === activeTab) || ROUTINE_CATEGORIES[0];

  return (
    <section className="w-full bg-[#FAF6EE] text-[#3A1D1D] py-16 sm:py-20 lg:py-24 border-y border-[#EAE1D5] font-heading relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <span className="inline-block text-[11px] sm:text-xs font-heading font-extrabold tracking-[0.2em] uppercase text-[#7B1131] bg-[#F8EBEF] border border-[#EAC8D2] px-4 py-1.5 rounded-full">
            SHOP BY ROUTINE
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#3A1D1D] tracking-tight leading-[1.18]">
            Build a routine that feels right.
          </h2>
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#6E5652] max-w-2xl mx-auto leading-relaxed">
            Thoughtful care for everyday family moments. Choose a routine to explore authentic South Indian botanicals crafted specifically for your baby’s delicate care and mother’s postpartum recovery.
          </p>
        </header>

        {/* 2-Way Routine Category Switcher */}
        <div className="flex items-center justify-center">
          <div 
            role="tablist"
            aria-label="Routine Categories"
            className="inline-flex p-1.5 sm:p-2 bg-[#F0EBE1] rounded-2xl sm:rounded-full border border-[#E0D6C8] shadow-warm-xs gap-1.5 sm:gap-2 max-w-full overflow-x-auto scrollbar-none"
          >
            {ROUTINE_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex-shrink-0 px-5 sm:px-8 py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-heading font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none ${
                    isActive
                      ? 'bg-[#7B1131] text-white shadow-warm-md scale-[1.01]'
                      : 'text-[#3A1D1D] hover:text-[#7B1131] hover:bg-white/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E4CF9E]' : 'text-[#A6833D]'}`} />
                  <span>{category.title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#EAE1D5] text-[#6E5652]'
                  }`}>
                    {category.products.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Routine Panel */}
        <div 
          key={currentCategory.id}
          role="tabpanel"
          className="space-y-8 animate-fadeIn"
        >
          {/* Category Intro Bar */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EAE1D5] p-5 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-warm-xs">
            <div className="space-y-1">
              <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#A6833D]">
                {currentCategory.badge}
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#3A1D1D]">
                {currentCategory.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#6E5652] max-w-2xl leading-relaxed">
                {currentCategory.description}
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#7B1131] hover:text-[#5A0C24] transition-colors whitespace-nowrap self-start md:self-center"
            >
              <span>View All in Shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Product Cards Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${
            currentCategory.products.length === 3 
              ? 'lg:grid-cols-3 max-w-5xl mx-auto' 
              : 'lg:grid-cols-3'
          } gap-6 sm:gap-7 items-stretch`}>
            {currentCategory.products.map((product) => (
              <article
                key={product.id}
                className="group relative flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl border border-[#EAE1D5] overflow-hidden p-5 sm:p-6 hover:border-[#7B1131]/40 hover:shadow-warm-lg hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Product Image Container */}
                  <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-[#FAF6EE] border border-[#EAE1D5]/70">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Product Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#A6833D] font-sans">
                      <span className="font-semibold uppercase tracking-wider">{product.categoryTag}</span>
                      <span className="font-medium text-[#6E5652]">{product.volume}</span>
                    </div>

                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#3A1D1D] group-hover:text-[#7B1131] transition-colors leading-snug line-clamp-2 min-h-[48px] flex items-center">
                      <Link href={product.link} className="hover:underline">
                        {product.name}
                      </Link>
                    </h4>

                    <p className="font-sans text-xs text-[#6E5652] leading-relaxed line-clamp-2 min-h-[36px]">
                      {product.subtitle}
                    </p>

                    <div className="pt-1">
                      <span className="inline-block text-[11px] font-sans font-medium text-[#7B1131] bg-[#FAF0EB] px-2.5 py-1 rounded-full border border-[#EAC8D2]/60">
                        {product.keyBenefit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action & Price */}
                <div className="pt-4 border-t border-[#EAE1D5]/80 mt-5 flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-sans text-[#7A6363] tracking-wider">Price</span>
                    <span className="font-heading font-extrabold text-base sm:text-lg text-[#7B1131]">
                      {product.price}
                    </span>
                  </div>

                  <Link
                    href={product.link}
                    className="py-2.5 px-4 rounded-xl bg-[#FAF6EE] group-hover:bg-[#7B1131] text-[#7B1131] group-hover:text-white font-heading font-bold text-xs tracking-wider transition-all duration-200 flex items-center gap-1.5 border border-[#EAE1D5] group-hover:border-[#7B1131] shadow-2xs hover:scale-[1.02]"
                  >
                    <span>Explore Product</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Section Footer: Solid Maroon CTA Button with NO Gold Border */}
        <div className="pt-4 sm:pt-6 flex flex-col items-center justify-center gap-3 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#7B1131] hover:bg-[#5A0C24] text-white px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-heading font-bold tracking-wide transition-all duration-200 shadow-warm-md hover:shadow-warm-lg hover:scale-[1.02] border-none cursor-pointer"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="font-sans text-xs text-[#7A6363]">
            100% natural, AYUSH-certified traditional formulations for modern family wellness.
          </p>
        </div>

      </div>
    </section>
  );
}

export default ShopByRoutine;
