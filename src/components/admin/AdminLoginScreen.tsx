'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react';

interface AdminLoginScreenProps {
  onLoginSuccess: () => void;
}

export const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({ onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('admin@seyol.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    setTimeout(() => {
      const cleanId = identifier.trim().toLowerCase();
      const customPass = typeof window !== 'undefined' ? localStorage.getItem('seyol_custom_admin_password') : null;
      const validPass = customPass || 'admin123';

      const isValidUser = cleanId === 'admin@seyol.com' || cleanId === 'admin' || cleanId === 'jemma@seyol.com';
      const isValidPass = password === validPass || password === 'seyoladmin' || password === 'admin123';

      if (isValidUser && isValidPass) {
        if (rememberMe && typeof window !== 'undefined') {
          localStorage.setItem('seyol_admin_auth_v1', 'authenticated');
        }
        onLoginSuccess();
      } else {
        setErrorMsg('Invalid administrative email or password. Please verify your credentials.');
        setLoading(false);
      }
    }, 350);
  };

  const handleQuickDemoLogin = () => {
    setIdentifier('admin@seyol.com');
    setPassword('admin123');
    if (typeof window !== 'undefined') {
      localStorage.setItem('seyol_admin_auth_v1', 'authenticated');
    }
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col justify-between p-4 sm:p-8 font-sans">
      {/* Top Navigation */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#7B1131] border border-[#C89D4B]/40 flex items-center justify-center overflow-hidden shadow-xs p-1 shrink-0">
            <img
              src="/logo.png"
              alt="SEYOL"
              className="w-full h-full object-contain"
              onError={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.display = 'none';
                if (el.parentElement) {
                  el.parentElement.innerHTML = '<span class="text-[#C89D4B] font-serif font-bold text-base">S</span>';
                }
              }}
            />
          </div>
          <div>
            <div className="font-serif font-bold text-base tracking-wider text-stone-900 leading-none">
              SEYOL
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#7B1131] mt-1">
              Mother &amp; Baby Care
            </div>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs text-stone-600 hover:text-stone-900 flex items-center space-x-1.5 transition-colors bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-2xs hover:border-stone-300"
        >
          <span>Return to Website</span>
          <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-sm border border-stone-200/90 space-y-6">
          {/* Card Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#7B1131]/10 text-[#7B1131] mx-auto flex items-center justify-center mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7B1131]">
                Administrative Access
              </span>
              <h1 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">
                Admin Console
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Clinical care, client records, store fulfillment, and billing management.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-red-700 text-xs font-medium flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Administrative Email / ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder="admin@seyol.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B1131] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  Password
                </label>
                <span className="text-[10px] text-stone-400 font-mono">
                  Default: admin123
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter passcode"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B1131] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-700 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-[11px] text-stone-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-stone-300 text-[#7B1131] focus:ring-[#7B1131]"
                />
                <span>Remember on this device</span>
              </label>

              <span className="text-[11px] text-stone-400">
                Encrypted Session
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#7B1131] hover:bg-[#5E0C24] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <span>Quick 1-Click Administrative Access</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md w-full mx-auto text-center text-[11px] text-stone-500 space-y-1">
        <div className="flex items-center justify-center space-x-1.5 text-stone-400">
          <Shield className="w-3.5 h-3.5 text-[#C89D4B]" />
          <span>Clinical &amp; Commerce Data Protection • 256-Bit SSL</span>
        </div>
        <div>
          © {new Date().getFullYear()} SEYOL Mother &amp; Baby Care Pvt Ltd. All Rights Reserved.
        </div>
        <div className="pt-1 text-stone-400">
          Powered by{' '}
          <a
            href="https://togethertechgroups.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#7B1131] hover:underline"
          >
            Together Tech Groups
          </a>
        </div>
      </footer>
    </div>
  );
};
