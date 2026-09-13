'use client';

import React, { createContext, useContext, useState } from 'react';
import { useBookingModal } from './BookingModalContext';

interface QuickEnquiryContextType {
  isOpen: boolean;
  serviceTitle: string | null;
  classTitle: string | null;
  openEnquiry: (options?: { serviceTitle?: string; classTitle?: string; packageId?: string }) => void;
  closeEnquiry: () => void;
}

const QuickEnquiryContext = createContext<QuickEnquiryContextType | undefined>(undefined);

export const QuickEnquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceTitle, setServiceTitle] = useState<string | null>(null);
  const [classTitle, setClassTitle] = useState<string | null>(null);
  const { openBooking } = useBookingModal();

  const openEnquiry = (options?: { serviceTitle?: string; classTitle?: string; packageId?: string }) => {
    // If it's a service booking request, route directly to the rich multi-step Booking Wizard
    if (options?.serviceTitle || (!options?.classTitle && !options?.serviceTitle)) {
      openBooking({
        serviceTitle: options?.serviceTitle,
        packageId: options?.packageId
      });
      return;
    }

    setServiceTitle(options?.serviceTitle || null);
    setClassTitle(options?.classTitle || null);
    setIsOpen(true);
  };

  const closeEnquiry = () => {
    setIsOpen(false);
    setServiceTitle(null);
    setClassTitle(null);
  };

  return (
    <QuickEnquiryContext.Provider
      value={{
        isOpen,
        serviceTitle,
        classTitle,
        openEnquiry,
        closeEnquiry,
      }}
    >
      {children}
    </QuickEnquiryContext.Provider>
  );
};

export const useQuickEnquiry = () => {
  const context = useContext(QuickEnquiryContext);
  if (!context) {
    throw new Error('useQuickEnquiry must be used within a QuickEnquiryProvider');
  }
  return context;
};
