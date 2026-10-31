'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./SeyolProductTrust.css";

const productDetails = [
  {
    icon: "🌿",
    title: "Ingredients",
    description:
      "Explore the ingredients used in each SEY product. Add verified ingredient names, their purpose and relevant details from your product documentation.",
  },
  {
    icon: "🛡️",
    title: "Safety Notes",
    description:
      "Read product-specific precautions, usage instructions and important safety information before use.",
  },
  {
    icon: "♡",
    title: "Who It's Suitable For",
    description:
      "Check the intended age group, suitability and any usage restrictions mentioned for the selected product.",
  },
  {
    icon: "💧",
    title: "Patch Test Guide",
    description:
      "Follow the product's patch test instructions before first use. Stop using the product if irritation occurs.",
  },
  {
    icon: "📦",
    title: "Storage & Care",
    description:
      "Follow the storage instructions on the product label. Keep products away from direct sunlight and out of children's reach where appropriate.",
  },
  {
    icon: "ⓘ",
    title: "Product Disclaimer",
    description:
      "Read the product label and directions carefully. Product information does not replace professional medical advice.",
  },
];

const reviews = [
  {
    name: "Deepika & Karthik",
    rating: 5,
    quote: "A lovely addition to our everyday routine. The traditional baby massage oil has given our newborn calm nights and deep, restful sleep.",
    image: "/images/customer-review-1.jpg",
  },
  {
    name: "Ananya & Raghav",
    rating: 5,
    quote: "We appreciate having authentic traditional care backed by clinical safety. The botanical bath powder and soothing oils feel like pure comfort.",
    image: "/images/customer-review-2.jpg",
  },
  {
    name: "Meera & Arvind",
    rating: 5,
    quote: "Thoughtful care for our family's daily routine. Gentle on newborn skin, beautifully aromatic, and deeply reassuring throughout postpartum.",
    image: "/images/customer-review-3.jpg",
  },
  {
    name: "Pooja & Senthil",
    rating: 5,
    quote: "Pure, calming and made with genuine purpose. Our family looks forward to every evening bath and bonding massage ritual.",
    image: "/images/customer-review-4.jpg",
  },
];

