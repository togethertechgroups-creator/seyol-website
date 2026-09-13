'use client';

import React from 'react';
import { Filter, Check } from 'lucide-react';

export interface ResourceFilterChipsProps {
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  tags?: string[];
}

const DEFAULT_TAGS = [
  'All Resources',
  'Pregnancy Care',
  'Newborn Bathing',
  'Postpartum Confinement',
  'Feeding & Nutrition',
  'Infant Massage',
  'Free Checklists',
  'Masterclass Videos',
];

export const ResourceFilterChips: React.FC<ResourceFilterChipsProps> = ({
  selectedTag,
  onSelectTag,
  tags = DEFAULT_TAGS,
}) => {
  return (
    <div className="w-full flex items-center space-x-2 overflow-x-auto py-2 scrollbar-none">
      <div className="flex items-center space-x-1.5 text-xs font-bold text-maroon shrink-0 pr-2 border-r border-cream-border">
        <Filter className="w-3.5 h-3.5" />
        <span>Filter Topics:</span>
      </div>

      <div className="flex items-center space-x-2">
        {tags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-maroon text-cream-light border-maroon shadow-warm-sm font-bold'
                  : 'bg-cream text-brown border-cream-border hover:bg-cream-dark hover:border-gold'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};
