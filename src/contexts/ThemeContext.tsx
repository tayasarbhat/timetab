import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Theme, ThemeContextType } from '../types/theme';
import { themes } from '../themes/themesList';
import { applyTheme } from '../utils/theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('currentTheme');
      return saved ? JSON.parse(saved) : themes[0];
    } catch {
      return themes[0];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      localStorage.setItem('currentTheme', JSON.stringify(currentTheme));
      applyTheme(isDarkMode, currentTheme);
    } catch (error) {
      console.error('Failed to save theme preferences:', error);
    }
  }, [isDarkMode, currentTheme]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const setTheme = (theme: Theme) => setCurrentTheme(theme);

  return (
    <ThemeContext.Provider value={{ isDarkMode, currentTheme, toggleDarkMode, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}