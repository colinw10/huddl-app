// 🔵 PABLO - UI Architect
// TopBar.jsx - Top navigation bar component

import { useNavigate } from 'react-router-dom';
import './TopBar.scss';
import MessageModal from './MessageModal/MessageModal';
import { ThemeToggle } from '../../ui/ThemeToggle';
import { useMessages, useAuth } from '../../../contexts';

function TopBar() {
  const { isMessageModalOpen, openMessages, closeMessages } = useMessages();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className="top-bar">
        <div 
          className="top-bar-logo" 
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
          title="Go to Landing"
        >
          NUMENEON
        </div>
        <div className="top-bar-icons">
          <ThemeToggle />
          <div className="icon-placeholder icon-search" title="Search">
            {/* Targeting reticle */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="8"/>
              <circle cx="12" cy="12" r="3"/>
              <line x1="12" y1="2" x2="12" y2="6"/>
              <line x1="12" y1="18" x2="12" y2="22"/>
              <line x1="2" y1="12" x2="6" y2="12"/>
              <line x1="18" y1="12" x2="22" y2="12"/>
            </svg>
          </div>
          <div 
            className="icon-placeholder icon-messages" 
            title="Messages"
            onClick={openMessages}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          {user && (
            <div 
              className="icon-placeholder icon-logout" 
              title="Logout"
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
          )}
          {/* Always show login link if not logged in */}
          {!user && (
            <div 
              className="icon-placeholder icon-login" 
              title="Login"
              onClick={() => navigate('/login')}
              style={{ cursor: 'pointer' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Message Modal */}
      {isMessageModalOpen && (
        <MessageModal onClose={closeMessages} />
      )}
    </>
  );
}

export default TopBar;