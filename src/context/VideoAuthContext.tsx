'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface VideoUser {
  name: string;
  email: string;
  stage?: string;
}

interface VideoAuthContextType {
  isUnlocked: boolean;
  isLoading: boolean;
  token: string | null;
  user: VideoUser | null;
  userName: string | null;
  userEmail: string | null;
  signup: (name: string, email: string, password: string, stage?: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getVideoAccess: (videoId: string) => Promise<{ success: boolean; youtubeId?: string; embedUrl?: string; error?: string }>;
  unlockLibrary: (name: string, email: string) => void;
  lockLibrary: () => void;
}

const VideoAuthContext = createContext<VideoAuthContextType | undefined>(undefined);

const TOKEN_KEY = 'seyol_video_auth_token';
const USER_KEY = 'seyol_video_user';

export const VideoAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<VideoUser | null>(null);

  // Restore and verify session on initial mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (storedToken) {
          // Verify with backend
          const res = await fetch('/api/video-auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storedToken}`,
            },
            body: JSON.stringify({ action: 'verify', token: storedToken }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.authenticated && data.user) {
              setToken(storedToken);
              setUser(data.user);
              setIsUnlocked(true);
              setIsLoading(false);
              return;
            }
          }
        }

        // If local user exists from legacy or mock without token, or verification failed
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            if (parsed?.email && parsed?.name) {
              setUser(parsed);
              setIsUnlocked(true);
            }
          } catch {
            // ignore JSON parse error
          }
        }
      } catch (err) {
        console.error('Error restoring video auth session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Sign up via backend API
  const signup = useCallback(
    async (name: string, email: string, password: string, stage?: string): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/video-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'signup',
            name,
            email,
            password,
            stage,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setIsLoading(false);
          return { success: false, error: data.error || 'Failed to create account.' };
        }

        const newUser: VideoUser = data.user || { name, email, stage };
        setToken(data.token);
        setUser(newUser);
        setIsUnlocked(true);

        try {
          localStorage.setItem(TOKEN_KEY, data.token);
          localStorage.setItem(USER_KEY, JSON.stringify(newUser));
          localStorage.setItem('seyol_video_email', email);
          localStorage.setItem('seyol_video_name', name);
        } catch (e) {
          console.error('Failed to save auth state to localStorage', e);
        }

        setIsLoading(false);
        return { success: true };
      } catch (err: any) {
        setIsLoading(false);
        return {
          success: false,
          error: err.message || 'Network error occurred while signing up. Please try again.',
        };
      }
    },
    []
  );

  // Log in via backend API
  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/video-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'login',
            email,
            password,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setIsLoading(false);
          return { success: false, error: data.error || 'Invalid email or password.' };
        }

        const authenticatedUser: VideoUser = data.user || { name: 'Valued Parent', email };
        setToken(data.token);
        setUser(authenticatedUser);
        setIsUnlocked(true);

        try {
          localStorage.setItem(TOKEN_KEY, data.token);
          localStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser));
          localStorage.setItem('seyol_video_email', email);
          localStorage.setItem('seyol_video_name', authenticatedUser.name);
        } catch (e) {
          console.error('Failed to save auth state to localStorage', e);
        }

        setIsLoading(false);
        return { success: true };
      } catch (err: any) {
        setIsLoading(false);
        return {
          success: false,
          error: err.message || 'Network error occurred while logging in. Please try again.',
        };
      }
    },
    []
  );

  // Log out and lock video library
  const logout = useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem('seyol_video_email');
      localStorage.removeItem('seyol_video_name');
      // clear session cookie
      document.cookie = 'seyol_video_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    } catch (e) {
      console.error('Failed to clear video auth state', e);
    }
    setToken(null);
    setUser(null);
    setIsUnlocked(false);
  }, []);

  // Request backend authentication check for specific video playback
  const getVideoAccess = useCallback(
    async (videoId: string): Promise<{ success: boolean; youtubeId?: string; embedUrl?: string; error?: string }> => {
      try {
        const activeToken = token || localStorage.getItem(TOKEN_KEY);
        if (!activeToken) {
          setIsUnlocked(false);
          return {
            success: false,
            error: 'Login Required to Watch Videos. Please log in or sign up.',
          };
        }

        const res = await fetch('/api/video-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${activeToken}`,
          },
          body: JSON.stringify({
            action: 'get-video-access',
            videoId,
            token: activeToken,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.authenticated) {
          if (res.status === 401) {
            logout();
          }
          return {
            success: false,
            error: data.error || 'Access to video was restricted.',
          };
        }

        return {
          success: true,
          youtubeId: data.youtubeId,
          embedUrl: data.embedUrl,
        };
      } catch (err: any) {
        return {
          success: false,
          error: err.message || 'Failed to verify backend access for video.',
        };
      }
    },
    [token, logout]
  );

  // Legacy compatibility functions
  const unlockLibrary = useCallback((name: string, email: string) => {
    const legacyUser: VideoUser = { name, email };
    setUser(legacyUser);
    setIsUnlocked(true);
    try {
      localStorage.setItem('seyol_video_email', email);
      localStorage.setItem('seyol_video_name', name);
      localStorage.setItem(USER_KEY, JSON.stringify(legacyUser));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const lockLibrary = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <VideoAuthContext.Provider
      value={{
        isUnlocked,
        isLoading,
        token,
        user,
        userName: user?.name || null,
        userEmail: user?.email || null,
        signup,
        login,
        logout,
        getVideoAccess,
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
