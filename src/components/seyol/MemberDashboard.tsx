'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { User, BookOpen, Calendar, ShieldCheck, Lock, LogOut, Video, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DigitalResourceLocker } from './DigitalResourceLocker';
import { CareJourneyDashboard } from './CareJourneyDashboard';

export const MemberDashboard: React.FC = () => {
  const { isAuthenticated, user, logout, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'locker' | 'bookings'>('overview');

  if (!isAuthenticated || !user) {
    return (
      <div className="w-full bg-cream-light p-8 sm:p-12 rounded-3xl border border-gold/40 text-center space-y-4 shadow-warm-lg max-w-xl mx-auto">
        <div className="w-14 h-14 rounded-full bg-maroon text-gold flex items-center justify-center mx-auto shadow-warm-sm">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-brown">Member Portal Access</h3>
        <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">
          Log in to access your digital resource locker, video masterclasses, active postnatal care bookings, and stage guidance.
        </p>
        <button
          onClick={openAuthModal}
          className="px-6 py-3 rounded-xl bg-maroon text-cream-light font-bold text-xs shadow-warm-sm hover:bg-maroon-dark transition-all"
        >
          Log In to Member Portal
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-cream-light p-6 sm:p-10 rounded-3xl border border-cream-border shadow-warm-lg space-y-8">
      {/* Header Profile Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-cream-border pb-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold shadow-warm-sm shrink-0">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif text-xl font-bold text-brown">{user.name}</h3>
              <span className="px-2 py-0.5 rounded-full bg-maroon-soft text-maroon text-[10px] font-bold border border-maroon/20">
                Active Member
              </span>
            </div>
            <div className="text-xs text-brown-muted">
              {user.location} • {user.eddOrBabyAge}
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-3.5 py-2 rounded-xl bg-cream border border-cream-border text-brown hover:text-maroon text-xs font-bold transition-colors flex items-center space-x-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Tab Controls */}
      <div className="flex space-x-2 border-b border-cream-border pb-3">
        {[
          { id: 'overview', label: '1. Care Journey & Stage' },
          { id: 'locker', label: '2. Digital Resource Locker' },
          { id: 'bookings', label: '3. Active Care Bookings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === tab.id
                ? 'bg-maroon text-cream-light border-maroon shadow-warm-sm'
                : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Panel */}
      <div>
        {activeTab === 'overview' && <CareJourneyDashboard />}
        {activeTab === 'locker' && <DigitalResourceLocker />}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="bg-cream p-5 rounded-2xl border border-cream-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Active Care Package</span>
                <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-maroon-dark text-xs font-bold">Confirmed</span>
              </div>
              <h4 className="font-serif font-bold text-base text-brown">28-Day Sacred Postpartum Confinement & Kattu</h4>
              <p className="text-xs text-brown-muted">Assigned Senior Matron: Mrs. Lakshmi S. • Daily Visits at 9:30 AM IST</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
