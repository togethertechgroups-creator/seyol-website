'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles, BookOpen, ShoppingBag, Calendar, Flower2 } from 'lucide-react';
import Link from 'next/link';
import { servicesData } from '../../data/services';
import { productsData } from '../../data/products';
import { classesData } from '../../data/classes';

export interface SmartSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredServices = query.trim()
    ? servicesData.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.summary.toLowerCase().includes(query.toLowerCase()) ||
          s.category.toLowerCase().includes(query.toLowerCase()) ||
          s.slug.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredClasses = query.trim()
    ? classesData.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.summary.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredProducts = query.trim()
    ? productsData.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const totalResults = filteredServices.length + filteredClasses.length + filteredProducts.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-maroon-dark/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-cream-light w-full max-w-3xl rounded-3xl border border-gold/40 shadow-warm-lg overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-cream-border flex items-center space-x-3 bg-cream">
          <Search className="w-5 h-5 text-gold-dark shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search postpartum massage, belly binding, baby oil, classes, doula..."
            className="flex-1 bg-transparent border-none text-brown font-serif text-base sm:text-lg focus:outline-none placeholder:text-brown-muted/60"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-brown-muted hover:text-maroon underline px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-full text-brown-muted hover:bg-cream-dark hover:text-maroon transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!query.trim() ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-maroon">
                <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                <span>Popular Searches Right Now</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Postpartum Massage Chennai',
                  'Cotton Belly Binding (Kattu)',
                  'Nalangu Maavu Baby Powder',
                  'Stay-In Confinement Nanny',
                  'Infant Massage Masterclass',
                  'Birth Doula Support',
                ].map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full bg-cream hover:bg-maroon-soft text-brown text-xs font-medium border border-cream-border transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10 space-y-3">
              <p className="font-serif text-lg font-bold text-brown">No exact matches found for "{query}"</p>
              <p className="text-xs text-brown-muted">
                Try searching for broader terms like "massage", "oil", "nanny", "bath", or "classes".
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Services Section */}
              {filteredServices.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-maroon border-b border-cream-border pb-1">
                    <Flower2 className="w-3.5 h-3.5" />
                    <span>In-Home Care Services ({filteredServices.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredServices.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services#${service.slug}`}
                        onClick={onClose}
                        className="p-3 rounded-xl bg-cream hover:bg-maroon-soft border border-cream-border transition-colors flex items-start space-x-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-maroon text-gold flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          Care
                        </div>
                        <div>
                          <div className="font-serif font-bold text-xs text-brown group-hover:text-maroon transition-colors">
                            {service.title}
                          </div>
                          <div className="text-[11px] text-brown-muted line-clamp-1 mt-0.5">
                            {service.tagline}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Classes Section */}
              {filteredClasses.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-maroon border-b border-cream-border pb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Live Classes & Masterclasses ({filteredClasses.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredClasses.map((item) => (
                      <Link
                        key={item.id}
                        href={`/classes#${item.slug}`}
                        onClick={onClose}
                        className="p-3 rounded-xl bg-cream hover:bg-maroon-soft border border-cream-border transition-colors flex items-start space-x-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gold text-maroon-dark flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          Class
                        </div>
                        <div>
                          <div className="font-serif font-bold text-xs text-brown group-hover:text-maroon transition-colors">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-brown-muted line-clamp-1 mt-0.5">
                            {item.tagline}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Section */}
              {filteredProducts.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-maroon border-b border-cream-border pb-1">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>SEY Botanical Products ({filteredProducts.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredProducts.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/products#${prod.slug}`}
                        onClick={onClose}
                        className="p-3 rounded-xl bg-cream hover:bg-maroon-soft border border-cream-border transition-colors flex items-start space-x-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-cream-dark text-maroon flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          Oil
                        </div>
                        <div>
                          <div className="font-serif font-bold text-xs text-brown group-hover:text-maroon transition-colors">
                            {prod.title}
                          </div>
                          <div className="text-[11px] text-brown-muted line-clamp-1 mt-0.5">
                            ₹{prod.price} • {prod.volume}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
