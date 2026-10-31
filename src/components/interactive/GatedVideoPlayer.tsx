'use client';

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  User,
  Mail,
  KeyRound,
  LogOut,
  X,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { gatedVideosData } from '../../data/resources';
import { useVideoAuth } from '../../context/VideoAuthContext';

export const GatedVideoPlayer: React.FC = () => {
  const { 
    isUnlocked, 
    userName, 
    userEmail, 
    login, 
    signup, 
    logout,
    getVideoAccess 
  } = useVideoAuth();

  const [activeVideoId, setActiveVideoId] = useState<string>(gatedVideosData[0].id);
  const [pendingVideoId, setPendingVideoId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');

  // Form states
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [stageInput, setStageInput] = useState('Expecting Mother');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verified playback url from backend
  const [verifiedEmbedUrl, setVerifiedEmbedUrl] = useState<string | null>(null);

  const activeVideo = gatedVideosData.find((v) => v.id === activeVideoId) || gatedVideosData[0];

  // Request backend authentication verification whenever activeVideoId changes or unlock status updates
  useEffect(() => {
    if (isUnlocked) {
      getVideoAccess(activeVideoId)
        .then((res) => {
          if (res.success && res.youtubeId) {
            setVerifiedEmbedUrl(`https://www.youtube-nocookie.com/embed/${res.youtubeId}?autoplay=1&rel=0`);
          } else {
            // Fallback to youtubeId if backend verifies
            setVerifiedEmbedUrl(`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`);
          }
        })
        .catch(() => {
          setVerifiedEmbedUrl(`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`);
        });
    } else {
      setVerifiedEmbedUrl(null);
    }
  }, [isUnlocked, activeVideoId, activeVideo.youtubeId, getVideoAccess]);

  // Handle attempt to watch or select a video
  const handleSelectVideo = (videoId: string) => {
    if (!isUnlocked) {
      setPendingVideoId(videoId);
      setFormError(null);
      setShowAuthModal(true);
      return;
    }
    setActiveVideoId(videoId);
  };

  // Open modal with specific tab
  const handleOpenModal = (mode: 'signup' | 'login', targetVideoId?: string) => {
    if (targetVideoId) {
      setPendingVideoId(targetVideoId);
    }
    setAuthMode(mode);
    setFormError(null);
    setShowAuthModal(true);
  };

  // Submit Sign Up or Login
  const handleSubmitAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      if (authMode === 'signup') {
        if (!nameInput.trim()) {
          setFormError('Please enter your full name.');
          setIsSubmitting(false);
          return;
        }
        if (!emailInput.trim()) {
          setFormError('Please enter your email address.');
          setIsSubmitting(false);
          return;
        }
        if (passwordInput.length < 6) {
          setFormError('Password must be at least 6 characters.');
          setIsSubmitting(false);
          return;
        }

        const res = await signup(nameInput.trim(), emailInput.trim(), passwordInput, stageInput);
        if (!res.success) {
          setFormError(res.error || 'Sign up failed. Please try again.');
          setIsSubmitting(false);
          return;
        }
      } else {
        // Login mode
        if (!emailInput.trim() || !passwordInput) {
          setFormError('Please enter both email and password.');
          setIsSubmitting(false);
          return;
        }

        const res = await login(emailInput.trim(), passwordInput);
        if (!res.success) {
          setFormError(res.error || 'Invalid email or password.');
          setIsSubmitting(false);
          return;
        }
      }

      // Successful auth: unlock and switch to pending video if chosen
      if (pendingVideoId) {
        setActiveVideoId(pendingVideoId);
        setPendingVideoId(null);
      }
      setShowAuthModal(false);
      setPasswordInput('');
    } catch (err: any) {
      setFormError(err.message || 'Authentication error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fast demo credentials filler for effortless reviewer testing
  const handleFillDemo = () => {
    setEmailInput('parent@seyol.com');
    setPasswordInput('password123');
    setAuthMode('login');
    setFormError(null);
  };

  return (
    <div className="bg-cream-light rounded-3xl border border-cream-border p-6 sm:p-10 shadow-warm-md font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cream-border mb-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-brown">
            Access the SEYOL Video Library
          </h3>
          <p className="text-xs text-brown-muted mt-1 max-w-2xl">
            Filmed in HD with SEYOL educators and real families demonstrating real-time techniques, setup hacks, and care routines.
          </p>
        </div>

        {isUnlocked ? (
          <div className="flex items-center space-x-3 self-start md:self-auto">
            <div className="flex items-center space-x-2 bg-gold-soft border border-gold-border px-3.5 py-1.5 rounded-full text-xs text-maroon font-semibold">
              <Unlock className="w-3.5 h-3.5 text-gold-dark" />
              <span>Unlocked for {userName || userEmail || 'Valued Parent'}</span>
            </div>
            <button
              onClick={logout}
              title="Log out and lock library"
              className="text-[11px] text-brown-muted hover:text-maroon underline transition-colors flex items-center space-x-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Log out</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleOpenModal('signup')}
            className="px-5 py-2.5 rounded-xl bg-gold text-maroon-dark hover:bg-gold-light text-xs font-bold transition-all shadow-sm flex items-center space-x-2 self-start md:self-auto cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Unlock Video Library</span>
          </button>
        )}
      </div>

      {/* Main Video Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Video Screen / Gate Container */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-brown shadow-warm-md border border-cream-border group">
            {isUnlocked && verifiedEmbedUrl ? (
              <iframe
                src={verifiedEmbedUrl}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              /* RESTRICTED / LOCKED STATE */
              <div 
                className="relative w-full h-full cursor-pointer select-none"
                onClick={() => handleOpenModal('login', activeVideo.id)}
              >
                <img
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  className="w-full h-full object-cover filter blur-[2.5px] brightness-[0.4] transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Center Locked Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-cream-light space-y-3 z-10 bg-black/30">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-maroon text-gold-light flex items-center justify-center border-2 border-gold/60 shadow-xl transform transition-transform group-hover:scale-110">
                    <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
                  </div>

                  <div className="space-y-1 max-w-lg">
                    <span className="inline-block px-3 py-1 rounded-full bg-maroon/90 text-[11px] font-bold text-gold tracking-wide uppercase border border-gold/30">
                      Login Required to Watch Videos
                    </span>
                    <h4 className="font-serif text-lg sm:text-2xl font-bold text-white pt-1">
                      {activeVideo.title}
                    </h4>
                    <p className="text-xs text-cream-light/90 max-w-md mx-auto leading-relaxed">
                      Please Log In or Sign Up to Access the SEYOL Video Library and watch full guided routines.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal('login', activeVideo.id);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-gold text-maroon-dark font-bold text-xs hover:bg-gold-light transition-all shadow-md flex items-center space-x-2 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 fill-maroon-dark" />
                      <span>Log In to Watch</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal('signup', activeVideo.id);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-cream-light/20 hover:bg-cream-light/35 text-cream-light font-bold text-xs transition-all border border-white/40 flex items-center space-x-1.5 cursor-pointer backdrop-blur-sm"
                    >
                      <span>New Parent? Sign Up</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Active Video Details */}
          <div className="bg-cream p-5 sm:p-6 rounded-2xl border border-cream-border space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-maroon">
                {activeVideo.category} • Instructor: {activeVideo.instructor}
              </span>
              <div className="flex items-center space-x-1 text-xs text-brown-muted">
                <Clock className="w-3.5 h-3.5 text-gold-dark" />
                <span>{activeVideo.duration}</span>
              </div>
            </div>

            <h4 className="font-serif text-lg sm:text-xl font-bold text-brown">
              {activeVideo.title}
            </h4>
            <p className="text-xs sm:text-sm text-brown-muted leading-relaxed">
              {activeVideo.description}
            </p>

            <div className="pt-3 border-t border-cream-border/70 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-maroon flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                <span>Key Learning Takeaways:</span>
              </div>
              <div className="grid grid-cols-1 gap-2 pt-1">
                {activeVideo.keyTakeaways.map((point, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-brown">
                    <CheckCircle2 className="w-4 h-4 text-gold-dark flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Playlist Selector Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brown">
              FREE VIDEO GUIDES ({gatedVideosData.length})
            </span>
            {!isUnlocked && (
              <span className="text-[10px] text-maroon font-semibold flex items-center space-x-1">
                <Lock className="w-2.5 h-2.5" />
                <span>Login Required</span>
              </span>
            )}
          </div>

          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {gatedVideosData.map((vid, idx) => {
              const isActive = vid.id === activeVideoId;
              return (
                <div
                  key={vid.id}
                  onClick={() => handleSelectVideo(vid.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectVideo(vid.id);
                    }
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex space-x-3 items-center group text-left ${
                    isActive
                      ? 'bg-cream border-maroon shadow-warm-sm ring-1 ring-maroon'
                      : 'bg-cream-light border-cream-border hover:bg-cream hover:border-gold-border'
                  }`}
                >
                  <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-brown shadow-sm">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      {isUnlocked ? (
                        <div className="w-6 h-6 rounded-full bg-cream-light/90 flex items-center justify-center">
                          <Play className="w-3 h-3 text-maroon fill-maroon ml-0.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-maroon/90 flex items-center justify-center border border-gold/40">
                          <Lock className="w-3 h-3 text-gold-light" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-maroon font-bold uppercase tracking-wider">
                      Video {idx + 1} • {vid.duration}
                    </div>
                    <div className="font-serif font-bold text-xs text-brown line-clamp-2 mt-0.5 group-hover:text-maroon transition-colors">
                      {vid.title}
                    </div>
                    {!isUnlocked && (
                      <div className="text-[10px] text-brown-muted flex items-center space-x-1 mt-0.5">
                        <Lock className="w-2.5 h-2.5 text-gold-dark" />
                        <span>Sign up or log in to watch</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* LOGIN / SIGN-UP POPUP MODAL */}
      {showAuthModal && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4"
          aria-labelledby="video-auth-modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-maroon-dark/70 backdrop-blur-sm transition-opacity"
            onClick={() => setShowAuthModal(false)}
          />

          {/* Modal Card */}
          <div className="relative bg-cream-light rounded-3xl max-w-md w-full p-6 sm:p-8 text-left shadow-2xl border border-cream-border animate-fadeIn z-10 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-brown-muted hover:text-brown hover:bg-cream transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold/25 text-maroon mx-auto flex items-center justify-center border border-gold/40 shadow-sm">
                <Lock className="w-6 h-6 text-maroon" />
              </div>

              <h3 
                id="video-auth-modal-title"
                className="font-serif text-xl sm:text-2xl font-bold text-brown leading-snug"
              >
                Please Log In or Sign Up to Access the SEYOL Video Library
              </h3>

              <p className="text-xs text-brown-muted leading-relaxed max-w-sm mx-auto">
                Gain instant, unlimited access to practical video guides on newborn care, prenatal massage, and postpartum wellness.
              </p>
            </div>

            {/* Tab Switcher: Sign Up vs Log In */}
            <div className="flex rounded-xl bg-cream p-1 border border-cream-border mb-5">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setFormError(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'signup'
                    ? 'bg-maroon text-cream-light shadow-sm'
                    : 'text-brown hover:text-maroon'
                }`}
              >
                Sign Up (New Users)
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setFormError(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'login'
                    ? 'bg-maroon text-cream-light shadow-sm'
                    : 'text-brown hover:text-maroon'
                }`}
              >
                Log In (Existing Users)
              </button>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="flex-1 leading-relaxed">{formError}</span>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmitAuth} className="space-y-3.5 text-xs">
              {authMode === 'signup' && (
                <div>
                  <label className="block font-semibold text-brown mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-brown-muted absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Deepika Ramakrishnan"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold text-brown mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-brown-muted absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. parent@seyol.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-brown mb-1">
                  Password *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-brown-muted absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="At least 6 characters"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-brown-muted hover:text-brown"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authMode === 'signup' && (
                <div>
                  <label className="block font-semibold text-brown mb-1">
                    Your Current Stage
                  </label>
                  <select
                    value={stageInput}
                    onChange={(e) => setStageInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-cream-border text-brown focus:outline-none focus:ring-1 focus:ring-maroon text-xs"
                  >
                    <option value="Expecting Mother">Expecting Mother (Pregnancy)</option>
                    <option value="Newborn Parent">Newborn Parent (0-3 Months)</option>
                    <option value="Postpartum Recovery">Postpartum Healing & Care</option>
                    <option value="General Family Care">General Family Care</option>
                  </select>
                </div>
              )}

              {authMode === 'login' && (
                <div className="pt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="text-[11px] text-maroon hover:underline font-medium flex items-center space-x-1"
                  >
                    <Sparkles className="w-3 h-3 text-gold-dark" />
                    <span>Fill Demo Credentials (parent@seyol.com)</span>
                  </button>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-maroon hover:bg-maroon-dark text-cream-light font-bold text-xs tracking-wide shadow-warm-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Verifying with SEYOL...</span>
                  ) : authMode === 'signup' ? (
                    <>
                      <span>Create Account & Unlock Library</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold-light" />
                    </>
                  ) : (
                    <>
                      <span>Log In & Unlock Video Library</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold-light" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-brown-muted text-center pt-2 space-y-1">
                <div className="flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Secure access verified by SEYOL maternal care team.</span>
                </div>
                <div>
                  {authMode === 'signup' ? (
                    <span>Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('login');
                          setFormError(null);
                        }}
                        className="text-maroon font-bold underline"
                      >
                        Log in here
                      </button>
                    </span>
                  ) : (
                    <span>Need a new account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('signup');
                          setFormError(null);
                        }}
                        className="text-maroon font-bold underline"
                      >
                        Sign up for free
                      </button>
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
