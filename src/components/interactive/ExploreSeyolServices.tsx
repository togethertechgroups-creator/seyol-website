'use client';

import React from "react";
import Link from "next/link";
import "./ExploreSeyolServices.css";

interface SeyolServiceItem {
  id: number;
  number: string;
  icon: string;
  title: string;
  description: string;
  bestFor: string;
  link: string;
}

const services: SeyolServiceItem[] = [
  {
    id: 1,
    number: "01",
    icon: "♡",
    title: "Pregnancy Guidance",
    description:
      "Thoughtful guidance to help you prepare for your baby's arrival.",
    bestFor: "Expecting mothers",
    link: "/services/prenatal-massage-therapy",
  },
  {
    id: 2,
    number: "02",
    icon: "♧",
    title: "Newborn Baby Care",
    description:
      "Gentle support for feeding, bathing and everyday baby care.",
    bestFor: "New parents",
    link: "/services/hourly-newborn-support",
  },
  {
    id: 3,
    number: "03",
    icon: "♡",
    title: "Postpartum Recovery",
    description:
      "Explore care and guidance for your recovery after childbirth.",
    bestFor: "New mothers",
    link: "/services/postpartum-massage-and-wrap",
  },
  {
    id: 4,
    number: "04",
    icon: "✿",
    title: "Baby Massage",
    description:
      "Discover gentle massage practices and bonding routines.",
    bestFor: "Parents and babies",
    link: "/services/infant-massage-and-bath",
  },
  {
    id: 5,
    number: "05",
    icon: "⌂",
    title: "Parenting Guidance",
    description:
      "Practical guidance to build confidence in everyday parenting.",
    bestFor: "Growing families",
    link: "/services/holistic-care-guidance-consultation",
  },
  {
    id: 6,
    number: "06",
    icon: "❀",
    title: "Mother's Wellness",
    description:
      "Make time for your wellbeing and everyday self-care.",
    bestFor: "Mothers at every stage",
    link: "/services/mother-and-baby-combo-packages",
  },
];

export const ExploreSeyolServices: React.FC = () => {
  return (
    <section className="seyol-services-section" id="explore-seyol-services">
      <div className="seyol-services-container">

        {/* Heading */}
        <div className="seyol-services-heading">
          <span className="seyol-services-eyebrow">
            THOUGHTFUL CARE FOR EVERY JOURNEY
          </span>

          <h2>Explore SEYOL Services</h2>

          <p>
            Discover thoughtful care, practical guidance and
            personalised support for you and your growing family.
          </p>
        </div>

        {/* Service Cards */}
        <div className="seyol-services-grid">
          {services.map((service) => (
            <article
              className="seyol-service-card"
              key={service.id}
            >
              <div className="seyol-service-top">
                <span className="seyol-service-icon">
                  {service.icon}
                </span>

                <span className="seyol-service-number">
                  {service.number}
                </span>
              </div>

              <div className="seyol-service-content">
                <h3>{service.title}</h3>

                <p>{service.description}</p>
              </div>

              <div className="seyol-service-best">
                <span>BEST FOR</span>
                <strong>{service.bestFor}</strong>
              </div>

              <Link
                href={service.link}
                className="seyol-service-button"
              >
                Explore Service
                <span>↗</span>
              </Link>
            </article>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="seyol-services-bottom">
          <p>
            Every family&apos;s journey is unique. Find the support
            that feels right for yours.
          </p>

          <Link href="/services#service-finder">
            Help Me Choose <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ExploreSeyolServices;
