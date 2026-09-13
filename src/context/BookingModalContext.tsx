'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { BookingServiceId, BookingFormData } from '../types/booking';
import { bookingServicesConfig } from '../data/bookingServicesData';

interface OpenBookingOptions {
  serviceId?: BookingServiceId | string;
  serviceTitle?: string;
  packageId?: string;
  initialData?: Partial<BookingFormData>;
}

interface BookingModalContextType {
  isOpen: boolean;
  activeServiceId: BookingServiceId;
  selectedPackageId: string | null;
  initialData: Partial<BookingFormData> | null;
  openBooking: (options?: OpenBookingOptions) => void;
  closeBooking: () => void;
  setActiveServiceId: (serviceId: BookingServiceId) => void;
  setSelectedPackageId: (packageId: string | null) => void;
}

const normalizeServiceId = (input?: string): BookingServiceId => {
  if (!input) return 'postpartum-massage-wrap';
  const clean = input.toLowerCase().trim();

  if (clean.includes('preconception')) return 'preconception-support';
  if (clean.includes('prenatal')) return 'prenatal-massage';
  if (clean.includes('doula')) return 'birth-doula-support';
  if (clean.includes('combo') || clean.includes('ssc') || clean.includes('spc')) return 'mother-baby-combo';
  if (clean.includes('infant') || clean.includes('baby') || clean.includes('simb')) return 'infant-massage-bath';
  if (clean.includes('nanny') || clean.includes('confinement') || clean.includes('scn')) return 'confinement-nanny';
  if (clean.includes('hourly') || clean.includes('respite')) return 'hourly-newborn-support';
  if (clean.includes('lactation') || clean.includes('breastfeeding') || clean.includes('feeding')) return 'lactation-support';
  if (clean.includes('consultation') || clean.includes('general') || clean.includes('guidance') || clean.includes('roadmap')) return 'general-consultation';
  if (clean.includes('postpartum') || clean.includes('postnatal') || clean.includes('wrap') || clean.includes('ssp') || clean.includes('spp')) return 'postpartum-massage-wrap';

  if (clean in bookingServicesConfig) {
    return clean as BookingServiceId;
  }

  return 'postpartum-massage-wrap';
};

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export const BookingModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeServiceId, setActiveServiceIdState] = useState<BookingServiceId>('postpartum-massage-wrap');
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<Partial<BookingFormData> | null>(null);

  const openBooking = useCallback((options?: OpenBookingOptions) => {
    const rawId = options?.serviceId || options?.serviceTitle;
    const resolvedId = normalizeServiceId(rawId);

    setActiveServiceIdState(resolvedId);
    setSelectedPackageId(options?.packageId || null);
    setInitialData(options?.initialData || null);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    setSelectedPackageId(null);
    setInitialData(null);
  }, []);

  const setActiveServiceId = useCallback((serviceId: BookingServiceId) => {
    setActiveServiceIdState(serviceId);
  }, []);

  return (
    <BookingModalContext.Provider
      value={{
        isOpen,
        activeServiceId,
        selectedPackageId,
        initialData,
        openBooking,
        closeBooking,
        setActiveServiceId,
        setSelectedPackageId,
      }}
    >
      {children}
    </BookingModalContext.Provider>
  );
};

export const useBookingModal = () => {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error('useBookingModal must be used within a BookingModalProvider');
  }
  return context;
};
