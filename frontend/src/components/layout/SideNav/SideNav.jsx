// 🔵 PABLO - UI Architect
// SideNav.jsx - Side navigation component

import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMessages, useSearch } from '@contexts';
import './SideNav.scss';
import {
  HexHomeIcon,
  TargetReticleIcon,
  MessageBubbleIcon,
  SignalIcon,
  NetworkIcon,
  HexProfileIcon,
  CircuitInfoIcon
} from '@assets/icons';

function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 480);
  const { isMessageModalOpen, openMessages } = useMessages();
  const { openSearch, isSearchModalOpen } = useSearch();

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
          <HexHomeIcon size={24} />
        </div>
        <span>Home</span>
      </button>
      <button 
        className={`nav-item ${isSearchModalOpen ? 'active' : ''}`}
        onClick={openSearch}
        title="Search"
        disabled={isMessageModalOpen}
      >
        <div className="nav-icon">
          <TargetReticleIcon size={24} />
        </div>
        <span>Search</span>
      </button>
      <button 
        className={`nav-item ${isMessageModalOpen ? 'active' : ''}`}
        onClick={openMessages}
        title="Messages"
      >
        <div className="nav-icon">
          <MessageBubbleIcon size={24} />
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
          <SignalIcon size={24} />
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
            <NetworkIcon size={24} />
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
            <HexProfileIcon size={24} />
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
            <CircuitInfoIcon size={24} />
          </div>
          <span>About</span>
        </button>
      )}
    </nav>
  );
}

export default SideNav;
