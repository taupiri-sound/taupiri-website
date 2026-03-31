'use client';

import React, { createContext, useContext } from 'react';

interface SiteContextType {
  businessName: string;
}

const SiteContext = createContext<SiteContextType>({ businessName: '' });

export const useSite = (): SiteContextType => useContext(SiteContext);

interface SiteProviderProps {
  children: React.ReactNode;
  businessName: string;
}

export const SiteProvider: React.FC<SiteProviderProps> = ({ children, businessName }) => {
  return (
    <SiteContext.Provider value={{ businessName }}>
      {children}
    </SiteContext.Provider>
  );
};
