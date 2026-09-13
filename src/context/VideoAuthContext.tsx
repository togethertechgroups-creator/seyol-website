'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface VideoAuthContextType {
  isUnlocked: boolean;
  userEmail: string | null;
  userName: string | null;
  unlockLibrary: (name: string, email: string) => void;
  lockLibrary: () => void;
}

const VideoAuthContext = createContext<VideoAuthContextType | undefined>(undefined);

export const VideoAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('seyol_video_email');
      const savedName = localStorage.getItem('seyol_video_name');
      if (savedEmail) {
        setIsUnlocked(true);
        setUserEmail(savedEmail);
        setUserName(savedName || 'Valued Parent');
      }
    } catch (e) {
      console.error('Failed to load video auth state', e);
    }
  }, []);

  const unlockLibrary = (name: string, email: string) => {
    try {
      localStorage.setItem('seyol_video_email', email);
      localStorage.setItem('seyol_video_name', name);
    } catch (e) {
      console.error('Failed to save video auth state', e);
    }
    setUserEmail(email);
    setUserName(name);
    setIsUnlocked(true);
  };

  const lockLibrary = () => {
    try {
      localStorage.removeItem('seyol_video_email');
      localStorage.removeItem('seyol_video_name');
    } catch (e) {
      console.error('Failed to clear video auth state', e);
    }
    setUserEmail(null);
    setUserName(null);
    setIsUnlocked(false);
  };

  return (
    <VideoAuthContext.Provider
      value={{
        isUnlocked,
        userEmail,
        userName,
        unlockLibrary,
        lockLibrary,
      }}
    >
      {children}
    </VideoAuthContext.Provider>
  );
};

export const useVideoAuth = () => {
  const context = useContext(VideoAuthContext);
  if (!context) {
    throw new Error('useVideoAuth must be used within a VideoAuthProvider');
  }
  return context;
};
