'use client';

import React, { useState } from "react";
import "./YourFirstSeyolResource.css";

interface ResourceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
}

const resources: ResourceItem[] = [
  {
    id: "newborn",
    number: "01",
    title: "Newborn Care Checklist",
    description: "A simple guide to help you feel more confident during your baby's first days.",
    tag: "For New Parents",
  },
  {
    id: "pregnancy",
    number: "02",
    title: "Pregnancy Preparation Guide",
    description: "Prepare for your baby's arrival with a practical checklist and helpful guidance.",
    tag: "For Expecting Mothers",
  },
  {
    id: "parent",
    number: "03",
    title: "New Parent Starter Guide",
    description: "Helpful everyday tips to make your early parenting journey easier.",
    tag: "For Growing Families",
  },
];

export function YourFirstSeyolResource() {
  const [selectedResource, setSelectedResource] = useState<string>("newborn");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [consent, setConsent] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "consent-error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consent) {
      setStatus("consent-error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/free-resource-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          resource: selectedResource,
          consent,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit your request.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setConsent(false);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="seyol-resource-section" id="free-resources">
      <div className="seyol-resource-container">

        <div className="seyol-resource-heading">
          <span className="seyol-resource-eyebrow">
            A LITTLE SUPPORT, JUST FOR YOU
          </span>

          <h2>
            Your First <span>SEYOL</span> Resource
          </h2>

          <p>
            Thoughtful resources to guide you through pregnancy,
            newborn care and your parenting journey.
          </p>
        </div>

        <div className="seyol-resource-layout">

          {/* Resource selection */}
          <div className="seyol-resource-left">
            <h3>Choose what would help you most</h3>

            <div className="seyol-resource-options">
              {resources.map((resource) => (
                <button
                  type="button"
                  key={resource.id}
                  className={`seyol-resource-option ${
                    selectedResource === resource.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedResource(resource.id)}
                >
                  <span className="resource-number">
                    {resource.number}
                  </span>

                  <span className="resource-option-content">
                    <small>{resource.tag}</small>
                    <strong>{resource.title}</strong>
                    <span>{resource.description}</span>
                  </span>

                  <span className="resource-radio">
                    {selectedResource === resource.id ? "✓" : ""}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Signup form */}
          <div className="seyol-resource-form-card">
            <div className="resource-form-icon">✦</div>

            <span className="resource-form-label">
              YOUR FREE RESOURCE
            </span>

            <h3>A little guidance goes a long way.</h3>

            <p>
              Enter your details and we&apos;ll send your selected
              resource to your inbox.
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="seyol-name">Your Name</label>
              <input
                id="seyol-name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label htmlFor="seyol-email">Email Address</label>
              <input
                id="seyol-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="seyol-consent">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>
                  I agree to receive my selected resource and
                  relevant SEYOL updates.
                </span>
              </label>

              {status === "consent-error" && (
                <p className="seyol-form-error">
                  Please agree before submitting.
                </p>
              )}

              {status === "error" && (
                <p className="seyol-form-error">
                  Something went wrong. Please try again.
                </p>
              )}

              {status === "success" && (
                <p className="seyol-form-success">
                  Thank you! Your request has been submitted.
                </p>
              )}

              <button
                className="seyol-resource-submit"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? "Submitting..."
                  : "Send Me My Free Resource"}
                <span>→</span>
              </button>
            </form>

            <small className="resource-privacy">
              Your details are kept private. No unwanted emails.
            </small>
          </div>
        </div>

        <div className="seyol-resource-bottom">
          <span>SEYOL</span>
          <p>Small steps. Gentle guidance. Support that grows with you.</p>
        </div>

      </div>
    </section>
  );
}

export default YourFirstSeyolResource;

