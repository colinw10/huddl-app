import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './SideNav.css';

function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 480);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 480);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={`main-nav ${isDesktop ? 'left-nav' : 'bottom-nav'}`}>
      <button 
        className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}
        onClick={() => navigate('/home')}
        title="Home"
      >
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <span>Home</span>
      </button>
      <button 
        className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}
        onClick={() => navigate('/search')}
        title="Search"
      >
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
        <span>Search</span>
      </button>
      <button 
        className={`nav-item ${location.pathname === '/messages' ? 'active' : ''}`}
        onClick={() => navigate('/messages')}
        title="Messages"
      >
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <span>Messages</span>
      </button>
      <button 
        className={`nav-item ${location.pathname === '/notifications' ? 'active' : ''}`}
        onClick={() => navigate('/notifications')}
        title="Notifications"
      >
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>
        <span>Notifications</span>
      </button>
      {location.pathname !== '/friends' && (
        <button 
          className={`nav-item ${location.pathname === '/friends' ? 'active' : ''}`}
          onClick={() => navigate('/friends')}
          title="Friends"
        >
          <div className="nav-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <span>Friends</span>
        </button>
      )}
      {location.pathname !== '/profile' && (
        <button 
          className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
          title="Profile"
        >
          <div className="nav-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <span>Profile</span>
        </button>
      )}
      {location.pathname !== '/about' && (
        <button 
          className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}
          onClick={() => navigate('/about')}
        >
          <div className="nav-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
          </div>
          <span>About</span>
        </button>
      )}
    </nav>
  );
}

export default SideNav;
