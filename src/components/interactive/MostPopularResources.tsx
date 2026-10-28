'use client';

import React, { useState } from "react";
import {
  ShoppingBag,
  Check,
  ArrowRight,
  BookOpen,
  X,
} from "lucide-react";
import "./MostPopularResources.css";

type Bundle = {
  id: string;
  title: string;
  count: number;
  image: string;
  description: string;
  price: number | null;
  items: string[];
};

const bundles: Bundle[] = [
  {
    id: "newborn",
    title: "Newborn Care Starter Bundle",
    count: 5,
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800",
    description: "Essential resources for everyday newborn care.",
    price: null,
    items: [
      "Newborn Care Guide: The First 30 Days",
      "Diaper Changing & Umbilical Cord Care Guide",
      "Safe Swaddling Step-by-Step Sheet",
      "Baby Cry & Soothing Techniques Chart",
      "Newborn Feeding & Sleep Log",
    ],
  },
  {
    id: "birth",
    title: "Birth Preparation Toolkit",
    count: 6,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    description: "Prepare for birth with practical guides and checklists.",
    price: null,
    items: [
      "Hospital Bag Checklist",
      "Birth Plan Template",
      "Stages of Labour Explained Guide",
      "Birthing Positions Illustrated Sheet",
      "Partner’s Guide to Labour Support",
      "Acupressure Points for Labour Comfort Chart",
    ],
  },
  {
    id: "massage",
    title: "Baby Massage & Bath Bundle",
    count: 6,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800",
    description: "Massage routines, bathing guides and safety resources.",
    price: null,
    items: [
      "Traditional Indian Baby Massage Step-by-Step Guide",
      "Daily Baby Massage Routine Chart",
      "Baby Massage Oils: What’s Safe for Baby Guide",
      "Safe Baby Bathing Step-by-Step Guide",
      "Water Temperature & Bath Safety Quick Reference",
      "Bath Time Essentials Checklist",
    ],
  },
  {
    id: "feeding",
    title: "Breastfeeding & Bottle Feeding Bundle",
    count: 5,
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800",
    description: "Practical feeding and milk-storage resources.",
    price: null,
    items: [
      "Latching Techniques Illustrated Guide",
      "Breastfeeding Positions Poster",
      "Bottle Feeding & Sterilisation Checklist",
      "Pumping & Milk Storage Guide",
      "Breastfeeding Troubleshooting Guide",
    ],
  },
  {
    id: "pregnancy",
    title: "Pregnancy Comfort & Movement Bundle",
    count: 7,
    image: "https://images.unsplash.com/photo-1537655780520-1e392ead81f2?auto=format&fit=crop&q=80&w=800",
    description: "Comfort, movement and relaxation resources for pregnancy.",
    price: null,
    items: [
      "Prenatal Massage Safety Guide",
      "Partner Massage Techniques for Pregnancy Discomfort",
      "Pressure Points to Avoid During Pregnancy Chart",
      "Pregnancy-Safe Exercise Guide by Trimester",
      "Breathing & Relaxation Techniques for Birth",
      "Birth Ball Exercises Guide",
      "Pelvic Floor Exercise Routine",
    ],
  },
  {
    id: "postpartum",
    title: "Postpartum Recovery & Confinement Bundle",
    count: 8,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800",
    description: "Recovery, confinement meals and maternal nutrition.",
    price: null,
    items: [
      "Postpartum Recovery Timeline",
      "Benefits of Postpartum Massage e-Booklet",
      "Self-Massage Techniques for Back, Neck & Shoulders",
      "Abdominal Binding Guide",
      "Confinement Meal Planner",
      "Traditional Confinement Recipes e-Book",
      "Foods to Eat & Avoid During Confinement Chart",
      "Nutrition Guide for Breastfeeding Mothers",
    ],
  },
  {
    id: "complete",
    title: "SEYOL Complete Pregnancy to Newborn Resource Bundle",
    count: 37,
    image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800",
    description: "The complete collection of all six specialist bundles.",
    price: null,
    items: [
      "Everything in the Newborn Care Starter Bundle",
      "Everything in the Baby Massage & Bath Bundle",
      "Everything in the Breastfeeding & Bottle Feeding Bundle",
      "Everything in the Birth Preparation Toolkit",
      "Everything in the Pregnancy Comfort & Movement Bundle",
      "Everything in the Postpartum Recovery & Confinement Bundle",
    ],
  },
];

