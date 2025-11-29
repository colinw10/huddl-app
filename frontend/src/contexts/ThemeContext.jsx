/**
 * =============================================================================
 * THEME CONTEXT
 * =============================================================================
 *
 * File: frontend/src/contexts/ThemeContext.jsx
 * Assigned to: PABLO
 * Responsibility: Global theme state management (dark/light mode)
 *
 * TODO:
 * - [ ] Create ThemeContext with Provider
 * - [ ] Store theme preference in localStorage
 * - [ ] Detect system preference (prefers-color-scheme)
 * - [ ] Provide toggleTheme function
 * - [ ] Apply theme class to document root
 * - [ ] Export useTheme hook
 *
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // TODO: Pablo - Initialize from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
