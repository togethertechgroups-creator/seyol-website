'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useBookingModal } from '../../context/BookingModalContext';
import { ServiceBookingWizard } from './ServiceBookingWizard';

export const BookingWizardModal: React.FC = () => {
  const { isOpen, activeServiceId, selectedPackageId, initialData, closeBooking } = useBookingModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeBooking();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeBooking]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] w-full h-full overflow-y-auto bg-cream-light font-sans"
        >
          {/* Top-Right Floating Close Button */}
          <button
            onClick={closeBooking}
            aria-label="Close Booking Modal"
            className="fixed top-3 right-3 sm:top-5 sm:right-6 z-[110] w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-maroon border border-white/30 hover:border-cream-border shadow-warm-md flex items-center justify-center transition-all cursor-pointer backdrop-blur-md hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Full Screen Core Wizard */}
          <div className="w-full min-h-screen bg-cream-light flex flex-col">
            <ServiceBookingWizard
              initialServiceId={activeServiceId}
              preselectedPackageId={selectedPackageId}
              initialData={initialData}
              isModal={true}
              onClose={closeBooking}
              onSuccess={() => {
                // Keep open to show the celebration success card
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
