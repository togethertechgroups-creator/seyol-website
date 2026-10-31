'use client';

import React, { useState } from "react";
import "./MostPopularResources.css";

interface ResourceItem {
  id: number;
  category: string;
  label: string;
  title: string;
  description: string;
  image: string;
  action: string;
  link: string;
  type: string;
  objectPosition?: string;
}

const resources: ResourceItem[] = [
  {
    id: 1,
    category: "Bestsellers",
    label: "POPULAR PRODUCTS",
    title: "Everyday Baby Care Essentials",
    description:
      "Thoughtful essentials for your baby's everyday care routine.",
    image: "/images/baby-care-essentials.jpg",
    action: "Shop Now",
    link: "/shop/baby-care",
    type: "product",
  },
  {
    id: 2,
    category: "Most Downloaded",
    label: "FREE DOWNLOAD",
    title: "Newborn Care Checklist",
    description:
      "A practical checklist to help prepare for your baby's first days.",
    image: "/images/newborn-checklist.jpg",
    action: "Download Guide",
    link: "/resources/newborn-checklist.pdf",
    type: "download",
  },
  {
    id: 3,
    category: "Most Watched",
    label: "LEARNING VIDEO",
    title: "Baby Massage Basics",
    description:
      "Explore gentle baby massage techniques and everyday care tips.",
    image: "/images/baby-massage-video.jpg",
    action: "Watch Now",
    link: "/learning/baby-massage",
    type: "video",
  },
  {
    id: 4,
    category: "Recommended",
    label: "RECOMMENDED GUIDE",
    title: "Pregnancy Preparation Guide",
    description:
      "Helpful information and practical guidance for your next chapter.",
    image: "/images/pregnancy-guide.jpg",
    action: "Explore Guide",
    link: "/resources/pregnancy-guide",
    type: "guide",
  },
  {
    id: 5,
    category: "Most Downloaded",
    label: "FREE DOWNLOAD",
    title: "Postpartum Self-Care Guide",
    description:
      "A helpful resource for building a gentle postpartum care routine.",
    image: "/images/postpartum-guide.jpg",
    action: "Download Guide",
    link: "/resources/postpartum-guide.pdf",
    type: "download",
  },
  {
    id: 6,
    category: "Most Watched",
    label: "LEARNING VIDEO",
    title: "Newborn Handling Essentials",
    description:
      "Learn basic newborn handling and everyday care practices.",
    image: "/images/newborn-handling.jpg",
    action: "Watch Now",
    link: "/learning/newborn-handling",
    type: "video",
  },
];

const filters = [
  "All",
  "Bestsellers",
  "Most Downloaded",
  "Most Watched",
  "Recommended",
];

function ResourceCard({ resource }: { resource: ResourceItem }) {
  const handleAction = () => {
    if (resource.type === "download") {
      const link = document.createElement("a");
      link.href = resource.link;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      window.location.href = resource.link;
    }
  };

  return (
    <article className="sey-popular-card">
      <div className="sey-popular-image">
        <img
          src={resource.image}
          alt={resource.title}
          style={{ objectPosition: resource.objectPosition || "center top" }}
        />

        {resource.type === "video" && (
          <span className="sey-video-icon">▶</span>
        )}
      </div>

      <div className="sey-popular-card-content">
        <span className="sey-popular-label">
          {resource.label}
        </span>

        <h3>{resource.title}</h3>

        <p>{resource.description}</p>

        <div className="sey-popular-card-footer">
          <button
            type="button"
            onClick={handleAction}
            className="sey-resource-action"
          >
            {resource.action}
            <span>→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

interface MostPopularResourcesProps {
  onCheckout?: () => void;
  onExploreComplete?: () => void;
}

export default function MostPopularResources({
  onCheckout,
  onExploreComplete,
}: MostPopularResourcesProps = {}) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredResources =
    activeFilter === "All"
      ? resources
      : resources.filter(
          (item) => item.category === activeFilter
        );

  return (
    <section className="sey-popular-section" id="most-popular-resources">
      <div className="sey-popular-container">

        {/* Heading */}
        <div className="sey-popular-heading">
          <span className="sey-popular-eyebrow">
            EXPLORE WHAT FAMILIES LOVE
          </span>

          <h2>
            Most Popular <span>Resources</span>
          </h2>

          <p>
            Helpful products, practical guides and learning
            resources for every stage of your journey.
          </p>
        </div>

        {/* Filters */}
        <div className="sey-popular-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter ? "active" : ""
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Resource Cards */}
        <div className="sey-popular-grid">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="sey-popular-cta">
          <div>
            <span>YOUR JOURNEY, YOUR RESOURCES</span>

            <h3>
              Find the right resource for your journey.
            </h3>

            <p>
              Explore helpful resources for mothers, babies
              and growing families.
            </p>
          </div>

          <a
            href="/resources"
            className="sey-popular-cta-button"
            onClick={(e) => {
              if (onExploreComplete) {
                e.preventDefault();
                onExploreComplete();
              }
            }}
          >
            Explore All Resources
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
