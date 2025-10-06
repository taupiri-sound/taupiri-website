'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextType {
  enableOpacityFade: boolean;
  setEnableOpacityFade: (enable: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [enableOpacityFade, setEnableOpacityFade] = useState(false);

  return (
    <HeaderContext.Provider value={{ enableOpacityFade, setEnableOpacityFade }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};
