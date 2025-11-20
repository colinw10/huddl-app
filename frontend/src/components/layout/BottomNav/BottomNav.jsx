import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      {location.pathname !== '/home' && (
        <button 
          className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}
          onClick={() => navigate('/home')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Home</span>
        </button>
      )}
      {location.pathname !== '/friends' && (
        <button 
          className={`nav-item ${location.pathname === '/friends' ? 'active' : ''}`}
          onClick={() => navigate('/friends')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Friends</span>
        </button>
      )}
      {location.pathname !== '/profile' && (
        <button 
          className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Profile</span>
        </button>
      )}
      {location.pathname !== '/about' && (
        <button 
          className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}
          onClick={() => navigate('/about')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
          <span>About</span>
        </button>
      )}
    </nav>
  );
}

export default BottomNav;
