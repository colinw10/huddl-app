/**
 * ============================================================================
 * SIDE NAV COMPONENT
 * ============================================================================
 * 
 * File: frontend/src/components/layout/SideNav/SideNav.jsx
 * Assigned to: NATALIA
 * 
 * Side navigation for desktop view.
 * 
 * TODO:
 * - [ ] Navigation links (Home, Profile, Friends, About)
 * - [ ] Active state highlighting based on current route
 * - [ ] Message button (opens MessageModal)
 * - [ ] User info display
 * - [ ] Logout button
 * - [ ] Responsive behavior (hide on mobile)
 * 
 * ============================================================================
 */

import { useNavigate, useLocation } from 'react-router-dom';
import './SideNav.scss';

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="side-nav">
      {/* TODO: Logo/brand */}
      {/* TODO: Nav links with active states */}
      {/* TODO: Message button */}
      {/* TODO: User section */}
      {/* TODO: Logout button */}
      <p>SideNav - Implement me!</p>
    </nav>
  );
};

export default SideNav;