export function WhatGoesIntoSeyProducts() {
  const [active, setActive] = useState<number>(0);

  return (
    <section className="sey-trust-section sey-ingredients" id="what-goes-into-sey">
      <div className="sey-trust-container">
        <div className="sey-trust-heading">
          <h2>What Goes Into <span>SEY Products?</span></h2>
          <p>
            Thoughtful details matter. Understand what&apos;s inside,
            how to use it and how to care for every product.
          </p>
        </div>

        <div className="sey-ingredients-layout">
          <div className="sey-ingredient-image">
            <img
              src="/images/sey-ingredients.jpg"
              alt="SEY product ingredients and care"
            />
            <div className="sey-image-caption">
              <span>THOUGHTFUL PRODUCT CARE</span>
              <h3>Know what you&apos;re choosing.</h3>
            </div>
          </div>

          <div className="sey-ingredient-content">
            <h3>Everything you need to know</h3>
            <p className="sey-ingredient-intro">
              Clear information to help you make informed choices
              for your family&apos;s care routine.
            </p>

            <div className="sey-accordion">
              {productDetails.map((item, index) => (
                <div
                  className={`sey-accordion-item ${
                    active === index ? "active" : ""
                  }`}
                  key={item.title}
                >
                  <button
                    type="button"
                    className="sey-accordion-button"
                    onClick={() =>
                      setActive(active === index ? -1 : index)
                    }
                    aria-expanded={active === index}
                  >
                    <span className="sey-accordion-icon">{item.icon}</span>
                    <strong>{item.title}</strong>
                    <span className="sey-accordion-toggle">
                      {active === index ? "−" : "+"}
                    </span>
                  </button>

                  {active === index && (
                    <div className="sey-accordion-description">
                      {item.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CreatedFromPractice() {
  return (
    <section className="sey-practice-section" id="created-from-practice">
      <div className="sey-practice-container">
        <div className="sey-practice-images">
          <img
            className="sey-practice-main-image"
            src="/images/sey-mother-care.jpg"
            alt="Mother and baby care"
          />
          <img
            className="sey-practice-small-image"
            src="/images/sey-natural-care.jpg"
            alt="Thoughtful care products"
          />
          <div className="sey-practice-image-note">
            <span>SEY BY SEYOL</span>
            <strong>Care with purpose.</strong>
          </div>
        </div>

        <div className="sey-practice-content">
          <h2>
            Created from Practice,
            <span> Not Trends.</span>
          </h2>

          <h3>Rooted in care. Made with purpose.</h3>

          <p>
            SEY products are created with a focus on everyday care,
            thoughtful routines and the real needs of mothers and families.
            We believe product decisions should begin with purpose,
            not passing trends.
          </p>

          <div className="sey-practice-points">
            <div className="sey-practice-point">
              <span>♡</span>
              <div>
                <strong>Care Comes First</strong>
                <p>Designed around everyday care needs.</p>
              </div>
            </div>

            <div className="sey-practice-point">
              <span>✿</span>
              <div>
                <strong>Thoughtful Choices</strong>
                <p>Purposeful product decisions and clear information.</p>
              </div>
            </div>

            <div className="sey-practice-point">
              <span>⌂</span>
              <div>
                <strong>Family Focused</strong>
                <p>Created with family routines in mind.</p>
              </div>
            </div>
          </div>

          <Link href="/our-story" className="sey-practice-link">
            Discover Our Philosophy <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LovedByFamilies() {
  const [current, setCurrent] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  // Automatically rotate customer reviews continuously without requiring user clicks
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % reviews.length);
        setIsFading(false);
      }, 350);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="sey-reviews-section" id="loved-by-families">
      <div className="sey-trust-container">
        <div className="sey-trust-heading">
          <h2>Loved by <span>SEYOL Families</span></h2>
          <p>
            Discover the experiences and stories shared by families
            who use SEY products.
          </p>
        </div>

        {/* Compact, smoothly transitioning review card */}
        <div className="sey-review-layout">
          {/* Distinct image per review with reduced compact height & smooth fade */}
          <div className="sey-review-featured-image">
            <img
              key={reviews[current].image}
              src={reviews[current].image}
              alt={reviews[current].name}
              className={`sey-review-img ${isFading ? 'fade-out' : 'fade-in'}`}
            />
          </div>

          {/* Clean review content with all tags, labels, and category badges removed */}
          <div className={`sey-review-content ${isFading ? 'fade-out' : 'fade-in'}`}>
            <div className="sey-review-stars">
              {"★".repeat(reviews[current].rating)}
            </div>

            <blockquote className="sey-review-quote">
              “{reviews[current].quote}”
            </blockquote>

            <div className="sey-review-author">
              <div className="sey-review-avatar">
                {reviews[current].name.charAt(0)}
              </div>
              <div className="sey-review-author-info">
                <strong>{reviews[current].name}</strong>
              </div>
            </div>

            {/* Seamless indicator dots (no arrow buttons) */}
            <div className="sey-review-dots">
              {reviews.map((_, idx) => (
                <span
                  key={idx}
                  className={`sey-review-dot ${idx === current ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="sey-family-gallery">
          <div className="sey-gallery-heading">
            <h3>More family moments</h3>
            <p>Moments worth sharing.</p>
          </div>

          <div className="sey-gallery-grid">
            <img
              src="/images/sey-gallery-1.jpg"
              alt="SEYOL family moment 1"
            />
            <img
              src="/images/sey-gallery-2.jpg"
              alt="SEYOL family moment 2"
            />
            <img
              src="/images/sey-gallery-3.jpg"
              alt="SEYOL family moment 3"
            />
          </div>
        </div>

        <div className="sey-review-cta">
          <div>
            <span>YOUR EXPERIENCE MATTERS</span>
            <h3>Share your SEY story with us.</h3>
            <p>Help other families discover your experience.</p>
          </div>

          <Link href="/resources" className="sey-practice-link">
            Share Your Review <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SeyolProductTrust() {
  return (
    <>
      <WhatGoesIntoSeyProducts />
      <CreatedFromPractice />
      <LovedByFamilies />
    </>
  );
}

export default SeyolProductTrust;
