// 🔵 PABLO - UI/Styling | 🟢 COLIN - Post Creation Logic
// ComposerModal.jsx - Modal for creating new posts

import React from 'react';
import './ComposerModal.css';

function ComposerModal({ showComposer, setShowComposer, composerType, setComposerType }) {
  if (!showComposer) return null;

  return (
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
            className={`composer-textarea ${composerType === 'media' ? 'media-mode' : ''}`}
            placeholder={composerType === 'thought' ? "What's on your mind?" : "Add a caption to your media..."}
            rows={composerType === 'media' ? 2 : 6}
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
            Post Thoughts
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComposerModal;
