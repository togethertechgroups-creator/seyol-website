'use client';

import React from 'react';
import { Users, AlertCircle } from 'lucide-react';

export interface ClassSeatIndicatorProps {
  seatsLeft: number;
  totalSeats: number;
}

export const ClassSeatIndicator: React.FC<ClassSeatIndicatorProps> = ({
  seatsLeft,
  totalSeats,
}) => {
  const percentage = Math.max(0, Math.min(100, Math.round(((totalSeats - seatsLeft) / totalSeats) * 100)));
  const isUrgent = seatsLeft <= 5;

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between text-xs font-bold">
        <div className="flex items-center space-x-1.5 text-brown">
          <Users className="w-3.5 h-3.5 text-maroon" />
          <span>Cohort Availability</span>
        </div>
        <span className={isUrgent ? 'text-maroon font-bold animate-pulse' : 'text-gold-dark font-bold'}>
          {seatsLeft === 0 ? 'Fully Booked' : `${seatsLeft} Seats Left`}
        </span>
      </div>

      {/* Visual Fill Bar */}
      <div className="w-full h-2 rounded-full bg-cream-dark overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isUrgent ? 'bg-maroon' : 'bg-gold-dark'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isUrgent && seatsLeft > 0 && (
        <div className="flex items-center space-x-1 text-[10px] text-maroon font-semibold">
          <AlertCircle className="w-3 h-3" />
          <span>Selling fast! Reserve your slot to lock in studio materials.</span>
        </div>
      )}
    </div>
  );
};
