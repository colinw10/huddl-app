// 🔵 PABLO - UI Architect
// TopBar.jsx - Top navigation bar component

import { useState } from 'react';
import './TopBar.css';
import MessageModal from './MessageModal/MessageModal';

function TopBar() {
  const [showMessages, setShowMessages] = useState(false);

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-logo">HUDDL</div>
        <div className="top-bar-icons">
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
            onClick={() => setShowMessages(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessages && (
        <MessageModal onClose={() => setShowMessages(false)} />
      )}
    </>
  );
}

export default TopBar;