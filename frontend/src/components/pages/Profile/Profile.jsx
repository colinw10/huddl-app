/**
 * ============================================================================
 * PROFILE COMPONENT
 * ============================================================================
 * 
 * File: frontend/src/components/pages/Profile/Profile.jsx
 * Assigned to: TITO
 * 
 * User profile page container.
 * 
 * TODO:
 * - [ ] Fetch user data from API (or use current user)
 * - [ ] Render ProfileCard component
 * - [ ] Render TimelineRiver with user's posts
 * - [ ] Handle own profile vs other user's profile
 * - [ ] Edit profile functionality (if own profile)
 * 
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.scss';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user data
    // If no userId param, use current logged in user
  }, [userId]);

  if (loading) {
    return <div className="profile-page loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      {/* TODO: Render ProfileCard */}
      {/* TODO: Render TimelineRiver */}
      <p>Profile - Implement me!</p>
    </div>
  );
};

export default Profile;
