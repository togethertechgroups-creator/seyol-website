'use client';

import React, { useState } from "react";
import Link from "next/link";
import "./ShopByRoutine.css";

interface ProductItem {
  id: number;
  name: string;
  type: "product" | "bundle";
  description: string;
  price: string;
  image: string;
  link: string;
}

interface RoutineItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  description: string;
  products: ProductItem[];
  guide: {
    title: string;
    description: string;
    link: string;
  };
  video: {
    title: string;
    thumbnail: string;
    link: string;
  };
}

const routineData: RoutineItem[] = [
  {
    id: "morning",
    name: "Morning Care",
    subtitle: "A gentle start to the day",
    image: "/images/routine-morning.jpg",
    description:
      "Discover simple essentials to make your baby's morning care routine feel special.",
    products: [
      {
        id: 1,
        name: "Gentle Baby Care",
        type: "product",
        description: "An everyday baby care essential.",
        price: "S$18.00",
        image: "/images/product-baby-care.jpg",
        link: "/shop/gentle-baby-care",
      },
      {
        id: 2,
        name: "Morning Care Bundle",
        type: "bundle",
        description: "A collection for your morning routine.",
        price: "S$35.00",
        image: "/images/bundle-morning.jpg",
        link: "/shop/morning-care-bundle",
      },
    ],
    guide: {
      title: "Creating a Gentle Morning Routine",
      description:
        "Explore simple ways to introduce a comfortable morning care routine.",
      link: "/resources/morning-care-guide",
    },
    video: {
      title: "How to Build a Simple Morning Routine",
      thumbnail: "/images/video-morning.jpg",
      link: "/videos/morning-routine",
    },
  },
  {
    id: "bath",
    name: "Bath Time",
    subtitle: "Make bath time a special moment",
    image: "/images/routine-bath.jpg",
    description:
      "Explore bath-time essentials and helpful resources for your baby's care routine.",
    products: [
      {
        id: 3,
        name: "Baby Bath Essentials",
        type: "product",
        description: "Explore everyday bath-time essentials.",
        price: "S$20.00",
        image: "/images/product-bath.jpg",
        link: "/shop/baby-bath-essentials",
      },
      {
        id: 4,
        name: "Bath Time Bundle",
        type: "bundle",
        description: "A collection for your baby's bath routine.",
        price: "S$42.00",
        image: "/images/bundle-bath.jpg",
        link: "/shop/bath-time-bundle",
      },
    ],
    guide: {
      title: "A Simple Baby Bath-Time Guide",
      description:
        "Learn about preparing a comfortable bath-time environment.",
      link: "/resources/baby-bath-guide",
    },
    video: {
      title: "Understanding Baby Bath Time",
      thumbnail: "/images/video-bath.jpg",
      link: "/videos/baby-bath",
    },
  },
  {
    id: "massage",
    name: "Baby Massage",
    subtitle: "Bonding through gentle touch",
    image: "/images/routine-massage.jpg",
    description:
      "Discover massage-related products and learning resources for your routine.",
    products: [
      {
        id: 5,
        name: "Massage Care Product",
        type: "product",
        description: "Explore products for your massage routine.",
        price: "S$16.00",
        image: "/images/product-massage.jpg",
        link: "/shop/massage-care",
      },
      {
        id: 6,
        name: "Massage Routine Bundle",
        type: "bundle",
        description: "Explore a collection for massage time.",
        price: "S$32.00",
        image: "/images/bundle-massage.jpg",
        link: "/shop/massage-bundle",
      },
    ],
    guide: {
      title: "Getting Started with Baby Massage",
      description:
        "Discover introductory information about infant massage.",
      link: "/resources/baby-massage-guide",
    },
    video: {
      title: "Understanding a Gentle Massage Routine",
      thumbnail: "/images/video-massage.jpg",
      link: "/videos/baby-massage",
    },
  },
  {
    id: "bedtime",
    name: "Bedtime Routine",
    subtitle: "Create a calm evening routine",
    image: "/images/routine-bedtime.jpg",
    description:
      "Explore products and ideas for your baby's evening care routine.",
    products: [
      {
        id: 7,
        name: "Bedtime Care Essential",
        type: "product",
        description: "Explore everyday bedtime care products.",
        price: "S$19.00",
        image: "/images/product-bedtime.jpg",
        link: "/shop/bedtime-care",
      },
      {
        id: 8,
        name: "Bedtime Bundle",
        type: "bundle",
        description: "A collection for your evening routine.",
        price: "S$38.00",
        image: "/images/bundle-bedtime.jpg",
        link: "/shop/bedtime-bundle",
      },
    ],
    guide: {
      title: "Building a Bedtime Routine",
      description:
        "Explore ideas for creating a consistent evening routine.",
      link: "/resources/bedtime-guide",
    },
    video: {
      title: "Simple Bedtime Routine Ideas",
      thumbnail: "/images/video-bedtime.jpg",
      link: "/videos/bedtime-routine",
    },
  },
  {
    id: "mom",
    name: "Mom's Self-Care",
    subtitle: "Because mom deserves care too",
    image: "/images/routine-mom.jpg",
    description:
      "Find thoughtful products and resources to support your self-care routine.",
    products: [
      {
        id: 9,
        name: "Mom's Care Essential",
        type: "product",
        description: "Explore everyday self-care essentials.",
        price: "S$22.00",
        image: "/images/product-mom.jpg",
        link: "/shop/mom-care",
      },
      {
        id: 10,
        name: "Mom's Self-Care Bundle",
        type: "bundle",
        description: "A collection created for your self-care routine.",
        price: "S$45.00",
        image: "/images/bundle-mom.jpg",
        link: "/shop/mom-care-bundle",
      },
    ],
    guide: {
      title: "Making Time for Maternal Self-Care",
      description:
        "Explore gentle ideas for making time for yourself.",
      link: "/resources/mom-self-care-guide",
    },
    video: {
      title: "Simple Self-Care Moments for Moms",
      thumbnail: "/images/video-mom.jpg",
      link: "/videos/mom-self-care",
    },
  },
];

