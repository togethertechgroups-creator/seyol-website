'use client';

import React, { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import "./ResourceBundles.css";

type ResourceBundlesProps = {
  onAddToCart?: (bundleId: string) => void;
};

export default function ResourceBundles({
  onAddToCart,
}: ResourceBundlesProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart?.("complete");
    setAdded((prev) => !prev);
  };

  return (
    <section className="resource-bundles">
      <div className="resource-bundles-container">
        <div className="resource-bundles-heading">
          <h2>Resource Bundles</h2>
          <p>
            Explore grouped guides and checklists for each stage of parenthood.
          </p>
        </div>

        <article className="complete-bundle-card">
          <span className="complete-bundle-label">
            Complete collection
          </span>

          <h3>
            SEYOL Complete Pregnancy to Newborn Resource Bundle
          </h3>

          <p className="complete-bundle-description">
            Includes all six paid bundles: newborn care, baby massage
            and bath, feeding, birth preparation, pregnancy comfort
            and movement, and postpartum recovery and confinement.
          </p>

          <p className="complete-bundle-price">
            Price: To be confirmed
          </p>

          <button
            type="button"
            className={`complete-bundle-button ${
              added ? "bundle-added" : ""
            }`}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                Added to Cart <Check size={18} />
              </>
            ) : (
              <>
                Add Complete Bundle <ShoppingCart size={20} />
              </>
            )}
          </button>
        </article>
      </div>
    </section>
  );
}

