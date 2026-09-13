'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Plus, 
  ShoppingBag, 
  ArrowRight, 
  Gift, 
  ShieldCheck, 
  Heart 
} from 'lucide-react';
import { productsData } from '../../data/products';
import { useCart } from '../../context/CartContext';

export const BundleBuilder: React.FC = () => {
  const { addToCart, openCart } = useCart();
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    'product-soothing-baby-oil',
    'product-bath-powder',
    'product-tummy-roll-on',
  ]);
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);

  const toggleProduct = (id: string) => {
    if (selectedProductIds.includes(id)) {
      if (selectedProductIds.length > 1) {
        setSelectedProductIds((prev) => prev.filter((p) => p !== id));
      }
    } else {
      setSelectedProductIds((prev) => [...prev, id]);
    }
  };

  const selectedProducts = productsData.filter((p) => selectedProductIds.includes(p.id));
  const rawTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  // Discount rule: 2 items -> 10%, 3+ items -> 15%
  let discountPercent = 0;
  if (selectedProducts.length >= 3) {
    discountPercent = 15;
  } else if (selectedProducts.length === 2) {
    discountPercent = 10;
  }

  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const bundleTotal = rawTotal - discountAmount;

  const handleAddBundleToCart = () => {
    selectedProducts.forEach((prod) => {
      addToCart(
        {
          id: prod.id,
          title: prod.title,
          price: prod.price,
          volumeOrType: prod.volume,
          image: prod.image,
        },
        1
      );
    });
    setAddedSuccessfully(true);
    setTimeout(() => {
      setAddedSuccessfully(false);
      openCart();
    }, 600);
  };

  return (
    <section className="bg-cream-dark/30 rounded-3xl border border-cream-border p-6 sm:p-10 shadow-warm-md font-sans">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider mb-2">
          <Gift className="w-3.5 h-3.5 text-gold-dark" />
          <span>Custom Routine Creator</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown">
          Build Your Custom Mother & Baby Care Routine
        </h2>
        <p className="text-xs sm:text-sm text-brown-muted mt-2">
          Select your family’s essential SEY formulations. Enjoy <strong className="text-maroon">10% off for 2 items</strong>, or <strong className="text-maroon">15% off for 3+ items</strong> with complimentary gift packaging.
        </p>
      </div>

      {/* Product Selection Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {productsData.map((prod) => {
          const isSelected = selectedProductIds.includes(prod.id);
          return (
            <div
              key={prod.id}
              onClick={() => toggleProduct(prod.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex space-x-3 items-center justify-between group ${
                isSelected
                  ? 'bg-cream-light border-maroon shadow-warm-sm ring-2 ring-maroon/20'
                  : 'bg-cream border-cream-border hover:bg-cream-light hover:border-gold/60 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-14 h-14 object-cover rounded-xl border border-cream-border"
                />
                <div>
                  <div className="font-serif font-bold text-xs text-brown line-clamp-1 group-hover:text-maroon">
                    {prod.title}
                  </div>
                  <div className="text-[11px] text-brown-muted">{prod.volume}</div>
                  <div className="font-serif font-bold text-xs text-maroon mt-0.5">
                    ₹{prod.price}
                  </div>
                </div>
              </div>

              {/* Selection Checkbox Pill */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                  isSelected
                    ? 'bg-maroon text-cream-light'
                    : 'bg-cream-dark/60 text-brown-muted border border-cream-border group-hover:bg-gold/20'
                }`}
              >
                {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Calculation & Checkout Summary Banner */}
      <div className="bg-cream-light border border-gold/40 rounded-2xl p-6 shadow-warm-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-xs font-bold text-brown">
              Selected: {selectedProducts.length} Formulations
            </span>
            {discountPercent > 0 && (
              <span className="bg-gold text-maroon-dark font-bold text-[11px] px-2 py-0.5 rounded-full">
                {discountPercent}% Custom Bundle Discount Applied
              </span>
            )}
          </div>
          <div className="flex items-baseline space-x-3 justify-center md:justify-start">
            <span className="font-serif font-bold text-2xl text-maroon">
              ₹{bundleTotal}
            </span>
            {discountAmount > 0 && (
              <>
                <span className="text-xs text-brown-muted line-through">
                  ₹{rawTotal}
                </span>
                <span className="text-xs font-bold text-gold-dark">
                  (You Save ₹{discountAmount})
                </span>
              </>
            )}
          </div>
          <div className="text-[11px] text-brown-muted flex items-center justify-center md:justify-start space-x-1.5 pt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
            <span>Includes complimentary SEY organic cotton storage pouch</span>
          </div>
        </div>

        <button
          onClick={handleAddBundleToCart}
          className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs tracking-wide shadow-warm-md hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {addedSuccessfully ? (
            <>
              <Check className="w-4 h-4 text-gold-light" />
              <span>Routine Added to Basket!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 text-gold-light" />
              <span>Add Complete Routine to Basket</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </section>
  );
};
