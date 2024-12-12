import React, { createContext, useContext, useEffect, useState } from 'react';
import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

type ThemeContextType = {
  themeMode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  isDarkMode: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as 'light' | 'dark' | 'system') || 'dark';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (themeMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return themeMode === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);

    if (themeMode === 'system') {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    } else {
      setIsDarkMode(themeMode === 'dark');
    }

    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [themeMode, isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (themeMode === 'system') {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const getThemeConfig = (isDark: boolean): ThemeConfig => {
  const { darkAlgorithm, defaultAlgorithm } = theme;

  return {
    token: {
      colorPrimary: '#60a5fa',
      borderRadius: 6,
      colorBgContainer: isDark ? 'rgba(39, 39, 42, 0.6)' : 'rgba(255, 255, 255, 0.9)',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
  };
}; 