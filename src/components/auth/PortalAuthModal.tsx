'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useAuth, PRECONFIGURED_CLIENTS } from '../../context/AuthContext';

export const PortalAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, loginAsClient, user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your email or WhatsApp number');
      return;
    }

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      login(identifier, password);
      setIsLoading(false);
      closeAuthModal();
      router.push('/portal');
    }, 600);
  };

  const handleQuickClientLogin = (clientId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      loginAsClient(clientId);
      setIsLoading(false);
      closeAuthModal();
      router.push('/portal');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-cream-light w-full max-w-lg rounded-3xl border border-gold-border shadow-warm-lg overflow-hidden font-sans text-brown"
      >
        {/* Header */}
        <div className="bg-[#7B1131] text-cream-light p-6 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold-light">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light bg-gold/20 px-2 py-0.5 rounded-full border border-gold/30">
                Customer Account
              </span>
              <h3 className="font-serif text-xl font-bold text-cream-light mt-0.5">
                My SEYOL Care Portal Login
              </h3>
            </div>
          </div>

          <p className="text-xs text-cream-light/80 mt-2 leading-relaxed">
            Enter your email address or WhatsApp number to access your care appointments, session notes, receipts, and clinical records.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {isAuthenticated && user ? (
            /* Logged in state inside modal */
            <div className="space-y-4 text-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold mx-auto shadow-warm-sm">
                <Image src={user.avatar} alt={user.name} fill unoptimized className="object-cover" />
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-brown">{user.name}</div>
                <div className="text-xs text-brown-muted">{user.email} • {user.eddOrBabyAge}</div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => {
                    closeAuthModal();
                    router.push('/portal');
                  }}
                  className="flex-1 py-3 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-md flex items-center justify-center space-x-1.5 transition-all"
                >
                  <span>Open My Care Portal</span>
                  <ArrowRight className="w-4 h-4 text-gold-light" />
                </button>
                <button
                  onClick={logout}
                  className="py-3 px-5 rounded-xl bg-cream border border-cream-border hover:bg-cream-dark text-brown font-bold text-xs transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brown mb-1.5">
                  Email Address or WhatsApp Number <span className="text-maroon">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-brown-muted" />
                  <input
                    type="text"
                    placeholder="e.g. ananya.r@example.com or +91 98400..."
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream border border-cream-border text-xs font-medium text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brown">
                    Password / Access Passcode
                  </label>
                  <span className="text-[10px] text-maroon font-semibold cursor-pointer hover:underline">
                    Forgot passcode?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-brown-muted" />
                  <input
                    type="password"
                    placeholder="Enter your passcode (or leave blank for demo)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream border border-cream-border text-xs font-medium text-brown focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-md transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-cream-light border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Log In to Care Portal</span>
                    <ArrowRight className="w-4 h-4 text-gold-light" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
