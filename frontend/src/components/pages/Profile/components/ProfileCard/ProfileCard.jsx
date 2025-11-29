/**
 * =============================================================================
 * PROFILE CARD - Flip Card Component
 * =============================================================================
 * 
 * File: frontend/src/components/pages/Profile/components/ProfileCard/ProfileCard.jsx
 * Assigned to: CRYSTAL
 * Responsibility: Flip card with user info (front) and analytics (back)
 * 
 * TODO:
 * - [ ] Create flip card container with CSS 3D transform
 * - [ ] Front side: ProfileCardFront (avatar, name, bio, stats)
 * - [ ] Back side: ProfileCardBack (activity chart, post breakdown)
 * - [ ] Add flip button/trigger
 * - [ ] Smooth flip animation
 * - [ ] Responsive sizing
 * 
 * Props:
 * - user: { username, avatar, bio, followers, following, posts }
 * - isFlipped: boolean
 * - onFlip: function
 * 
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React, { useState } from 'react';
import './ProfileCard.scss';

// TODO: Crystal - Import sub-components
// import ProfileCardFront from './components/ProfileCardFront';
// import ProfileCardBack from './components/ProfileCardBack';

function ProfileCard({ user }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div className={`profile-card ${isFlipped ? 'flipped' : ''}`}>
      <p>Crystal: Build the ProfileCard flip component</p>
      
      <div className="card-inner">
        {/* Front Side */}
        <div className="card-front">
          {/* TODO: Add ProfileCardFront */}
        </div>
        
        {/* Back Side */}
        <div className="card-back">
          {/* TODO: Add ProfileCardBack */}
        </div>
      </div>
      
      <button onClick={handleFlip}>Flip Card</button>
    </div>
  );
}

export default ProfileCard;