type Props = {
  onCheckout?: (items: Bundle[]) => void;
  onExploreComplete?: () => void;
};

export default function MostPopularResources({
  onCheckout,
  onExploreComplete,
}: Props) {
  const [cart, setCart] = useState<string[]>([]);
  const [selected, setSelected] = useState<Bundle | null>(null);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (id: string) => {
    setCart((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((previous) => previous.filter((item) => item !== id));
  };

  const cartBundles = bundles.filter((bundle) =>
    cart.includes(bundle.id)
  );

  const formatPrice = (price: number | null) =>
    price === null
      ? "Price to be confirmed"
      : new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(price);

  return (
    <section className="popular-resources">
      <div className="popular-container">
        <div className="popular-header">
          <div>
            <h2>Most Popular Resources</h2>
            <p>
              Featured resources to help you get started.
              Popularity labels should be updated using actual
              sales and usage data.
            </p>
          </div>

          <button
            className="cart-button"
            type="button"
            onClick={() => setShowCart(true)}
            aria-label={`Open cart with ${cart.length} bundles`}
          >
            <ShoppingBag size={18} />
            <span>Cart ({cart.length})</span>
          </button>
        </div>

        <div className="popular-grid">
          {bundles.slice(0, 2).map((bundle) => {
            const inCart = cart.includes(bundle.id);

            return (
              <article className="popular-card" key={bundle.id}>
                <button
                  className="product-image-button"
                  type="button"
                  onClick={() => setSelected(bundle)}
                  aria-label={`View ${bundle.title} details`}
                >
                  <img
                    src={bundle.image}
                    alt={`${bundle.title} digital resources`}
                    className="product-image"
                    loading="lazy"
                  />
                </button>

                <button
                  type="button"
                  className="product-title"
                  onClick={() => setSelected(bundle)}
                >
                  {bundle.title}
                </button>

                <p className="resource-count">
                  {bundle.count} learning resources
                </p>

                <p className="product-price">
                  {formatPrice(bundle.price)}
                </p>

                <button
                  type="button"
                  className={`add-cart-button ${
                    inCart ? "added" : ""
                  }`}
                  onClick={() => addToCart(bundle.id)}
                >
                  {inCart ? (
                    <>
                      <Check size={15} /> Added to Cart
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className="view-all-button"
          onClick={() => {
            if (onExploreComplete) {
              onExploreComplete();
            } else {
              const el =
                document.getElementById("shop-resources") ||
                document.getElementById("explore-resources");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }
          }}
        >
          Explore Complete Bundle <ArrowRight size={16} />
        </button>
      </div>

      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ✕
            </button>

            <h2 id="product-modal-title">{selected.title}</h2>
            <p>{selected.description}</p>

            <h3>What&apos;s included</h3>
            <ul>
              {selected.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <button
              type="button"
              className={`add-cart-button modal-add ${
                cart.includes(selected.id) ? "added" : ""
              }`}
              onClick={() => {
                addToCart(selected.id);
                setSelected(null);
              }}
            >
              {cart.includes(selected.id) ? (
                <>
                  <Check size={15} /> Added to Cart
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
          </section>
        </div>
      )}

      {showCart && (
        <div
          className="modal-backdrop"
          onClick={() => setShowCart(false)}
        >
          <section
            className="product-modal cart-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowCart(false)}
              aria-label="Close cart"
            >
              <X size={20} />
            </button>

            <h3 id="cart-title">Your SEYOL Cart</h3>

            {cartBundles.length === 0 ? (
              <p>Your cart is empty. Add a bundle to get started.</p>
            ) : (
              <>
                {cartBundles.map((bundle) => (
                  <div className="cart-item" key={bundle.id}>
                    <div>
                      <strong>{bundle.title}</strong>
                      <p>{formatPrice(bundle.price)}</p>
                    </div>
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeFromCart(bundle.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <p className="cart-note">
                  Final total will be available when product prices
                  are configured.
                </p>

                <button
                  type="button"
                  className="add-cart-button modal-add"
                  onClick={() => {
                    setShowCart(false);
                    onCheckout?.(cartBundles);
                  }}
                >
                  Continue to Checkout
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </section>
  );
}

