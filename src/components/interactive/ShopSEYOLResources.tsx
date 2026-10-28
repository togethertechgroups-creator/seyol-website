'use client';

import React, { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  BookOpen,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import "./ShopSEYOLResources.css";

type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  items: string[];
};

const products: Product[] = [
  {
    id: "newborn",
    title: "Newborn Care Starter Bundle",
    category: "Newborn Care",
    description:
      "Practical resources for everyday newborn care and routines.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800",
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
    id: "massage",
    title: "Baby Massage & Bath Bundle",
    category: "Baby Massage",
    description:
      "Guides for gentle baby massage, bathing and safety.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800",
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
    category: "Feeding",
    description:
      "Feeding, latching, pumping and milk storage resources.",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800",
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
    id: "birth",
    title: "Birth Preparation Toolkit",
    category: "Birth Preparation",
    description:
      "Get organised for birth with practical plans and checklists.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
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
    id: "pregnancy",
    title: "Pregnancy Comfort & Movement Bundle",
    category: "Pregnancy",
    description:
      "Pregnancy comfort, movement and relaxation resources.",
    image: "https://images.unsplash.com/photo-1537655780520-1e392ead81f2?auto=format&fit=crop&q=80&w=800",
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
    category: "Postpartum",
    description:
      "Recovery planning, traditional confinement and nutrition resources.",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800",
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
    category: "Complete Bundle",
    description:
      "The complete collection of all six specialist bundles.",
    image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800",
    price: null,
    items: [
      "All 5 resources in Newborn Care Starter Bundle",
      "All 6 resources in Baby Massage & Bath Bundle",
      "All 5 resources in Breastfeeding & Bottle Feeding Bundle",
      "All 6 resources in Birth Preparation Toolkit",
      "All 7 resources in Pregnancy Comfort & Movement Bundle",
      "All 8 resources in Postpartum Recovery & Confinement Bundle",
    ],
  },
];

const categories = [
  "All Resources",
  "Newborn Care",
  "Baby Massage",
  "Feeding",
  "Birth Preparation",
  "Pregnancy",
  "Postpartum",
  "Complete Bundle",
];

type Props = {
  onCheckout?: (items: Product[]) => void;
};

export default function ShopSEYOLResources({
  onCheckout,
}: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Resources");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "All Resources" ||
        product.category === category;

      const searchableText = [
        product.title,
        product.category,
        product.description,
        ...product.items,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        (!term || searchableText.includes(term))
      );
    });
  }, [search, category]);

  const cartProducts = products.filter((product) =>
    cart.includes(product.id)
  );

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

  const priceLabel = (price: number | null) =>
    price === null
      ? "Price to be confirmed"
      : new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(price);

  return (
    <section className="seyol-shop" id="shop-resources">
      <header className="shop-heading">
        <span className="shop-eyebrow">THE SEYOL COLLECTION</span>

        <h2>Shop SEYOL Digital Resources</h2>

        <p>
          Practical guides, checklists and learning resources
          for every stage of your pregnancy and parenting journey.
        </p>

        <button
          type="button"
          className="shop-cart-trigger"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingBag size={18} />
          My Cart ({cart.length})
        </button>
      </header>

      <div className="shop-toolbar">
        <div className="shop-search">
          <Search size={18} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search guides, checklists and bundles..."
            aria-label="Search digital resources"
          />
          {search && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearch("")}
            >
              <X size={17} />
            </button>
          )}
        </div>

        <div className="shop-categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`shop-category ${
                category === item ? "active" : ""
              }`}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="shop-results-heading">
        <div>
          <h3>Explore Our Resources</h3>
          <p>
            {filteredProducts.length} collection
            {filteredProducts.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="seyol-product-grid">
          {filteredProducts.map((product) => {
            const added = cart.includes(product.id);

            return (
              <article className="seyol-product-card" key={product.id}>
                <button
                  type="button"
                  className="seyol-product-image"
                  onClick={() => setSelected(product)}
                  aria-label={`View ${product.title}`}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                  />
                  <span className="product-category-label">
                    {product.category}
                  </span>
                </button>

                <div className="seyol-product-content">
                  <h3>{product.title}</h3>

                  <p className="product-description">
                    {product.description}
                  </p>

                  <div className="product-item-count">
                    <BookOpen size={16} />
                    {product.id === "complete"
                      ? "All six specialist bundles"
                      : `${product.items.length} learning resources`}
                  </div>

                  <div className="product-includes">
                    <strong>Included in this bundle</strong>
                    <ul>
                      {product.items.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      className="details-link"
                      onClick={() => setSelected(product)}
                    >
                      View all included items <ArrowRight size={15} />
                    </button>
                  </div>

                  <div className="product-card-bottom">
                    <span className="product-price">
                      {priceLabel(product.price)}
                    </span>

                    <button
                      type="button"
                      className={`product-add-button ${
                        added ? "is-added" : ""
                      }`}
                      onClick={() => addToCart(product.id)}
                    >
                      {added ? (
                        <>
                          <Check size={16} /> Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={16} /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="shop-empty">
          <Search size={30} />
          <h3>No resources found</h3>
          <p>Try a different search or select another category.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All Resources");
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      <section className="shop-help-banner">
        <div>
          <span>NOT SURE WHERE TO START?</span>
          <h3>Find the right resources for your journey.</h3>
          <p>
            Explore the collection that matches your current stage.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCategory("All Resources");
            setSearch("");
            document
              .querySelector(".shop-toolbar")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Explore all resources <ArrowRight size={17} />
        </button>
      </section>

      {selected && (
        <div
          className="seyol-modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="seyol-product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="seyol-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="seyol-modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close details"
            >
              <X />
            </button>

            <img src={selected.image} alt={selected.title} />

            <span className="shop-eyebrow">{selected.category}</span>
            <h2 id="seyol-modal-title">{selected.title}</h2>
            <p>{selected.description}</p>

            <h3>Complete list of included resources</h3>
            <ul>
              {selected.items.map((item) => (
                <li key={item}>
                  <Check size={16} /> {item}
                </li>
              ))}
            </ul>

            <strong className="modal-price">
              {priceLabel(selected.price)}
            </strong>

            <button
              type="button"
              className={`product-add-button modal-add-button ${
                cart.includes(selected.id) ? "is-added" : ""
              }`}
              onClick={() => {
                addToCart(selected.id);
                setSelected(null);
              }}
            >
              {cart.includes(selected.id) ? (
                <>
                  <Check size={17} /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag size={17} /> Add Bundle to Cart
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {cartOpen && (
        <div
          className="seyol-modal-backdrop"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="seyol-product-modal seyol-cart-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="seyol-cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="seyol-modal-close"
              onClick={() => setCartOpen(false)}
              aria-label="Close cart"
            >
              <X />
            </button>

            <h2 id="seyol-cart-title">Your Shopping Cart</h2>

            {cartProducts.length === 0 ? (
              <p>Your cart is empty. Explore the bundles to get started.</p>
            ) : (
              <>
                {cartProducts.map((product) => (
                  <div className="seyol-cart-item" key={product.id}>
                    <div>
                      <strong>{product.title}</strong>
                      <p>{priceLabel(product.price)}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <p className="cart-price-note">
                  Prices must be configured before payment can be enabled.
                </p>

                <button
                  type="button"
                  className="product-add-button modal-add-button"
                  onClick={() => {
                    setCartOpen(false);
                    onCheckout?.(cartProducts);
                  }}
                >
                  Proceed to Checkout <ArrowRight size={17} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

