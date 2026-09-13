'use client';

import React, { useState } from 'react';
import { Compass, Flower2, Baby, ShieldCheck, Heart, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useQuickEnquiry } from '../../context/QuickEnquiryContext';

const MAP_NODES = [
  {
    id: 'in-home-bodywork',
    title: 'Daily In-Home Restorative Bodywork',
    setting: 'Home Confinement (Chennai & TN)',
    intensity: 'High (Daily Visits)',
    stage: 'Postpartum & Newborn',
    icon: Flower2,
    description: '10 to 40-day consecutive Dhanwantharam oil massages, hot Kizhi fomentation, uterine involution, and traditional cotton belly binding (Kattu).',
  },
  {
    id: 'stay-in-nanny',
    title: '24/7 Stay-In Confinement Care',
    setting: 'Full-Time Residence Living',
    intensity: 'Continuous (Round-the-Clock)',
    stage: 'Postpartum & Newborn',
    icon: ShieldCheck,
    description: 'Police-verified confinement nannies residing in your home for night feeds, burping, baby baths, and traditional Pathiya Samayal mother nutrition.',
  },
  {
    id: 'masterclasses',
    title: 'Interactive Skill Masterclasses',
    setting: 'Chennai Studio & Live Virtual',
    intensity: 'Skill Workshops (2 to 4 Hrs)',
    stage: 'Pregnancy & Postpartum',
    icon: Compass,
    description: 'Hands-on practical workshops led by Ms Jemma Francis & Ms Janet Francis on infant massage, bath holds, and physiological birth breathing.',
  },
  {
    id: 'botanical-rituals',
    title: 'SEY Botanical Home Rituals',
    setting: 'Self-Administered at Home',
    intensity: 'Daily Family Wellness',
    stage: 'All Stages',
    icon: Sparkles,
    description: 'Cold-pressed virgin baby oils, soap-free Nalangu Maavu herbal bath powders, and colic relief roll-ons formulated for daily home rituals.',
  },
];

export const InteractiveServiceMap: React.FC = () => {
  const [selectedId, setSelectedId] = useState(MAP_NODES[0].id);
  const { openEnquiry } = useQuickEnquiry();

  const activeNode = MAP_NODES.find((n) => n.id === selectedId) || MAP_NODES[0];

  return (
    <div className="w-full bg-cream-light p-6 sm:p-10 rounded-3xl border border-cream-border shadow-warm-lg space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-semibold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-gold-dark" />
          <span>Interactive Care Architecture</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brown">
          Map Your Support Network
        </h3>
        <p className="text-xs sm:text-sm text-brown-muted">
          Select a support pillar to explore its setting, care intensity, and target milestone.
        </p>
      </div>

      {/* Nodes Selector Map Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MAP_NODES.map((node) => {
          const Icon = node.icon;
          const isSelected = node.id === selectedId;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedId(node.id)}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-maroon text-cream-light border-maroon shadow-warm-md scale-[1.02]'
                  : 'bg-cream text-brown border-cream-border hover:bg-cream-dark'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-gold text-maroon-dark' : 'bg-gold/20 text-maroon'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {isSelected && <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light">Active</span>}
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm leading-snug">{node.title}</h4>
                <p className={`text-[11px] mt-1 ${isSelected ? 'text-cream-light/80' : 'text-brown-muted'}`}>
                  {node.setting}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Node Detail Card */}
      <div className="bg-cream p-6 rounded-2xl border border-gold/40 shadow-warm-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-3">
          <div className="flex flex-wrap gap-2 text-[11px] font-bold">
            <span className="px-2.5 py-0.5 rounded-full bg-maroon-soft text-maroon border border-maroon/20">
              Setting: {activeNode.setting}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-maroon-dark border border-gold/40">
              Intensity: {activeNode.intensity}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cream-dark text-brown">
              Milestone: {activeNode.stage}
            </span>
          </div>

          <h4 className="font-serif font-bold text-xl text-maroon">{activeNode.title}</h4>
          <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">{activeNode.description}</p>
        </div>

        <div className="lg:col-span-4 flex justify-end">
          <button
            onClick={() => openEnquiry({ serviceTitle: activeNode.title })}
            className="w-full lg:w-auto px-6 py-3 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shadow-warm-sm transition-all text-center"
          >
            Enquire for {activeNode.title.split(' ')[0]}
          </button>
        </div>
      </div>
    </div>
  );
};
