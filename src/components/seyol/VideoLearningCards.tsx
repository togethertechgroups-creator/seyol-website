'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Clock, Award, Lock, CheckCircle2 } from 'lucide-react';
import { GatedVideo } from '../../types';

export interface VideoLearningCardProps {
  video: GatedVideo;
  isUnlocked?: boolean;
  onWatch?: (video: GatedVideo) => void;
}

export const VideoLearningCards: React.FC<VideoLearningCardProps> = ({
  video,
  isUnlocked = false,
  onWatch,
}) => {
  return (
    <div className="bg-cream-light rounded-2xl border border-cream-border overflow-hidden shadow-warm-sm hover:border-gold/60 transition-all flex flex-col justify-between group">
      <div className="relative aspect-video w-full overflow-hidden bg-maroon-dark">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/80 via-transparent to-transparent" />

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 bg-maroon-dark/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-gold-light flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{video.duration}</span>
        </div>

        {/* Lock/Play Icon Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gold/90 text-maroon-dark flex items-center justify-center shadow-warm-md group-hover:scale-110 transition-transform">
            {isUnlocked ? <Play className="w-5 h-5 fill-maroon-dark ml-0.5" /> : <Lock className="w-5 h-5" />}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">
            {video.category}
          </span>
          <h4 className="font-serif font-bold text-sm text-brown line-clamp-2 leading-snug group-hover:text-maroon transition-colors">
            {video.title}
          </h4>
          <p className="text-xs text-brown-muted line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        </div>

        <div className="pt-3 border-t border-cream-border flex items-center justify-between">
          <span className="text-[11px] font-semibold text-brown">
            Instructor: {video.instructor}
          </span>

          <button
            onClick={() => onWatch?.(video)}
            className="px-3.5 py-1.5 rounded-lg bg-maroon hover:bg-maroon-dark text-cream-light text-xs font-bold transition-colors"
          >
            {isUnlocked ? 'Watch Lesson' : 'Unlock Video'}
          </button>
        </div>
      </div>
    </div>
  );
};
