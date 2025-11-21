import React from 'react';

function QuickComposer({ setShowComposer, setComposerType }) {
  return (
    <div className="quick-composer-buttons">
      <div 
        className="quick-composer-section thought-composer"
        onClick={() => {
          setComposerType('thought');
          setShowComposer(true);
        }}
      >
        <div className="quick-composer-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <div className="quick-composer-input">
          <span className="quick-composer-placeholder">Share a thought…</span>
        </div>
      </div>
      
      <div 
        className="quick-composer-section media-composer"
        onClick={() => {
          setComposerType('media');
          setShowComposer(true);
        }}
      >
        <div className="quick-composer-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        <div className="quick-composer-input">
          <span className="quick-composer-placeholder">Share media…</span>
        </div>
      </div>
    </div>
  );
}

export default QuickComposer;
