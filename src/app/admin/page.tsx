'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Globe, Users, ShoppingCart, ShoppingBag, 
  CreditCard, BarChart3, Settings as SettingsIcon, 
  LogOut, Calendar, Menu, X, CheckCircle2 
} from 'lucide-react';
import { AdminWebsiteManager } from '../../components/admin/AdminWebsiteManager';
import { AdminProductCatalog } from '../../components/admin/AdminProductCatalog';
import { AdminClientEditor } from '../../components/admin/AdminClientEditor';
import { AdminOrderManager } from '../../components/admin/AdminOrderManager';
import { AdminPaymentManager } from '../../components/admin/AdminPaymentManager';
import { AdminReportsAnalytics } from '../../components/admin/AdminReportsAnalytics';
import { AdminSettingsManager } from '../../components/admin/AdminSettingsManager';
import { AdminLoginScreen } from '../../components/admin/AdminLoginScreen';
import { useAdminData } from '../../context/AdminDataContext';
import { usePortalData } from '../../context/PortalDataContext';

type AdminModule = 'customers' | 'orders' | 'website' | 'products' | 'payments' | 'reports' | 'settings';

export default function AdminPage() {
  const { orders, products } = useAdminData();
  const { allClientData } = usePortalData();

  const [mounted, setMounted] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<AdminModule>('customers');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    setMounted(true);
    const session = typeof window !== 'undefined' ? localStorage.getItem('seyol_admin_auth_v1') : null;
    if (session === 'authenticated') {
      setIsAdminAuthenticated(true);
    } else {
      setIsAdminAuthenticated(false);
    }

    // Live Indian Standard Time & Date updater
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const timeStr = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentDateTime(`${dateStr} • ${timeStr}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('seyol_admin_auth_v1');
    }
    setIsAdminAuthenticated(false);
    showToast('Signed out of administrative console');
  };

  // Prevent SSR mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-3 border-[#7B1131] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-[#7B1131] tracking-widest uppercase">
            Loading SEYOL Console...
          </p>
        </div>
      </div>
    );
  }

  // Security Gate
  if (!isAdminAuthenticated) {
    return (
      <AdminLoginScreen
        onLoginSuccess={() => {
          setIsAdminAuthenticated(true);
          showToast('Welcome to SEYOL Admin Console');
        }}
      />
    );
  }

  const clientsCount = Object.keys(allClientData).length;
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'pending').length;

  const navItems = [
    {
      group: 'Maternal Care & Store',
      items: [
        {
          id: 'customers' as AdminModule,
          label: 'Client Portals',
          icon: Users,
          badge: clientsCount > 0 ? clientsCount : null,
          badgeColor: 'bg-[#7B1131]/10 text-[#7B1131]',
        },
        {
          id: 'orders' as AdminModule,
          label: 'Store Orders',
          icon: ShoppingCart,
          badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : null,
          badgeColor: 'bg-amber-100 text-amber-800 font-bold',
        },
        {
          id: 'products' as AdminModule,
          label: 'Botanical Catalog',
          icon: ShoppingBag,
          badge: products.length > 0 ? products.length : null,
          badgeColor: 'bg-stone-100 text-stone-600',
        },
      ],
    },
    {
      group: 'Finance & Systems',
      items: [
        {
          id: 'payments' as AdminModule,
          label: 'Invoices & Stripe',
          icon: CreditCard,
          badge: null,
          badgeColor: '',
        },
        {
          id: 'reports' as AdminModule,
          label: 'Reports & Analytics',
          icon: BarChart3,
          badge: null,
          badgeColor: '',
        },
        {
          id: 'settings' as AdminModule,
          label: 'Platform Settings',
          icon: SettingsIcon,
          badge: null,
          badgeColor: '',
        },
        {
          id: 'website' as AdminModule,
          label: 'CMS Portal',
          icon: Globe,
          badge: null,
          badgeColor: '',
        },
      ],
    },
  ];

  const currentTabLabel = () => {
    switch (activeTab) {
      case 'customers': return 'Client Portals & Care Editor';
      case 'orders': return 'Store Orders & Dispatch Pipeline';
      case 'products': return 'Botanical Products & Bundles';
      case 'payments': return 'Invoices & Stripe Billing';
      case 'reports': return 'Operational Reports & Analytics';
      case 'settings': return 'Platform & Workspace Settings';
      case 'website': return 'CMS Portal & Content';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans flex">
      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 border border-[#C89D4B]/30 animate-fadeIn text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── DESKTOP PERSISTENT SIDEBAR ─────────────────────────────────── */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-stone-200 text-stone-800 flex-col justify-between fixed top-0 left-0 bottom-0 z-40 shadow-xs">
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Header */}
          <div className="p-5 border-b border-stone-200/80 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#7B1131] border border-[#C89D4B]/30 flex items-center justify-center overflow-hidden shadow-xs p-1 shrink-0">
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
                  Admin Console
                </div>
              </div>
            </Link>

            <div className="flex items-center space-x-1 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full" title="All Services Operational">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider">Live</span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="p-3.5 space-y-5 flex-1">
            {navItems.map((group, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 pb-1">
                  {group.group}
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#7B1131] text-white shadow-xs'
                          : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                          isActive ? 'bg-white/20 text-white' : item.badgeColor
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3.5 border-t border-stone-200 space-y-2">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full py-2 px-3 rounded-xl bg-stone-50 hover:bg-red-50 text-stone-600 hover:text-red-700 border border-stone-200 hover:border-red-200 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <div className="pt-1 text-center">
              <p className="text-[10px] text-stone-400">
                Powered by{' '}
                <a
                  href="https://togethertechgroups.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#7B1131] hover:underline"
                >
                  Together Tech Groups
                </a>
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── MOBILE DRAWER NAVIGATION ───────────────────────────────────── */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs animate-fadeIn"
            onClick={() => setIsMobileNavOpen(false)}
          />

          <aside className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slideRight">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#7B1131] flex items-center justify-center text-white font-serif font-bold text-sm">
                  S
                </div>
                <span className="font-serif font-bold text-sm text-stone-900">SEYOL Admin</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 space-y-4 flex-1 overflow-y-auto">
              {navItems.map((group, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 pb-1">
                    {group.group}
                  </div>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileNavOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                          isActive
                            ? 'bg-[#7B1131] text-white'
                            : 'text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                            isActive ? 'bg-white/20 text-white' : item.badgeColor
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-stone-200">
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold flex items-center justify-center space-x-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ─── MAIN CONTENT AREA ─────────────────────────────────────────── */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-7 lg:p-9 max-w-7xl min-h-screen flex flex-col justify-between">
        <div>
          {/* Top Header Bar */}
          <header className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 gap-2 sm:gap-3">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-white border border-stone-200 text-stone-700 shadow-2xs shrink-0"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs text-stone-500 min-w-0">
                <span className="font-semibold text-stone-400">Admin</span>
                <span>/</span>
                <span className="font-bold text-[#7B1131] tracking-wide uppercase text-[10.5px] sm:text-[11px] truncate">
                  {currentTabLabel()}
                </span>
              </div>
            </div>

            {/* Right Clock */}
            <div className="flex items-center space-x-2 shrink-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border border-stone-200/90 shadow-2xs text-xs font-medium text-stone-700">
                <Calendar className="w-3.5 h-3.5 text-[#7B1131] shrink-0" />
                <span className="tabular-nums font-mono text-[10.5px] sm:text-[11px] whitespace-nowrap">
                  {currentDateTime.includes('•') ? (
                    <>
                      <span className="hidden sm:inline">{currentDateTime.split('•')[0]}• </span>
                      <span>{currentDateTime.split('•')[1]?.trim() || currentDateTime}</span>
                    </>
                  ) : (
                    currentDateTime || 'Loading Time...'
                  )}
                </span>
              </div>
            </div>
          </header>

          {/* Module Content */}
          <div className="animate-fadeIn">
            {activeTab === 'customers' && <AdminClientEditor />}
            {activeTab === 'orders' && <AdminOrderManager />}
            {activeTab === 'products' && <AdminProductCatalog onNotify={showToast} />}
            {activeTab === 'website' && <AdminWebsiteManager onNotify={showToast} />}
            {activeTab === 'payments' && <AdminPaymentManager />}
            {activeTab === 'reports' && <AdminReportsAnalytics />}
            {activeTab === 'settings' && <AdminSettingsManager />}
          </div>
        </div>

        {/* Global Content Footer */}
        <footer className="pt-8 pb-4 text-center text-xs text-stone-400 border-t border-stone-200/60 mt-12">
          SEYOL Sacred Mother &amp; Baby Care Pvt Ltd • Secure Operations Dashboard
        </footer>
      </main>
    </div>
  );
}
