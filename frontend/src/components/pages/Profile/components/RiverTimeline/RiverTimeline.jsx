import React from 'react';

function RiverTimeline({ 
  viewMode, 
  textPosts, 
  mediaPosts, 
  achievementPosts,
  feedTextPosts,
  feedMediaPosts,
  feedAchievementPosts 
}) {
  return (
    <section className="river-timeline">
      <div className="river-container">
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
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

          {/* Right Column - Achievement Posts (Milestones) */}
          <div className="river-column right-stream">
            {(viewMode === 'timeline' ? achievementPosts : feedAchievementPosts).map((post) => (
              <div key={post.id} className="river-card achievement-card">
                {viewMode === 'feed' && (
                  <div className="river-card-author">
                    <div className="author-avatar">{post.avatar}</div>
                    <span className="author-name">{post.author}</span>
                  </div>
                )}
                <div className="achievement-icon-wrapper">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7"/>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                  </svg>
                </div>
                <div className="river-card-content">
                  <p className="river-post-text achievement-text">{post.content}</p>
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
        </div>

        {/* Decorative Flow Lines */}
        <svg className="river-flow-lines" preserveAspectRatio="none">
          <path 
            className="flow-line flow-line-1" 
            d="M 20% 0 Q 33% 50 20% 100" 
            fill="none" 
            strokeWidth="2"
            opacity="0.3"
          />
          <path 
            className="flow-line flow-line-2" 
            d="M 50% 0 Q 45% 50 50% 100" 
            fill="none" 
            strokeWidth="2"
            opacity="0.3"
          />
          <path 
            className="flow-line flow-line-3" 
            d="M 80% 0 Q 67% 50 80% 100" 
            fill="none" 
            strokeWidth="2"
            opacity="0.3"
          />
        </svg>
      </div>
    </section>
  );
}

export default RiverTimeline;
