'use client';

import React from 'react';
import Image from 'next/image';
import { X, Star, ShieldCheck, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

export interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      volumeOrType: product.volume,
      image: product.image,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maroon-dark/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-cream-light w-full max-w-2xl rounded-3xl border border-gold/40 shadow-warm-lg overflow-hidden relative max-h-[90vh] flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-cream hover:bg-cream-dark text-brown-muted hover:text-maroon transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative aspect-square bg-cream border-r border-cream-border">
          <Image
            src={product.image}
            alt={product.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 overflow-y-auto space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                ))}
              </div>
              <span className="text-xs font-bold text-brown">{product.rating} ({product.reviewCount} Reviews)</span>
            </div>

            <h3 className="font-serif font-bold text-xl text-maroon">{product.title}</h3>
            <p className="text-xs font-semibold text-brown-muted">{product.subtitle}</p>
            <div className="font-serif font-bold text-xl text-brown">₹{product.price} <span className="text-xs font-normal text-brown-muted">/ {product.volume}</span></div>

            <p className="text-xs text-brown-muted leading-relaxed">
              {product.fullDescription}
            </p>

            <div className="space-y-1">
              <div className="text-xs font-bold text-brown">Hero Herbal Ingredients:</div>
              <ul className="text-xs text-brown-muted space-y-1">
                {product.heroIngredients.map((ing, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-maroon shrink-0" />
                    <span><strong>{ing.name}:</strong> {ing.traditionalRole}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-cream-border space-y-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-sm transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4 text-gold-light" />
              <span>Add to Cart (₹{product.price})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
