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
      {groupedAndSortedPosts.map(({ date, userId, data }) => (
        // Loop through each group

        <div key={`${date}-${userId}`} className="timeline-river-section">
          {/* 🎨 Date Header (e.g., "Mon, Jan 15, 2024") */}
          <div className="river-date-header">
            <div className="river-date-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {new Date(date).toLocaleDateString('en-US', { 
                month: 'numeric', 
                day: 'numeric',
                year: '2-digit'
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
