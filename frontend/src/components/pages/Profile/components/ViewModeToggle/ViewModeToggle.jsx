import React from 'react';

function ViewModeToggle({ viewMode, setViewMode }) {
  return (
    <div className="view-mode-toggle">
      <button 
        className={`view-toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`}
        onClick={() => setViewMode('timeline')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        My Timeline
      </button>
      <button 
        className={`view-toggle-btn ${viewMode === 'feed' ? 'active' : ''}`}
        onClick={() => setViewMode('feed')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        Friends Feed
      </button>
    </div>
  );
}

export default ViewModeToggle;
