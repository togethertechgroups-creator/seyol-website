'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingBag, Check, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      volumeOrType: product.volume,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800';

  return (
    <div className="bg-white rounded-3xl border border-[#EADBCC]/90 overflow-hidden shadow-warm-sm hover:shadow-warm-xl hover:border-[#7B1131]/30 transition-all duration-500 flex flex-col group h-full font-sans relative border-t-4 hover:border-t-[#7B1131] hover:-translate-y-1.5">
      
      {/* Product Image Container */}
      <Link 
        href={`/products/${product.slug}`} 
        className="relative block overflow-hidden h-52 sm:h-56 w-full bg-[#FAF7F2] shrink-0"
      >
        <img
          src={imgError ? fallbackImage : product.image}
          alt={product.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          {product.badge ? (
            <span className="px-3 py-1 rounded-full bg-[#7B1131] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
              {product.badge}
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#7B1131] text-[10px] font-extrabold uppercase tracking-wider shadow-xs border border-white/80">
              100% Botanical
            </span>
          )}

          {/* Volume Pill */}
          <span className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#3a1d1d] shadow-xs border border-white/80">
            {product.volume}
          </span>
        </div>

        {/* Rating Floating Badge */}
        <div className="absolute bottom-3 left-3.5 z-10 flex items-center space-x-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-[#3a1d1d] shadow-sm">
          <Star className="w-3.5 h-3.5 fill-gold text-gold" />
          <span>{product.rating}</span>
          <span className="text-[10px] text-neutral-500 font-normal">({product.reviewCount})</span>
        </div>
      </Link>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          
          <Link href={`/products/${product.slug}`} className="block group-hover:text-[#7B1131] transition-colors">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3a1d1d] leading-snug line-clamp-1">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-normal">
            {product.shortDescription}
          </p>

          {/* Botanical Feature Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-[#FAF7F2] text-[#7B1131] border border-[#EADBCC]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Apothecary Rate</div>
            <div className="font-serif font-extrabold text-xl sm:text-2xl text-[#7B1131] leading-tight">
              ₹{product.price.toLocaleString()}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-4 sm:px-5 py-2.5 rounded-full font-bold text-xs flex items-center space-x-1.5 transition-all duration-300 shadow-sm cursor-pointer active:scale-95 ${
              added
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-[#7B1131] hover:bg-[#5e0c24] text-white hover:shadow-warm-md'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Basket</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Basket</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
