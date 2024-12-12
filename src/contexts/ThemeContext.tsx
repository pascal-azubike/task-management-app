import React, { createContext, useContext, useEffect, useState } from 'react';
import { theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('themeMode');
    return (saved as ThemeMode) || 'system';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (themeMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return themeMode === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setIsDarkMode(themeMode === 'dark');
    }
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const value = {
    themeMode,
    setThemeMode,
    isDarkMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const getThemeConfig = (isDarkMode: boolean): ThemeConfig => {
  const { darkAlgorithm, defaultAlgorithm } = theme;

  return {
    token: {
      colorPrimary: '#60a5fa',
      borderRadius: 6,
    },
    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
  };
}; 