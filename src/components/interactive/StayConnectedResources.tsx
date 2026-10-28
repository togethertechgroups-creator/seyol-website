'use client';

import React, { useState } from "react";

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
      <style>{`
        .seyol-connect {
          --sc-maroon: #651F32;
          --sc-cream: #FAF5ED;
          --sc-ink: #382B2E;
          --sc-muted: #76696B;
          --sc-border: #E8DCD3;
          padding: 78px 0;
          background: var(--sc-cream);
          color: var(--sc-ink);
          font-family: Inter, Arial, sans-serif;
        }

        .seyol-connect * {
          box-sizing: border-box;
        }

        .sc-container {
          width: min(1120px, calc(100% - 40px));
          margin: 0 auto;
        }

        .sc-newsletter {
          position: relative;
          overflow: hidden;
          padding: 58px 30px;
          border-radius: 10px;
          background: var(--sc-maroon);
          color: var(--sc-cream);
          text-align: center;
        }

        .sc-eyebrow {
          color: #D9B4A2;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .sc-newsletter h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 500;
          line-height: 1.2;
          max-width: 700px;
          margin: 14px auto;
          color: var(--sc-cream);
          font-size: clamp(32px, 4vw, 46px);
        }

        .sc-newsletter-intro {
          max-width: 650px;
          margin: 0 auto;
          color: #EAD9DC;
          font-size: 14px;
          line-height: 1.9;
        }

        .sc-form {
          width: min(510px, 100%);
          margin: 28px auto 0;
          text-align: left;
        }

        .sc-email-label {
          display: block;
          margin-bottom: 9px;
          color: var(--sc-cream);
          font-size: 13px;
          font-weight: 600;
        }

        .sc-email-row {
          display: flex;
          gap: 10px;
        }

        .sc-email-input {
          min-width: 0;
          flex: 1;
          min-height: 50px;
          padding: 0 15px;
          border: 1px solid #D9C4C5;
          border-radius: 4px;
          outline: none;
          background: #FFFCF8;
          color: var(--sc-ink);
          font: inherit;
          font-size: 14px;
        }

        .sc-email-input:focus {
          outline: 2px solid #D9B4A2;
          outline-offset: 2px;
        }

        .sc-subscribe {
          min-height: 50px;
          padding: 0 19px;
          border: 1px solid var(--sc-cream);
          border-radius: 4px;
          background: var(--sc-cream);
          color: var(--sc-maroon);
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
        }

        .sc-subscribe:disabled {
          cursor: not-allowed;
          opacity: .65;
        }

        .sc-consent {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 17px;
          color: #EAD9DC;
          font-size: 12px;
          line-height: 1.7;
        }

        .sc-consent input {
          flex: 0 0 auto;
          margin-top: 4px;
          accent-color: #D9B4A2;
        }

        .sc-privacy {
          margin: 16px 0 0;
          color: #D9C4C5;
          font-size: 11px;
          line-height: 1.7;
          text-align: center;
        }

        .sc-status {
          margin: 15px 0 0;
          color: #FFF1D8;
          font-size: 13px;
          line-height: 1.7;
        }

        @media (max-width: 600px) {
          .seyol-connect {
            padding: 48px 0;
          }

          .sc-container {
            width: calc(100% - 32px);
          }

          .sc-newsletter {
            padding: 40px 20px;
          }

          .sc-email-row {
            flex-direction: column;
          }

          .sc-subscribe {
            width: 100%;
          }
        }
      `}</style>

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
