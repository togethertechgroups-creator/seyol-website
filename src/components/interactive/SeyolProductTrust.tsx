'use client';

import React, { useState } from "react";
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
    name: "SEYOL Family",
    product: "Product Review",
    rating: 5,
    quote: "A lovely addition to our everyday routine.",
    image: "/images/customer-review-1.jpg",
  },
  {
    name: "SEYOL Family",
    product: "Family Experience",
    rating: 5,
    quote: "We appreciate having clear product information.",
    image: "/images/customer-review-2.jpg",
  },
  {
    name: "SEYOL Family",
    product: "Product Feedback",
    rating: 5,
    quote: "Thoughtful care for our family's daily routine.",
    image: "/images/customer-review-3.jpg",
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

  const next = () =>
    setCurrent((prev) => (prev + 1) % reviews.length);

  const previous = () =>
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

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

        <div className="sey-review-layout">
          <div className="sey-review-featured-image">
            <img
              src="/images/sey-family-review.jpg"
              alt="SEYOL family experience"
            />
            <div className="sey-review-image-overlay">
              <span>SHARED WITH LOVE</span>
              <h3>Every family&apos;s journey is unique.</h3>
            </div>
          </div>

          <div className="sey-review-content">
            <div className="sey-review-stars">
              {"★".repeat(reviews[current].rating)}
            </div>

            <h3>“{reviews[current].quote}”</h3>

            <p>
              {reviews[current].product}
            </p>

            <div className="sey-review-author">
              <div className="sey-review-avatar">S</div>
              <div>
                <strong>{reviews[current].name}</strong>
                <small>Customer experience</small>
              </div>
            </div>

            <div className="sey-review-controls">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous review"
              >
                ←
              </button>

              <span>
                {current + 1} / {reviews.length}
              </span>

              <button
                type="button"
                onClick={next}
                aria-label="Next review"
              >
                →
              </button>
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

