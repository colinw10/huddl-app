/**
 * =============================================================================
 * SHELL LAYOUT COMPONENT
 * =============================================================================
 *
 * File: frontend/src/components/layout/Shell/Shell.jsx
 * Assigned to: PABLO
 * Responsibility: Main layout wrapper for authenticated pages
 *
 * TODO:
 * - [ ] Create responsive shell with SideNav, TopBar, BottomNav
 * - [ ] Handle navigation visibility based on viewport
 * - [ ] Show SideNav on desktop, BottomNav on mobile
 * - [ ] Create content area with proper spacing
 * - [ ] Add animated background blobs
 * - [ ] Integrate with theme context for dark/light mode
 * - [ ] Handle navigation state (active route highlighting)
 *
 * Layout:
 * ┌──────────────────────────────────────┐
 * │            TopBar                     │
 * ├─────────┬────────────────────────────┤
 * │         │                            │
 * │ SideNav │        Content             │
 * │         │                            │
 * │         │                            │
 * ├─────────┴────────────────────────────┤
 * │          BottomNav (mobile)          │
 * └──────────────────────────────────────┘
 *
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React from 'react';
import './Shell.scss';
// TODO: Pablo - Import child components
// import TopBar from '../TopBar/TopBar';
// import SideNav from '../SideNav/SideNav';
// import BottomNav from '../BottomNav/BottomNav';

const Shell = ({ children }) => {
  // TODO: Pablo - Get current route for active nav highlighting
  // TODO: Pablo - Handle responsive breakpoints
  
  return (
    <div className="shell">
      {/* TODO: Pablo - Add background blobs */}
      <div className="shell__blobs">
        {/* Animated gradient blobs */}
      </div>
      
      {/* TODO: Pablo - Add TopBar */}
      {/* <TopBar /> */}
      
      <div className="shell__layout">
        {/* TODO: Pablo - Add SideNav (desktop only) */}
        {/* <SideNav /> */}
        
        <main className="shell__content">
          {children}
        </main>
      </div>
      
      {/* TODO: Pablo - Add BottomNav (mobile only) */}
      {/* <BottomNav /> */}
    </div>
  );
};

export default Shell;
