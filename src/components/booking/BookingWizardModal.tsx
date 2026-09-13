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
        <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#3a1d1d]/75 backdrop-blur-sm transition-opacity"
            onClick={closeBooking}
          />

          {/* Modal Wrapper */}
          <div className="min-h-full flex items-center justify-center p-3 sm:p-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl text-left z-10 my-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeBooking}
                aria-label="Close Booking Modal"
                className="absolute -top-3 -right-3 sm:top-4 sm:right-4 z-20 w-10 h-10 rounded-full bg-cream border border-cream-border text-brown hover:text-maroon hover:bg-white shadow-warm-md flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Core Wizard */}
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
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
