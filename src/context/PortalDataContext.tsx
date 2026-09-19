'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClientPortalProfile, CareAppointment, CareInvoice } from '../types';
import { mockClientPortals } from '../data/portalData';

const PORTAL_DATA_KEY = 'seyol_portal_client_data_v1';
const CREDENTIALS_KEY = 'seyol_portal_credentials_v1';

export interface CustomerCredentials {
  username: string;
  password: string;
  clientId: string;
  customerName: string;
}

const DEFAULT_CREDENTIALS: Record<string, CustomerCredentials> = {
  'usr_seyol_8819': {
    username: 'ananya@seyol',
    password: 'seyol123',
    clientId: 'usr_seyol_8819',
    customerName: 'Ananya Ramachandran',
  },
  'usr_seyol_9921': {
    username: 'priya@seyol',
    password: 'seyol123',
    clientId: 'usr_seyol_9921',
    customerName: 'Priya Sharma',
  },
};

interface PortalDataContextType {
  allClientData: Record<string, ClientPortalProfile>;
  customerCredentials: Record<string, CustomerCredentials>;
  addCustomer: (customer: ClientPortalProfile, credentials: { username: string; password: string }) => void;
  deleteCustomer: (clientId: string) => void;
  updateCustomerCredentials: (clientId: string, username: string, password: string) => void;
  updateClientData: (clientId: string, updates: Partial<ClientPortalProfile>) => void;
  updateAppointment: (clientId: string, updates: Partial<CareAppointment>) => void;
  updateActivePackage: (clientId: string, updates: Partial<ClientPortalProfile['activePackage']>) => void;
  addInvoice: (clientId: string, invoice: CareInvoice) => void;
  updateInvoice: (clientId: string, invoiceId: string, updates: Partial<CareInvoice>) => void;
  updateNextStep: (clientId: string, updates: Partial<ClientPortalProfile['nextStepFromSeyol']>) => void;
  updateLatestSessionNote: (clientId: string, notes: string, recommendation: string) => void;
  sendMessageToClient: (clientId: string, message: { title: string; body: string; categoryTag: string; type: string }) => void;
  resetClientToDefault: (clientId: string) => void;
  isHydrated: boolean;
}

const PortalDataContext = createContext<PortalDataContextType | undefined>(undefined);

