import { useState, useEffect } from 'react';
import './TimelineRiverRow.css';

function TimelineRiverRow({ rowData, onCommentClick, activeCommentPostId, commentText, setCommentText, setActiveCommentPostId }) {
  const { user, thoughts, media, milestones } = rowData;
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [activePostId, setActivePostId] = useState(null); // Track which card is on top
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 650);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    const allPosts = [];
    if (thoughts.length > 0) allPosts.push(...thoughts.map(p => ({ ...p, type: 'thoughts' })));
    if (media.length > 0) allPosts.push(...media.map(p => ({ ...p, type: 'media' })));
    if (milestones.length > 0) allPosts.push(...milestones.map(p => ({ ...p, type: 'milestones' })));
    
    if (isLeftSwipe && activeCardIndex < allPosts.length - 1) {
      setActiveCardIndex(prev => prev + 1);
    }
    if (isRightSwipe && activeCardIndex > 0) {
      setActiveCardIndex(prev => prev - 1);
    }
    
    setTouchStartX(0);
    setTouchEndX(0);
  };
  
  const renderPostCard = (post, type) => {
    const typeConfig = {
      thoughts: { icon: '💭', label: 'Thought', color: 'rgba(30, 234, 76, 0.3)' },
      media: { icon: '📸', label: 'Media', color: 'rgba(26, 115, 231, 0.3)' },
      milestones: { icon: '🎯', label: 'Milestone', color: 'rgba(234, 30, 162, 0.3)' }
    };

    const config = typeConfig[type];
    
    // Determine if this is a single post in the row
    const isSinglePost = (type === 'thoughts' && thoughts.length === 1 && media.length === 0 && milestones.length === 0) ||
                         (type === 'media' && media.length === 1 && thoughts.length === 0 && milestones.length === 0) ||
                         (type === 'milestones' && milestones.length === 1 && thoughts.length === 0 && media.length === 0);
    
    // Check if this card is currently active (on top)
    const isActive = activePostId === post.id;

    return (
      <div 
        key={post.id} 
        className={`river-post-card post--${type} ${isSinglePost ? 'post--single' : ''} ${isActive ? 'post--active' : ''} fade-in hover-lift`}
        onClick={() => setActivePostId(post.id)}
        style={{ zIndex: isActive ? 100 : 'auto' }}
      >
        <div className="river-post-header">
          <div className="river-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className="river-post-info">
            <div className="river-author">{user.name}</div>
            <div className="river-meta">
              <span className="river-type-badge" style={{ background: config.color }}>
                {config.icon} {config.label}
              </span>
              <span className="river-timestamp">{post.timestamp}</span>
            </div>
          </div>
          <svg className="privacy-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            {post.isPublic ? (
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" 
                    fill="currentColor"/>
            ) : (
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" 
                    fill="currentColor"/>
            )}
          </svg>
        </div>

        <p className="river-post-content">{post.content}</p>

        <div className="river-post-likes">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="spectral-heart" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1ae784" />
                <stop offset="50%" stopColor="#1a73e7" />
                <stop offset="100%" stopColor="#dc08bc" />
              </linearGradient>
            </defs>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                  fill="url(#spectral-heart)" stroke="currentColor" strokeWidth="2"/>
          </svg>
          {post.likes}
        </div>

        {/* Post Actions */}
        <div className="river-post-actions">
          <button 
            className="river-action-btn" 
            title="Comment"
            onClick={() => onCommentClick(post.id)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <button className="river-action-btn" title="Repost">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="17 1 21 5 17 9"/>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
              <polyline points="7 23 3 19 7 15"/>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
          </button>
          <button className="river-action-btn" title="Analytics">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </button>
          <button className="river-action-btn" title="Bookmark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <button className="river-action-btn" title="Share">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        </div>

        {/* Inline Comment Composer */}
        {activeCommentPostId === post.id && (
          <div className="inline-comment-composer">
            <button 
              className="close-comment-btn"
              onClick={() => {
                setActiveCommentPostId(null);
                setCommentText('');
              }}
              title="Close (Esc)"
            >
              ×
            </button>
            <div className="comment-composer-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="comment-input-wrapper">
              <textarea
                className="comment-input"
                placeholder="Share your thoughts..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={1}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (commentText.trim()) {
                      console.log('Comment posted:', commentText);
                      setCommentText('');
                      setActiveCommentPostId(null);
                    }
                  }
                  if (e.key === 'Escape') {
                    setActiveCommentPostId(null);
                    setCommentText('');
                  }
                }}
              />
              <div className="comment-actions">
                <button className="comment-emoji-btn" title="Add emoji">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                </button>
                <button 
                  className="comment-submit-btn"
                  disabled={!commentText.trim()}
                  onClick={() => {
                    if (commentText.trim()) {
                      console.log('Comment posted:', commentText);
                      setCommentText('');
                      setActiveCommentPostId(null);
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Count how many post types exist
  const hasThoughts = thoughts.length > 0;
  const hasMedia = media.length > 0;
  const hasMilestones = milestones.length > 0;
  
  // Calculate number of columns for adaptive layout
  const columnCount = [hasThoughts, hasMedia, hasMilestones].filter(Boolean).length;
  
  // Build flat array of all posts for mobile carousel
  const allPosts = [];
  if (hasThoughts) allPosts.push(...thoughts.map(p => ({ ...p, type: 'thoughts' })));
  if (hasMedia) allPosts.push(...media.map(p => ({ ...p, type: 'media' })));
  if (hasMilestones) allPosts.push(...milestones.map(p => ({ ...p, type: 'milestones' })));

  // Mobile: Render as horizontal carousel
  if (isMobile && allPosts.length > 1) {
    return (
      <div 
        className="timeline-river-row timeline-river-row--carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel-track" style={{ transform: `translateX(-${activeCardIndex * 100}%)` }}>
          {allPosts.map((post) => (
            <div key={post.id} className="carousel-card">
              {renderPostCard(post, post.type)}
            </div>
          ))}
        </div>
        
        <div className="carousel-controls">
          <button 
            className="carousel-btn carousel-btn--prev"
            onClick={() => setActiveCardIndex(prev => Math.max(0, prev - 1))}
            disabled={activeCardIndex === 0}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          
          <div className="carousel-indicators">
            {allPosts.map((_, index) => (
              <div 
                key={index} 
                className={`carousel-indicator ${index === activeCardIndex ? 'carousel-indicator--active' : ''}`}
                onClick={() => setActiveCardIndex(index)}
              />
            ))}
          </div>
          
          <button 
            className="carousel-btn carousel-btn--next"
            onClick={() => setActiveCardIndex(prev => Math.min(allPosts.length - 1, prev + 1))}
            disabled={activeCardIndex === allPosts.length - 1}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Desktop: Render as adaptive grid
  return (
    <div className={`timeline-river-row timeline-river-row--${columnCount}-col`}>
      {hasThoughts && (
        <div className="river-column">
          {thoughts.map(post => renderPostCard(post, 'thoughts'))}
        </div>
      )}
      {hasMedia && (
        <div className="river-column">
          {media.map(post => renderPostCard(post, 'media'))}
        </div>
      )}
      {hasMilestones && (
        <div className="river-column">
          {milestones.map(post => renderPostCard(post, 'milestones'))}
        </div>
      )}
    </div>
  );
}

export default TimelineRiverRow;
