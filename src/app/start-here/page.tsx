'use client';

import React, { useEffect } from 'react';
import HomePage from '../page';

export default function StartHerePage() {
  useEffect(() => {
    // When visiting /start-here, smoothly bring the journey stages into view
    const target = document.getElementById('where-are-you') || document.getElementById('care-path');
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, []);

  return <HomePage />;
}
