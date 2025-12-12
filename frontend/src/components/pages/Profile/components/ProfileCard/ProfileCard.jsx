/**
 * ============================================================================
 * PROFILE CARD COMPONENT
 * ============================================================================
 * 
 * File: frontend/src/components/pages/Profile/components/ProfileCard/ProfileCard.jsx
 * Assigned to: CRYSTAL
 * 
 * Flippable profile card container.
 * 
 * TODO:
 * - [ ] Handle flip animation state
 * - [ ] Render ProfileCardFront (default)
 * - [ ] Render ProfileCardBack (when flipped)
 * - [ ] Pass user data to child components
 * - [ ] CSS 3D flip animation
 * 
 * Props:
 *   - user: { id, username, email, avatar, bio, posts, friends }
 * 
 * ============================================================================
 */

import { useState } from 'react';
import './ProfileCard.scss';

const ProfileCard = ({ user }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`profile-card ${isFlipped ? 'flipped' : ''}`}>
      <div className="profile-card-inner">
        {/* TODO: Render ProfileCardFront */}
        {/* TODO: Render ProfileCardBack */}
        <p>ProfileCard - Implement me!</p>
      </div>
    </div>
  );
};

export default ProfileCard;
