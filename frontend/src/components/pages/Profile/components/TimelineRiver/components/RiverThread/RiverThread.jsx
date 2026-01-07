/**
 * RiverThread - Displays replies/comments for a post
 * 
 * Features:
 * - "View X replies" collapsed state
 * - Expandable reply list (shows 3, then "show more")
 * - Edit/delete for reply owner
 * - Inline edit form
 * 
 * 🔗 CONNECTION: Used by TimelineRiver.jsx for thread display
 */
import { UserIcon, EditIcon, TrashIcon } from '@assets/icons';

const RiverThread = ({
  post,
  isExpanded,
  replies = [],
  isLoading,
  showAllReplies,
  currentUserId,
  editingReplyId,
  editingReplyContent,
  formatRelativeTime,
  onToggleThread,
  onShowMore,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onDelete,
}) => {
  if (!post) return null;

  const replyCount = post.reply_count || 0;

  // === COLLAPSED STATE: "View X replies" button ===
  if (!isExpanded && replyCount > 0) {
    return (
      <button className="view-thread-btn" onClick={() => onToggleThread?.(post.id)}>
        <span className="thread-line" />
        View {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
      </button>
    );
  }

  // === EXPANDED STATE: Show replies ===
  if (!isExpanded) return null;

  const visibleReplies = showAllReplies ? replies : replies.slice(0, 3);
  const hasMore = replies.length > 3 && !showAllReplies;

  return (
    <div className="thread-view">
      <button className="collapse-thread-btn" onClick={() => onToggleThread?.(post.id)}>
        Hide replies
      </button>

      {isLoading ? (
        <div className="thread-loading">Loading replies...</div>
      ) : (
        <div className="thread-replies">
          {visibleReplies.map((reply) => (
            <div key={reply.id} className="thread-reply">
              <div className="thread-connector">
                <div className="thread-line-vertical" />
              </div>
              <div className="reply-card">
                <div className="reply-header">
                  <div className="reply-avatar">
                    <UserIcon size={14} />
                  </div>
                  <span className="reply-author">{reply.author?.username || 'User'}</span>
                  <span className="reply-time">{formatRelativeTime?.(reply.created_at)}</span>

                  {/* Edit/Delete for reply owner */}
                  {currentUserId && reply.author?.id === currentUserId && (
                    <div className="reply-actions">
                      <button
                        className="reply-action-btn"
                        title="Edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditStart?.(reply.id, reply.content, post.id);
                        }}
                      >
                        <EditIcon size={14} />
                      </button>
                      <button
                        className="reply-action-btn reply-action-btn--delete"
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete?.(reply.id, post.id);
                        }}
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Reply content - edit mode or display */}
                {editingReplyId === reply.id ? (
                  <div className="reply-edit-form">
                    <textarea
                      className="reply-edit-input"
                      value={editingReplyContent}
                      onChange={(e) => onEditChange?.(e.target.value)}
                      autoFocus
                    />
                    <div className="reply-edit-actions">
                      <button
                        className="reply-edit-btn reply-edit-btn--cancel"
                        onClick={onEditCancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="reply-edit-btn reply-edit-btn--save"
                        onClick={() => onEditSave?.(reply.id, post.id)}
                        disabled={!editingReplyContent?.trim()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="reply-content">{reply.content}</p>
                )}
              </div>
            </div>
          ))}

          {hasMore && (
            <button className="show-more-replies-btn" onClick={() => onShowMore?.(post.id)}>
              Show {replies.length - 3} more replies
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RiverThread;
