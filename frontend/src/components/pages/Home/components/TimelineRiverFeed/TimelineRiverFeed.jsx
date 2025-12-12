/**
 * ============================================================================
 * TIMELINE RIVER FEED COMPONENT
 * ============================================================================
 * 
 * File: TimelineRiverFeed.jsx
 * Assigned to: TITO
 * 
 * Feed component that renders list of posts.
 * 
 * TODO:
 * - [ ] Accept posts array as prop
 * - [ ] Map and render TimelineRiverRow for each post
 * - [ ] Handle empty state
 * - [ ] Handle loading state
 * 
 * Props:
 *   - posts: array of posts
 *   - loading: boolean
 *   - onDeletePost: function(postId)
 *   - onEditPost: function(postId, content)
 * 
 * ============================================================================
 */

import './TimelineRiverFeed.scss';

const TimelineRiverFeed = ({ posts = [], loading, onDeletePost, onEditPost }) => {
  if (loading) {
    return <div className="timeline-feed loading">Loading posts...</div>;
  }

  if (!posts.length) {
    return <div className="timeline-feed empty">No posts yet</div>;
  }

  return (
    <div className="timeline-feed">
      {/* TODO: Map posts and render TimelineRiverRow for each */}
      <p>TimelineRiverFeed - Implement me!</p>
    </div>
  );
};

export default TimelineRiverFeed;
