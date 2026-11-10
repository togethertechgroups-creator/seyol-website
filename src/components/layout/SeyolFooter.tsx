'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./SeyolFooter.css";

const footerColumns = [
  {
    title: "Explore SEYOL",
    links: [
      ["About Us", "/our-story"],
      ["Our Story", "/our-story"],
      ["Our Approach", "/our-story#method"],
      ["Contact Us", "/book"],
      ["Careers", "/careers"],
    ],
  },
  {
    title: "Our Services",
    links: [
      ["Pregnancy Care", "/services/pregnancy-care"],
      ["Newborn Care", "/services/newborn-care"],
      ["Postpartum Care", "/services/postpartum-care"],
      ["Parenting Support", "/services"],
      ["Classes & Workshops", "/classes"],
    ],
  },
  {
    title: "Shop & Learn",
    links: [
      ["SEY Products", "/products"],
      ["Resource Bundles", "/resources#seyol-bundles"],
      ["Guides & Checklists", "/resources"],
      ["Video Library", "/resources#video-library"],
      ["Free Resources", "/resources"],
    ],
  },
  {
    title: "Training & Support",
    links: [
      ["Training Pathway", "/careers"],
      ["Join SEYOL", "/careers/apply"],
      ["Teacher Resources", "/resources"],
      ["FAQs", "/services#packages"],
      ["Need Guidance?", "/book"],
    ],
  },
];

const legalLinks = [
  ["Privacy Policy", "/legal/privacy-policy"],
  ["Cookie Policy", "/legal/cookie-policy"],
  ["Product Disclaimer", "/legal/product-disclaimer"],
  ["Service Booking Terms", "/legal/service-booking-terms"],
  ["Class Terms", "/legal/class-terms"],
  ["Digital Resource Terms", "/legal/digital-resource-terms"],
  ["Employment Agency Terms", "/legal/employment-agency-terms"],
  ["Careers & Training Disclaimer", "/legal/careers-and-training-disclaimer"],
  ["Admin Portal", "/admin"],
];

const SeyolFooter: React.FC = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/portal')) {
    return null;
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="seyol-footer">
      <div className="seyol-footer-container">

        {/* Main Footer */}
        <div className="seyol-footer-main">

          {/* Navigation Columns */}
          <div className="seyol-footer-links">
            {footerColumns.map((column) => (
              <div className="seyol-footer-column" key={column.title}>
                <h3>{column.title}</h3>

                <ul>
                  {column.links.map(([label, url]) => (
                    <li key={label}>
                      <Link href={url}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="seyol-footer-newsletter">
            <h3>Stay Connected</h3>

            <p>
              Get helpful parenting resources, updates and
              inspiration from SEYOL.
            </p>

            <form onSubmit={handleSubscribe}>
              <div className="seyol-newsletter-input">
                <input
                  type="email"
                  placeholder="Enter your email address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />

                <button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Subscribe"}
                </button>
              </div>

              <div className="seyol-newsletter-line" />

              <label className="seyol-newsletter-consent">
                By subscribing, you agree to our{" "}
                <Link href="/legal/privacy-policy">Privacy Policy.</Link>
              </label>
            </form>

            {status === "success" && (
              <p className="seyol-newsletter-success" role="status">
                Thank you for subscribing!
              </p>
            )}

            {status === "error" && (
              <p className="seyol-newsletter-error" role="alert">
                Subscription failed. Please try again.
              </p>
            )}

            {/* Social Media */}
            <div className="seyol-footer-social">
              <h4>Follow Our Journey</h4>

              <div className="seyol-social-links">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="SEYOL on Instagram"
                >
                  Instagram
                </a>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="SEYOL on Facebook"
                >
                  Facebook
                </a>

                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="SEYOL on YouTube"
                >
                  YouTube
                </a>

                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="SEYOL on TikTok"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Logo and Brand */}
        <div className="seyol-footer-brand">
          <Link href="/" className="seyol-footer-logo" aria-label="SEYOL Home">
            SEYOL
          </Link>

          <p>
            Supporting mothers. Nurturing families.
          </p>
        </div>

        {/* Bottom Legal Section */}
        <div className="seyol-footer-bottom">
          <div className="seyol-footer-legal">
            {legalLinks.map(([label, url], index) => (
              <React.Fragment key={label}>
                <Link
                  href={url}
                  className={label === "Admin Portal" ? "seyol-footer-admin-link" : ""}
                >
                  {label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="seyol-footer-dot">•</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="seyol-copyright">
            © {new Date().getFullYear()} SEYOL. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export { SeyolFooter };
export default SeyolFooter;
