import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [composerType, setComposerType] = useState('thought'); // 'thought' or 'media'
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'feed'
  
  // Sample data - in real app, this would come from API
  const [posts] = useState([
    { id: 1, type: 'text', content: 'Just shipped a new feature! The profile page is looking amazing 🚀', timestamp: '2 hours ago' },
    { id: 2, type: 'media', content: 'Working on some cool UI experiments with React and modern CSS 💻', timestamp: '5 hours ago', hasImage: true },
    { id: 3, type: 'achievement', content: 'Completed 30-day coding streak! 🔥', timestamp: '1 day ago', milestone: true },
    { id: 4, type: 'text', content: 'The glassmorphism effect creates such a clean aesthetic ✨', timestamp: '1 day ago' },
    { id: 5, type: 'media', content: 'Sunset views from the office 🌅', timestamp: '2 days ago', hasImage: true },
    { id: 6, type: 'achievement', content: 'Hit 1K followers! Thank you all 🙏', timestamp: '3 days ago', milestone: true },
    { id: 7, type: 'text', content: 'Sometimes the simplest solution is the best solution', timestamp: '4 days ago' },
    { id: 8, type: 'media', content: 'New setup for maximum productivity 💪', timestamp: '5 days ago', hasImage: true },
  ]);

  // Sample feed posts from friends
  const [feedPosts] = useState([
    { id: 101, author: 'Sarah Chen', avatar: 'SC', content: 'Just finished an amazing workout! 💪', timestamp: '1h ago', type: 'text' },
    { id: 102, author: 'Mike Torres', avatar: 'MT', content: 'Beach day with the crew 🏖️', timestamp: '2h ago', type: 'media', hasImage: true },
    { id: 103, author: 'Emma Davis', avatar: 'ED', content: 'New PR on deadlifts! 🎉', timestamp: '3h ago', type: 'achievement', milestone: true },
    { id: 104, author: 'Jason Park', avatar: 'JP', content: 'Coffee and code ☕', timestamp: '5h ago', type: 'text' },
    { id: 105, author: 'Lisa Anderson', avatar: 'LA', content: 'Sunset yoga session 🧘‍♀️', timestamp: '6h ago', type: 'media', hasImage: true },
  ]);

  // Categorize posts into river columns
  const textPosts = posts.filter(p => p.type === 'text');
  const mediaPosts = posts.filter(p => p.type === 'media');
  const achievementPosts = posts.filter(p => p.type === 'achievement');

  // Categorize feed posts
  const feedTextPosts = feedPosts.filter(p => p.type === 'text');
  const feedMediaPosts = feedPosts.filter(p => p.type === 'media');
  const feedAchievementPosts = feedPosts.filter(p => p.type === 'achievement');

  return (
    <div className="user-profile-page river-profile">
      {/* Background accent blobs */}
      <div className="page-blob-top"></div>
      <div className="page-blob-bottom"></div>

      {/* Flippable Profile Header Card */}
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
                  <span className="stat-count">{posts.length}</span>
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

      {/* View Mode Toggle */}
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

      {/* Quick Composer Buttons */}
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
            <span className="quick-composer-placeholder">Post media…</span>
          </div>
        </div>
      </div>

      {/* Composer Modal */}
      {showComposer && (
        <div className="composer-modal-overlay" onClick={() => setShowComposer(false)}>
          <div className="composer-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="composer-modal-header">
              <h3 className="composer-modal-title">
                {composerType === 'thought' ? 'Share Your Thoughts' : 'Post Media'}
              </h3>
              <button 
                className="composer-close-btn"
                onClick={() => setShowComposer(false)}
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="composer-modal-body">
              <div className="composer-avatar-section">
                <div className="composer-avatar-small">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="composer-user-info">
                  <span className="composer-user-name">Pvblo Cordero</span>
                  <span className="composer-privacy">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    Public
                  </span>
                </div>
              </div>

              <textarea 
                className="composer-textarea"
                placeholder={composerType === 'thought' ? "What's on your mind?" : "Add a caption to your media..."}
                rows="6"
                autoFocus
              />

              {composerType === 'media' && (
                <div className="media-upload-area">
                  <div className="media-upload-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <p>Click to upload photo or video</p>
                    <span>or drag and drop</span>
                  </div>
                </div>
              )}

              <div className="composer-type-toggle">
                <button 
                  className={`type-toggle-btn ${composerType === 'thought' ? 'active' : ''}`}
                  onClick={() => setComposerType('thought')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Thought
                </button>
                <button 
                  className={`type-toggle-btn ${composerType === 'media' ? 'active' : ''}`}
                  onClick={() => setComposerType('media')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  Media
                </button>
              </div>
            </div>

            <div className="composer-modal-footer">
              <div className="composer-actions-left">
                <button className="composer-icon-btn" aria-label="Add emoji">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                </button>
                <button className="composer-icon-btn" aria-label="Add location">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </button>
              </div>
              <button className="composer-post-btn">
                Post to {composerType === 'thought' ? 'Thoughts' : 'Media'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timeline River Flow - Three Column Layout */}
      <div className="timeline-river">
        {/* River Column Labels */}
        <div className="river-labels">
          <div className="river-label left-label">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Thoughts</span>
          </div>
          <div className="river-label center-label">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span>Media</span>
          </div>
          <div className="river-label right-label">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span>Milestones</span>
          </div>
        </div>

        {/* River Streams Container */}
        <div className="river-streams">
          {/* Left Column - Text Posts (Thoughts) */}
          <div className="river-column left-stream">
            {(viewMode === 'timeline' ? textPosts : feedTextPosts).map((post) => (
              <div key={post.id} className="river-card text-card">
                {viewMode === 'feed' && (
                  <div className="river-card-author">
                    <div className="author-avatar">{post.avatar}</div>
                    <span className="author-name">{post.author}</span>
                  </div>
                )}
                <div className="river-card-content">
                  <p className="river-post-text">{post.content}</p>
                  <span className="river-timestamp">{post.timestamp}</span>
                </div>
                <div className="river-card-actions">
                  <button className="river-action-btn" aria-label="Like">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <button className="river-action-btn" aria-label="Comment">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column - Media Posts (Photos/Videos) */}
          <div className="river-column center-stream">
            {(viewMode === 'timeline' ? mediaPosts : feedMediaPosts).map((post) => (
              <div key={post.id} className="river-card media-card">
                {viewMode === 'feed' && (
                  <div className="river-card-author">
                    <div className="author-avatar">{post.avatar}</div>
                    <span className="author-name">{post.author}</span>
                  </div>
                )}
                <div className="river-card-media">
                  <div className="media-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                </div>
                <div className="river-card-content">
                  <p className="river-post-text">{post.content}</p>
                  <span className="river-timestamp">{post.timestamp}</span>
                </div>
                <div className="river-card-actions">
                  <button className="river-action-btn" aria-label="Like">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <button className="river-action-btn" aria-label="Comment">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Achievements/Milestones */}
          <div className="river-column right-stream">
            {(viewMode === 'timeline' ? achievementPosts : feedAchievementPosts).map((post) => (
              <div key={post.id} className="river-card achievement-card">
                {viewMode === 'feed' && (
                  <div className="river-card-author">
                    <div className="author-avatar">{post.avatar}</div>
                    <span className="author-name">{post.author}</span>
                  </div>
                )}
                <div className="achievement-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div className="river-card-content">
                  <p className="river-post-text">{post.content}</p>
                  <span className="river-timestamp">{post.timestamp}</span>
                </div>
                <div className="river-card-actions">
                  <button className="river-action-btn" aria-label="Celebrate">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                      <line x1="9" y1="9" x2="9.01" y2="9"/>
                      <line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SVG River Flow Lines */}
          <svg className="river-flow-lines" xmlns="http://www.w3.org/2000/svg">
            {/* Flowing lines connecting the streams - will animate */}
            <path 
              className="flow-line flow-line-1" 
              d="M 33% 0 Q 50% 100 33% 200" 
              fill="none" 
              strokeWidth="2"
              opacity="0.3"
            />
            <path 
              className="flow-line flow-line-2" 
              d="M 67% 50 Q 50% 150 67% 250" 
              fill="none" 
              strokeWidth="2"
              opacity="0.3"
            />
            <path 
              className="flow-line flow-line-3" 
              d="M 33% 150 Q 50% 250 67% 350" 
              fill="none" 
              strokeWidth="2"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Profile;