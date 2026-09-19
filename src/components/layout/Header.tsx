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
    const routes = ['/', '/services', '/classes', '/products', '/resources', '/our-story', '/careers', '/contact'];
    routes.forEach((route) => {
      try {
        router.prefetch(route);
      } catch (e) {}
    });
  }, [router]);

  // Smart Hide on Scroll Down, Show on Scroll Up (Maven Behavior)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (mobileMenuOpen) {
        setIsNavbarVisible(true);
        return;
      }

      if (currentScrollY <= 40) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 70) {
        // Scrolling down -> hide navbar
        setIsNavbarVisible(false);
        setActiveDropdown(null);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling back up -> show navbar
        setIsNavbarVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

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
      case 'products':
        return 'left-1/2 -translate-x-1/2';
      case 'resources':
        return 'left-1/2 -translate-x-1/2';
      case 'careers':
        return 'right-0';
      default:
        return 'left-1/2 -translate-x-1/2';
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services', key: 'services' },
    { name: 'Classes', href: '/classes', key: 'classes' },
    { name: 'Products', href: '/products', key: 'products' },
    { name: 'Resources', href: '/resources', key: 'resources' },
    { name: 'Our Story', href: '/our-story' },
    { name: 'Careers', shortName: 'Careers', longName: 'Careers & Training', href: '/careers', key: 'careers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-1.5 sm:pt-2 px-2 sm:px-3 pointer-events-none transition-transform duration-300 ease-in-out ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-28'
      }`}
    >
      <div className="pointer-events-auto w-full max-w-[1140px]">
        
        {/* ── Maven-Style Slim White Floating Navbar Container ── */}
        <div className="w-full bg-white rounded-xl h-[64px] px-2.5 sm:px-3 shadow-[0_4px_25px_rgba(0,0,0,0.12)] flex items-center justify-between gap-1 sm:gap-2 border border-neutral-200/90">
          
          {/* ── Left: SEYOL Wordmark Logo ── */}
          <Link
            href="/"
            className="shrink-0 flex items-center pr-1 cursor-pointer group"
          >
            <div className="relative w-[76px] sm:w-[86px] h-[21px] sm:h-[24px] shrink-0">
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
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 shrink font-sans text-[11.5px] xl:text-[12.5px] font-semibold text-neutral-700 leading-none h-[64px]">
            {navLinks.map((link) => {
              const isCurrentRoute = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
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
                      className={`flex items-center space-x-0.5 px-1.5 xl:px-2 py-1.5 whitespace-nowrap rounded-lg transition-all duration-150 cursor-pointer ${
                        isHighlighted
                          ? 'text-[#7B1131] font-bold'
                          : 'text-neutral-700 hover:text-black hover:bg-neutral-50'
                      }`}
                    >
                      <span className="whitespace-nowrap">
                        {link.longName ? (
                          <>
                            <span className="hidden xl:inline">{link.longName}</span>
                            <span className="xl:hidden">{link.shortName}</span>
                          </>
                        ) : (
                          link.name
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
                          className="w-[580px] bg-white border border-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.22)] rounded-3xl p-5 text-left"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                            <div>
                              <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">
                                In-Home Continuum
                              </div>
                              <div className="font-serif font-bold text-sm text-brown">
                                All 10 Traditional Care Services
                              </div>
                            </div>
                            <Link
                              href="/book"
                              onClick={() => setActiveDropdown(null)}
                              className="px-3 py-1 rounded-full bg-gold text-[#7B1131] font-bold text-[11px] hover:bg-gold-dark hover:text-white transition-colors shadow-2xs"
                            >
                              Book Sanctuary &rarr;
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 max-h-[380px] overflow-y-auto pr-1">
                            {[
                              { name: 'Preconception Support', href: '/services/preconception-support', badge: 'Fertility' },
                              { name: 'Prenatal Massage', href: '/services/prenatal-massage-therapy', badge: 'Pregnancy' },
                              { name: 'Birth Doula Support', href: '/services/birth-doula-support', badge: 'Birth' },
                              { name: 'Postpartum Massage & Wrap', href: '/services/postpartum-massage-and-wrap', badge: '40-Day' },
                              { name: 'Signature Infant Massage & Bath', href: '/services/infant-massage-and-bath', badge: 'Baby Bath' },
                              { name: 'Mother & Baby Combo Packages', href: '/services/mother-and-baby-combo-packages', badge: 'Flagship' },
                              { name: 'Stay-In Confinement Nanny', href: '/services/stay-in-confinement-nanny-support', badge: '24/7 Care' },
                              { name: 'Hourly Newborn Support', href: '/services/hourly-newborn-support', badge: 'Respite' },
                              { name: 'Lactation & Feeding Support', href: '/services/lactation-and-breastfeeding-support', badge: 'Gentle' },
                              { name: 'General Consultation', href: '/services/holistic-care-guidance-consultation', badge: 'Roadmap' },
                            ].map((svc) => (
                              <Link
                                key={svc.name}
                                href={svc.href}
                                onClick={() => setActiveDropdown(null)}
                                className="px-3 py-2 text-xs text-neutral-900 hover:text-[#7B1131] hover:bg-[#FAF6EE] rounded-xl transition-all font-semibold flex items-center justify-between group/item"
                              >
                                <span className="truncate group-hover/item:translate-x-0.5 transition-transform">{svc.name}</span>
                                <span className="text-[9px] font-bold text-brown-muted bg-neutral-100 px-1.5 py-0.5 rounded ml-2 shrink-0">
                                  {svc.badge}
                                </span>
                              </Link>
                            ))}
                          </div>

                          <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                            <Link
                              href="/services"
                              onClick={() => setActiveDropdown(null)}
                              className="text-[#7B1131] font-bold hover:underline flex items-center space-x-1"
                            >
                              <span>Explore Full Directory</span>
                              <span>&rarr;</span>
                            </Link>
                            <span className="text-neutral-400 text-[11px]">Singapore &amp; International</span>
                          </div>
                        </div>
                      )}

                      {/* Classes Dropdown */}
                      {link.key === 'classes' && (
                        <div
                          className="w-[480px] bg-white border border-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.22)] rounded-3xl p-5 text-left"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                            <div>
                              <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">
                                Masterclasses &amp; Training
                              </div>
                              <div className="font-serif font-bold text-sm text-brown">
                                Confident Parenthood &amp; Newborn Care
                              </div>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF6EE] text-[#7B1131] text-[10px] font-bold border border-gold/40">
                              Live Cohorts
                            </span>
                          </div>

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

                          <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                            <Link
                              href="/classes"
                              onClick={() => setActiveDropdown(null)}
                              className="text-[#7B1131] font-bold hover:underline flex items-center space-x-1"
                            >
                              <span>View All Classes &amp; Calendar</span>
                              <span>&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      )}

                      {/* Products Dropdown */}
                      {link.key === 'products' && (
                        <div
                          className="w-[500px] bg-white border border-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.22)] rounded-3xl p-5 text-left"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                            <div>
                              <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">
                                Sacred Care Essentials
                              </div>
                              <div className="font-serif font-bold text-sm text-brown">
                                Traditional Care for Mother &amp; Baby
                              </div>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF6EE] text-[#7B1131] text-[10px] font-bold border border-gold/40">
                              100% Herbal
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { name: 'SEY Baby Massage Oil', type: 'Infant Bodywork', href: '/products' },
                              { name: 'Nalangu Maavu Herbal Bath', type: 'Soap-Free Cleanser', href: '/products' },
                              { name: 'Bengkung Belly Binding Wrap', type: 'Cotton Kattu Wrap', href: '/products' },
                              { name: 'Vethu Kuli Herbal Bath Sachets', type: 'Postpartum Steam', href: '/products' },
                              { name: 'Restorative Mother Massage Oil', type: 'Pelvic & Uterine', href: '/products' },
                              { name: 'Confinement Essential Bundle', type: 'Complete 40-Day Kit', href: '/products' },
                            ].map((prod) => (
                              <Link
                                key={prod.name}
                                href={prod.href}
                                onClick={() => setActiveDropdown(null)}
                                className="p-2.5 hover:bg-[#FAF6EE] rounded-xl transition-all block group/item"
                              >
                                <div className="text-xs font-bold text-neutral-900 group-hover/item:text-[#7B1131] transition-colors truncate">
                                  {prod.name}
                                </div>
                                <div className="text-[10px] text-neutral-500 font-medium">
                                  {prod.type}
                                </div>
                              </Link>
                            ))}
                          </div>

                          <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                            <Link
                              href="/products"
                              onClick={() => setActiveDropdown(null)}
                              className="text-[#7B1131] font-bold hover:underline flex items-center space-x-1"
                            >
                              <span>Explore All Bundles &amp; Products</span>
                              <span>&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      )}

                      {/* Resources Dropdown */}
                      {link.key === 'resources' && (
                        <div
                          className="w-[480px] bg-white border border-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.22)] rounded-3xl p-5 text-left"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                            <div>
                              <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">
                                Guidance &amp; Tools
                              </div>
                              <div className="font-serif font-bold text-sm text-brown">
                                Guides, Checklists &amp; Videos
                              </div>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF6EE] text-[#7B1131] text-[10px] font-bold border border-gold/40">
                              Free Access
                            </span>
                          </div>

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

                          <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                            <Link
                              href="/resources"
                              onClick={() => setActiveDropdown(null)}
                              className="text-[#7B1131] font-bold hover:underline flex items-center space-x-1"
                            >
                              <span>Browse Full Resources Library</span>
                              <span>&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      )}

                      {/* Careers & Training Dropdown */}
                      {link.key === 'careers' && (
                        <div
                          className="w-[480px] bg-white border border-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.22)] rounded-3xl p-5 text-left"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                            <div>
                              <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">
                                Professional Academy
                              </div>
                              <div className="font-serif font-bold text-sm text-brown">
                                Careers, Accreditation &amp; Doula Training
                              </div>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF6EE] text-[#7B1131] text-[10px] font-bold border border-gold/40">
                              Licensed EA
                            </span>
                          </div>

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

                          <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                            <Link
                              href="/careers"
                              onClick={() => setActiveDropdown(null)}
                              className="text-[#7B1131] font-bold hover:underline flex items-center space-x-1"
                            >
                              <span>Explore Open Roles &amp; Applications</span>
                              <span>&rarr;</span>
                            </Link>
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
                  className={`flex items-center px-1.5 xl:px-2 py-1.5 whitespace-nowrap rounded-lg transition-all duration-150 ${
                    isHighlighted
                      ? 'text-[#7B1131] font-bold'
                      : 'text-neutral-700 hover:text-black hover:bg-neutral-50'
                  }`}
                >
                  <span className="whitespace-nowrap">{link.name}</span>
                </Link>
              );
            })}

            {/* Compact Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 rounded-lg flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors cursor-pointer shrink-0"
              title="Search SEYOL Care"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* ── Right: 3 Action Buttons (Login, Book Now, Cart) ── */}
          <div className="flex items-center space-x-1.5 shrink-0">
            
            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="lg:hidden w-[32px] h-[32px] flex items-center justify-center rounded-lg bg-[#FAF6EE] text-[#7B1131] border border-[#7B1131]/20 transition-colors duration-200 shrink-0 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* 1. Login Button: Cream colour with maroon outline, text and icon */}
            {isAuthenticated && user ? (
              <div className="relative group/profile flex items-center">
                <Link
                  href="/portal"
                  prefetch={true}
                  className="flex items-center space-x-1 px-2.5 h-[34px] rounded-lg bg-[#FAF6EE] hover:bg-[#F2ECE1] text-[#7B1131] border border-[#7B1131] text-[11.5px] font-bold transition-all cursor-pointer shadow-2xs"
                  title="My Care Portal"
                >
                  <div className="relative w-3.5 h-3.5 rounded-full overflow-hidden border border-[#7B1131]/40 shrink-0">
                    <Image src={user.avatar} alt={user.name} fill unoptimized className="object-cover" />
                  </div>
                  <span className="hidden xl:inline truncate max-w-[60px] text-[#7B1131] font-bold text-[11.5px]">
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
                className="flex items-center space-x-1 px-3 h-[34px] rounded-lg bg-[#FAF6EE] hover:bg-[#F2ECE1] text-[#7B1131] border border-[#7B1131] text-[11.5px] font-bold transition-all cursor-pointer shadow-2xs"
                title="Log in to SEYOL Portal"
              >
                <User className="w-3 h-3 text-[#7B1131]" />
                <span>Login</span>
              </button>
            )}

            {/* 2. Book Now Button: Maroon colour with cream text */}
            <button
              onClick={() => openEnquiry()}
              className="px-3.5 sm:px-4 h-[34px] rounded-lg bg-[#7B1131] hover:bg-[#650E28] text-[#FAF6EE] text-[11.5px] font-bold tracking-wide transition-all duration-150 whitespace-nowrap cursor-pointer border border-[#7B1131] flex items-center justify-center shadow-xs"
            >
              <span>Book Now</span>
            </button>

            {/* 3. Cart Icon: Maroon with cream background */}
            <button
              onClick={openCart}
              aria-label="Shopping Cart"
              className="relative w-[34px] h-[34px] rounded-lg bg-[#FAF6EE] hover:bg-[#F2ECE1] text-[#7B1131] border border-[#EADBCC] transition-all duration-150 shrink-0 cursor-pointer flex items-center justify-center shadow-2xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#7B1131]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7B1131] text-[#FAF6EE] font-bold text-[8.5px] w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs border border-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden w-[32px] h-[32px] rounded-lg bg-[#FAF6EE] hover:bg-[#F2ECE1] border border-[#EADBCC] text-[#7B1131] flex items-center justify-center transition-colors duration-200 shrink-0 cursor-pointer ml-0.5"
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
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
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
