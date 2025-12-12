/**
 * ============================================================================
 * ACTIVITY VISUALIZATION COMPONENT
 * ============================================================================
 * 
 * File: frontend/src/components/pages/Profile/components/ProfileCard/components/ActivityVisualization/ActivityVisualization.jsx
 * Assigned to: NATALIA
 * 
 * Visual display of user activity (posts over time).
 * 
 * TODO:
 * - [ ] Process posts data into chart-friendly format
 * - [ ] Show activity as a chart/graph (bars, dots, heatmap)
 * - [ ] Display post frequency by day/week/month
 * - [ ] Handle empty state
 * - [ ] Animate on load
 * 
 * Props:
 *   - posts: array of user posts
 * 
 * ============================================================================
 */

import { useMemo } from 'react';
import './ActivityVisualization.scss';

const ActivityVisualization = ({ posts = [] }) => {
  const activityData = useMemo(() => {
    // TODO: Process posts into chart-friendly data
    // Group by date, count per day, etc.
    return [];
  }, [posts]);

  if (!posts.length) {
    return <div className="activity-viz empty">No activity yet</div>;
  }

  return (
    <div className="activity-viz">
      {/* TODO: Render visualization (bars, dots, heatmap, etc.) */}
      <p>ActivityVisualization - Implement me!</p>
    </div>
  );
};

export default ActivityVisualization;
