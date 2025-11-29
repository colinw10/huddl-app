/**
 * =============================================================================
 * SIDE NAV COMPONENT
 * =============================================================================
 *
 * File: frontend/src/components/layout/SideNav/SideNav.jsx
 * Assigned to: PABLO
 * Responsibility: Side navigation for desktop view
 *
 * TODO:
 * - [ ] Create navigation links (Home, Profile, Friends, Settings)
 * - [ ] Highlight active route
 * - [ ] Add icons for each nav item
 * - [ ] Make collapsible (show icons only)
 * - [ ] Hide on mobile (use BottomNav instead)
 * - [ ] Add hover effects
 *
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideNav.scss';

const SideNav = () => {
  // TODO: Pablo - Define nav items
  const navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/friends', label: 'Friends', icon: '👥' },
    // { path: '/messages', label: 'Messages', icon: '💬' },
    // { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="sidenav">
      <ul className="sidenav__list">
        {navItems.map((item) => (
          <li key={item.path} className="sidenav__item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `sidenav__link ${isActive ? 'sidenav__link--active' : ''}`
              }
            >
              <span className="sidenav__icon">{item.icon}</span>
              <span className="sidenav__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
