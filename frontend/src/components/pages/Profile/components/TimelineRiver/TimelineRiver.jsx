/**
 * ============================================================================
 * TIMELINE RIVER COMPONENT
 * ============================================================================
 * 
 * File: frontend/src/components/pages/Profile/components/TimelineRiver/TimelineRiver.jsx
 * Assigned to: COLIN
 * 
 * Scrollable timeline showing user's posts in chronological order.
 * 
 * TODO:
 * - [ ] Fetch user's posts from API
 * - [ ] Display posts as cards in a vertical river/feed
 * - [ ] Handle loading and empty states
 * - [ ] Add scroll-based animations
 * - [ ] Infinite scroll or pagination
 * 
 * Props:
 *   - userId: number
 * 
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import './TimelineRiver.scss';

const TimelineRiver = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch posts for userId from API
  }, [userId]);

  if (loading) {
    return <div className="timeline-river loading">Loading...</div>;
  }

  return (
    <div className="timeline-river">
      {/* TODO: Map through posts and render each one */}
      <p>TimelineRiver - Implement me!</p>
    </div>
  );
};

export default TimelineRiver;
