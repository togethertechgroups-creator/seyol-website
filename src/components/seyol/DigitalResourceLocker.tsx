'use client';

import React from 'react';
import { BookOpen, Download, Video, CheckCircle2, Lock } from 'lucide-react';
import { resourcesData } from '../../data/resources';
import { useAuth } from '../../context/AuthContext';

export const DigitalResourceLocker: React.FC = () => {
  const { user } = useAuth();
  const purchased = resourcesData.filter((r) => user?.purchasedResourceIds.includes(r.id) || r.price === 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Unlocked Materials</span>
          <h4 className="font-serif font-bold text-lg text-brown">Digital Library & Workbooks</h4>
        </div>
        <span className="text-xs text-brown-muted font-bold">{purchased.length} Items Accessible</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {purchased.map((res) => (
          <div
            key={res.id}
            className="bg-cream p-4 rounded-2xl border border-cream-border flex items-start justify-between space-x-3 shadow-warm-sm"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-maroon">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{res.type.replace('-', ' ').toUpperCase()}</span>
              </div>
              <h5 className="font-serif font-bold text-sm text-brown">{res.title}</h5>
              <p className="text-xs text-brown-muted line-clamp-2">{res.description}</p>
            </div>

            <a
              href={res.downloadUrl || '#'}
              download
              className="px-3.5 py-2 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs shrink-0 flex items-center space-x-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-gold-light" />
              <span>Get</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
