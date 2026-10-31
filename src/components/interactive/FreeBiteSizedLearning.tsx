'use client';

import React, { useState } from "react";
import "./FreeBiteSizedLearning.css";

interface LearningVideo {
  id: number;
  platform: "Instagram" | "TikTok" | "YouTube Shorts" | "Facebook" | string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  url: string;
}

const platforms = [
  "All",
  "Instagram",
  "TikTok",
  "YouTube Shorts",
  "Facebook",
];

const learningVideos: LearningVideo[] = [
  {
    id: 1,
    platform: "Instagram",
    title: "Simple Newborn Care Tips",
    description:
      "Discover simple everyday tips to care for your newborn baby.",
    thumbnail: "/images/seyol-instagram-1.jpg",
    duration: "00:45",
    url: "https://www.instagram.com/",
  },
  {
    id: 2,
    platform: "TikTok",
    title: "Baby Massage Basics",
    description:
      "Explore gentle baby massage techniques and helpful guidance.",
    thumbnail: "/images/seyol-tiktok-1.jpg",
    duration: "00:38",
    url: "https://www.tiktok.com/",
  },
  {
    id: 3,
    platform: "YouTube Shorts",
    title: "Pregnancy Care Essentials",
    description:
      "Quick learning tips for mothers during pregnancy.",
    thumbnail: "/images/seyol-youtube-1.jpg",
    duration: "00:58",
    url: "https://www.youtube.com/",
  },
  {
    id: 4,
    platform: "Facebook",
    title: "Understanding Newborn Needs",
    description:
      "Helpful information for your baby's early days.",
    thumbnail: "/images/seyol-facebook-1.jpg",
    duration: "01:10",
    url: "https://www.facebook.com/",
  },
  {
    id: 5,
    platform: "Instagram",
    title: "Postpartum Self-Care",
    description:
      "Small reminders to support your postpartum routine.",
    thumbnail: "/images/seyol-instagram-2.jpg",
    duration: "00:42",
    url: "https://www.instagram.com/",
  },
  {
    id: 6,
    platform: "YouTube Shorts",
    title: "Preparing for Baby's Arrival",
    description:
      "A quick guide to getting ready for your little one.",
    thumbnail: "/images/seyol-youtube-2.jpg",
    duration: "00:55",
    url: "https://www.youtube.com/",
  },
];

const platformIcons: Record<string, string> = {
  Instagram: "◎",
  TikTok: "♪",
  "YouTube Shorts": "▶",
  Facebook: "f",
};

function LearningCard({ video }: { video: LearningVideo }) {
  return (
    <article className="sey-learning-card">
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="sey-learning-image-link"
        aria-label={`Watch ${video.title} on ${video.platform}`}
      >
        <div className="sey-learning-image">
          <img src={video.thumbnail} alt={video.title} />

          <span className="sey-learning-play" aria-hidden="true">▶</span>

          <span className="sey-learning-duration">
            {video.duration}
          </span>
        </div>
      </a>

      <div className="sey-learning-card-content">
        <div className="sey-learning-platform">
          <span className={`sey-platform-icon ${video.platform.toLowerCase().replace(/\s+/g, "-")}`}>
            {platformIcons[video.platform] || "▶"}
          </span>
          {video.platform}
        </div>

        <h3>{video.title}</h3>

        <p>{video.description}</p>

        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="sey-learning-watch"
        >
          Watch Video <span>↗</span>
        </a>
      </div>
    </article>
  );
}

export default function FreeBiteSizedLearning() {
  const [activePlatform, setActivePlatform] = useState("All");

  const filteredVideos =
    activePlatform === "All"
      ? learningVideos
      : learningVideos.filter(
          (video) => video.platform === activePlatform
        );

  return (
    <section className="sey-learning-section" id="free-bite-sized-learning">
      <div className="sey-learning-container">

        {/* Section Heading */}
        <div className="sey-learning-heading">
          <span className="sey-learning-eyebrow">
            SMALL MOMENTS. HELPFUL KNOWLEDGE.
          </span>

          <h2>
            Free Bite-Sized <span>Learning</span>
          </h2>

          <p>
            Little lessons, helpful tips and everyday guidance
            for your motherhood and parenting journey.
          </p>
        </div>

        {/* Intro Banner */}
        <div className="sey-learning-banner">
          <div className="sey-learning-banner-content">
            <span className="sey-learning-banner-tag">LEARN SOMETHING NEW TODAY</span>

            <h3>
              Learn something helpful,
              <br />
              in just a few minutes.
            </h3>

            <p>
              Explore quick videos and practical tips from
              SEYOL across your favourite social platforms.
            </p>

            <a href="#sey-social-videos" className="sey-learning-banner-btn">
              Explore Free Videos <span>↓</span>
            </a>
          </div>

          <div className="sey-learning-banner-image">
            <img
              src="/images/seyol-learning-banner.jpg"
              alt="Mother learning about baby care"
            />
          </div>
        </div>

        {/* Platform Filters */}
        <div
          className="sey-learning-filter-section"
          id="sey-social-videos"
        >
          <div className="sey-learning-filter-heading">
            <div>
              <span className="sey-learning-eyebrow">
                EXPLORE OUR SOCIAL CHANNELS
              </span>
              <h3>Learn Your Way</h3>
            </div>
          </div>

          <div className="sey-learning-filters">
            {platforms.map((platform) => (
              <button
                type="button"
                key={platform}
                className={
                  activePlatform === platform ? "active" : ""
                }
                onClick={() => setActivePlatform(platform)}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards */}
        <div className="sey-learning-grid">
          {filteredVideos.map((video) => (
            <LearningCard key={video.id} video={video} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="sey-learning-cta">
          <div>
            <span className="sey-learning-cta-eyebrow">STAY CONNECTED WITH SEYOL</span>

            <h3>A little learning goes a long way.</h3>

            <p>
              Follow SEYOL and discover more helpful
              everyday learning content.
            </p>
          </div>

          <div className="sey-learning-social-buttons">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="sey-social-btn sey-social-instagram"
            >
              Instagram ↗
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="sey-social-btn sey-social-youtube"
            >
              YouTube ↗
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

