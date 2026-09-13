'use client';

import React, { useState } from 'react';
import { ShoppingBag, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { productsData } from '../../data/products';
import { useCart } from '../../context/CartContext';

export const ProductRoutineBuilder: React.FC = () => {
  const [concern, setConcern] = useState('infant-colic');
  const { addToCart } = useCart();

  const CONCERNS = [
    { id: 'infant-colic', label: 'Infant Colic & Gas Relief', productIds: ['sey-baby-massage-oil', 'colic-relief-rollon'] },
    { id: 'dry-skin', label: 'Dry Sensitive Baby Skin & Bath', productIds: ['sey-baby-massage-oil', 'nalangu-maavu'] },
    { id: 'postpartum-stretch', label: 'Postpartum Scar & Skin Tone', productIds: ['maternal-body-butter', 'pregnancy-stretch-oil'] },
    { id: 'mother-vitality', label: 'Full 40-Day Mother & Baby Stack', productIds: ['sey-baby-massage-oil', 'nalangu-maavu', 'maternal-body-butter', 'colic-relief-rollon'] },
  ];

  const activeConcern = CONCERNS.find((c) => c.id === concern) || CONCERNS[0];
  const matchedProducts = productsData.filter((p) => activeConcern.productIds.includes(p.id));

  const totalPrice = matchedProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddAll = () => {
    matchedProducts.forEach((p) => {
      addToCart({
        id: p.id,
        title: p.title,
        price: p.price,
        volumeOrType: p.volume,
        image: p.image,
      });
    });
  };

  return (
    <div className="w-full bg-cream-light p-6 sm:p-10 rounded-3xl border border-gold/40 shadow-warm-lg space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-border pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>Targeted Botanical Stack</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-brown">
            Product Routine Builder
          </h3>
        </div>
        <div className="text-xs text-brown-muted font-medium">Select primary routine concern</div>
      </div>

      {/* Concern Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CONCERNS.map((c) => (
          <button
            key={c.id}
            onClick={() => setConcern(c.id)}
            className={`p-3.5 rounded-xl text-xs font-bold transition-all border ${
              concern === c.id
                ? 'bg-maroon text-cream-light border-maroon shadow-warm-sm'
                : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Recommended Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {matchedProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-cream p-4 rounded-2xl border border-cream-border space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                {prod.category}
              </span>
              <h4 className="font-serif font-bold text-sm text-brown">{prod.title}</h4>
              <p className="text-xs text-brown-muted line-clamp-2">{prod.shortDescription}</p>
            </div>

            <div className="pt-2 border-t border-cream-border flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-maroon">₹{prod.price}</span>
              <button
                onClick={() =>
                  addToCart({
                    id: prod.id,
                    title: prod.title,
                    price: prod.price,
                    volumeOrType: prod.volume,
                    image: prod.image,
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-maroon text-cream-light font-bold text-[11px] hover:bg-maroon-dark transition-colors"
              >
                + Add Item
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Routine Bundle Footer */}
      <div className="bg-maroon text-cream-light p-5 rounded-2xl border border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-gold-light font-semibold uppercase tracking-wider">
            Complete Routine Stack Total ({matchedProducts.length} Items)
          </div>
          <div className="font-serif font-bold text-2xl text-cream-light">
            ₹{totalPrice} <span className="text-xs font-normal text-gold-light">(Free Delivery Included)</span>
          </div>
        </div>

        <button
          onClick={handleAddAll}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-maroon-dark font-bold text-xs shadow-warm-sm transition-all flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add Entire Routine to Cart</span>
        </button>
      </div>
    </div>
  );
};
