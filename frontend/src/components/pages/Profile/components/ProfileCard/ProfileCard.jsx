import React from 'react';
import './ProfileCard.css';

function ProfileCard({ isFlipped, setIsFlipped, posts }) {
  return (
    <div className="profile-flip-container">
      <div className={`profile-flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side - Public Profile */}
        <div className="profile-card-front">
          <div className="profile-header river-header">
            <div className="profile-header-bg">
              {/* Background image placeholder */}
            </div>
            
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
            {/* Action Icons - Twitter Style */}
            <div className="profile-actions">
              <button className="action-icon-btn" title="Share Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </button>
              <button className="action-icon-btn" title="More Options">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="19" cy="12" r="1"/>
                  <circle cx="5" cy="12" r="1"/>
                </svg>
              </button>
              <button className="action-icon-btn analytics-btn" onClick={() => setIsFlipped(true)} title="Analytics">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </button>
            </div>

            <div className="profile-name-section">
              <h1 className="profile-display-name">Pvblo Cordero</h1>
              <span className="profile-handle">@pabloPistola</span>
            </div>

            {/* Bio Section */}
            <div className="profile-bio">
              <p>Full-stack developer | Building cool stuff with React & Django 🚀</p>
            </div>

            {/* Profile Details - Twitter Style */}
            <div className="profile-details">
              <div className="profile-detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>San Francisco, CA</span>
              </div>
              <div className="profile-detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                <a href="https://github.com/pablodcordero" target="_blank" rel="noopener noreferrer">github.com/pablodcordero</a>
              </div>
              <div className="profile-detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Joined November 2024</span>
              </div>
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
                <span className="stat-count">{posts.length}</span>
                <span className="stat-label">Posts</span>
              </div>
            </div>
          </div>

          {/* Analytics Icon Link - Removed, now in action icons */}
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

export default ProfileCard;
