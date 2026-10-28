'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface QuestionItem {
  id: string;
  question: string;
  answer: string;
}

const productQuestions: QuestionItem[] = [
  {
    id: 'choose-right-product',
    question: 'How do I choose the right product?',
    answer:
      'Start by identifying your family’s current stage and immediate needs. We formulate targeted botanical routines: Baby Massage Oils for deeper sleep and muscle development, Gentle Bath Powders for sensitive skin cleansing, Colic & Tummy Roll-Ons for natural digestion and wind relief, and Restorative Oils for maternal postpartum recovery. If you need personal guidance, explore our "Find Products for Your Stage" section above or contact our care matrons directly.',
  },
  {
    id: 'use-and-store',
    question: 'How should I use and store products?',
    answer:
      'All SEY by SEYOL apothecary formulations are 100% natural, cold-pressed, and crafted according to classical Siddha oil-curing methods without synthetic preservatives. Store in a cool, dry place away from direct sunlight and humidity. Keep caps securely fastened after each use. For maximum botanical vitality, use within 12 months of opening. A 24-hour patch test on the inner forearm is always recommended before full initial use on sensitive infant skin.',
  },
  {
    id: 'shipping-returns',
    question: 'What are the shipping and return policies?',
    answer:
      'Orders are packaged with care and dispatched within 24 to 48 business hours. We deliver across Tamil Nadu in 2–3 business days and pan-India in 3–5 business days. Due to strict hygiene and clinical safety regulations for certified topical infant care and postpartum oils, we cannot accept returns once the tamper-evident seal is opened. If your package arrives damaged or leaking, reach out within 48 hours with a photo for an immediate, hassle-free replacement.',
  },
  {
    id: 'infant-safety',
    question: 'Are SEY formulations safe for newborns and sensitive skin?',
    answer:
      'Yes. Our baby massage oils and bath powders are formulated with zero mineral oil, zero liquid paraffin, zero artificial dyes, and zero synthetic fragrances. They are dermatologically tested, certified by AYUSH, and made with 100% edible-grade botanical ingredients, ensuring complete safety even if a baby touches their mouth after massage.',
  },
  {
    id: 'colic-difference',
    question: 'How does SEY Colic Roll-On differ from raw kitchen remedies?',
    answer:
      'Raw kitchen asafoetida (hing) mixed with water can be abrasive, unpredictable in concentration, and prone to staining clothing. SEY Colic Roll-On blends therapeutic steam-distilled Asafoetida, Bishop’s Weed (Ajwain), and sweet fennel in cold-pressed virgin coconut oil at precise infant-safe dilutions, delivered via a mess-free cooling stainless steel roller.',
  },
];

export const ProductQuestionsFAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleQuestion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] border-t border-[#ECE5DD] font-sans">
      <div className="max-w-4xl mx-auto w-full">
        {/* White Card Container matching mockup */}
        <div className="bg-white rounded-[26px] sm:rounded-[32px] p-6 sm:p-10 md:p-12 lg:p-14 border border-[#ECE5DD] shadow-[0_4px_24px_rgba(58,29,29,0.04)]">
          
          {/* Header Centered */}
          <div className="mb-6 sm:mb-8 space-y-2 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#7B1131]">
              09 — PRODUCT QUESTIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#3A1D1D] tracking-tight">
              Questions Before You Buy?
            </h2>
          </div>

          {/* Accordion Questions List */}
          <div className="divide-y divide-[#ECE5DD]">
            {productQuestions.map((item) => {
              const isOpen = openIds.includes(item.id);

              return (
                <div key={item.id} className="py-4 sm:py-5 first:pt-2 last:pb-2">
                  <button
                    type="button"
                    onClick={() => toggleQuestion(item.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left gap-4 py-1 group cursor-pointer"
                  >
                    <span className="font-serif text-[15px] sm:text-base md:text-lg font-semibold text-[#3A1D1D] group-hover:text-[#7B1131] transition-colors leading-snug">
                      {item.question}
                    </span>

                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#7B1131] text-white rotate-45'
                          : 'bg-[#FAF4ED] text-[#7B1131] group-hover:bg-[#F3EBE3]'
                      }`}
                    >
                      <Plus className="w-4 h-4 stroke-[2.2]" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-2 pr-4 sm:pr-8 text-xs sm:text-sm text-[#6E5652] leading-[1.8]">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
export default ProductQuestionsFAQ;
