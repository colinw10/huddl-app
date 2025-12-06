// 🔵 PABLO - UI Architect
// SideNav.jsx - Side navigation component

import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMessages } from '../../../contexts';
import './SideNav.scss';

function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 480);
  const { isMessageModalOpen, openMessages } = useMessages();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 480);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't navigate if message modal is open
  const handleNavClick = (path) => {
    if (isMessageModalOpen) return;
    navigate(path);
  };

  return (
    <nav className={`main-nav ${isDesktop ? 'left-nav' : 'bottom-nav'} ${isMessageModalOpen ? 'nav-disabled' : ''}`}>
      <button 
        className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}
        onClick={() => handleNavClick('/home')}
        title="Home"
        disabled={isMessageModalOpen}
      >
        <div className="nav-icon">
          {/* Hexagon hub with center node */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
            <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>
          </svg>
        </div>
        <span>Home</span>
      </button>
      <button 
        className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}
        onClick={() => handleNavClick('/search')}
        title="Search"
        disabled={isMessageModalOpen}
      >
        <div className="nav-icon">
          {/* Targeting reticle */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="8"/>
            <circle cx="12" cy="12" r="3"/>
            <line x1="12" y1="2" x2="12" y2="6"/>
            <line x1="12" y1="18" x2="12" y2="22"/>
            <line x1="2" y1="12" x2="6" y2="12"/>
            <line x1="18" y1="12" x2="22" y2="12"/>
          </svg>
        </div>
        <span>Search</span>
      </button>
      <button 
        className={`nav-item ${isMessageModalOpen ? 'active' : ''}`}
        onClick={openMessages}
        title="Messages"
      >
        <div className="nav-icon">
          {/* Classic chat bubble */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <span>Messages</span>
      </button>
      <button 
        className={`nav-item ${location.pathname === '/notifications' ? 'active' : ''}`}
        onClick={() => handleNavClick('/notifications')}
        title="Notifications"
        disabled={isMessageModalOpen}
      >
        <div className="nav-icon">
          {/* Signal broadcast/pulse */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="18" r="3"/>
            <path d="M7 13a7 7 0 0 1 10 0"/>
            <path d="M4 9a12 12 0 0 1 16 0"/>
          </svg>
        </div>
        <span>Notifications</span>
      </button>
      {location.pathname !== '/friends' && (
        <button 
          className={`nav-item ${location.pathname === '/friends' ? 'active' : ''}`}
          onClick={() => handleNavClick('/friends')}
          title="Friends"
          disabled={isMessageModalOpen}
        >
          <div className="nav-icon">
            {/* Connected nodes network */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="6" cy="6" r="3"/>
              <circle cx="18" cy="6" r="3"/>
              <circle cx="12" cy="18" r="3"/>
              <line x1="8.5" y1="7.5" x2="10" y2="15.5"/>
              <line x1="15.5" y1="7.5" x2="14" y2="15.5"/>
              <line x1="9" y1="6" x2="15" y2="6"/>
            </svg>
          </div>
          <span>Friends</span>
        </button>
      )}
      {location.pathname !== '/profile' && (
        <button 
          className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={() => handleNavClick('/profile')}
          title="Profile"
          disabled={isMessageModalOpen}
        >
          <div className="nav-icon">
            {/* Hexagon avatar frame */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="12 2 21 7 21 17 12 22 3 17 3 7"/>
              <circle cx="12" cy="10" r="3"/>
              <path d="M7 18c0-2.5 2.2-4 5-4s5 1.5 5 4"/>
            </svg>
          </div>
          <span>Profile</span>
        </button>
      )}
      {location.pathname !== '/about' && (
        <button 
          className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}
          onClick={() => handleNavClick('/about')}
          disabled={isMessageModalOpen}
        >
          <div className="nav-icon">
            {/* Circuit chip with "i" */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="5" y="5" width="14" height="14" rx="2"/>
              <line x1="5" y1="9" x2="2" y2="9"/>
              <line x1="5" y1="15" x2="2" y2="15"/>
              <line x1="19" y1="9" x2="22" y2="9"/>
              <line x1="19" y1="15" x2="22" y2="15"/>
              <line x1="12" y1="10" x2="12" y2="15"/>
              <circle cx="12" cy="8" r="0.5" fill="currentColor"/>
            </svg>
          </div>
          <span>About</span>
        </button>
      )}
    </nav>
  );
}

export default SideNav;