export const PortalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allClientData, setAllClientData] = useState<Record<string, ClientPortalProfile>>({ ...mockClientPortals });
  const [customerCredentials, setCustomerCredentials] = useState<Record<string, CustomerCredentials>>(DEFAULT_CREDENTIALS);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(PORTAL_DATA_KEY);
      if (savedData) {
        setAllClientData(JSON.parse(savedData));
      }

      const savedCreds = localStorage.getItem(CREDENTIALS_KEY);
      if (savedCreds) {
        setCustomerCredentials(JSON.parse(savedCreds));
      }
    } catch (e) {
      console.warn('PortalDataContext: could not load from storage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const persistData = (data: Record<string, ClientPortalProfile>) => {
    setAllClientData(data);
    try {
      localStorage.setItem(PORTAL_DATA_KEY, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  const persistCreds = (creds: Record<string, CustomerCredentials>) => {
    setCustomerCredentials(creds);
    try {
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
    } catch (e) {
      console.error(e);
    }
  };

  const addCustomer = (customer: ClientPortalProfile, credentials: { username: string; password: string }) => {
    const updatedData = {
      ...allClientData,
      [customer.clientId]: customer,
    };
    persistData(updatedData);

    const updatedCreds: Record<string, CustomerCredentials> = {
      ...customerCredentials,
      [customer.clientId]: {
        clientId: customer.clientId,
        username: credentials.username.trim(),
        password: credentials.password.trim(),
        customerName: customer.clientName,
      },
    };
    persistCreds(updatedCreds);
  };

  const deleteCustomer = (clientId: string) => {
    const nextData = { ...allClientData };
    delete nextData[clientId];
    persistData(nextData);

    const nextCreds = { ...customerCredentials };
    delete nextCreds[clientId];
    persistCreds(nextCreds);
  };

  const updateCustomerCredentials = (clientId: string, username: string, password: string) => {
    const existing = customerCredentials[clientId] || {
      clientId,
      customerName: allClientData[clientId]?.clientName || 'Client',
      username,
      password,
    };
    const updatedCreds = {
      ...customerCredentials,
      [clientId]: {
        ...existing,
        username: username.trim(),
        password: password.trim(),
      },
    };
    persistCreds(updatedCreds);
  };

  const updateClientData = (clientId: string, updates: Partial<ClientPortalProfile>) =>
    persistData({ ...allClientData, [clientId]: { ...allClientData[clientId], ...updates } });

  const updateAppointment = (clientId: string, updates: Partial<CareAppointment>) => {
    const ex = allClientData[clientId];
    if (!ex) return;
    persistData({
      ...allClientData,
      [clientId]: { ...ex, upcomingAppointment: { ...ex.upcomingAppointment, ...updates } },
    });
  };

  const updateActivePackage = (clientId: string, updates: Partial<ClientPortalProfile['activePackage']>) => {
    const ex = allClientData[clientId];
    if (!ex) return;
    persistData({
      ...allClientData,
      [clientId]: { ...ex, activePackage: { ...ex.activePackage, ...updates } },
    });
  };

  const addInvoice = (clientId: string, invoice: CareInvoice) => {
    const ex = allClientData[clientId];
    if (!ex) return;
    persistData({
      ...allClientData,
      [clientId]: { ...ex, invoices: [invoice, ...ex.invoices] },
    });
  };

  const updateInvoice = (clientId: string, invoiceId: string, updates: Partial<CareInvoice>) => {
    const ex = allClientData[clientId];
    if (!ex) return;
    persistData({
      ...allClientData,
      [clientId]: {
        ...ex,
        invoices: ex.invoices.map((inv) => (inv.id === invoiceId ? { ...inv, ...updates } : inv)),
      },
    });
  };

  const updateNextStep = (clientId: string, updates: Partial<ClientPortalProfile['nextStepFromSeyol']>) => {
    const ex = allClientData[clientId];
    if (!ex) return;
    persistData({
      ...allClientData,
      [clientId]: { ...ex, nextStepFromSeyol: { ...ex.nextStepFromSeyol, ...updates } },
    });
  };

  const updateLatestSessionNote = (clientId: string, notes: string, recommendation: string) => {
    const ex = allClientData[clientId];
    if (!ex) return;
    persistData({
      ...allClientData,
      [clientId]: {
        ...ex,
        latestSessionUpdate: {
          ...ex.latestSessionUpdate,
          notes,
          recommendation,
          date: new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
        },
      },
    });
  };

  const sendMessageToClient = (
    clientId: string,
    message: { title: string; body: string; categoryTag: string; type: string }
  ) => {
    const ex = allClientData[clientId];
    if (!ex) return;
    const newMsg = {
      id: `msg-admin-${Date.now()}`,
      type: message.type as any,
      categoryTag: message.categoryTag,
      title: message.title,
      body: message.body,
      timestamp: new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
      isRead: false,
      actionLabel: undefined,
      actionUrl: undefined,
    };
    persistData({ ...allClientData, [clientId]: { ...ex, messages: [newMsg, ...ex.messages] } });
  };

  const resetClientToDefault = (clientId: string) => {
    if (mockClientPortals[clientId]) {
      persistData({ ...allClientData, [clientId]: { ...mockClientPortals[clientId] } });
    }
  };

  return (
    <PortalDataContext.Provider
      value={{
        allClientData,
        customerCredentials,
        addCustomer,
        deleteCustomer,
        updateCustomerCredentials,
        updateClientData,
        updateAppointment,
        updateActivePackage,
        addInvoice,
        updateInvoice,
        updateNextStep,
        updateLatestSessionNote,
        sendMessageToClient,
        resetClientToDefault,
        isHydrated,
      }}
    >
      {children}
    </PortalDataContext.Provider>
  );
};

export const usePortalData = (): PortalDataContextType => {
  const ctx = useContext(PortalDataContext);
  if (!ctx) throw new Error('usePortalData must be used within PortalDataProvider');
  return ctx;
};
