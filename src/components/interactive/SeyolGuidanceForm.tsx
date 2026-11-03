'use client';

import React, { useState } from "react";
import "./SeyolGuidanceForm.css";

const SeyolGuidanceForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    helpTopic: "",
    message: "",
    consent: false,
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/guidance/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Unable to submit your enquiry.");
      }

      setStatus("success");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        helpTopic: "",
        message: "",
        consent: false,
      });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="seyol-guidance" id="guidance-form">
      <div className="seyol-guidance-container">

        {/* Centre Aligned Heading */}
        <div className="seyol-guidance-heading">
          <span className="seyol-eyebrow">
            WE ARE HERE TO HELP
          </span>

          <h2>
            Need Guidance?
            <span> SEYOL Will Guide You.</span>
          </h2>

          <p>
            Have questions or need help choosing the right support?
            Send us an enquiry and our team will guide you.
          </p>
        </div>

        {/* Contact Form Only */}
        <form
          className="seyol-guidance-form"
          onSubmit={handleSubmit}
        >
          <div className="seyol-form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="seyol-form-row">
            <div className="seyol-form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="seyol-form-group">
              <label htmlFor="phone">Contact Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="seyol-form-group">
            <label htmlFor="helpTopic">
              What do you need help with? *
            </label>

            <select
              id="helpTopic"
              name="helpTopic"
              value={form.helpTopic}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="Choosing the right service">
                Choosing the right service
              </option>
              <option value="Pregnancy Care">Pregnancy Care</option>
              <option value="Newborn Baby Care">Newborn Baby Care</option>
              <option value="Infant Massage and Bath">
                Infant Massage &amp; Bath
              </option>
              <option value="Classes and Workshops">
                Classes &amp; Workshops
              </option>
              <option value="SEY Products">SEY Products</option>
              <option value="Training and Careers">
                Training &amp; Careers
              </option>
              <option value="Other Enquiries">Other Enquiries</option>
            </select>
          </div>

          <div className="seyol-form-group">
            <label htmlFor="message">Your Message *</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us how we can help you..."
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="seyol-consent">
            <input
              id="consent"
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              required
            />
            <label htmlFor="consent">
              I agree to the SEYOL Privacy Policy and consent
              to being contacted about my enquiry.
            </label>
          </div>

          {status === "success" && (
            <p className="seyol-form-success" role="status">
              Thank you! Your enquiry has been submitted.
            </p>
          )}

          {status === "error" && (
            <p className="seyol-form-error" role="alert">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            className="seyol-submit-btn"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
            {!loading && <span>→</span>}
          </button>

          <p className="seyol-form-note">
            Your information will be handled securely in accordance
            with our Privacy Policy.
          </p>
        </form>

      </div>
    </section>
  );
};

export default SeyolGuidanceForm;

