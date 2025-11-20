import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="user-profile-page">
      {/* Background accent blobs */}
      <div className="page-blob-top"></div>
      <div className="page-blob-bottom"></div>

      {/* Header Section - X-style minimal */}
      <div className="profile-header">
        <div className="profile-header-bg">
          {/* Background image placeholder - user can upload custom image */}
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

      {/* X-style Profile Meta */}
      <div className="profile-meta">
        <div className="profile-name-section">
          <h1 className="profile-display-name">Pvblo Cordero</h1>
          <span className="profile-handle">@pabloPistola</span>
        </div>
        
        <p className="profile-bio">
          Building shit at the speed of light with React and modern web tech. Always learning, always creating.
        </p>
        
        <div className="profile-details">
          <div className="profile-detail-item">
            <svg className="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>San Francisco, CA</span>
          </div>
          
          <div className="profile-detail-item">
            <svg className="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">example.com</a>
          </div>
          
          <div className="profile-detail-item">
            <svg className="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>Joined November 2074</span>
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
        </div>
      </div>

      {/* Facebook-style Tabs */}
      <div className="profile-tabs">
        <button 
          className={`tab-item ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button 
          className={`tab-item ${activeTab === 'reels' ? 'active' : ''}`}
          onClick={() => setActiveTab('reels')}
        >
          Reels
        </button>
        <button 
          className={`tab-item ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          Photos
        </button>
        <button 
          className={`tab-item ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
        <button 
          className={`tab-item ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
      </div>

      {/* Facebook-style Post Composer */}
      <div className="post-composer">
        <div className="composer-avatar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        
        <div className="composer-input-wrapper">
          <input 
            type="text" 
            className="composer-input" 
            placeholder="What's on your mind?"
          />
          
          <div className="composer-actions">
            <button className="composer-action-btn" aria-label="Add Photo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </button>
            
            <button className="composer-action-btn" aria-label="Tag People">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </button>
            
            <button className="composer-action-btn" aria-label="Add Location">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </button>
            
            <button className="composer-action-btn" aria-label="Add Emoji">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Feed */}
      <div className="profile-feed">
        {/* Sample Post Card 1 */}
        <div className="post-card">
          <div className="post-header">
            <div className="avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="post-user-info">
              <span className="post-user-name">Pablo Cordero</span>
              <span className="post-timestamp">2 hours ago</span>
            </div>
          </div>
          
          <div className="post-content">
            <p className="post-text">
              Just shipped a new feature! The profile page is looking amazing 🚀
            </p>
          </div>
          
          <div className="post-footer">
            <button className="post-action-btn" aria-label="Like">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            
            <button className="post-action-btn" aria-label="Comment">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            
            <button className="post-action-btn" aria-label="Share">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
            
            <button className="post-action-btn" aria-label="Save">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Sample Post Card 2 with Image */}
        <div className="post-card">
          <div className="post-header">
            <div className="avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="post-user-info">
              <span className="post-user-name">Pablo Cordero</span>
              <span className="post-timestamp">5 hours ago</span>
            </div>
          </div>
          
          <div className="post-content">
            <p className="post-text">
              Working on some cool UI experiments with React and modern CSS 💻
            </p>
            <div className="post-image">
              <div className="image-placeholder">Image placeholder</div>
            </div>
          </div>
          
          <div className="post-footer">
            <button className="post-action-btn" aria-label="Like">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            
            <button className="post-action-btn" aria-label="Comment">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            
            <button className="post-action-btn" aria-label="Share">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
            
            <button className="post-action-btn" aria-label="Save">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Sample Post Card 3 */}
        <div className="post-card">
          <div className="post-header">
            <div className="avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="post-user-info">
              <span className="post-user-name">Pablo Cordero</span>
              <span className="post-timestamp">1 day ago</span>
            </div>
          </div>
          
          <div className="post-content">
            <p className="post-text">
              The glassmorphism effect creates such a clean aesthetic ✨
            </p>
          </div>
          
          <div className="post-footer">
            <button className="post-action-btn" aria-label="Like">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span>Like</span>
            </button>
            
            <button className="post-action-btn" aria-label="Comment">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Comment</span>
            </button>
            
            <button className="post-action-btn" aria-label="Share">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              <span>Share</span>
            </button>
            
            <button className="post-action-btn" aria-label="Save">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;