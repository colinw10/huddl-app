/**
 * ============================================================================
 * POST TYPE BREAKDOWN COMPONENT
 * ============================================================================
 * 
 * File: PostTypeBreakdown.jsx
 * Assigned to: CRYSTAL
 * 
 * Visual breakdown of post types on profile.
 * 
 * TODO:
 * - [ ] Calculate percentage/count per post type
 * - [ ] Simple chart or visual display (bars, pie, etc.)
 * - [ ] Handle empty state
 * 
 * Props:
 *   - posts: array of posts
 * 
 * ============================================================================
 */

import { useMemo } from 'react';
import './PostTypeBreakdown.scss';

const PostTypeBreakdown = ({ posts = [] }) => {
  const breakdown = useMemo(() => {
    // TODO: Calculate counts per post type
    return {};
  }, [posts]);

  return (
    <div className="post-type-breakdown">
      {/* TODO: Render breakdown chart/bars */}
      <p>PostTypeBreakdown - Implement me!</p>
    </div>
  );
};

export default PostTypeBreakdown;
