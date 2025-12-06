// 🔵 PABLO - UI/Styling | 🟡 NATALIA - User Posts Data
// TimelineRiver.jsx - Profile timeline showing user's posts in river format

import React, { useState } from 'react';
import './TimelineRiver.scss';

function TimelineRiver({ 
  viewMode, 
  textPosts, 
  mediaPosts, 
  achievementPosts,
  feedTextPosts,
  feedMediaPosts,
  feedAchievementPosts
}) {
  // State for inline comment composer
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentText, setCommentText] = useState('');

  const handleCommentClick = (postId) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null);
      setCommentText('');
    } else {
      setActiveCommentPostId(postId);
      setCommentText('');
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      console.log('Comment posted:', commentText);
      setCommentText('');
      setActiveCommentPostId(null);
    }
  };

  return (
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
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="none" stroke="rgba(201,168,255,0.5)" strokeWidth="1.5"/>
                  </svg>
                </button>
                <button className="river-action-btn" aria-label="Comment" onClick={() => handleCommentClick(post.id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
              </div>
              {/* Inline Comment Composer */}
              {activeCommentPostId === post.id && (
                <div className="inline-comment-composer">
                  <div className="comment-input-wrapper">
                    <textarea
                      className="comment-input"
                      placeholder="Comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows={1}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleCommentSubmit();
                        }
                        if (e.key === 'Escape') {
                          setActiveCommentPostId(null);
                          setCommentText('');
                        }
                      }}
                    />
                  </div>
                  <button 
                    className="comment-submit-btn"
                    disabled={!commentText.trim()}
                    onClick={handleCommentSubmit}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 6 15 12 9 18"/>
                    </svg>
                  </button>
                </div>
              )}
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
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="none" stroke="rgba(201,168,255,0.5)" strokeWidth="1.5"/>
                  </svg>
                </button>
                <button className="river-action-btn" aria-label="Comment" onClick={() => handleCommentClick(post.id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
              </div>
              {/* Inline Comment Composer */}
              {activeCommentPostId === post.id && (
                <div className="inline-comment-composer">
                  <div className="comment-input-wrapper">
                    <textarea
                      className="comment-input"
                      placeholder="Comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows={1}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleCommentSubmit();
                        }
                        if (e.key === 'Escape') {
                          setActiveCommentPostId(null);
                          setCommentText('');
                        }
                      }}
                    />
                  </div>
                  <button 
                    className="comment-submit-btn"
                    disabled={!commentText.trim()}
                    onClick={handleCommentSubmit}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 6 15 12 9 18"/>
                    </svg>
                  </button>
                </div>
              )}
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
      </div>
    </div>
  );
}

export default TimelineRiver;
