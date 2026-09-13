'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowRight, Sparkles, Heart, Flower2, Baby, ShieldCheck } from 'lucide-react';

export interface MegaCategory {
  title: string;
  href: string;
  description: string;
  image: string;
  links: { name: string; href: string; badge?: string; desc?: string }[];
}

const MEGA_CATEGORIES: Record<string, MegaCategory> = {
  services: {
    title: 'Traditional Indian Maternal & Baby Care Continuum',
    href: '/services',
    description: 'Certified 10 to 40-day in-home postpartum bodywork, belly binding, doula guidance & newborn care.',
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=600',
    links: [
      { name: 'Preconception Support', href: '/services/preconception-support', badge: 'FERTILITY', desc: 'Holistic Siddha womb tonification' },
      { name: 'Prenatal Massage Therapy', href: '/services/prenatal-massage-therapy', desc: 'Relief for lower back & hip strain' },
      { name: 'Birth Doula Bedside Advocacy', href: '/services/birth-doula-support', desc: 'Continuous labor coaching & comfort' },
      { name: 'Postpartum Massage & Belly Binding (Kattu)', href: '/services/postpartum-massage-and-wrap', badge: 'MOST POPULAR', desc: 'Sacred 40-day restorative Mandalam' },
      { name: 'Signature Infant Massage & Herbal Bath', href: '/services/infant-massage-and-bath', desc: 'Thokkanam & Nalangu bath' },
      { name: 'Mother & Baby Dual Care Combo', href: '/services/mother-and-baby-combo-packages', badge: 'FLAGSHIP', desc: 'Combined daily massage & bath ritual' },
      { name: '24/7 Stay-In Confinement Nannies', href: '/services/stay-in-confinement-nanny-support', badge: 'VERIFIED', desc: 'Full-time trained residence support' },
      { name: 'Hourly Newborn Support', href: '/services/hourly-newborn-support', desc: 'Flexible 4 to 8 hour daytime/night respite' },
      { name: 'Lactation & Breastfeeding Support', href: '/services/lactation-and-breastfeeding-support', desc: 'Clinical latch & engorgement relief' },
      { name: 'Care Guidance & General Consultation', href: '/services/holistic-care-guidance-consultation', desc: 'Personalised family care roadmap' },
    ],
  },
  classes: {
    title: 'Live Masterclasses & Cohorts',
    href: '/classes',
    description: 'Interactive workshops led by Ms Jemma Francis & Ms Janet Francis in Chennai & Online.',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600',
    links: [
      { name: 'Practical Infant Massage & Bath Masterclass', href: '/classes#infant-massage', badge: 'LIVE STUDIO', desc: 'Hands-on strokes on realistic dolls' },
      { name: 'Physiological Birth & Breathing Workshop', href: '/classes#birth-prep', desc: 'Partner-inclusive labor preparation' },
      { name: 'Postpartum Nutrition & Confinement Diet', href: '/classes#postpartum-nutrition', desc: 'Traditional Pathiya Samayal cooking' },
      { name: 'Newborn Care & Safe Sleep Masterclass', href: '/classes#newborn-care', desc: 'Swaddling, soothing & infant CPR' },
    ],
  },
  products: {
    title: 'SEY Botanical Formulations',
    href: '/products',
    description: '100% Pure cold-pressed oils, Ayush-certified herbal baths & organic roll-ons.',
    image: 'https://images.unsplash.com/photo-1608248597359-0a86d26cf37d?auto=format&fit=crop&q=80&w=600',
    links: [
      { name: 'SEY Cold-Pressed Baby Massage Oil', href: '/products#baby-oil', badge: 'BESTSELLER', desc: 'Virgin coconut & sweet almond base' },
      { name: 'Nalangu Maavu Soap-Free Bath Powder', href: '/products#nalangu-maavu', desc: 'Organic wild turmeric & green gram' },
      { name: 'Colic Relief Herbal Belly Roll-On', href: '/products#colic-relief', desc: 'Asafoetida & nutmeg digestive oil' },
      { name: 'Sacred 40-Day Mother & Baby Confinement Bundle', href: '/products#confinement-bundle', badge: '15% OFF', desc: 'Complete home care ritual stack' },
    ],
  },
};

export const MegaMenu: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className="relative flex items-center space-x-6 font-sans text-sm font-medium text-brown">
      {Object.entries(MEGA_CATEGORIES).map(([key, category]) => (
        <div
          key={key}
          className="relative group"
          onMouseEnter={() => setActiveMenu(key)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <Link
            href={category.href}
            className="flex items-center space-x-1 py-3 text-brown hover:text-maroon transition-colors whitespace-nowrap"
          >
            <span>{category.title.split(' ')[0]}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
          </Link>

          {/* Mega Dropdown Panel */}
          {activeMenu === key && (
            <div className="absolute top-full -left-20 w-[650px] bg-cream-light border border-cream-border shadow-warm-lg rounded-2xl p-6 transition-all duration-200 z-50 animate-fadeIn">
              <div className="grid grid-cols-12 gap-6 items-start">
                {/* Left Links Column */}
                <div className="col-span-7 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-maroon border-b border-cream-border pb-2 flex items-center justify-between">
                    <span>{category.title}</span>
                    <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                  </div>

                  <div className="space-y-2">
                    {category.links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        className="group/item block p-2.5 rounded-xl hover:bg-maroon-soft transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-brown group-hover/item:text-maroon transition-colors">
                            {link.name}
                          </span>
                          {link.badge && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gold/20 text-maroon border border-gold/40">
                              {link.badge}
                            </span>
                          )}
                        </div>
                        {link.desc && (
                          <p className="text-[11px] text-brown-muted mt-0.5">
                            {link.desc}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-cream-border">
                    <Link
                      href={category.href}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-maroon hover:underline"
                    >
                      <span>Explore All {category.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Visual Card Column */}
                <div className="col-span-5 bg-cream p-4 rounded-xl border border-cream-border space-y-3">
                  <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-gold/30">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-cream-light">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light">
                        Featured Standard
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-brown-muted leading-relaxed">
                    {category.description}
                  </p>
                  <Link
                    href={category.href}
                    className="block text-center py-2 px-3 rounded-lg bg-maroon text-cream-light font-bold text-xs hover:bg-maroon-dark transition-colors shadow-warm-sm"
                  >
                    View Selection
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};
