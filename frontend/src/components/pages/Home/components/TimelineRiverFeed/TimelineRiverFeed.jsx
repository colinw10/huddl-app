// 🔵 PABLO - UI/Styling | 🟢 COLIN + 🟠 TITO - Posts Data Logic
// TimelineRiverFeed.jsx - Main timeline feed with 3-column river layout

import { groupPostsByUserAndDay, sortGroupedPosts } from '../../utils/groupPosts';
import TimelineRiverRow from '../TimelineRiverRow';
import './TimelineRiverFeed.scss';

function TimelineRiverFeed({ posts, activeCommentPostId, setActiveCommentPostId, commentText, setCommentText, onDeletePost, onUpdatePost }) {
  // Transform flat posts array into grouped structure (no memoization - always fresh)
  const grouped = groupPostsByUserAndDay(posts);
  const groupedAndSortedPosts = sortGroupedPosts(grouped);

  // 🔵 Handle comment toggle (open/close comment box)
  const handleCommentClick = (postId) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null);  // Close if already open
      setCommentText('');
    } else {
      setActiveCommentPostId(postId); // Open this post's comment box
      setCommentText('');
    }
  };
// 🔵 Empty state: Show message if no posts
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
// 🟢 Main render: Loop through grouped posts
  return (
    <div className="timeline-river-feed">
      {/* Canopy shadow overlay */}
      <div className="timeline-canopy"></div>
      {groupedAndSortedPosts.map(({ date, oderId, data }) => (
        // Loop through each user group

        <div key={oderId} className="timeline-river-section">
          {/* 🎨 Last Active Header */}
          <div className="river-date-header">
            <div className="river-date-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Last active: {new Date(date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric'
              })}
            </div>
            <div className="river-divider"></div>
          </div>

          {/* 🟢 Timeline River Row (renders 3 columns: thoughts, media, milestones) */}
          <TimelineRiverRow
            rowData={data} // ⚠️ Passes grouped data to child
            onCommentClick={handleCommentClick}
            activeCommentPostId={activeCommentPostId}
            commentText={commentText}
            setCommentText={setCommentText}
            setActiveCommentPostId={setActiveCommentPostId}
            onDeletePost={onDeletePost}
            onUpdatePost={onUpdatePost}
          />
        </div>
      ))}
    </div>
  );
}

export default TimelineRiverFeed;
