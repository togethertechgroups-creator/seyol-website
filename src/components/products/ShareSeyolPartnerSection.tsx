'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export const ShareSeyolPartnerSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [partnershipType, setPartnershipType] = useState('Creator / Influencer');
  const [socialProfile, setSocialProfile] = useState('');
  const [idea, setIdea] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { addGuideLead } = useAdminData();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const applicationData = {
        fullName: fullName.trim(),
        email: email.trim(),
        partnershipType,
        socialProfile: socialProfile.trim(),
        idea: idea.trim(),
        submittedAt: new Date().toISOString(),
      };

      // 1. Save to LocalStorage for persistence
      try {
        const existing = JSON.parse(localStorage.getItem('seyol_partner_applications') || '[]');
        localStorage.setItem(
          'seyol_partner_applications',
          JSON.stringify([applicationData, ...existing])
        );
      } catch (err) {
        console.warn('Could not store partner application in localStorage:', err);
      }

      // 2. Register into Admin Lead Tracking
      try {
        if (addGuideLead) {
          addGuideLead({
            fullName: fullName.trim(),
            email: email.trim(),
            stage: 'partner-collaboration',
            guideTitle: `Partner Application: ${partnershipType} (${socialProfile || 'Website'})`,
          });
        }
      } catch (err) {
        console.warn('Could not register guide lead:', err);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 08 — GROW WITH US : SHARE SEY BY SEYOL (FULL WIDTH WITH RIGHT IMAGE)     */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] font-sans">
        <div className="max-w-[96%] xl:max-w-[1500px] 2xl:max-w-[1720px] mx-auto w-full">
          <div className="bg-white rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 lg:p-14 xl:p-16 border border-[#ECE5DD] shadow-[0_6px_32px_rgba(58,29,29,0.05)] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 overflow-hidden relative">
            
            {/* Left Content Area */}
            <div className="max-w-2xl space-y-4 sm:space-y-5">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#7B1131]">
                GROW WITH US
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3A1D1D] tracking-tight leading-[1.12]">
                Share SEY by SEYOL
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-[#6E5652] leading-relaxed pt-0.5">
                For creators, affiliates and brand ambassadors who want to collaborate with SEYOL and share authentic postpartum and newborn wellness.
              </p>

              {/* Partnership Highlights */}
              <div className="flex flex-wrap gap-2.5 pt-1 pb-2">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FAF4ED] text-[#7B1131] border border-[#EFE4D6] text-xs font-semibold">
                  Custom Affiliate Links &amp; Commission
                </span>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FAF4ED] text-[#7B1131] border border-[#EFE4D6] text-xs font-semibold">
                  Botanical Care Product Gifting
                </span>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FAF4ED] text-[#7B1131] border border-[#EFE4D6] text-xs font-semibold">
                  Dedicated Creator Support
                </span>
              </div>

              {/* CTA Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Become a Partner</span>
                  <span className="text-base font-bold">→</span>
                </button>
              </div>
            </div>

            {/* Right Side Image Corner */}
            <div className="w-full lg:w-[420px] xl:w-[480px] 2xl:w-[520px] shrink-0">
              <div className="relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-[#ECE5DD] shadow-warm-md group bg-[#FAF0EB]">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=85"
                  alt="Share SEY by SEYOL with your community"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Corner Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/80 shadow-md flex items-center justify-between">
                  <span className="text-xs font-bold text-[#3A1D1D]">
                    SEYOL Creator Network
                  </span>
                  <span className="text-[11px] font-bold text-[#7B1131] uppercase tracking-wider">
                    Join Today
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PARTNER APPLICATION POP-UP MODAL (EXPANDED WIDTH, ZERO SCROLLING)         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 font-sans overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />

            {/* Modal Dialog Card - Wide 2-Column Layout to Eliminate Vertical Scrolling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-3xl lg:max-w-4xl bg-[#FAF7F2] rounded-[28px] sm:rounded-[34px] border border-[#ECE5DD] shadow-2xl p-5 sm:p-7 md:p-8 z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#FAF0EB] text-[#7B1131] hover:bg-[#F3EBE3] flex items-center justify-center transition-colors cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 stroke-[2.2]" />
              </button>

              {/* Modal Top Header */}
              <div className="mb-4 pr-10 space-y-0.5">
                <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-[#3A1D1D] tracking-tight">
                  Let&apos;s grow together.
                </h3>
                <p className="text-xs sm:text-sm text-[#6E5652]">
                  Tell us a little about yourself and how you would like to collaborate with SEYOL.
                </p>
              </div>

              {isSuccess ? (
                <div className="bg-white rounded-2xl p-6 sm:p-8 text-center space-y-4 border border-[#ECE5DD] shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-[#FAF0EB] text-[#7B1131] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-serif text-xl font-bold text-[#3A1D1D]">
                      Application Received!
                    </h4>
                    <p className="text-xs sm:text-sm text-[#6E5652] leading-relaxed">
                      Thank you for your interest in collaborating with SEYOL. Our partnerships team will review your application and reach out to <strong>{email}</strong> shortly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 rounded-full bg-[#7B1131] text-white text-xs font-bold hover:bg-[#5A0C24] transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                /* Wide Form Card - 2 Columns on Desktop */
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 sm:p-6 border border-[#ECE5DD] shadow-xs space-y-3.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#7B1131] pb-1 border-b border-[#ECE5DD]/70">
                    Partner application
                  </div>

                  {/* 2-Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                    
                    {/* Left Column */}
                    <div className="space-y-3">
                      {/* Full Name */}
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#6E5652]">
                          Full name
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-4 py-2 sm:py-2.5 rounded-full border border-[#ECE5DD] bg-white text-xs sm:text-sm text-[#3A1D1D] placeholder-[#9E948C] focus:outline-none focus:ring-2 focus:ring-[#7B1131]/20 focus:border-[#7B1131] transition-all"
                        />
                      </div>

                      {/* Email address */}
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#6E5652]">
                          Email address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full px-4 py-2 sm:py-2.5 rounded-full border border-[#ECE5DD] bg-white text-xs sm:text-sm text-[#3A1D1D] placeholder-[#9E948C] focus:outline-none focus:ring-2 focus:ring-[#7B1131]/20 focus:border-[#7B1131] transition-all"
                        />
                      </div>

                      {/* Partnership Type */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#6E5652]">
                          Partnership type
                        </label>
                        <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                          {[
                            'Creator / Influencer',
                            'Affiliate Partner',
                            'Brand / Business',
                          ].map((type) => (
                            <label
                              key={type}
                              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all select-none ${
                                partnershipType === type
                                  ? 'bg-[#FAF4ED] border-[#7B1131] text-[#7B1131] font-bold'
                                  : 'border-[#ECE5DD] text-[#524644] hover:bg-[#FAF7F2]'
                              }`}
                            >
                              <input
                                type="radio"
                                name="partnershipType"
                                value={type}
                                checked={partnershipType === type}
                                onChange={() => setPartnershipType(type)}
                                className="w-3.5 h-3.5 text-[#7B1131] focus:ring-[#7B1131] accent-[#7B1131] cursor-pointer"
                              />
                              <span>{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3 flex flex-col justify-between">
                      {/* Social Profile or Website */}
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#6E5652]">
                          Social profile or website
                        </label>
                        <input
                          type="text"
                          value={socialProfile}
                          onChange={(e) => setSocialProfile(e.target.value)}
                          placeholder="Instagram, YouTube or website link"
                          className="w-full px-4 py-2 sm:py-2.5 rounded-full border border-[#ECE5DD] bg-white text-xs sm:text-sm text-[#3A1D1D] placeholder-[#9E948C] focus:outline-none focus:ring-2 focus:ring-[#7B1131]/20 focus:border-[#7B1131] transition-all"
                        />
                      </div>

                      {/* Tell us about your idea */}
                      <div className="space-y-1 flex-1 flex flex-col">
                        <label className="block text-xs font-semibold text-[#6E5652]">
                          Tell us about your idea
                        </label>
                        <textarea
                          rows={3}
                          value={idea}
                          onChange={(e) => setIdea(e.target.value)}
                          placeholder="How would you like to work with SEYOL?"
                          className="w-full px-4 py-2 sm:py-2.5 rounded-2xl border border-[#ECE5DD] bg-white text-xs sm:text-sm text-[#3A1D1D] placeholder-[#9E948C] focus:outline-none focus:ring-2 focus:ring-[#7B1131]/20 focus:border-[#7B1131] transition-all resize-none flex-1 min-h-[75px]"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Submit Button & Disclaimer */}
                  <div className="pt-1.5 space-y-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-full bg-[#7B1131] hover:bg-[#5A0C24] text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-md active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
                    >
                      <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <p className="text-[10.5px] text-[#8A7D78] leading-tight text-center">
                      Submitting an application does not guarantee acceptance. Connect this form to the SEYOL admin panel or email workflow.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export default ShareSeyolPartnerSection;
