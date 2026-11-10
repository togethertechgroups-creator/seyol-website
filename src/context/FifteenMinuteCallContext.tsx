'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface FifteenMinuteCallContextType {
  isOpen: boolean;
  openCallBooking: () => void;
  closeCallBooking: () => void;
}

const FifteenMinuteCallContext = createContext<FifteenMinuteCallContextType | undefined>(undefined);

export const FifteenMinuteCallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openCallBooking = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCallBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <FifteenMinuteCallContext.Provider
      value={{
        isOpen,
        openCallBooking,
        closeCallBooking,
      }}
    >
      {children}
    </FifteenMinuteCallContext.Provider>
  );
};

export const useFifteenMinuteCall = () => {
  const context = useContext(FifteenMinuteCallContext);
  if (!context) {
    throw new Error('useFifteenMinuteCall must be used within a FifteenMinuteCallProvider');
  }
  return context;
};
