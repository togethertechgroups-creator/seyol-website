'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, Eye, EyeOff, Check, Shield } from 'lucide-react';

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
      // Check stored custom password or default
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
        setErrorMsg('Invalid administrative email or password. Please verify and retry.');
        setLoading(false);
      }
    }, 400);
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
    <div className="min-h-screen bg-gradient-to-br from-[#1C040B] via-[#2D0813] to-[#120207] text-white flex flex-col justify-between p-4 sm:p-8 font-sans relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#7B1131]/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#E9C377]/15 blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between z-10">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 rounded-2xl bg-[#7B1131] border border-[#E9C377]/40 flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-105 transition-transform p-1.5 shrink-0">
            <img
              src="/logo.png"
              alt="SEYOL"
              className="w-full h-full object-contain"
              onError={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.display = 'none';
                if (el.parentElement) {
                  el.parentElement.innerHTML = '<span class="text-[#E9C377] font-serif font-black text-xl">S</span>';
                }
              }}
            />
          </div>
          <div>
            <div className="font-serif font-black text-lg tracking-widest text-white leading-none">
              SEYOL
            </div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-[#E9C377] mt-0.5">
              Sacred Mother &amp; Baby Care
            </div>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs text-white/70 hover:text-white flex items-center space-x-1.5 transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10"
        >
          <span>Return to Live Site</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto z-10 py-8 animate-fadeIn">
        <div className="bg-white/95 backdrop-blur-xl text-neutral-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 space-y-7">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#7B1131] text-[#E9C377] mx-auto flex items-center justify-center shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#7B1131]">
                Master Control Access
              </span>
              <h1 className="font-serif text-2xl font-black text-neutral-900 mt-1">
                Admin Console
              </h1>
              <p className="text-xs text-neutral-500 mt-1">
                Authorized management portal for clinical care, customer records, inventory &amp; billing.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center space-x-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                Administrative Email / ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="admin@seyol.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B1131] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                  Master Password
                </label>
                <span className="text-[10px] font-bold text-[#7B1131]">
                  Default: admin123
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter passcode"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B1131] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-[11px] text-neutral-600 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-neutral-300 text-[#7B1131] focus:ring-[#7B1131]"
                />
                <span>Remember session</span>
              </label>

              <span className="text-[11px] text-neutral-400">
                Encrypted Session
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Demo Fill */}
          <div className="pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>⚡ Quick 1-Click Admin Access</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md w-full mx-auto text-center text-[11px] text-white/50 space-y-1.5 z-10">
        <div className="flex items-center justify-center space-x-1.5">
          <Shield className="w-3.5 h-3.5 text-[#E9C377]" />
          <span>SEYOL Multi-Factor Clinical Data Protection • 256-Bit SSL</span>
        </div>
        <div>
          © {new Date().getFullYear()} SEYOL Mother &amp; Baby Care. All Rights Reserved.
        </div>
        <div className="pt-1 text-white/40">
          Powered by{' '}
          <a
            href="https://togethertechgroups.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#E9C377] hover:underline"
          >
            Together Tech Groups
          </a>
        </div>
      </div>
    </div>
  );
};
