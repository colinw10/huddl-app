// ProfileCardFront.jsx - Public profile view (front of flip card)
// 🔵 PABLO - UI/Styling

import { useState, useRef } from 'react';
import './ProfileCardFront.scss';

// Color variants for interactive letters
const colorVariants = ['magenta', 'cyan', 'aqua', 'purple', 'blue'];

function ProfileCardFront({ setIsFlipped, posts, user }) {
  // Track which letters have been hovered (for "hover all" replay)
  const hoveredRef = useRef(new Set());
  const isAnimatingRef = useRef(false);
  const [replayGlitch, setReplayGlitch] = useState(false);
  
  // Username IS the display name
  const displayName = user?.username || 'User';
  
  // Track letter hovers - when all letters are hovered, trigger replay
  const handleLetterHover = (index) => {
    if (isAnimatingRef.current) return;
    
    hoveredRef.current.add(index);
    
    if (hoveredRef.current.size === displayName.replace(/\s/g, '').length) {
      isAnimatingRef.current = true;
      hoveredRef.current = new Set();
      
      setReplayGlitch('reset');
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setReplayGlitch('replay');
          
          setTimeout(() => {
            setReplayGlitch(false);
            isAnimatingRef.current = false;
          }, 4000);
        });
      });
    }
  };
  
  // Render name with interactive letters
  const renderInteractiveName = () => {
    let letterIndex = 0;
    return displayName.split('').map((char, i) => {
      if (char === ' ') {
        return <span key={i} className="name-space">&nbsp;</span>;
      }
      const currentIndex = letterIndex;
      const colorVariant = colorVariants[letterIndex % colorVariants.length];
      const hoverDelay = 0.05 + (letterIndex % 5) * 0.02; // Stagger delays
      letterIndex++;
      return (
        <span
          key={i}
          className={`name-letter name-letter--${colorVariant}`}
          style={{ '--hover-delay': `${hoverDelay}s` }}
          data-letter={char}
          onMouseEnter={() => handleLetterHover(currentIndex)}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className="profile-card-front">
      <div className="profile-header river-header">
        <div className="profile-header-bg">
          {/* Background image placeholder */}
        </div>
        
        {/* Overlapping avatar container with engagement ring */}
        <div className="avatar-wrapper">
          <div className="avatar-engagement-ring">
            <svg width="130" height="130" viewBox="0 0 130 130">
              {/* Background ring */}
              <circle 
                className="ring-bg" 
                cx="65" cy="65" r="60" 
                fill="none" 
                stroke="rgba(255,255,255,0.15)" 
                strokeWidth="4"
              />
              {/* Progress ring - animates on load */}
              <circle 
                className="ring-progress" 
                cx="65" cy="65" r="60" 
                fill="none" 
                stroke="#1ae784"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="377"
                strokeDashoffset="377"
                transform="rotate(-90 65 65)"
              />
              {/* Spark/particle at the end of progress */}
              <circle 
                className="ring-spark"
                cx="65" cy="5"
                r="5"
                fill="#1ae784"
              />
            </svg>
          </div>
          <div className="profile-avatar">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Two-Column Profile Meta */}
      <div className="profile-meta river-meta">
        {/* LEFT COLUMN */}
        <div className="profile-left-column">
          <div className="profile-name-section">
            <h1 className={`profile-display-name profile-display-name--interactive ${replayGlitch === 'reset' ? 'profile-display-name--reset' : ''} ${replayGlitch === 'replay' ? 'profile-display-name--replay' : ''}`}>
              {renderInteractiveName()}
            </h1>
            <span className="profile-handle">@pabloPistola</span>
            <div className="profile-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Brooklyn, NY</span>
            </div>
          </div>

          {/* Bio Section */}
          <div className="profile-bio">
            <p>A Sentient Android | Being Human</p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="profile-right-column">
          {/* Profile Details - Each on Own Row */}
          <div className="profile-details">
            <div className="profile-detail-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              <a href="https://github.com/pablodcordero" target="_blank" rel="noopener noreferrer">github.com/Cordero080</a>
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
          
          {/* Stats - Posts only */}
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-count">{posts.length}</span>
              <span className="stat-label">Posts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Icons - Right Side */}
      <div className="profile-actions-pill">
        <button className="action-icon-btn share-btn" title="Share Profile">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </button>
        <button className="action-icon-btn more-btn" title="More Options">
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
    </div>
  );
}

export default ProfileCardFront;
