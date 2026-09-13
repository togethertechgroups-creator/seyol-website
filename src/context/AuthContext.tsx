'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockClientPortals } from '../data/portalData';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  stage: string;
  eddOrBabyAge: string;
  location: string;
  avatar: string;
  purchasedResourceIds: string[];
  enrolledClassIds: string[];
  activeBookingIds: string[];
}

export const PRECONFIGURED_CLIENTS: Record<string, UserProfile> = {
  'usr_seyol_8819': {
    id: 'usr_seyol_8819',
    name: 'Ananya Ramachandran',
    email: 'ananya.r@example.com',
    phone: '+91 98400 12345',
    stage: 'postpartum',
    eddOrBabyAge: 'Baby Aarav (4 Weeks Old)',
    location: 'Nungambakkam, Chennai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    purchasedResourceIds: ['res-postpartum-meal-plan', 'res-infant-massage-guide'],
    enrolledClassIds: ['class-infant-massage', 'class-postpartum-nutrition'],
    activeBookingIds: ['pkg-postpartum-28day'],
  },
  'usr_seyol_9921': {
    id: 'usr_seyol_9921',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+65 9123 4567',
    stage: 'pregnancy',
    eddOrBabyAge: 'EDD: October 14, 2026 (Week 34)',
    location: 'River Valley, Singapore',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    purchasedResourceIds: ['res-birth-preparation-toolkit'],
    enrolledClassIds: ['class-gentle-birth-partner'],
    activeBookingIds: ['pkg-prenatal-massage-6session'],
  }
};

export interface AuthContextState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (emailOrPhone: string, password?: string) => boolean;
  loginAsClient: (clientId: string) => void;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

const AUTH_STORAGE_KEY = 'seyol_client_auth_session_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default to logged in as primary client
  const [user, setUser] = useState<UserProfile | null>(PRECONFIGURED_CLIENTS['usr_seyol_8819']);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Restore saved session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.user) {
          setUser(parsed.user);
          setIsAuthenticated(parsed.isAuthenticated !== false);
        }
      }
    } catch (e) {
      console.error('Error loading saved auth session', e);
    }
  }, []);

  const saveSession = (authed: boolean, usr: UserProfile | null) => {
    setIsAuthenticated(authed);
    setUser(usr);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ isAuthenticated: authed, user: usr }));
    } catch (e) {}
  };

  const login = (emailOrPhone: string, password?: string): boolean => {
    const cleanQuery = emailOrPhone.trim().toLowerCase();
    
    // Check if matches known mock client
    const matchedKey = Object.keys(PRECONFIGURED_CLIENTS).find(
      (k) =>
        PRECONFIGURED_CLIENTS[k].email.toLowerCase() === cleanQuery ||
        PRECONFIGURED_CLIENTS[k].phone.replace(/\D/g, '') === cleanQuery.replace(/\D/g, '') ||
        PRECONFIGURED_CLIENTS[k].name.toLowerCase().includes(cleanQuery)
    );

    if (matchedKey) {
      saveSession(true, PRECONFIGURED_CLIENTS[matchedKey]);
    } else {
      // Create new customer profile
      const newProfile: UserProfile = {
        id: `usr_seyol_${Date.now().toString().slice(-4)}`,
        name: cleanQuery.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Valued Parent',
        email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone.replace(/\D/g, '')}@seyolclient.com`,
        phone: !emailOrPhone.includes('@') ? emailOrPhone : '+91 98400 99887',
        stage: 'postpartum',
        eddOrBabyAge: 'Active SEYOL Care Member',
        location: 'Chennai / Singapore',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
        purchasedResourceIds: ['res-postpartum-meal-plan'],
        enrolledClassIds: ['class-infant-massage'],
        activeBookingIds: ['pkg-postpartum-28day']
      };
      saveSession(true, newProfile);
    }

    setIsAuthModalOpen(false);
    return true;
  };

  const loginAsClient = (clientId: string) => {
    if (PRECONFIGURED_CLIENTS[clientId]) {
      saveSession(true, PRECONFIGURED_CLIENTS[clientId]);
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    saveSession(false, null);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        loginAsClient,
        logout,
        openAuthModal,
        closeAuthModal,
        isAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
