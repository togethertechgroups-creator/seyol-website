'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export const FirstSeyolResource: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addGuideLead } = useAdminData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setLoading(true);
    setTimeout(() => {
      try {
        if (addGuideLead) {
          addGuideLead({
            fullName: 'Parent',
            email: email.trim(),
            stage: 'newborn',
            guideTitle: 'Your First SEYOL Resource & Parent Checklist',
          });
        }
      } catch (err) {
        console.warn('Could not record guide lead:', err);
      }
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section className="py-14 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] font-sans">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1560px] mx-auto w-full">
        {/* Card matching the user's mockup with Seyol deep maroon & warm cream colors */}
        <div className="relative bg-gradient-to-br from-[#4A0B1C] via-[#600F25] to-[#7B1131] text-white rounded-[26px] sm:rounded-[34px] p-8 sm:p-12 md:p-14 lg:p-16 overflow-hidden shadow-[0_16px_40px_rgba(74,11,28,0.22)] border border-[#7B1131]/30">
          
          {/* Subtle warm decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#C8A45D]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center space-y-3 sm:space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#E4CF9E]">
              10 — A GIFT FOR YOUR JOURNEY
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-snug">
              Your First SEYOL Resource
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed pt-0.5 max-w-2xl mx-auto">
              Get helpful guides, newborn checklists and parent resources delivered to your inbox.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 flex items-center justify-center space-x-3 text-white bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 max-w-xl mx-auto"
              >
                <CheckCircle2 className="w-5 h-5 text-[#E4CF9E] shrink-0" />
                <span className="text-sm font-medium">
                  Thank you! Your free guide &amp; parent checklist has been sent to <strong>{email}</strong>.
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-4 space-y-3.5 w-full max-w-xl sm:max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-white/10 border border-white/25 text-white placeholder-white/55 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E4CF9E] focus:border-transparent transition-all backdrop-blur-xs text-center"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-white hover:bg-[#FAF4ED] text-[#7B1131] font-bold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
                >
                  <span>{loading ? 'Sending Resource...' : 'Get My Free Resource →'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
export default FirstSeyolResource;
