'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Star, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Heart, 
  ChevronLeft, 
  Sparkles, 
  Leaf, 
  Award, 
  Plus, 
  Minus,
  Truck
} from 'lucide-react';
import { productsData } from '../../../data/products';
import { useCart } from '../../../context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto font-sans">
        <h2 className="font-serif text-2xl font-bold text-maroon">Product Not Found</h2>
        <p className="text-xs text-brown-muted">The requested formulation could not be located.</p>
        <Link href="/products" className="inline-block px-5 py-2.5 bg-maroon text-cream-light text-xs font-bold rounded-xl">
          Return to SEY Store
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        volumeOrType: product.volume,
        image: product.image,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 600);
  };

  return (
    <div className="flex flex-col w-full font-sans bg-cream text-brown">
      {/* Breadcrumbs */}
      <div className="bg-cream-dark/30 pt-20 sm:pt-24 pb-3 px-4 sm:px-6 lg:px-8 border-b border-cream-border text-xs text-brown-muted">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link href="/products" className="hover:text-maroon flex items-center space-x-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>All Products</span>
          </Link>
          <span>/</span>
          <span className="text-maroon font-bold truncate">{product.title}</span>
        </div>
      </div>

      {/* Hero Showcase */}
      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Product Image */}
          <div className="lg:col-span-5">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-warm-lg border border-cream-border relative bg-cream-light">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-maroon text-cream-light text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right Product Details & Buy Box */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold" />
                  ))}
                </div>
                <span className="text-xs font-bold text-brown">{product.rating}</span>
                <span className="text-xs text-brown-muted">({product.reviewCount} verified parent reviews)</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-brown tracking-tight leading-tight">
                {product.title}
              </h1>

              <p className="text-xs sm:text-sm text-gold-dark font-semibold mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Price & Volume */}
            <div className="flex items-baseline space-x-3 pb-3 border-b border-cream-border">
              <span className="font-serif font-bold text-3xl text-maroon">
                ₹{product.price}
              </span>
              <span className="text-xs text-brown-muted font-medium">
                (Net Volume: {product.volume})
              </span>
              <span className="text-[11px] font-bold text-gold-dark bg-gold-soft px-2 py-0.5 rounded-full border border-gold-border">
                In Stock & Handcrafted
              </span>
            </div>

            <p className="text-xs sm:text-sm text-brown leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Key Benefits List */}
            <div className="bg-cream-light p-4 rounded-2xl border border-cream-border space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                Key Therapeutic Benefits:
              </div>
              {product.keyBenefits.map((ben, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-brown">
                  <Check className="w-3.5 h-3.5 text-gold-dark flex-shrink-0 mt-0.5" />
                  <span>{ben}</span>
                </div>
              ))}
            </div>

            {/* Quantity Selector & Add to Cart Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center justify-between border border-cream-border rounded-2xl bg-cream-light px-4 py-2.5 sm:w-36">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="text-brown hover:text-maroon p-1"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm text-brown">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="text-brown hover:text-maroon p-1"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs tracking-wide shadow-warm-md flex items-center justify-center space-x-2 transition-all duration-200 ${
                  added
                    ? 'bg-gold text-maroon-dark'
                    : 'bg-maroon hover:bg-maroon-dark text-cream-light hover:scale-[1.02]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Basket</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-gold-light" />
                    <span>Add to Basket • ₹{product.price * quantity}</span>
                  </>
                )}
              </button>
            </div>

            {/* Shipping & Certifications Assurance */}
            <div className="grid grid-cols-2 gap-3 text-[11px] text-brown-muted pt-2">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-gold-dark flex-shrink-0" />
                <span>Dispatched within 24 hours from Chennai</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-gold-dark flex-shrink-0" />
                <span>100% AYUSH Certified Traditional Formula</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Ingredients & Step-by-Step Usage Ritual */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-cream-light border-y border-cream-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Hero Botanical Ingredients */}
          <div className="bg-cream rounded-3xl p-6 sm:p-8 border border-cream-border space-y-4 shadow-warm-sm">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-gold-dark" />
              <span>Pure Botanical Sourcing</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-brown">
              Hero Ayurvedic & Siddha Ingredients
            </h3>
            <div className="space-y-3">
              {product.heroIngredients.map((ing, i) => (
                <div key={i} className="bg-cream-light p-3.5 rounded-xl border border-cream-border/70 space-y-0.5">
                  <div className="font-serif font-bold text-xs text-maroon flex items-center justify-between">
                    <span>{ing.name}</span>
                    {ing.botanicalName && (
                      <span className="font-sans italic text-[10px] text-brown-muted font-normal">
                        {ing.botanicalName}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-brown-muted">{ing.traditionalRole}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to Use Ritual */}
          <div className="bg-cream rounded-3xl p-6 sm:p-8 border border-cream-border space-y-4 shadow-warm-sm">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon-soft text-maroon text-xs font-semibold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5" />
              <span>Step-by-Step Ritual</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-brown">
              Traditional Daily Application Routine
            </h3>
            <div className="space-y-3 text-xs text-brown">
              {product.usageRitual.map((step, i) => (
                <div key={i} className="flex items-start space-x-3 bg-cream-light p-3 rounded-xl border border-cream-border/70">
                  <span className="w-5 h-5 rounded-full bg-maroon text-cream-light font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Certifications Box */}
            <div className="pt-3 border-t border-cream-border space-y-1.5">
              <div className="text-[10px] font-bold uppercase text-brown-muted">Safety & Quality Testing:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-brown-muted">
                {product.safetyCertifications.map((cert, i) => (
                  <div key={i} className="flex items-center space-x-1.5">
                    <Check className="w-3 h-3 text-gold-dark" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
