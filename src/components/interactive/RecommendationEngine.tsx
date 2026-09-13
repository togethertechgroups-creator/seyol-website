'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Heart, 
  Baby, 
  Shield, 
  Flower2, 
  Calendar,
  ShoppingBag,
  Compass,
  Clock,
  Target,
  Check,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { BorderBeamPanel } from '@/components/ui/border-beam-panel';
import { servicesData } from '../../data/services';
import { classesData } from '../../data/classes';
import { productsData } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

export const RecommendationEngine: React.FC = () => {
  const [stage, setStage] = useState<'pregnancy' | 'postpartum' | 'newborn' | 'preconception'>('pregnancy');
  const [timing, setTiming] = useState('second-trimester');
  const [priority, setPriority] = useState('body-comfort');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { openEnquiry } = useQuickEnquiry();

  // Dynamic pathway calculation
  const getRecommendation = () => {
    if (stage === 'preconception') {
      return {
        id: 'rec-preconception',
        title: 'Preconception Bodily & Uterine Alignment Pathway',
        summary: 'Preparing your pelvic basin, hormonal equilibrium, and emotional ease before conception.',
        service: servicesData.find((s) => s.id === 'preconception-care') || servicesData[0],
        classItem: classesData.find((c) => c.id === 'class-nourishment') || classesData[0],
        product: productsData.find((p) => p.id === 'product-restorative-oil') || productsData[0],
        keyTip: 'Traditional Siddha wisdom recommends 3 consecutive menstrual cycles of uterine warming herbs and clean nutrition before trying to conceive.',
      };
    }

    if (stage === 'pregnancy') {
      if (timing === 'third-trimester' || priority === 'birth-prep') {
        return {
          id: 'rec-pregnancy-birth',
          title: 'Third Trimester & Gentle Birth Preparation Pathway',
          summary: 'Tailored for expectant mothers approaching delivery, focusing on labour comfort and partner confidence.',
          service: servicesData.find((s) => s.id === 'birth-doula-support') || servicesData[2],
          classItem: classesData.find((c) => c.id === 'class-birth-prep') || classesData[3],
          product: productsData.find((p) => p.id === 'product-restorative-oil') || productsData[4],
          keyTip: 'Pairing side-lying prenatal bodywork with partner counterpressure tools significantly reduces labour fear and perceived pain.',
        };
      }
      return {
        id: 'rec-pregnancy-nurture',
        title: 'Prenatal Nurturing & Muscular Relief Pathway',
        summary: 'Alleviating lower back tension, sciatica, and swelling with gentle organic bodywork.',
        service: servicesData.find((s) => s.id === 'prenatal-massage') || servicesData[1],
        classItem: classesData.find((c) => c.id === 'class-prenatal-movement') || classesData[5],
        product: productsData.find((p) => p.id === 'product-restorative-oil') || productsData[4],
        keyTip: 'Regular prenatal massage from 14 weeks improves lymphatic flow and encourages restorative deep sleep.',
      };
    }

    if (stage === 'postpartum') {
      return {
        id: 'rec-postpartum',
        title: 'The Sacred 40-Day Mother Confinement Sanctuary Pathway',
        summary: 'Authentic South Indian postnatal rejuvenation, uterine massage, Vethu Kuli herbal bath, and belly binding.',
        service: servicesData.find((s) => s.id === 'postpartum-massage-wrap') || servicesData[3],
        classItem: classesData.find((c) => c.id === 'class-postpartum-prep') || classesData[2],
        product: productsData.find((p) => p.id === 'product-bath-sachet') || productsData[5],
        keyTip: 'Traditional cotton belly binding supports the abdominal wall (diastasis recti) without restricting diaphragm breathing.',
      };
    }

    // Newborn
    return {
      id: 'rec-newborn',
      title: 'Gentle Newborn Touch, Colic Ease & Bathing Pathway',
      summary: 'Daily rhythmic infant bodywork, traditional soap-free bathing, and rapid gas relief.',
      service: servicesData.find((s) => s.id === 'infant-massage-bath') || servicesData[4],
      classItem: classesData.find((c) => c.id === 'class-baby-massage') || classesData[0],
      product: productsData.find((p) => p.id === 'product-tummy-roll-on') || productsData[3],
      keyTip: 'Clockwise palm circles combined with safe infant bicycle legs encourage gentle gas expulsion within 15 minutes.',
    };
  };

  const rec = getRecommendation();

  const handleAddToCart = (prod: any) => {
    addToCart({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      volumeOrType: prod.volume,
      image: prod.image,
    });
    setAddedProductId(prod.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  return (
    <div className="relative bg-cream-light/60 rounded-3xl border border-cream-border p-4 sm:p-6 lg:p-8 shadow-warm-sm font-sans space-y-6">
      {/* Soft Background Ambient Light Spots */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />

      {/* Interactive 3-Step Selection Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 bg-cream/90 p-4 sm:p-6 rounded-2xl border border-cream-border/90 shadow-warm-xs relative z-10">
        {/* Step 1: Stage */}
        <div className="space-y-2.5">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-gold/20 flex items-center justify-center text-maroon font-bold text-xs">
              1
            </div>
            <label className="text-xs font-bold text-maroon uppercase tracking-wider flex items-center space-x-1.5">
              <Compass className="w-3.5 h-3.5 text-gold-dark" />
              <span>Current Stage</span>
            </label>
          </div>

          <div className="space-y-2">
            {[
              { id: 'preconception', label: 'Trying to Conceive', icon: Flower2 },
              { id: 'pregnancy', label: 'Currently Pregnant', icon: Heart },
              { id: 'postpartum', label: 'Postpartum Mother', icon: Shield },
              { id: 'newborn', label: 'Newborn Baby (0-12m)', icon: Baby },
            ].map((st) => {
              const StIcon = st.icon;
              const isSelected = stage === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStage(st.id as any)}
                  className={`w-full py-2.5 px-3.5 rounded-2xl text-xs font-bold text-left transition-all duration-200 flex items-center justify-between relative ${
                    isSelected
                      ? 'bg-maroon text-cream-light shadow-warm-sm scale-[1.01]'
                      : 'bg-cream text-brown hover:bg-cream-dark/60 border border-cream-border'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 relative z-10">
                    <StIcon className={`w-4 h-4 ${isSelected ? 'text-gold-light' : 'text-maroon'}`} />
                    <span>{st.label}</span>
                  </div>
                  {isSelected && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10">
                      <Check className="w-4 h-4 text-gold-light" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Timeline */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-gold/20 flex items-center justify-center text-maroon font-bold text-xs">
              2
            </div>
            <label className="text-xs font-bold text-maroon uppercase tracking-wider flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-dark" />
              <span>Specific Timing</span>
            </label>
          </div>

          <div className="space-y-2">
            {stage === 'preconception' && (
              <>
                {[
                  { id: 'planning-ahead', label: 'Planning 3–6 Months Ahead' },
                  { id: 'ivf-prep', label: 'Undergoing IUI / IVF Prep' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTiming(t.id)}
                    className={`w-full py-2.5 px-3.5 rounded-2xl text-xs font-bold text-left transition-all duration-200 flex items-center justify-between ${
                      timing === t.id
                        ? 'bg-maroon text-cream-light shadow-warm-sm'
                        : 'bg-cream text-brown hover:bg-cream-dark/60 border border-cream-border'
                    }`}
                  >
                    <span>{t.label}</span>
                    {timing === t.id && <Check className="w-4 h-4 text-gold-light" />}
                  </button>
                ))}
              </>
            )}

            {stage === 'pregnancy' && (
              <>
                {[
                  { id: 'second-trimester', label: 'Weeks 14 – 27 (2nd Trimester)' },
                  { id: 'third-trimester', label: 'Weeks 28 – 40 (3rd Trimester)' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTiming(t.id)}
                    className={`w-full py-2.5 px-3.5 rounded-2xl text-xs font-bold text-left transition-all duration-200 flex items-center justify-between ${
                      timing === t.id
                        ? 'bg-maroon text-cream-light shadow-warm-sm'
                        : 'bg-cream text-brown hover:bg-cream-dark/60 border border-cream-border'
                    }`}
                  >
                    <span>{t.label}</span>
                    {timing === t.id && <Check className="w-4 h-4 text-gold-light" />}
                  </button>
                ))}
              </>
            )}

            {stage === 'postpartum' && (
              <>
                {[
                  { id: 'early-confinement', label: 'Day 1 – 21 (Fresh Confinement)' },
                  { id: 'late-postpartum', label: 'Month 2 – 6 (Extended Recovery)' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTiming(t.id)}
                    className={`w-full py-2.5 px-3.5 rounded-2xl text-xs font-bold text-left transition-all duration-200 flex items-center justify-between ${
                      timing === t.id
                        ? 'bg-maroon text-cream-light shadow-warm-sm'
                        : 'bg-cream text-brown hover:bg-cream-dark/60 border border-cream-border'
                    }`}
                  >
                    <span>{t.label}</span>
                    {timing === t.id && <Check className="w-4 h-4 text-gold-light" />}
                  </button>
                ))}
              </>
            )}

            {stage === 'newborn' && (
              <>
                {[
                  { id: '0-4-weeks', label: '0 to 4 Weeks Old' },
                  { id: '1-6-months', label: '1 to 6 Months Old' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTiming(t.id)}
                    className={`w-full py-2.5 px-3.5 rounded-2xl text-xs font-bold text-left transition-all duration-200 flex items-center justify-between ${
                      timing === t.id
                        ? 'bg-maroon text-cream-light shadow-warm-sm'
                        : 'bg-cream text-brown hover:bg-cream-dark/60 border border-cream-border'
                    }`}
                  >
                    <span>{t.label}</span>
                    {timing === t.id && <Check className="w-4 h-4 text-gold-light" />}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Step 3: Primary Priority */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-gold/20 flex items-center justify-center text-maroon font-bold text-xs">
              3
            </div>
            <label className="text-xs font-bold text-maroon uppercase tracking-wider flex items-center space-x-1.5">
              <Target className="w-3.5 h-3.5 text-gold-dark" />
              <span>Primary Focus</span>
            </label>
          </div>

          <div className="space-y-2">
            {[
              { id: 'body-comfort', label: 'Physical Healing & Bodywork' },
              { id: 'birth-prep', label: 'Hands-on Skills & Classes' },
              { id: 'digestive-relief', label: 'Infant Colic & Restful Sleep' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPriority(p.id)}
                className={`w-full py-2.5 px-3.5 rounded-2xl text-xs font-bold text-left transition-all duration-200 flex items-center justify-between ${
                  priority === p.id
                    ? 'bg-maroon text-cream-light shadow-warm-sm'
                    : 'bg-cream text-brown hover:bg-cream-dark/60 border border-cream-border'
                }`}
              >
                <span>{p.label}</span>
                {priority === p.id && <Check className="w-4 h-4 text-gold-light" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Care Pathway Result Card (Guaranteed Immediate Rendering) */}
      <div key={rec.id} className="relative z-10 transition-all duration-300">
        <div className="p-5 sm:p-8 lg:p-9 bg-cream/95 rounded-2xl border-2 border-gold/50 shadow-warm-md">
            {/* Header Result Line */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-7 border-b border-cream-border/80">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-gold/20 text-maroon text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 border border-gold/30">
                    <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                    <span>Recommended Care Pathway</span>
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-maroon leading-tight">
                  {rec.title}
                </h3>
                <p className="text-xs sm:text-sm text-brown-muted leading-relaxed max-w-2xl">
                  {rec.summary}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openEnquiry({ serviceTitle: rec.title })}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-maroon via-maroon-dark to-maroon text-cream-light text-xs font-bold uppercase tracking-wider shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center space-x-2 shrink-0 cursor-pointer border border-gold/30"
              >
                <Calendar className="w-4 h-4 text-gold-light" />
                <span>Consult Care Advisor</span>
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </motion.button>
            </div>

            {/* 3 Pillars Recommendation Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-7">
              {/* Pillar 1: Dedicated In-Home Service */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-cream p-5 rounded-2xl border border-cream-border hover:border-gold/50 shadow-warm-sm hover:shadow-warm-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-maroon bg-maroon-soft px-2.5 py-1 rounded-full border border-maroon/20">
                      1. In-Home Service
                    </span>
                    <ShieldCheck className="w-4 h-4 text-maroon opacity-70" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-brown leading-snug">
                    {rec.service.title}
                  </h4>
                  <p className="text-xs text-brown-muted leading-relaxed line-clamp-3">
                    {rec.service.benefit}
                  </p>
                </div>

                <div className="pt-3 border-t border-cream-border/40">
                  <Link
                    href={`/services/${rec.service.slug}`}
                    className="text-xs font-bold text-maroon hover:text-maroon-dark flex items-center space-x-1 group"
                  >
                    <span>View Service Details</span>
                    <ChevronRight className="w-4 h-4 text-maroon group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Pillar 2: Live Cohort Masterclass */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-cream p-5 rounded-2xl border border-cream-border hover:border-gold/50 shadow-warm-sm hover:shadow-warm-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold/20 px-2.5 py-1 rounded-full border border-gold/30">
                      2. Masterclass Workshop
                    </span>
                    <Calendar className="w-4 h-4 text-gold-dark opacity-70" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-brown leading-snug">
                    {rec.classItem.title}
                  </h4>
                  <p className="text-xs text-brown-muted leading-relaxed line-clamp-3">
                    {rec.classItem.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-cream-border/40">
                  <Link
                    href={`/classes/${rec.classItem.slug}`}
                    className="text-xs font-bold text-maroon hover:text-maroon-dark flex items-center space-x-1 group"
                  >
                    <span>View Workshop Schedule</span>
                    <ChevronRight className="w-4 h-4 text-maroon group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Pillar 3: Handcrafted Botanical Formulation */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-cream p-5 rounded-2xl border border-cream-border hover:border-gold/50 shadow-warm-sm hover:shadow-warm-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brown bg-cream-dark px-2.5 py-1 rounded-full border border-cream-border">
                      3. Handcrafted Botanical
                    </span>
                    <ShoppingBag className="w-4 h-4 text-brown opacity-70" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-brown leading-snug">
                    {rec.product.title}
                  </h4>
                  <p className="text-xs text-brown-muted leading-relaxed line-clamp-3">
                    {rec.product.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-cream-border/40 flex items-center justify-between">
                  <span className="text-xs font-bold text-maroon">
                    ₹{rec.product.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(rec.product)}
                    className="px-3 py-1.5 rounded-xl bg-gold/20 hover:bg-gold/30 text-maroon font-bold text-xs transition-colors flex items-center space-x-1"
                  >
                    {addedProductId === rec.product.id ? (
                      <span className="text-maroon-dark font-extrabold flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5 text-maroon" />
                        <span>Added</span>
                      </span>
                    ) : (
                      <span>+ Add to Basket</span>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Traditional Tip Note Banner */}
            <div className="mt-7 p-4 bg-gradient-to-r from-gold-soft/80 via-gold/15 to-gold-soft/80 border border-gold/40 rounded-2xl text-xs text-brown flex items-start space-x-3 backdrop-blur-xs">
              <div className="w-7 h-7 rounded-xl bg-gold/20 flex items-center justify-center shrink-0 text-maroon mt-0.5">
                <Heart className="w-4 h-4 fill-maroon text-maroon" />
              </div>
              <div className="space-y-0.5">
                <span className="font-serif font-bold text-maroon text-sm block">
                  SEYOL Traditional Care Heritage Note
                </span>
                <p className="text-brown-muted leading-relaxed">{rec.keyTip}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
