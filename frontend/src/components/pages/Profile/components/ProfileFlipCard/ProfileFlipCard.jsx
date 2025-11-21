import React from 'react';

function ProfileFlipCard({ isFlipped, setIsFlipped, postsCount }) {
  return (
    <div className="profile-flip-container">
      <div className={`profile-flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side - Public Profile */}
        <div className="profile-card-front">
          <div className="profile-header river-header">
            <div className="profile-header-bg" />
            
            {/* Overlapping avatar container */}
            <div className="avatar-wrapper">
              <div className="profile-avatar">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Compact Profile Meta */}
          <div className="profile-meta river-meta">
            <div className="profile-name-section">
              <h1 className="profile-display-name">Pvblo Cordero</h1>
              <span className="profile-handle">@pabloPistola</span>
            </div>
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-count">-26</span>
                <span className="stat-label">Following</span>
              </div>
              <div className="stat-item">
                <span className="stat-count">0</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-count">{postsCount}</span>
                <span className="stat-label">Posts</span>
              </div>
            </div>
          </div>

          {/* Analytics Icon Link */}
          <button className="analytics-link" onClick={() => setIsFlipped(true)} aria-label="View Analytics" title="Analytics">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </button>
        </div>

        {/* Back Side - Private Analytics */}
        <div className="profile-card-back">
          <div className="analytics-header">
            <h2 className="analytics-title">Your Analytics</h2>
            <button className="flip-trigger-back" onClick={() => setIsFlipped(false)} aria-label="Back to Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
              </svg>
            </button>
          </div>

          <div className="analytics-grid">
            <div className="analytics-card">
              <div className="analytics-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div className="analytics-data">
                <span className="analytics-value">2.4K</span>
                <span className="analytics-label">Profile Views</span>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="analytics-data">
                <span className="analytics-value">89%</span>
                <span className="analytics-label">Engagement Rate</span>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <div className="analytics-data">
                <span className="analytics-value">156</span>
                <span className="analytics-label">Avg. Likes/Post</span>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 20V10"/>
                  <path d="M12 20V4"/>
                  <path d="M6 20v-6"/>
                </svg>
              </div>
              <div className="analytics-data">
                <span className="analytics-value">+23%</span>
                <span className="analytics-label">Growth This Week</span>
              </div>
            </div>
          </div>

          <div className="quick-settings">
            <h3 className="settings-title">Quick Settings</h3>
            <button className="setting-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Privacy Settings</span>
            </button>
            <button className="setting-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
              </svg>
              <span>Appearance</span>
            </button>
            <button className="setting-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span>Notifications</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileFlipCard;
