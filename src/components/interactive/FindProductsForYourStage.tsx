'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './FindProductsForYourStage.css';

interface StageItem {
  id: string;
  number?: string;
  title: string;
  subtitle: string;
  image: string;
  objectPosition?: string;
  products: string[];
  categoryTarget?: string;
}

const stages: StageItem[] = [
  {
    id: 'pregnancy',
    title: 'Pregnancy',
    subtitle: 'Nurture yourself through every change.',
    image: '/assets4/stage-pregnancy.jpg',
    objectPosition: 'center 20%',
    products: ['Body Care', 'Comfort Essentials', 'Daily Care'],
    categoryTarget: 'mother-postpartum',
  },
  {
    id: 'postpartum',
    title: 'Postpartum',
    subtitle: 'Gentle care for your recovery journey.',
    image: '/assets4/stage-postpartum.jpg',
    objectPosition: 'center 35%',
    products: ['Recovery Care', 'Body Care', 'Self-Care'],
    categoryTarget: 'mother-postpartum',
  },
  {
    id: 'baby',
    title: 'Baby Care',
    subtitle: 'Thoughtful essentials for little ones.',
    image: '/assets4/stage-baby-care.png',
    objectPosition: 'center 40%',
    products: ['Bath Essentials', 'Skin Care', 'Daily Essentials'],
    categoryTarget: 'baby-massage',
  },
  {
    id: 'everyday',
    title: 'Everyday Wellness',
    subtitle: 'Make a little room for yourself.',
    image: '/assets4/stage-wellness.jpg',
    objectPosition: 'center 40%',
    products: ['Body Rituals', 'Wellness Essentials', 'Self-Care'],
    categoryTarget: 'bath-wellness',
  },
];

interface FindProductsForYourStageProps {
  onSelectCategory?: (category: string) => void;
}

export default function FindProductsForYourStage({ onSelectCategory }: FindProductsForYourStageProps) {
  const [activeStage, setActiveStage] = useState('all');

  const visibleStages =
    activeStage === 'all'
      ? stages
      : stages.filter((stage) => stage.id === activeStage);

  const handleStageExplore = (stage: StageItem) => {
    if (onSelectCategory && stage.categoryTarget) {
      onSelectCategory(stage.categoryTarget);
      const catalogEl = document.getElementById('products-catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    const catalogEl = document.getElementById('products-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/products?stage=${stage.id}`;
    }
  };

  return (
    <section className="stage-section" aria-label="Find Products for Your Stage">
      <div className="stage-container">
        <div className="stage-heading">
          <span className="stage-eyebrow">CARE THAT GROWS WITH YOU</span>

          <h2>
            Find Products
            <br />
            <em>for Your Stage</em>
          </h2>

          <p>
            Every journey is different. Find thoughtful essentials
            for the stage of life you are in right now.
          </p>
        </div>

        <div className="stage-filters" aria-label="Filter by life stage">
          <button
            type="button"
            className={activeStage === 'all' ? 'active' : ''}
            onClick={() => setActiveStage('all')}
          >
            All Stages
          </button>

          {stages.map((stage) => (
            <button
              type="button"
              key={stage.id}
              className={activeStage === stage.id ? 'active' : ''}
              onClick={() => setActiveStage(stage.id)}
            >
              {stage.title}
            </button>
          ))}
        </div>

        <div className="stage-grid">
          {visibleStages.map((stage) => (
            <article className="stage-card" key={stage.id}>
              <div className="stage-image-wrap">
                <img
                  src={stage.image}
                  alt={`${stage.title} care`}
                  loading="lazy"
                  style={{ objectPosition: stage.objectPosition || 'center' }}
                />
              </div>

              <div className="stage-card-content">
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.subtitle}</p>
                </div>

                <div className="stage-tags">
                  {stage.products.map((product) => (
                    <span key={product}>{product}</span>
                  ))}
                </div>

                <button
                  type="button"
                  className="stage-link"
                  onClick={() => handleStageExplore(stage)}
                  aria-label={`Explore products for ${stage.title}`}
                >
                  Explore Products <span>↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="stage-footer">
          <span>Not sure where to begin?</span>
          <Link href="/contact">Let us help you find your routine ↗</Link>
        </div>
      </div>
    </section>
  );
}
export { FindProductsForYourStage };
