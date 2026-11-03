'use client';

import React, { useState } from "react";
import "./SeyolResourceBundles.css";

export interface BundleItem {
  id: number;
  category: string;
  title: string;
  description: string;
  price: string;
  oldPrice: string;
  image: string;
  resources: string[];
  tag: string;
}

const bundles: BundleItem[] = [
  {
    id: 1,
    category: "Pregnancy",
    title: "Pregnancy Essentials Bundle",
    description:
      "Helpful resources to support your pregnancy journey and preparation for your little one.",
    price: "S$ 29.00",
    oldPrice: "S$ 39.00",
    image: "/images/pregnancy-bundle.jpg",
    resources: [
      "Pregnancy Preparation Guide",
      "Hospital Bag Checklist",
      "Birth Planning Worksheet",
      "Pregnancy Self-Care Guide",
    ],
    tag: "Popular Bundle",
  },
  {
    id: 2,
    category: "Newborn Care",
    title: "Newborn Care Bundle",
    description:
      "Explore practical guides and checklists for preparing to care for your newborn.",
    price: "S$ 25.00",
    oldPrice: "S$ 35.00",
    image: "/images/newborn-bundle.jpg",
    resources: [
      "Newborn Care Guide",
      "Baby Essentials Checklist",
      "Newborn Daily Routine Planner",
      "New Parent Checklist",
    ],
    tag: "New Parent Favourite",
  },
  {
    id: 3,
    category: "Baby Massage",
    title: "Baby Massage Bundle",
    description:
      "A collection of educational resources to help parents learn about baby massage routines.",
    price: "S$ 19.00",
    oldPrice: "S$ 29.00",
    image: "/images/baby-massage-bundle.jpg",
    resources: [
      "Baby Massage Learning Guide",
      "Massage Routine Checklist",
      "Preparation Guide",
      "Parent Reference Sheet",
    ],
    tag: "Learning Bundle",
  },
  {
    id: 4,
    category: "Mother Care",
    title: "Mum's Wellness Bundle",
    description:
      "Thoughtfully organised resources for personal wellbeing and everyday self-care.",
    price: "S$ 22.00",
    oldPrice: "S$ 30.00",
    image: "/images/mum-wellness-bundle.jpg",
    resources: [
      "Mum's Self-Care Guide",
      "Daily Wellness Planner",
      "Self-Care Checklist",
      "Reflection Worksheet",
    ],
    tag: "For Mums",
  },
];

const filters = [
  "All Resources",
  "Pregnancy",
  "Newborn Care",
  "Baby Massage",
  "Mother Care",
];

interface SeyolResourceBundlesProps {
  onCheckout?: (bundle: BundleItem) => void;
}

const SeyolResourceBundles: React.FC<SeyolResourceBundlesProps> = ({ onCheckout }) => {
  const [activeFilter, setActiveFilter] = useState("All Resources");
  const [selectedBundle, setSelectedBundle] = useState<BundleItem | null>(null);

  const filteredBundles =
    activeFilter === "All Resources"
      ? bundles
      : bundles.filter(
          (bundle) => bundle.category === activeFilter
        );

  const handlePurchase = (bundle: BundleItem) => {
    if (onCheckout) {
      onCheckout(bundle);
    } else {
      window.location.href = `/checkout?bundle=${bundle.id}`;
    }
  };

  return (
    <section className="seyol-bundles" id="seyol-bundles">
      <div className="seyol-bundles-container">

        {/* Heading */}
        <div className="seyol-bundles-heading">
          <span className="seyol-bundles-eyebrow">
            THE SEYOL RESOURCE COLLECTION
          </span>

          <h2>
            Resource <span>Bundles</span>
          </h2>

          <p>
            Discover thoughtfully grouped digital guides,
            practical checklists and learning resources
            to support your parenting journey.
          </p>
        </div>

        {/* Category Filters */}
        <div className="seyol-bundle-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={
                activeFilter === filter ? "active" : ""
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Bundle Grid */}
        <div className="seyol-bundle-grid">
          {filteredBundles.map((bundle) => (
            <article
              className="seyol-bundle-card"
              key={bundle.id}
            >
              <div className="seyol-bundle-image">
                <img
                  src={bundle.image}
                  alt={bundle.title}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="seyol-bundle-tag">
                  {bundle.tag}
                </span>
              </div>

              <div className="seyol-bundle-content">
                <span className="seyol-bundle-category">
                  {bundle.category}
                </span>

                <h3>{bundle.title}</h3>

                <p className="seyol-bundle-description">
                  {bundle.description}
                </p>

                <div className="seyol-bundle-includes">
                  <strong>What&apos;s included</strong>

                  {bundle.resources.slice(0, 3).map((item) => (
                    <div
                      className="seyol-bundle-resource"
                      key={item}
                    >
                      <span>✓</span>
                      {item}
                    </div>
                  ))}

                  <button
                    className="seyol-view-includes"
                    type="button"
                    onClick={() => setSelectedBundle(bundle)}
                  >
                    View all {bundle.resources.length} resources
                    <span>→</span>
                  </button>
                </div>

                <div className="seyol-bundle-bottom">
                  <div className="seyol-bundle-price">
                    <strong>{bundle.price}</strong>
                    <del>{bundle.oldPrice}</del>
                  </div>

                  <button
                    type="button"
                    className="seyol-bundle-buy"
                    onClick={() => handlePurchase(bundle)}
                  >
                    Get Bundle <span>→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="seyol-bundle-footer">
          <h3>A little more support, all in one place.</h3>
          <p>
            Find helpful resources designed to support
            you at every stage.
          </p>
          <a href="/resources" className="seyol-all-resources-btn">
            Explore All Resources <span>→</span>
          </a>
        </div>

      </div>

      {/* Bundle Details Modal */}
      {selectedBundle && (
        <div
          className="seyol-bundle-modal-overlay"
          onClick={() => setSelectedBundle(null)}
        >
          <div
            className="seyol-bundle-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="seyol-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="seyol-modal-close"
              type="button"
              aria-label="Close"
              onClick={() => setSelectedBundle(null)}
            >
              ×
            </button>

            <span className="seyol-bundle-category">
              {selectedBundle.category}
            </span>

            <h3 id="seyol-modal-title">
              {selectedBundle.title}
            </h3>

            <p>{selectedBundle.description}</p>

            <h4>Included in this bundle</h4>

            <ul>
              {selectedBundle.resources.map((resource) => (
                <li key={resource}>
                  <span>✓</span> {resource}
                </li>
              ))}
            </ul>

            <div className="seyol-modal-price">
              {selectedBundle.price}
            </div>

            <button
              type="button"
              className="seyol-bundle-buy"
              onClick={() => handlePurchase(selectedBundle)}
            >
              Get This Bundle →
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SeyolResourceBundles;

