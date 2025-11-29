/**
 * =============================================================================
 * BOTTOM NAV COMPONENT
 * =============================================================================
 *
 * File: frontend/src/components/layout/BottomNav/BottomNav.jsx
 * Assigned to: PABLO
 * Responsibility: Bottom navigation for mobile view
 *
 * TODO:
 * - [ ] Create mobile navigation bar
 * - [ ] Show icons with labels
 * - [ ] Highlight active route
 * - [ ] Only visible on mobile (<768px)
 * - [ ] Fixed to bottom of viewport
 * - [ ] Add safe area padding for notched devices
 *
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.scss';

const BottomNav = () => {
  // TODO: Pablo - Define nav items
  const navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/friends', label: 'Friends', icon: '👥' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav className="bottomnav">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `bottomnav__item ${isActive ? 'bottomnav__item--active' : ''}`
          }
        >
          <span className="bottomnav__icon">{item.icon}</span>
          <span className="bottomnav__label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
