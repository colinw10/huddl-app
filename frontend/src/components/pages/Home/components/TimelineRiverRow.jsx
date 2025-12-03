// 🔵 PABLO - UI Architect
// TimelineRiverRow.jsx - Single row in timeline showing one user's posts across 3 columns

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './TimelineRiverRow.scss';
import MediaLightbox from './MediaLightbox/MediaLightbox';

function TimelineRiverRow({ rowData, onCommentClick, activeCommentPostId, commentText, setCommentText, setActiveCommentPostId }) {
  // 🔵 Extract data from props
  const { user, thoughts, media, milestones } = rowData;
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  // Which card showing on mobile
  const [isMobile, setIsMobile] = useState(false);
  // Is screen < 650px?
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  // 🔵 State for mobile carousel
  const [activePostId, setActivePostId] = useState(null);  
  // Which column clicked
  
  // 🔵 State for desktop column interaction
  const [activeColumnType, setActiveColumnType] = useState(null); // Track which column is active
  const [expandedMediaPost, setExpandedMediaPost] = useState(null); 
  // Which media expanded
  // Track expanded media lightbox
  const [isComposerExpanded, setIsComposerExpanded] = useState(false);
  // Track if comment composer is in fullscreen expanded mode
  
  // 🔵 Smart Deck state - which card index is showing for each type
  const [deckIndex, setDeckIndex] = useState({
    thoughts: 0,
    media: 0,
    milestones: 0
  });
  
  // Cycle to next card in deck
  const nextCard = (type, totalCards) => {
    setDeckIndex(prev => ({
      ...prev,
      [type]: (prev[type] + 1) % totalCards
    }));
  };
  
  // Cycle to previous card in deck
  const prevCard = (type, totalCards) => {
    setDeckIndex(prev => ({
      ...prev,
      [type]: prev[type] === 0 ? totalCards - 1 : prev[type] - 1
    }));
  };
  
  // 🔵 Check if mobile on mount and resize
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
  
  const renderPostCard = (post, type, isCompact = false) => {
    // 🔵 Config for each post type (label, color)
    const typeConfig = {
      thoughts: { label: 'Thought', color: 'rgba(79, 255, 255, 0.15)', borderColor: 'rgba(79, 255, 255, 0.4)', textColor: '#4fffff' },
      media: { label: 'Media', color: 'rgba(167, 131, 255, 0.15)', borderColor: 'rgba(167, 131, 255, 0.4)', textColor: '#c9a8ff' },
      milestones: { label: 'Milestone', color: 'rgba(26, 231, 132, 0.15)', borderColor: 'rgba(26, 231, 132, 0.4)', textColor: '#1ae784' }
    };

    const config = typeConfig[type]; // Get config for this type
    
    // Determine if this is a single post in the row
    const isSinglePost = (type === 'thoughts' && thoughts.length === 1 && media.length === 0 && milestones.length === 0) ||
                         (type === 'media' && media.length === 1 && thoughts.length === 0 && milestones.length === 0) ||
                         (type === 'milestones' && milestones.length === 1 && thoughts.length === 0 && media.length === 0);
    
    // Check if this card is currently active (on top)
    const isActive = activePostId === post.id;

    return (
      <div 
        key={post.id} 
        className={`river-post-card post--${type} ${isSinglePost ? 'post--single' : ''} ${isActive ? 'post--active' : ''} ${isCompact ? 'post--compact' : ''} fade-in hover-lift`}
        onClick={() => setActivePostId(post.id)}
        style={{ zIndex: isActive ? 100 : 'auto' }}
      >
        {/* Header: Avatar + Name + Type Badge */}
        <div className="river-post-header">
          <div className="river-avatar"> { /* SVG icon */ }
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className="river-post-info">
            <div className="river-author">{user.name}</div>
            <div className="river-meta">
              <span className="river-type-badge" style={{ 
                background: config.color, 
                borderColor: config.borderColor,
                color: config.textColor 
              }}>
                {type === 'thoughts' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                )}
                {type === 'media' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                )}
                {type === 'milestones' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                )}
                {config.label}
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

       {/* Media Image (only for media posts) */}
        {type === 'media' && post.media_url && (
          <div className="river-post-media" onClick={(e) => {
            e.stopPropagation();
            setExpandedMediaPost(post);
          }}>
            <img src={post.media_url} alt="Post media" className="river-media-image" />
            <div className="media-expand-hint">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
          </div>
        )}
         {/* Post Content */}
        <p className="river-post-content">{post.content}</p>
         
         {/* Likes */}
        <div className="river-post-likes">
          <svg width="18" height="18" viewBox="0 0 24 24">{ /* Heart icon */ }
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

        {/* Action Buttons */}
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

        {/* Inline Comment Composer - only shown when NOT expanded */}
        {activeCommentPostId === post.id && !isComposerExpanded && (
          <div className="inline-comment-composer">
            <div className="comment-input-wrapper">
              <textarea
                className="comment-input"
                placeholder="Comment..."
                value={commentText}
                onChange={(e) => {
                  setCommentText(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                rows={1}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (commentText.trim()) {
                      console.log('Comment posted:', commentText);
                      setCommentText('');
                      setActiveCommentPostId(null);
                      e.target.style.height = 'auto';
                    }
                  }
                  if (e.key === 'Escape') {
                    setActiveCommentPostId(null);
                    setCommentText('');
                  }
                }}
              />
              {/* Expand button - inside input, bottom right */}
              <button 
                className="expand-composer-btn"
                onClick={() => setIsComposerExpanded(true)}
                title="Expand"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9"/>
                  <polyline points="9 21 3 21 3 15"/>
                  <line x1="21" y1="3" x2="14" y2="10"/>
                  <line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              </button>
            </div>
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}

        {/* Expanded Composer Modal - rendered via portal */}
        {activeCommentPostId === post.id && isComposerExpanded && createPortal(
          <div className="expanded-composer-overlay">
            <div 
              className="composer-backdrop"
              onClick={() => setIsComposerExpanded(false)}
            />
            <div className="expanded-composer-modal">
              {/* Original Post Context - what they're replying to */}
              <div className="reply-context">
                <img 
                  src={user.avatar} 
                  alt={user.display_name}
                  className="reply-context-avatar"
                />
                <div className="reply-context-body">
                  <div className="reply-context-header">
                    <span className="reply-context-name">{user.display_name}</span>
                    <span className="reply-context-handle">@{user.username}</span>
                    <span className="reply-context-dot">·</span>
                    <span className="reply-context-time">{post.timestamp}</span>
                    <span className={`reply-context-type reply-context-type--${type}`}>
                      {type === 'thoughts' && '💭'}
                      {type === 'media' && '📸'}
                      {type === 'milestones' && '🏆'}
                    </span>
                  </div>
                  
                  {/* Post content */}
                  <p className="reply-context-content">{post.content}</p>
                  
                  {/* Media preview if applicable */}
                  {type === 'media' && post.media_url && (
                    <div className="reply-context-media">
                      <img src={post.media_url} alt="Post media" />
                    </div>
                  )}
                </div>
              </div>

              {/* Reply divider */}
              <div className="reply-divider">
                <span className="reply-divider-line"></span>
                <span className="reply-divider-text">Replying</span>
                <span className="reply-divider-line"></span>
              </div>

              {/* Comment input area */}
              <div className="modal-comment-area">
                <div className="comment-input-wrapper">
                  <textarea
                    className="comment-input"
                    placeholder="Share your thoughts..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={4}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (commentText.trim()) {
                          console.log('Comment posted:', commentText);
                          setCommentText('');
                          setActiveCommentPostId(null);
                          setIsComposerExpanded(false);
                        }
                      }
                      if (e.key === 'Escape') {
                        setIsComposerExpanded(false);
                      }
                    }}
                  />
                  {/* Minimize button - inside textarea */}
                  <button 
                    className="minimize-composer-btn"
                    onClick={() => setIsComposerExpanded(false)}
                    title="Minimize"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="4 14 10 14 10 20"/>
                      <polyline points="20 10 14 10 14 4"/>
                      <line x1="14" y1="10" x2="21" y2="3"/>
                      <line x1="3" y1="21" x2="10" y2="14"/>
                    </svg>
                  </button>
                </div>
                <button 
                  className="comment-submit-btn"
                  disabled={!commentText.trim()}
                  onClick={() => {
                    if (commentText.trim()) {
                      console.log('Comment posted:', commentText);
                      setCommentText('');
                      setActiveCommentPostId(null);
                      setIsComposerExpanded(false);
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  };
  // Mobile vs Desktop Rendering
  // Count how many post types exist
  const hasThoughts = thoughts.length > 0;
  const hasMedia = media.length > 0;
  const hasMilestones = milestones.length > 0;
  
  // Calculate number of columns for adaptive layout
  const columnCount = [hasThoughts, hasMedia, hasMilestones].filter(Boolean).length;
  
  // Desktop navigation handlers
  const handleNextColumn = () => {
    const columns = [hasThoughts && 'thoughts', hasMedia && 'media', hasMilestones && 'milestones'].filter(Boolean);
    const currentIndex = columns.indexOf(activeColumnType);
    const nextIndex = (currentIndex + 1) % columns.length;
    setActiveColumnType(columns[nextIndex]);
  };
  
  const handlePrevColumn = () => {
    const columns = [hasThoughts && 'thoughts', hasMedia && 'media', hasMilestones && 'milestones'].filter(Boolean);
    const currentIndex = columns.indexOf(activeColumnType);
    const prevIndex = currentIndex <= 0 ? columns.length - 1 : currentIndex - 1;
    setActiveColumnType(columns[prevIndex]);
  };
  
  const handleCloseActiveColumn = () => {
    setActiveColumnType(null);
  };
  
  // 🔵 Build flat array for mobile
  const allPosts = [];
  if (hasThoughts) allPosts.push(...thoughts.map(p => ({ ...p, type: 'thoughts' })));
  if (hasMedia) allPosts.push(...media.map(p => ({ ...p, type: 'media' })));
  if (hasMilestones) allPosts.push(...milestones.map(p => ({ ...p, type: 'milestones' })));

  // 🟢 MOBILE: Carousel (swipe through cards)
  if (isMobile && allPosts.length > 1) {
    return (
      <div className="timeline-river-row-wrapper">
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
           {/* Prev/Next buttons */}
           {/* Dot indicators */}
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
        
        {/* Media Lightbox (fullscreen image view) - also needed in mobile */}
        <MediaLightbox 
          post={expandedMediaPost}
          onClose={() => setExpandedMediaPost(null)}
          commentText={commentText}
          setCommentText={setCommentText}
        />
      </div>
    );
  }

  // 🔵 Smart Deck renderer - shows one card at a time, cycle through
  const renderSmartDeck = (posts, type) => {
    if (posts.length === 0) return null;
    
    const currentIndex = deckIndex[type];
    const currentPost = posts[currentIndex];
    const totalCards = posts.length;
    
    const typeConfig = {
      thoughts: { label: 'Thoughts', color: '#4fffff' },
      media: { label: 'Media', color: '#c9a8ff' },
      milestones: { label: 'Milestones', color: '#1ae784' }
    };
    const config = typeConfig[type];
    
    // SVG icons for each type
    const typeIcons = {
      thoughts: (
        <svg className="smart-deck-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      ),
      media: (
        <svg className="smart-deck-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      ),
      milestones: (
        <svg className="smart-deck-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      )
    };
    
    return (
      <div className={`smart-deck smart-deck--${type}`}>
        {/* Deck Header with count and navigation */}
        <div className="smart-deck-header">
          <span className="smart-deck-icon">{typeIcons[type]}</span>
          <span className="smart-deck-count" style={{ color: config.color }}>
            {totalCards}
          </span>
          <span className="smart-deck-label">{config.label}</span>
          
          {/* Card position indicator */}
          {totalCards > 1 && (
            <span className="smart-deck-position">
              {currentIndex + 1}/{totalCards}
            </span>
          )}
        </div>
        
        {/* Current card */}
        <div className="smart-deck-card-container">
          {renderPostCard(currentPost, type)}
        </div>
        
        {/* Navigation for multiple cards */}
        {totalCards > 1 && (
          <div className="smart-deck-nav">
            <button 
              className="smart-deck-nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                prevCard(type, totalCards);
              }}
              aria-label="Previous card"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            
            {/* Dot indicators */}
            <div className="smart-deck-dots">
              {posts.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`smart-deck-dot ${idx === currentIndex ? 'smart-deck-dot--active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeckIndex(prev => ({ ...prev, [type]: idx }));
                  }}
                />
              ))}
            </div>
            
            <button 
              className="smart-deck-nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                nextCard(type, totalCards);
              }}
              aria-label="Next card"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  };

  // Desktop: Render as adaptive grid with Smart Decks
  // 🟢 DESKTOP: 3 Columns Side-by-Side
  return (
    <div className={`timeline-river-row timeline-river-row--${columnCount}-col`}>
      {hasThoughts && renderSmartDeck(thoughts, 'thoughts')}
      {hasMedia && renderSmartDeck(media, 'media')}
      {hasMilestones && renderSmartDeck(milestones, 'milestones')}
      
      {/* Desktop navigation controls - only show for stacked 3-col layout when a card is active */}
      {columnCount === 3 && activeColumnType && (
        <div className="desktop-stack-nav">
          <button 
            className="desktop-stack-close"
            onClick={handleCloseActiveColumn}
            title="Close (Esc)"
          >
            ×
          </button>
          <button 
            className="desktop-stack-btn desktop-stack-btn--prev"
            onClick={handlePrevColumn}
            title="Previous card"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button 
            className="desktop-stack-btn desktop-stack-btn--next"
            onClick={handleNextColumn}
            title="Next card"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      )}

       {/* Media Lightbox (fullscreen image view) */}
      <MediaLightbox 
        post={expandedMediaPost}
        onClose={() => setExpandedMediaPost(null)}
        commentText={commentText}
        setCommentText={setCommentText}
      />
    </div>
  );
}

export default TimelineRiverRow;