function ProductCard({ product }: { product: ProductItem }) {
  return (
    <article className="sbr-product-card">
      <Link href={product.link} className="sbr-product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="sbr-product-type">
          {product.type === "bundle" ? "Bundle" : "Product"}
        </span>
      </Link>

      <div className="sbr-product-info">
        <h4>{product.name}</h4>
        <p>{product.description}</p>

        <div className="sbr-product-bottom">
          <strong>{product.price}</strong>
          <Link href={product.link} aria-label={`Explore ${product.name}`}>
            Explore <span>↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ShopByRoutine() {
  const [activeRoutine, setActiveRoutine] = useState<string>("morning");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const selectedRoutine =
    routineData.find((routine) => routine.id === activeRoutine) || routineData[0];

  const filteredProducts = selectedRoutine.products.filter(
    (product) =>
      activeFilter === "all" || product.type === activeFilter
  );

  return (
    <section className="sbr-section">
      <div className="sbr-container">

        {/* Section Heading */}
        <div className="sbr-heading">
          <span className="sbr-eyebrow">SEY BY SEYOL</span>

          <h2>
            Shop by <span>Routine</span>
          </h2>

          <p>
            Care that fits your everyday moments.
            Choose a routine and discover products,
            bundles, guides and videos for your family.
          </p>
        </div>

        {/* Hero */}
        <div className="sbr-hero">
          <div className="sbr-hero-content">
            <span>THOUGHTFUL CARE, EVERY DAY</span>

            <h3>
              Little routines.
              <br />
              Meaningful moments.
            </h3>

            <p>
              Explore everyday care collections designed
              around the little moments that matter.
            </p>

            <Link href="/shop" className="sbr-hero-btn">
              Explore SEY Products →
            </Link>
          </div>

          <img
            src="/images/shop-by-routine-banner.jpg"
            alt="SEY baby care collection"
          />
        </div>

        {/* Routine Selection */}
        <div className="sbr-selection">
          <div className="sbr-section-heading">
            <span className="sbr-eyebrow">DISCOVER YOUR ROUTINE</span>
            <h3>What routine are you shopping for?</h3>
            <p>Select a routine to explore relevant collections.</p>
          </div>

          <div className="sbr-routine-grid">
            {routineData.map((routine) => (
              <button
                key={routine.id}
                type="button"
                className={`sbr-routine-card ${
                  activeRoutine === routine.id ? "active" : ""
                }`}
                onClick={() => {
                  setActiveRoutine(routine.id);
                  setActiveFilter("all");
                }}
                aria-pressed={activeRoutine === routine.id}
              >
                <div className="sbr-routine-image">
                  <img src={routine.image} alt="" loading="lazy" />
                  <span className="sbr-routine-arrow">↗</span>
                </div>

                <div className="sbr-routine-info">
                  <h4>{routine.name}</h4>
                  <p>{routine.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Routine */}
        <div className="sbr-selected">
          <div className="sbr-selected-heading">
            <div>
              <span className="sbr-eyebrow">YOUR SELECTED ROUTINE</span>
              <h3>{selectedRoutine.name}</h3>
              <p>{selectedRoutine.description}</p>
            </div>

            <Link href="/shop" className="sbr-text-link">
              View All Products →
            </Link>
          </div>

          {/* Filters */}
          <div className="sbr-filters" aria-label="Product filters">
            {[
              ["all", "All"],
              ["product", "Products"],
              ["bundle", "Bundles"],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={activeFilter === value ? "active" : ""}
                onClick={() => setActiveFilter(value)}
                aria-pressed={activeFilter === value}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Product Cards */}
          <div className="sbr-product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Guide + Video */}
        <div className="sbr-learning-grid">

          <article className="sbr-learning-card sbr-guide-card">
            <div className="sbr-learning-icon">▤</div>

            <span className="sbr-eyebrow">READ & DISCOVER</span>

            <h3>{selectedRoutine.guide.title}</h3>

            <p>{selectedRoutine.guide.description}</p>

            <Link href={selectedRoutine.guide.link}>
              Read the Guide →
            </Link>
          </article>

          <article className="sbr-learning-card sbr-video-card">
            <Link
              href={selectedRoutine.video.link}
              className="sbr-video-image"
              aria-label={`Watch ${selectedRoutine.video.title}`}
            >
              <img
                src={selectedRoutine.video.thumbnail}
                alt=""
                loading="lazy"
              />
              <span className="sbr-play-button">▶</span>
            </Link>

            <div className="sbr-video-info">
              <span className="sbr-eyebrow">WATCH & LEARN</span>

              <h3>{selectedRoutine.video.title}</h3>

              <Link href={selectedRoutine.video.link}>
                Watch Video →
              </Link>
            </div>
          </article>

        </div>

        {/* Bottom CTA */}
        <div className="sbr-bottom">
          <div>
            <span>SEY BY SEYOL</span>
            <h3>Build a routine that feels right.</h3>
            <p>
              Thoughtful care for everyday family moments.
            </p>
          </div>

          <Link href="/shop" className="sbr-bottom-btn">
            Explore All Products →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default ShopByRoutine;
