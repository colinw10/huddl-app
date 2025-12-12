/**
 * ============================================================================
 * THEME TOGGLE COMPONENT
 * ============================================================================
 * 
 * File: frontend/src/components/ui/ThemeToggle/ThemeToggle.jsx
 * Assigned to: TITO
 * 
 * Toggle button for dark/light mode.
 * 
 * TODO:
 * - [ ] Read theme from localStorage or context
 * - [ ] Toggle theme on click
 * - [ ] Update localStorage
 * - [ ] Update document.documentElement.dataset.theme
 * - [ ] Visual indicator (sun/moon icon)
 * 
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import './ThemeToggle.scss';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // TODO: Read theme from localStorage on mount
  }, []);

  const toggleTheme = () => {
    // TODO: Toggle between 'dark' and 'light'
    // TODO: Update localStorage
    // TODO: Update document theme attribute
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {/* TODO: Sun/moon icon based on theme */}
      <p>ThemeToggle</p>
    </button>
  );
};

export { ThemeToggle };
export default ThemeToggle;
