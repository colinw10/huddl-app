/**
 * =============================================================================
 * TOP BAR COMPONENT
 * =============================================================================
 *
 * File: frontend/src/components/layout/TopBar/TopBar.jsx
 * Assigned to: PABLO
 * Responsibility: Top navigation bar with logo, search, user actions
 *
 * TODO:
 * - [ ] Display app logo/brand
 * - [ ] Add search bar (optional)
 * - [ ] Show user avatar with dropdown menu
 * - [ ] Add theme toggle button
 * - [ ] Add notification bell with badge count
 * - [ ] Handle logout action
 * - [ ] Make sticky on scroll
 *
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React from 'react';
import './TopBar.scss';
// TODO: Pablo - Import ThemeToggle, UserMenu components

const TopBar = () => {
  // TODO: Pablo - Get current user from context
  // TODO: Pablo - Get notification count
  
  return (
    <header className="topbar">
      <div className="topbar__logo">
        {/* TODO: Pablo - Add logo */}
        <span>huddl</span>
      </div>
      
      <div className="topbar__search">
        {/* TODO: Pablo - Add search bar */}
      </div>
      
      <div className="topbar__actions">
        {/* TODO: Pablo - Add theme toggle */}
        {/* TODO: Pablo - Add notification bell */}
        {/* TODO: Pablo - Add user avatar/menu */}
      </div>
    </header>
  );
};

export default TopBar;
