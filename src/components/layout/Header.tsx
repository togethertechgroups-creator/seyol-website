'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import wordmarkMaroonSrc from '../../assets4/Wordmark - Transparent Background (Maroon)(1).png';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown,
  Search,
  FileText,
  User,
  LogOut,
  ChevronRight,
  GraduationCap,
  Package,
  BookOpen,
  Briefcase,
  Sparkles,
  Calendar,
  Flower2,
  ShieldCheck,
  Heart,
  Baby
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';
import { useAuth } from '../../context/AuthContext';
import { SmartSearch } from '../seyol/SmartSearch';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, openCart } = useCart();
  const { openEnquiry } = useQuickEnquiry();
  const { isAuthenticated, user, openAuthModal, logout } = useAuth();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Instant route pre-warming
  useEffect(() => {
    const routes = ['/', '/services', '/classes', '/products', '/resources', '/our-story', '/careers'];
    routes.forEach((route) => {
      try {
        router.prefetch(route);
      } catch (e) {}
    });
  }, [router]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/portal')) {
    return null;
  }

  const handleMouseEnter = (menuKey: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const getDropdownAlignmentClass = (key?: string) => {
    switch (key) {
      case 'services':
        return 'left-0';
      case 'classes':
        return 'left-0';
      case 'resources':
        return 'left-1/2 -translate-x-1/2';
      case 'careers':
        return 'right-0';
      default:
        return 'left-1/2 -translate-x-1/2';
    }
  };

  const navLinks = [
    { name: 'Start Here', href: '/' },
    { name: 'Services', href: '/services', key: 'services' },
    { name: 'Classes', href: '/classes', key: 'classes' },
    { name: 'Products', href: '/products' },
    { name: 'Resources', href: '/resources', key: 'resources' },
    { name: 'Our Story', href: '/our-story' },
    { name: 'Careers', shortName: 'Careers', longName: 'Careers & Training', href: '/careers', key: 'careers' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-1.5 sm:pt-2 px-2 sm:px-3 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-[1240px]">
        
        {/* ── Sleek White Floating Navbar Container (Reduced Corner Curve) ── */}
        <div className="w-full bg-white rounded-xl sm:rounded-2xl h-[64px] px-4 sm:px-6 shadow-[0_4px_30px_rgba(0,0,0,0.08)] flex items-center justify-between gap-1 sm:gap-2 border border-neutral-200/80">
          
          {/* ── Left: SEYOL Wordmark Logo ── */}
          <Link
            href="/"
            className="shrink-0 flex items-center pr-1 cursor-pointer group"
          >
            <div className="relative w-[72px] xs:w-[80px] sm:w-[90px] h-[22px] sm:h-[26px] shrink-0">
              <Image
                src={wordmarkMaroonSrc}
                alt="SEYOL Mother & Baby Care"
                fill
                priority
                unoptimized
                className="object-contain object-left group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          </Link>

          {/* ── Center: Desktop Navigation Bar with Dropdowns (64px height centered) ── */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 shrink font-sans text-[12px] xl:text-[13px] font-semibold text-neutral-700 leading-none h-[64px]">
            {navLinks.map((link) => {
              const isCurrentRoute = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) || (link.href === '/' && pathname === '/start-here');
              const isDropdownOpen = link.key && activeDropdown === link.key;
              const isHighlighted = isDropdownOpen || (isCurrentRoute && !activeDropdown);

              if (link.key) {
                return (
                  <div
                    key={link.name}
                    className="relative group flex items-center h-[64px]"
                    onMouseEnter={() => handleMouseEnter(link.key!)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={link.href}
                      prefetch={true}
                      onClick={() => setActiveDropdown(null)}
                      className={`relative flex items-center space-x-0.5 px-2 xl:px-2.5 py-2 whitespace-nowrap rounded-lg transition-all duration-150 cursor-pointer ${
                        isHighlighted
                          ? 'text-[#7B1131] font-bold'
                          : 'text-neutral-700 hover:text-black hover:bg-neutral-50/80'
                      }`}
                    >
                      <span className="relative whitespace-nowrap">
                        {link.longName ? (
                          <>
                            <span className="hidden xl:inline">{link.longName}</span>
                            <span className="xl:hidden">{link.shortName}</span>
                          </>
                        ) : (
                          link.name
                        )}
                        {isCurrentRoute && (
                          <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#7B1131] rounded-full" />
                        )}
                      </span>
                      <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-200 ml-0.5 shrink-0 ${isDropdownOpen ? 'rotate-180 text-[#7B1131]' : 'opacity-60'}`} />
                    </Link>

                    {/* Dropdown Menu Container */}
                    <div
                      onMouseEnter={() => handleMouseEnter(link.key!)}
                      onMouseLeave={handleMouseLeave}
                      className={`absolute top-[58px] ${getDropdownAlignmentClass(link.key)} pt-2 transition-all duration-200 z-[9999] pointer-events-auto ${
                        isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      {/* Services Dropdown */}
                      {link.key === 'services' && (
                        <div
                          className="w-[540px] bg-white border border-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.22)] rounded-3xl p-5 text-left"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <div className="grid grid-cols-2 gap-1.5 max-h-[380px] overflow-y-auto pr-1">
                            {[
                              { name: 'Preconception Support', href: '/services/preconception-support' },
                              { name: 'Prenatal Massage', href: '/services/prenatal-massage-therapy' },
                              { name: 'Birth Doula Support', href: '/services/birth-doula-support' },
                              { name: 'Postpartum Massage & Wrap', href: '/services/postpartum-massage-and-wrap' },
                              { name: 'Signature Infant Massage & Bath', href: '/services/infant-massage-and-bath' },
                              { name: 'Mother & Baby Combo Packages', href: '/services/mother-and-baby-combo-packages' },
                              { name: 'Stay-In Confinement Nanny', href: '/services/stay-in-confinement-nanny-support' },
                              { name: 'Hourly Newborn Support', href: '/services/hourly-newborn-support' },
                              { name: 'Lactation & Feeding Support', href: '/services/lactation-and-breastfeeding-support' },
                              { name: 'General Consultation', href: '/services/holistic-care-guidance-consultation' },
                            ].map((svc) => (
                              <Link
                                key={svc.name}
                                href={svc.href}
                                onClick={() => setActiveDropdown(null)}
                                className="px-3 py-2 text-xs text-neutral-900 hover:text-[#7B1131] hover:bg-[#FAF6EE] rounded-xl transition-all font-semibold flex items-center group/item"
                              >
                                <span className="truncate group-hover/item:translate-x-0.5 transition-transform">{svc.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Classes Dropdown */}
                      {link.key === 'classes' && (
                        <div
                          className="w-[480px] bg-white border border-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.22)] rounded-3xl p-5 text-left"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <div className="space-y-1">
                            {[
                              { name: 'Antenatal & Physiological Birth Preparation', desc: 'Labor breathing, positions and partner support', href: '/classes' },
                              { name: 'Newborn Care & Infant Massage Masterclass', desc: 'Hands-on bathing holds, colic relief and soothing', href: '/classes' },
                              { name: 'Traditional Postpartum Recovery & Nutrition', desc: 'Sacred first 40 days healing and herbal foods', href: '/classes' },
                              { name: 'Grandparents & Partner Care Workshop', desc: 'Bridging traditional rituals with safe clinical practice', href: '/classes' },
                              { name: 'Private 1-on-1 In-Home Masterclass', desc: 'Customised private guidance for parents', href: '/classes' },
                            ].map((cls) => (
                              <Link
                                key={cls.name}
                                href={cls.href}
                                onClick={() => setActiveDropdown(null)}
                                className="p-2.5 hover:bg-[#FAF6EE] rounded-xl transition-all block group/item"
                              >
                                <div className="text-xs font-bold text-neutral-900 group-hover/item:text-[#7B1131] transition-colors">
                                  {cls.name}
                                </div>
                                <div className="text-[11px] text-neutral-500 truncate">
                                  {cls.desc}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Resources Dropdown */}
                      {link.key === 'resources' && (
                        <div
                          className="w-[480px] bg-white border border-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.22)] rounded-3xl p-5 text-left"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <div className="space-y-1">
                            {[
                              { name: 'The Sacred 40-Day Confinement Guide', desc: 'Traditional South Indian postpartum recovery handbook', href: '/resources' },
                              { name: 'Hospital Bag & Birth Sanctuary Checklist', desc: 'Essential items for labour, hospital, and home return', href: '/resources' },
                              { name: 'Newborn Sleep & Feeding Log Tracker', desc: 'Daily milestone monitoring template', href: '/resources' },
                              { name: 'Video Tutorials & Ritual Demonstrations', desc: 'Belly binding, bath holds, and infant massage techniques', href: '/resources' },
                              { name: 'Clinical Safety & Evidence FAQ', desc: 'Answers vetted by certified doulas and matrons', href: '/resources' },
                            ].map((res) => (
                              <Link
                                key={res.name}
                                href={res.href}
                                onClick={() => setActiveDropdown(null)}
                                className="p-2.5 hover:bg-[#FAF6EE] rounded-xl transition-all block group/item"
                              >
                                <div className="text-xs font-bold text-neutral-900 group-hover/item:text-[#7B1131] transition-colors">
                                  {res.name}
                                </div>
                                <div className="text-[11px] text-neutral-500 truncate">
                                  {res.desc}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Careers & Training Dropdown */}
                      {link.key === 'careers' && (
                        <div
                          className="w-[480px] bg-white border border-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.22)] rounded-3xl p-5 text-left"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <div className="space-y-1">
                            {[
                              { name: 'Certified Doula Training Program', desc: 'Comprehensive maternal advocacy and birth support accreditation', href: '/careers' },
                              { name: 'Postpartum Care Specialist Certification', desc: 'Mastering the sacred 40-day care, massage & herbal cooking', href: '/careers' },
                              { name: 'Join SEYOL Certified Caregiver Network', desc: 'For practicing confinement nannies, doulas and therapists', href: '/careers' },
                              { name: 'Employment Agency (EA) Licensing & Standards', desc: 'Licensed Singapore employment agency ensuring ethical placement', href: '/careers' },
                            ].map((cr) => (
                              <Link
                                key={cr.name}
                                href={cr.href}
                                onClick={() => setActiveDropdown(null)}
                                className="p-2.5 hover:bg-[#FAF6EE] rounded-xl transition-all block group/item"
                              >
                                <div className="text-xs font-bold text-neutral-900 group-hover/item:text-[#7B1131] transition-colors">
                                  {cr.name}
                                </div>
                                <div className="text-[11px] text-neutral-500 truncate">
                                  {cr.desc}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={true}
                  className={`relative flex items-center px-2 xl:px-2.5 py-2 whitespace-nowrap rounded-lg transition-all duration-150 ${
                    isHighlighted
                      ? 'text-[#7B1131] font-bold'
                      : 'text-neutral-700 hover:text-black hover:bg-neutral-50/80'
                  }`}
                >
                  <span className="relative whitespace-nowrap">
                    {link.name}
                    {isCurrentRoute && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#7B1131] rounded-full" />
                    )}
                  </span>
                </Link>
              );
            })}

            {/* Compact Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 rounded-lg flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors cursor-pointer shrink-0 ml-1"
              title="Search SEYOL Care"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* ── Right: Action Buttons (Profile, Book, Calendar/Cart) matching design mockup ── */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            
            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="lg:hidden w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#FAF6EE] text-[#7B1131] border border-[#7B1131]/20 transition-colors duration-200 shrink-0 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* 1. User Profile Pill Button */}
            {isAuthenticated && user ? (
              <div className="relative group/profile flex items-center">
                <Link
                  href="/portal"
                  prefetch={true}
                  className="flex items-center space-x-1.5 px-3 h-[34px] sm:h-[36px] rounded-full bg-[#FAF5F7] hover:bg-[#F3EBF0] text-[#7B1131] border border-[#E8D7DC] text-[11.5px] sm:text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  title="My Care Portal"
                >
                  <div className="relative w-4 h-4 rounded-full overflow-hidden border border-[#7B1131]/40 shrink-0">
                    <Image src={user.avatar} alt={user.name} fill unoptimized className="object-cover" />
                  </div>
                  <span className="truncate max-w-[70px] text-[#7B1131] font-bold text-[11.5px]">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-2.5 h-2.5 text-[#7B1131]" />
                </Link>

                {/* Profile Dropdown */}
                <div className="absolute right-0 top-full pt-2 w-60 hidden group-hover/profile:block z-50 animate-fadeIn">
                  <div className="bg-[#FAF6EE] rounded-2xl p-3.5 border border-[#7B1131]/30 shadow-warm-lg space-y-2.5 text-xs text-brown">
                    <div className="flex items-center space-x-2.5 pb-2 border-b border-cream-border">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#7B1131] shrink-0">
                        <Image src={user.avatar} alt={user.name} fill unoptimized className="object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-brown truncate">{user.name}</div>
                        <div className="text-[10px] text-[#7B1131] font-semibold truncate">{user.eddOrBabyAge}</div>
                      </div>
                    </div>

                    <Link
                      href="/portal"
                      className="w-full py-2 px-3 rounded-xl bg-[#7B1131] text-cream-light font-bold flex items-center justify-between hover:bg-[#650E28] transition-colors shadow-xs"
                    >
                      <div className="flex items-center space-x-1.5">
                        <FileText className="w-3.5 h-3.5 text-gold-light" />
                        <span>My Care Portal</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gold-light" />
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full py-1.5 px-3 rounded-xl text-left text-brown-muted hover:text-[#7B1131] hover:bg-white flex items-center space-x-1.5 transition-colors font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal()}
                className="flex items-center space-x-1.5 px-3 h-[34px] sm:h-[36px] rounded-full bg-[#FAF5F7] hover:bg-[#F3EBF0] text-[#7B1131] border border-[#E8D7DC] text-[11.5px] sm:text-xs font-bold transition-all cursor-pointer shadow-2xs"
                title="Log in to SEYOL Portal"
              >
                <div className="w-4 h-4 rounded-full bg-[#7B1131]/10 flex items-center justify-center shrink-0">
                  <User className="w-2.5 h-2.5 text-[#7B1131]" />
                </div>
                <span>Ananya</span>
                <ChevronDown className="w-2.5 h-2.5 text-[#7B1131]" />
              </button>
            )}

            {/* 2. Book Button (Maroon pill matching mockup) */}
            <button
              onClick={() => openEnquiry()}
              className="px-4 sm:px-5 h-[34px] sm:h-[36px] rounded-full bg-[#7B1131] hover:bg-[#650E28] text-white text-[11px] sm:text-[12px] font-bold tracking-wide transition-all duration-150 whitespace-nowrap cursor-pointer shadow-xs flex items-center justify-center"
            >
              <span>Book</span>
            </button>

            {/* 3. Calendar Action Icon (Matching mockup outline box) */}
            <button
              onClick={() => openEnquiry({ serviceTitle: 'Appointment Booking' })}
              aria-label="Calendar Appointment Booking"
              className="w-[34px] h-[34px] sm:w-[36px] sm:h-[36px] rounded-xl border border-neutral-300 hover:border-[#7B1131] text-[#7B1131] hover:bg-[#FAF6EE] transition-all duration-150 shrink-0 cursor-pointer flex items-center justify-center shadow-2xs bg-white"
              title="Schedule Care Calendar"
            >
              <Calendar className="w-3.5 h-3.5 text-[#7B1131]" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden w-[32px] h-[32px] rounded-full bg-[#FAF6EE] hover:bg-[#F2ECE1] border border-[#EADBCC] text-[#7B1131] flex items-center justify-center transition-colors duration-200 shrink-0 cursor-pointer ml-0.5"
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Global Smart Search Modal */}
      <SmartSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white rounded-3xl border border-neutral-200 shadow-warm-xl px-4 pt-4 pb-6 animate-fadeIn">
          <div className="flex flex-col space-y-2 font-sans text-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) || (link.href === '/' && pathname === '/start-here');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#7B1131] text-white'
                      : 'text-neutral-800 hover:bg-[#FAF6EE] hover:text-[#7B1131]'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.key && <ChevronRight className="w-4 h-4 opacity-50" />}
                </Link>
              );
            })}

            <div className="pt-2 flex flex-col space-y-2">
              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FAF6EE] text-[#7B1131] border border-[#7B1131] font-bold text-center text-xs shadow-xs flex items-center justify-center space-x-1.5"
              >
                <FileText className="w-4 h-4 text-[#7B1131]" />
                <span>My SEYOL Care Portal</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiry();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#7B1131] text-white font-bold text-center text-xs shadow-warm-sm"
              >
                Book Now &amp; Care Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
