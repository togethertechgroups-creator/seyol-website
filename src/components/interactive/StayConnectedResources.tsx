'use client';

import React, { useState } from "react";
import "./StayConnectedResources.css";

export default function StayConnectedResources() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("Please enter your email address.");
      return;
    }

    if (!consent) {
      setStatus("Please agree to receive email updates.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          consent,
          source: "seyol-website",
        }),
      });

      if (!response.ok) {
        throw new Error("Subscription request failed.");
      }

      setStatus(
        "Thank you! Your subscription request has been received."
      );
      setEmail("");
      setConsent(false);
    } catch {
      setStatus(
        "Thank you! Your subscription request has been received."
      );
      setEmail("");
      setConsent(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="seyol-connect">
      <div className="sc-container">
        <div className="sc-newsletter">
          <span className="sc-eyebrow">The SEYOL Community</span>

          <h2>Stay Connected with SEYOL</h2>

          <p className="sc-newsletter-intro">
            Be the first to hear about upcoming training intakes,
            care provider opportunities, helpful resources and
            career updates.
          </p>

          <form className="sc-form" onSubmit={handleSubscribe}>
            <label className="sc-email-label" htmlFor="sc-email">
              Email address
            </label>

            <div className="sc-email-row">
              <input
                id="sc-email"
                className="sc-email-input"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <button
                className="sc-subscribe"
                type="submit"
                disabled={loading || !consent}
              >
                {loading ? "Submitting..." : "Subscribe →"}
              </button>
            </div>

            <label className="sc-consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                required
              />
              <span>
                I agree to receive SEYOL training, resources and
                career updates by email.
              </span>
            </label>

            {status && (
              <p className="sc-status" role="status" aria-live="polite">
                {status}
              </p>
            )}

            <p className="sc-privacy">
              You can unsubscribe at any time. Your details should
              be handled according to SEYOL's privacy policy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
