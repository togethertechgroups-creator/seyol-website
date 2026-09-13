'use client';

import React from 'react';
import { StageProgressBar } from './StageProgressBar';
import { PersonalisedCareCard } from './PersonalisedCareCard';
import { useVisitorJourney } from '../../context/VisitorJourneyContext';
import { servicesData } from '../../data/services';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const CareJourneyDashboard: React.FC = () => {
  const { stage, recommendedServiceIds } = useVisitorJourney();
  const matchedServices = servicesData.filter((s) => recommendedServiceIds.includes(s.id));

  return (
    <div className="space-y-6">
      <StageProgressBar />
      <PersonalisedCareCard />

      {/* Recommended Action Checklist */}
      <div className="bg-cream p-5 rounded-2xl border border-cream-border space-y-3">
        <div className="font-serif font-bold text-base text-brown">Next Recommended Milestones</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {matchedServices.slice(0, 2).map((s) => (
            <div key={s.id} className="bg-cream-light p-3.5 rounded-xl border border-cream-border flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="font-serif font-bold text-brown">{s.title}</div>
                <div className="text-brown-muted">{s.duration} • {s.format}</div>
              </div>
              <Link href={`/services#${s.slug}`} className="text-maroon font-bold flex items-center space-x-1 hover:underline">
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
