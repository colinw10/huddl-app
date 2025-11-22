import { useMemo } from 'react';
import { groupPostsByUserAndDay, sortGroupedPosts } from '../utils/groupPosts';
import TimelineRiverRow from './TimelineRiverRow';
import './TimelineRiverFeed.css';

function TimelineRiverFeed({ posts, activeCommentPostId, setActiveCommentPostId, commentText, setCommentText }) {
  // Transform flat posts array into grouped structure
  const groupedAndSortedPosts = useMemo(() => {
    const grouped = groupPostsByUserAndDay(posts);
    return sortGroupedPosts(grouped);
  }, [posts]);

  const handleCommentClick = (postId) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null);
      setCommentText('');
    } else {
      setActiveCommentPostId(postId);
      setCommentText('');
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="timeline-river-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <p>No posts yet. Be the first to share!</p>
      </div>
    );
  }

  return (
    <div className="timeline-river-feed">
      {groupedAndSortedPosts.map(({ date, userId, data }) => (
        <div key={`${date}-${userId}`} className="timeline-river-section">
          {/* Date Header */}
          <div className="river-date-header">
            <div className="river-date-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {new Date(date).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="river-divider"></div>
          </div>

          {/* Timeline River Row */}
          <TimelineRiverRow
            rowData={data}
            onCommentClick={handleCommentClick}
            activeCommentPostId={activeCommentPostId}
            commentText={commentText}
            setCommentText={setCommentText}
            setActiveCommentPostId={setActiveCommentPostId}
          />
        </div>
      ))}
    </div>
  );
}

export default TimelineRiverFeed;
