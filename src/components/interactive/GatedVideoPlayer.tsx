'use client';

import React, { useState } from 'react';
import { 
  Play, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Video
} from 'lucide-react';
import { gatedVideosData } from '../../data/resources';
import { useVideoAuth } from '../../context/VideoAuthContext';

export const GatedVideoPlayer: React.FC = () => {
  const { isUnlocked, userName, userEmail, unlockLibrary } = useVideoAuth();
  const [activeVideoId, setActiveVideoId] = useState<string>(gatedVideosData[0].id);
  const [showGateModal, setShowGateModal] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  const activeVideo = gatedVideosData.find((v) => v.id === activeVideoId) || gatedVideosData[0];

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && nameInput.trim()) {
      unlockLibrary(nameInput.trim(), emailInput.trim());
      setShowGateModal(false);
    }
  };

  return (
    <div className="bg-cream-light rounded-3xl border border-cream-border p-6 sm:p-10 shadow-warm-md font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cream-border mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon-soft text-maroon text-xs font-semibold uppercase tracking-wider mb-2">
            <Video className="w-3.5 h-3.5" />
            <span>Curated Video Masterclass Series</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-brown">
            Traditional Infant Massage & Bath Video Library
          </h3>
          <p className="text-xs text-brown-muted mt-1">
            Filmed in 4K with senior SEYOL educators demonstrating real-time stroke techniques and colic relief.
          </p>
        </div>

        {isUnlocked ? (
          <div className="flex items-center space-x-2 bg-gold-soft border border-gold-border px-3.5 py-1.5 rounded-full text-xs text-maroon font-semibold">
            <Unlock className="w-3.5 h-3.5 text-gold-dark" />
            <span>Unlocked for {userName || userEmail}</span>
          </div>
        ) : (
          <button
            onClick={() => setShowGateModal(true)}
            className="px-5 py-2.5 rounded-xl bg-gold text-maroon-dark hover:bg-gold-light text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 self-start md:self-auto"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Unlock Free Video Access</span>
          </button>
        )}
      </div>

      {/* Main Video Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Video Screen / Gate Container */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-brown shadow-warm-md border border-cream-border">
            {isUnlocked ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  className="w-full h-full object-cover filter blur-[2px] brightness-50"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-cream-light space-y-3">
                  <div className="w-14 h-14 rounded-full bg-maroon/90 text-gold-light flex items-center justify-center border border-gold/40 shadow-lg">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold max-w-md">
                    {activeVideo.title}
                  </h4>
                  <p className="text-xs text-cream-light/80 max-w-sm">
                    Enter your name and email once to unlock all 6 HD instructional masterclass modules free of charge.
                  </p>
                  <button
                    onClick={() => setShowGateModal(true)}
                    className="px-6 py-3 rounded-xl bg-gold text-maroon-dark font-bold text-xs hover:bg-gold-light transition-all shadow-md flex items-center space-x-2"
                  >
                    <span>Instant Free Email Unlock</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Active Video Details */}
          <div className="bg-cream p-5 rounded-2xl border border-cream-border space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-maroon">
                {activeVideo.category} • Instructor: {activeVideo.instructor}
              </span>
              <div className="flex items-center space-x-1 text-xs text-brown-muted">
                <Clock className="w-3.5 h-3.5 text-gold-dark" />
                <span>{activeVideo.duration}</span>
              </div>
            </div>

            <h4 className="font-serif text-lg font-bold text-brown">
              {activeVideo.title}
            </h4>
            <p className="text-xs text-brown-muted leading-relaxed">
              {activeVideo.description}
            </p>

            <div className="pt-2 border-t border-cream-border/70 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-maroon">
                Key Learning Takeaways:
              </div>
              {activeVideo.keyTakeaways.map((point, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-brown">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Playlist Selector Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-brown px-1">
            Masterclass Modules ({gatedVideosData.length})
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {gatedVideosData.map((vid, idx) => {
              const isActive = vid.id === activeVideoId;
              return (
                <div
                  key={vid.id}
                  onClick={() => {
                    setActiveVideoId(vid.id);
                    if (!isUnlocked) setShowGateModal(true);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex space-x-3 items-center group ${
                    isActive
                      ? 'bg-cream border-maroon shadow-warm-sm ring-1 ring-maroon'
                      : 'bg-cream-light border-cream-border hover:bg-cream'
                  }`}
                >
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-brown">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      {isUnlocked ? (
                        <Play className="w-4 h-4 text-cream-light fill-cream-light opacity-90" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-gold-light" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-maroon font-bold uppercase">
                      Module {idx + 1} • {vid.duration}
                    </div>
                    <div className="font-serif font-bold text-xs text-brown line-clamp-1 group-hover:text-maroon">
                      {vid.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Unlock Modal Gate */}
      {showGateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
          <div
            className="fixed inset-0 bg-maroon-dark/60 backdrop-blur-sm"
            onClick={() => setShowGateModal(false)}
          />
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative bg-cream-light rounded-3xl max-w-md w-full p-6 sm:p-8 text-left shadow-2xl border border-cream-border animate-fadeIn">
              <div className="text-center space-y-2 mb-6">
                <div className="w-12 h-12 rounded-full bg-gold/20 text-gold-dark mx-auto flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brown">
                  Unlock the Video Masterclass Library
                </h3>
                <p className="text-xs text-brown-muted leading-relaxed">
                  Join 4,500+ parents who master traditional Indian infant bodywork and soothing routines with our free 6-part video curriculum.
                </p>
              </div>

              <form onSubmit={handleUnlock} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-brown mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meera Krishnan"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brown mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. meera@gmail.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs tracking-wide shadow-warm-sm transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Instant Free Video Access</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-light" />
                  </button>
                </div>
                <p className="text-[10px] text-brown-muted text-center pt-1">
                  100% Free. We respect your privacy & never spam.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
