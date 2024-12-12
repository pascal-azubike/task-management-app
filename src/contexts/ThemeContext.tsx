import React, { createContext, useContext, useEffect, useState } from 'react';
import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme context provider that manages application-wide theme state.
 * Handles theme persistence and provides theme switching functionality.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }): JSX.Element => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    return savedMode ?? 'dark';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (themeMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return themeMode === 'dark';
  });

  useEffect((): void => {
    localStorage.setItem('themeMode', themeMode);

    if (themeMode === 'system') {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    } else {
      setIsDarkMode(themeMode === 'dark');
    }

    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [themeMode, isDarkMode]);

  useEffect((): (() => void) => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent): void => {
      if (themeMode === 'system') {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  const contextValue: ThemeContextValue = {
    themeMode,
    setThemeMode,
    isDarkMode
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

interface ThemeTokens {
  colorPrimary: string;
  borderRadius: number;
  colorBgContainer: string;
  fontFamily: string;
}

export const getThemeConfig = (isDark: boolean): ThemeConfig => {
  const { darkAlgorithm, defaultAlgorithm } = theme;

  const tokens: ThemeTokens = {
    colorPrimary: '#60a5fa',
    borderRadius: 6,
    colorBgContainer: isDark ? 'rgba(39, 39, 42, 0.6)' : 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  };

  return {
    token: tokens,
    algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
  };
}; 