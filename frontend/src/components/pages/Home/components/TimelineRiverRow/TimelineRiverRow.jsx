// 🔵 PABLO - UI Architect
// TimelineRiverRow.jsx - Single row in timeline showing one user's posts across 3 columns

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './TimelineRiverRow.scss';
import MediaLightbox from '../MediaLightbox/MediaLightbox';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';
import { useAuth, usePosts, useMessages } from '../../../../../contexts';
import { 
  UserIcon, 
  HeartDynamicIcon, 
  MessageBubbleIcon, 
  RepostIcon, 
  BookmarkIcon,
  MessageLineIcon,
  GraphLineIcon,
  EditIcon,
  TrashIcon,
  MaximizeIcon,
  MinimizeIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckIcon,
  CloseIcon,
  ImageIcon,
  MilestoneIcon,
  StarIcon,
  ThoughtBubbleIcon
} from '../../../../../assets/icons';

// Helper function to format relative time (e.g., "2h ago", "3d ago")
const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  
  if (diffSeconds < 60) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  
  // For older posts, show the date
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

function TimelineRiverRow({ rowData, onCommentClick, activeCommentPostId, commentText, setCommentText, setActiveCommentPostId, onDeletePost, onUpdatePost }) {
  // 🔵 Extract data from props
  const { user } = rowData;
  const { user: currentUser } = useAuth();
  const { posts, fetchReplies, createReply, deletePost, updatePost, likePost, sharePost } = usePosts();
  const { openMessages } = useMessages(); // 🔵 For DM button on posts
  const navigate = useNavigate(); // 🔵 For profile navigation
  
  // Navigate to user's profile when clicking their name/avatar
  const handleUserClick = (e, userId, username) => {
    e.stopPropagation();
    // If it's the current user, go to /profile, otherwise go to /profile/:username
    if (currentUser?.id === userId || currentUser?.username === username) {
      navigate('/profile');
    } else {
      navigate(`/profile/${username}`);
    }
  };
  
  // Get fresh post data from context (rowData may have stale snapshots)
  const getFreshPost = (postId) => posts.find(p => p.id === postId);
  
  // Map rowData posts to fresh versions from context
  const thoughts = (rowData.thoughts || []).map(p => getFreshPost(p.id) || p);
  const media = (rowData.media || []).map(p => getFreshPost(p.id) || p);
  const milestones = (rowData.milestones || []).map(p => getFreshPost(p.id) || p);
  
  // 🔵 Calculate which post type was most recently posted
  const getMostRecentType = () => {
    const getLatestTimestamp = (arr) => {
      if (!arr.length) return 0;
      return Math.max(...arr.map(p => new Date(p.createdAt || p.created_at || 0).getTime()));
    };
    
    const timestamps = {
      thoughts: getLatestTimestamp(thoughts),
      media: getLatestTimestamp(media),
      milestones: getLatestTimestamp(milestones)
    };
    
    // Find the type with the highest timestamp
    let mostRecent = null;
    let maxTime = 0;
    for (const [type, time] of Object.entries(timestamps)) {
      if (time > maxTime) {
        maxTime = time;
        mostRecent = type;
      }
    }
    return mostRecent;
  };
  
  const mostRecentType = getMostRecentType();
  
  // State for edit mode
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingReplyParentId, setEditingReplyParentId] = useState(null); // Track parent if editing a reply
  const [editContent, setEditContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // State for delete modal
  const [deleteModalPostId, setDeleteModalPostId] = useState(null);
  const [deleteModalParentId, setDeleteModalParentId] = useState(null); // Track if deleting a reply (has parent)
  const [isDeleting, setIsDeleting] = useState(false);
  
  // State for thread view (expanded replies)
  const [expandedThreadId, setExpandedThreadId] = useState(null);
  const [threadReplies, setThreadReplies] = useState({});
  const [loadingThread, setLoadingThread] = useState(null);
  const [showAllReplies, setShowAllReplies] = useState({}); // Track which posts show all replies
  
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  // Which card showing on mobile
  const [isMobile, setIsMobile] = useState(false);
  // Is screen < 650px?
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  // 🔵 State for mobile tab navigation
  const [mobileActiveTab, setMobileActiveTab] = useState('thoughts'); // 'thoughts' | 'media' | 'milestones'
  const [mobileCardIndex, setMobileCardIndex] = useState({ thoughts: 0, media: 0, milestones: 0 });
  
  // 🔵 State for desktop column interaction
  const [activeColumnType, setActiveColumnType] = useState(null); // Track which column is active
  const [activePostId, setActivePostId] = useState(null); // Track which post card is active
  const [expandedMediaPost, setExpandedMediaPost] = useState(null); 
  // Which media expanded
  // Track expanded media lightbox
  const [isComposerExpanded, setIsComposerExpanded] = useState(false);
  // Track if comment composer is in fullscreen expanded mode
  const [isEditMode, setIsEditMode] = useState(false);
  // Track if expanded composer is for editing (vs commenting)
  
  // 🔵 Smart Deck state - which card index is showing for each type
  const [deckIndex, setDeckIndex] = useState({
    thoughts: 0,
    media: 0,
    milestones: 0
  });
  
  // Cycle to next card in deck
  const nextCard = (type, totalCards) => {
    setDeckIndex(prev => ({
      ...prev,
      [type]: (prev[type] + 1) % totalCards
    }));
  };
  
  // Cycle to previous card in deck
  const prevCard = (type, totalCards) => {
    setDeckIndex(prev => ({
      ...prev,
      [type]: prev[type] === 0 ? totalCards - 1 : prev[type] - 1
    }));
  };
  
  // 🔵 Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 650);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    const allPosts = [];
    if (thoughts.length > 0) allPosts.push(...thoughts.map(p => ({ ...p, type: 'thoughts' })));
    if (media.length > 0) allPosts.push(...media.map(p => ({ ...p, type: 'media' })));
    if (milestones.length > 0) allPosts.push(...milestones.map(p => ({ ...p, type: 'milestones' })));
    
    if (isLeftSwipe && activeCardIndex < allPosts.length - 1) {
      setActiveCardIndex(prev => prev + 1);
    }
    if (isRightSwipe && activeCardIndex > 0) {
      setActiveCardIndex(prev => prev - 1);
    }
    
    setTouchStartX(0);
    setTouchEndX(0);
  };
  
  // Toggle thread view and load replies
  const toggleThread = async (postId) => {
    if (expandedThreadId === postId) {
      // Collapse if already open
      setExpandedThreadId(null);
    } else {
      // Expand and load replies
      setExpandedThreadId(postId);
      if (!threadReplies[postId]) {
        setLoadingThread(postId);
        const result = await fetchReplies(postId);
        if (result.success) {
          setThreadReplies(prev => ({ ...prev, [postId]: result.data }));
        }
        setLoadingThread(null);
      }
    }
  };
  
  // Handle reply submission
  const handleReplySubmit = async (postId, content) => {
    const result = await createReply(postId, { content, type: 'thoughts' });
    if (result.success) {
      // Add new reply to local state
      setThreadReplies(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), result.data]
      }));
      return true;
    }
    return false;
  };
  
  const renderPostCard = (post, type) => {
    // Auto-detect short content for compact width (under 80 chars, no media)
    const contentLength = (post.content || '').length;
    const hasNoMedia = !post.image && !post.media_url;
    const isShortPost = contentLength < 80 && hasNoMedia;
    
    // Determine if this is a single post in the row
    const isSinglePost = (type === 'thoughts' && thoughts.length === 1 && media.length === 0 && milestones.length === 0) ||
                         (type === 'media' && media.length === 1 && thoughts.length === 0 && milestones.length === 0) ||
                         (type === 'milestones' && milestones.length === 1 && thoughts.length === 0 && media.length === 0);
    
    // Check if this card is currently active (on top)
    const isActive = activePostId === post.id;

    return (
      <div 
        key={post.id} 
        className={`river-post-card post--${type} ${isSinglePost ? 'post--single' : ''} ${isActive ? 'post--active' : ''} ${isShortPost ? 'post--compact' : ''} fade-in hover-lift`}
        onClick={() => setActivePostId(post.id)}
        style={{ zIndex: isActive ? 100 : 'auto' }}
      >
        {/* Header: Avatar + Name + Type Badge */}
        <div className="river-post-header">
          <div 
            className="river-avatar clickable-user" 
            onClick={(e) => handleUserClick(e, user.id, user.username)}
            title={`View ${user.name}'s profile`}
          >
            <UserIcon size={24} />
          </div>
          <div className="river-post-info">
            <div 
              className="river-author clickable-user"
              onClick={(e) => handleUserClick(e, user.id, user.username)}
              title={`View ${user.name}'s profile`}
            >
              {user.name}
            </div>
            <div className="river-meta">
              <span className="river-timestamp">{formatRelativeTime(post.created_at || post.createdAt)}</span>
            </div>
          </div>
          {/* Privacy icon: globe = public, people = friends only, lock = private (only your own posts) */}
          <svg className="privacy-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            {post.visibility === 'private' ? (
              // Lock icon - only for user's own private posts
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" 
                    fill="currentColor"/>
            ) : post.visibility === 'public' ? (
              // Globe icon - public posts visible to everyone
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" 
                    fill="currentColor"/>
            ) : (
              // Friends icon (default) - visible to friends
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" 
                    fill="currentColor"/>
            )}
          </svg>
        </div>

       {/* Media Image (only for media posts) */}
        {type === 'media' && post.media_url && (
          <div className="river-post-media" onClick={(e) => {
            e.stopPropagation();
            setExpandedMediaPost(post);
          }}>
            <img src={post.media_url} alt="Post media" className="river-media-image" />
            <div className="media-expand-hint">
              <MaximizeIcon size={20} />
            </div>
          </div>
        )}
         {/* Post Content */}
        <p className="river-post-content">{post.content}</p>

        {/* Action Buttons */}
        {/* Post Actions */} 
        <div className="river-post-actions">
          {/* Likes - Clickable Icon */}
          <div 
            className={`river-post-likes ${post.is_liked ? 'is-liked' : ''}`}
            onClick={async (e) => {
              e.stopPropagation();
              await likePost(post.id);
            }}
            title={post.is_liked ? 'Unlike' : 'Like'}
            style={{ cursor: 'pointer' }}
          >
            <HeartDynamicIcon 
              size={18} 
              filled={post.is_liked}
              fillColor="#3b82f6"
              strokeColor={post.is_liked ? "#3b82f6" : "rgba(201,168,255,0.5)"}
            />
            {post.likes_count || 0}
          </div>
          <button 
            className={`river-action-btn ${post.reply_count > 0 ? 'has-replies' : ''}`}
            title="Comment"
            onClick={() => onCommentClick(post.id)}
          >
            <MessageBubbleIcon size={20} stroke="rgba(201,168,255,0.5)" strokeWidth="1.5" />
            {post.reply_count > 0 && <span className="reply-count">{post.reply_count}</span>}
          </button>
          <button 
            className="river-action-btn" 
            title="Repost"
            onClick={async (e) => {
              e.stopPropagation();
              await sharePost(post.id);
            }}
          >
            <RepostIcon size={20} stroke="rgba(79,255,255,0.5)" strokeWidth="1.5" />
            {post.shares_count > 0 && <span className="share-count">{post.shares_count}</span>}
          </button>
          <button className="river-action-btn" title="Bookmark">
            <BookmarkIcon size={20} stroke="rgba(201,168,255,0.5)" strokeWidth="1.5" />
          </button>
          
          {/* 🔵 Message button - only show on OTHER people's posts */}
          {currentUser && post.author?.id !== currentUser.id && (
            <button 
              className="river-action-btn river-action-btn--message" 
              title={`Message ${post.author?.username || 'user'}`}
              onClick={(e) => {
                e.stopPropagation();
                // Open message modal with this user pre-selected
                openMessages({
                  id: post.author?.id,
                  username: post.author?.username,
                  displayName: post.author?.username, // Can be enhanced with full name if available
                });
              }}
            >
              <MessageLineIcon size={20} stroke="rgba(0,212,255,0.5)" strokeWidth="1.5" />
            </button>
          )}
          
          {/* Analytics, Edit & Delete - only for your own posts */}
          {currentUser && post.author?.id === currentUser.id && (
            <>
              <button className="river-action-btn" title="Analytics">
                <GraphLineIcon size={20} stroke="rgba(26,231,132,0.5)" strokeWidth="1.5" />
              </button>
              <button 
                className="river-action-btn river-action-btn--edit" 
                title="Edit"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingPostId(post.id);
                  setEditContent(post.content);
                  setActiveCommentPostId(post.id);
                  setCommentText(post.content);
                  setIsEditMode(true);
                  setIsComposerExpanded(true);
                }}
              >
                <EditIcon size={20} stroke="rgba(255,193,7,0.6)" strokeWidth="1.5" />
              </button>
              <button 
                className="river-action-btn river-action-btn--delete" 
                title="Delete"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteModalPostId(post.id);
                }}
              >
                <TrashIcon size={20} stroke="rgba(255,82,82,0.6)" strokeWidth="1.5" />
              </button>
            </>
          )}
        </div>

        {/* Inline Comment Composer - only shown when NOT expanded */}
        {activeCommentPostId === post.id && !isComposerExpanded && (
          <div className="inline-comment-composer">
            <div className="comment-input-wrapper">
              <textarea
                className="comment-input"
                placeholder="Comment..."
                value={commentText}
                onChange={(e) => {
                  setCommentText(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                rows={1}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (commentText.trim()) {
                      console.log('Comment posted:', commentText);
                      setCommentText('');
                      setActiveCommentPostId(null);
                      e.target.style.height = 'auto';
                    }
                  }
                  if (e.key === 'Escape') {
                    setActiveCommentPostId(null);
                    setCommentText('');
                  }
                }}
              />
              {/* Expand button - inside input, bottom right */}
              <button 
                className="expand-composer-btn"
                onClick={() => setIsComposerExpanded(true)}
                title="Expand"
              >
                <MaximizeIcon size={12} strokeWidth="2.5" />
              </button>
            </div>
            <button 
              className="comment-submit-btn"
              disabled={!commentText.trim()}
              onClick={async () => {
                if (commentText.trim()) {
                  const success = await handleReplySubmit(post.id, commentText);
                  if (success) {
                    setCommentText('');
                    setActiveCommentPostId(null);
                    // Auto-expand thread to show new reply
                    setExpandedThreadId(post.id);
                  }
                }
              }}
            >
              <ChevronRightIcon size={22} strokeWidth="2.5" />
            </button>
          </div>
        )}

        {/* View Thread Link - show when post has replies */}
        {post.reply_count > 0 && expandedThreadId !== post.id && (
          <button 
            className="view-thread-btn"
            onClick={() => toggleThread(post.id)}
          >
            <span className="thread-line" />
            View {post.reply_count} {post.reply_count === 1 ? 'reply' : 'replies'}
          </button>
        )}

        {/* Thread View - Twitter-style inline replies */}
        {expandedThreadId === post.id && (
          <div className="thread-view">
            <button 
              className="collapse-thread-btn"
              onClick={() => setExpandedThreadId(null)}
            >
              Hide replies
            </button>
            
            {loadingThread === post.id ? (
              <div className="thread-loading">Loading replies...</div>
            ) : (
              <div className="thread-replies">
                {(() => {
                  const allReplies = threadReplies[post.id] || [];
                  const visibleReplies = showAllReplies[post.id] ? allReplies : allReplies.slice(0, 3);
                  const hasMore = allReplies.length > 3;
                  
                  return (
                    <>
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
                        <span className="reply-time">{formatRelativeTime(reply.created_at)}</span>
                        {/* Edit/Delete for owner */}
                        {currentUser && reply.author?.id === currentUser.id && (
                          <div className="reply-actions">
                            <button 
                              className="reply-action-btn"
                              title="Edit"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingPostId(reply.id);
                                setEditingReplyParentId(post.id);
                                setEditContent(reply.content);
                              }}
                            >
                              <EditIcon size={14} />
                            </button>
                            <button 
                              className="reply-action-btn reply-action-btn--delete"
                              title="Delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Delete button clicked for reply:', reply.id, 'parent post:', post.id);
                                setDeleteModalPostId(reply.id);
                                setDeleteModalParentId(post.id); // Mark as reply deletion
                              }}
                            >
                              <TrashIcon size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {/* Reply content - show edit form if editing this reply */}
                      {editingPostId === reply.id ? (
                        <div className="reply-edit-form">
                          <textarea
                            className="reply-edit-input"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Escape') {
                                setEditingPostId(null);
                                setEditingReplyParentId(null);
                                setEditContent('');
                              }
                            }}
                          />
                          <div className="reply-edit-actions">
                            <button 
                              className="reply-edit-cancel"
                              onClick={() => {
                                setEditingPostId(null);
                                setEditingReplyParentId(null);
                                setEditContent('');
                              }}
                              title="Cancel"
                            >
                              <CloseIcon size={16} />
                            </button>
                            <button 
                              className="reply-edit-save"
                              disabled={!editContent.trim() || isSaving}
                              onClick={async () => {
                                setIsSaving(true);
                                const result = await updatePost(reply.id, { content: editContent.trim() });
                                if (result.success) {
                                  // Update local threadReplies state
                                  setThreadReplies(prev => ({
                                    ...prev,
                                    [editingReplyParentId]: (prev[editingReplyParentId] || []).map(r => 
                                      r.id === reply.id ? { ...r, content: editContent.trim() } : r
                                    )
                                  }));
                                  setEditingPostId(null);
                                  setEditingReplyParentId(null);
                                  setEditContent('');
                                }
                                setIsSaving(false);
                              }}
                              title="Save"
                            >
                              {isSaving ? (
                                <span className="saving-dots">...</span>
                              ) : (
                                <CheckIcon size={20} strokeWidth="2.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="reply-content">{reply.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                
                      {/* Show more/less button */}
                      {hasMore && (
                        <button 
                          className="show-more-replies-btn"
                          onClick={() => setShowAllReplies(prev => ({ 
                            ...prev, 
                            [post.id]: !prev[post.id] 
                          }))}
                        >
                          {showAllReplies[post.id] 
                            ? 'Show less' 
                            : `Show ${allReplies.length - 3} more ${allReplies.length - 3 === 1 ? 'reply' : 'replies'}`
                          }
                        </button>
                      )}
                      
                      {allReplies.length === 0 && (
                        <div className="no-replies">No replies yet</div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* Expanded Composer Modal - rendered via portal */}
        {activeCommentPostId === post.id && isComposerExpanded && createPortal(
          <div className="expanded-composer-overlay">
            <div 
              className="composer-backdrop"
              onClick={() => {
                setIsComposerExpanded(false);
                setIsEditMode(false);
              }}
            />
            <div className={`expanded-composer-modal ${isEditMode ? 'edit-mode' : ''}`}>
              {/* Original Post Context - only show when replying, not editing */}
              {!isEditMode && (
                <div className="reply-context">
                  <div className="reply-context-avatar">
                    {user.avatar}
                  </div>
                  <div className="reply-context-body">
                    <div className="reply-context-header">
                      <span className="reply-context-name">{user.display_name}</span>
                      <span className="reply-context-handle">@{user.username}</span>
                      <span className="reply-context-dot">·</span>
                      <span className="reply-context-time">{post.timestamp}</span>
                    </div>
                    
                    {/* Post content */}
                    <p className="reply-context-content">{post.content}</p>
                    
                    {/* Media preview if applicable */}
                    {type === 'media' && post.media_url && (
                      <div className="reply-context-media">
                        <img src={post.media_url} alt="Post media" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Divider - different text for edit vs reply */}
              <div className="reply-divider">
                <span className="reply-divider-line"></span>
                <span className="reply-divider-text">{isEditMode ? 'Edit Post' : 'Replying'}</span>
                <span className="reply-divider-line"></span>
              </div>

              {/* Comment/Edit input area */}
              <div className="modal-comment-area">
                <div className="comment-input-wrapper">
                  <textarea
                    className="comment-input"
                    placeholder={isEditMode ? "Edit your post..." : "Share your thoughts..."}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={4}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (commentText.trim()) {
                          if (isEditMode) {
                            // Save edit
                            onUpdatePost(editingPostId, { content: commentText.trim() });
                            setEditingPostId(null);
                            setEditContent('');
                            setIsEditMode(false);
                          } else {
                            console.log('Comment posted:', commentText);
                          }
                          setCommentText('');
                          setActiveCommentPostId(null);
                          setIsComposerExpanded(false);
                        }
                      }
                      if (e.key === 'Escape') {
                        setIsComposerExpanded(false);
                        setIsEditMode(false);
                      }
                    }}
                  />
                  {/* Minimize button - inside textarea */}
                  <button 
                    className="minimize-composer-btn"
                    onClick={() => {
                      setIsComposerExpanded(false);
                      setIsEditMode(false);
                    }}
                    title="Minimize"
                  >
                    <MinimizeIcon size={12} strokeWidth="2.5" />
                  </button>
                </div>
                
                {/* Media button - only show when replying, not editing */}
                {!isEditMode && (
                  <button 
                    className="comment-media-btn"
                    title="Add media"
                    onClick={() => {
                      // STRETCH GOAL: Media upload in replies
                      console.log('Media upload clicked');
                    }}
                  >
                    <ImageIcon size={20} strokeWidth="1.5" />
                  </button>
                )}
                
                <button 
                  className={`comment-submit-btn ${isEditMode ? 'edit-submit-btn' : ''}`}
                  disabled={!commentText.trim() || isSaving}
                  onClick={async () => {
                    if (commentText.trim()) {
                      if (isEditMode) {
                        // Save edit
                        setIsSaving(true);
                        await onUpdatePost(editingPostId, { content: commentText.trim() });
                        setIsSaving(false);
                        setEditingPostId(null);
                        setEditContent('');
                        setIsEditMode(false);
                      } else {
                        console.log('Comment posted:', commentText);
                      }
                      setCommentText('');
                      setActiveCommentPostId(null);
                      setIsComposerExpanded(false);
                    }
                  }}
                >
                  {isEditMode ? (
                    <CheckIcon size={22} strokeWidth="2.5" />
                  ) : (
                    <ChevronRightIcon size={22} strokeWidth="2.5" />
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  };
  // Mobile vs Desktop Rendering
  // Count how many post types exist
  const hasThoughts = thoughts.length > 0;
  const hasMedia = media.length > 0;
  const hasMilestones = milestones.length > 0;
  
  // Calculate number of columns for adaptive layout
  const columnCount = [hasThoughts, hasMedia, hasMilestones].filter(Boolean).length;
  
  // Desktop navigation handlers
  const handleNextColumn = () => {
    const columns = [hasThoughts && 'thoughts', hasMedia && 'media', hasMilestones && 'milestones'].filter(Boolean);
    const currentIndex = columns.indexOf(activeColumnType);
    const nextIndex = (currentIndex + 1) % columns.length;
    setActiveColumnType(columns[nextIndex]);
  };
  
  const handlePrevColumn = () => {
    const columns = [hasThoughts && 'thoughts', hasMedia && 'media', hasMilestones && 'milestones'].filter(Boolean);
    const currentIndex = columns.indexOf(activeColumnType);
    const prevIndex = currentIndex <= 0 ? columns.length - 1 : currentIndex - 1;
    setActiveColumnType(columns[prevIndex]);
  };
  
  const handleCloseActiveColumn = () => {
    setActiveColumnType(null);
  };
  
  // 🔵 Build arrays for mobile tabs
  const postsByType = {
    thoughts: hasThoughts ? thoughts : [],
    media: hasMedia ? media : [],
    milestones: hasMilestones ? milestones : []
  };
  
  // Get available tabs (only show tabs for types that have posts)
  const availableTabs = [];
  if (hasThoughts) availableTabs.push('thoughts');
  if (hasMedia) availableTabs.push('media');
  if (hasMilestones) availableTabs.push('milestones');
  
  // Set initial tab if current one has no posts
  const effectiveTab = postsByType[mobileActiveTab]?.length > 0 ? mobileActiveTab : availableTabs[0] || 'thoughts';
  const currentTabPosts = postsByType[effectiveTab] || [];
  const currentTabIndex = mobileCardIndex[effectiveTab] || 0;

  // 🟢 MOBILE: Tab-based navigation (category tabs + carousel per category)
  if (isMobile && availableTabs.length > 0) {
    const tabConfig = {
      thoughts: { label: 'Thoughts', icon: (
        <MessageBubbleIcon size={16} />
      )},
      media: { label: 'Media', icon: (
        <ImageIcon size={16} />
      )},
      milestones: { label: 'Milestones', icon: (
        <MilestoneIcon size={16} />
      )}
    };
    
    return (
      <div className="timeline-river-row-wrapper timeline-river-row-wrapper--mobile">
        {/* Category Tab Navigation */}
        <div className="mobile-tab-nav">
          {availableTabs.map(tab => (
            <button
              key={tab}
              className={`mobile-tab ${effectiveTab === tab ? 'mobile-tab--active' : ''} mobile-tab--${tab}`}
              onClick={() => setMobileActiveTab(tab)}
            >
              {tabConfig[tab].icon}
              <span className="mobile-tab-label">{tabConfig[tab].label}</span>
              <span className="mobile-tab-count">{postsByType[tab].length}</span>
            </button>
          ))}
        </div>
        
        {/* Card Display Area */}
        <div className="mobile-card-area">
          {currentTabPosts.length > 0 && (
            <>
              <div className="mobile-card-container">
                {renderPostCard(currentTabPosts[currentTabIndex], effectiveTab)}
              </div>
              
              {/* Carousel controls for this category */}
              {currentTabPosts.length > 1 && (
                <div className="mobile-card-controls">
                  <button 
                    className="mobile-nav-btn mobile-nav-btn--prev"
                    onClick={() => setMobileCardIndex(prev => ({
                      ...prev,
                      [effectiveTab]: prev[effectiveTab] === 0 ? currentTabPosts.length - 1 : prev[effectiveTab] - 1
                    }))}
                  >
                    <ChevronLeftIcon size={20} />
                  </button>
                  
                  <div className="mobile-card-indicators">
                    {currentTabPosts.map((_, index) => (
                      <div 
                        key={index} 
                        className={`mobile-indicator ${index === currentTabIndex ? 'mobile-indicator--active' : ''}`}
                        onClick={() => setMobileCardIndex(prev => ({ ...prev, [effectiveTab]: index }))}
                      />
                    ))}
                  </div>
                  
                  <button 
                    className="mobile-nav-btn mobile-nav-btn--next"
                    onClick={() => setMobileCardIndex(prev => ({
                      ...prev,
                      [effectiveTab]: (prev[effectiveTab] + 1) % currentTabPosts.length
                    }))}
                  >
                    <ChevronRightIcon size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Media Lightbox */}
        <MediaLightbox 
          post={expandedMediaPost ? (posts.find(p => p.id === expandedMediaPost.id) || expandedMediaPost) : null}
          onClose={() => setExpandedMediaPost(null)}
          commentText={commentText}
          setCommentText={setCommentText}
        />
      </div>
    );
  }

  // 🔵 Smart Deck renderer - shows one card at a time, cycle through
  const renderSmartDeck = (posts, type) => {
    if (posts.length === 0) return null;
    
    const currentIndex = deckIndex[type];
    const currentPost = posts[currentIndex];
    const totalCards = posts.length;
    
    const typeConfig = {
      thoughts: { label: 'Thoughts', color: '#4fffff' },
      media: { label: 'Media', color: '#c9a8ff' },
      milestones: { label: 'Milestones', color: '#1ae784' }
    };
    const config = typeConfig[type];
    
    // SVG icons for each type
    const typeIcons = {
      thoughts: (
        <ThoughtBubbleIcon className="smart-deck-icon-svg" />
      ),
      media: (
        <ImageIcon className="smart-deck-icon-svg" />
      ),
      milestones: (
        <StarIcon className="smart-deck-icon-svg" />
      )
    };
    
    return (
      <div className={`smart-deck smart-deck--${type}${mostRecentType === type ? ' smart-deck--recent' : ''}`}>
        {/* Deck Header with count and navigation */}
        <div className="smart-deck-header">
          <span className="smart-deck-icon">{typeIcons[type]}</span>
          <span className="smart-deck-count">
            {totalCards}
          </span>
          <span className="smart-deck-label">{config.label}</span>
          
          {/* Card position indicator */}
          {totalCards > 1 && (
            <span className="smart-deck-position">
              {currentIndex + 1}/{totalCards}
            </span>
          )}
        </div>
        
        {/* Current card */}
        <div className="smart-deck-card-container">
          {renderPostCard(currentPost, type)}
        </div>
        
        {/* Navigation for multiple cards */}
        {totalCards > 1 && (
          <div className="smart-deck-nav">
            <button 
              className="smart-deck-nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                prevCard(type, totalCards);
              }}
              aria-label="Previous card"
            >
              <ChevronLeftIcon size={16} />
            </button>
            
            {/* Dot indicators */}
            <div className="smart-deck-dots">
              {posts.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`smart-deck-dot ${idx === currentIndex ? 'smart-deck-dot--active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeckIndex(prev => ({ ...prev, [type]: idx }));
                  }}
                />
              ))}
            </div>
            
            <button 
              className="smart-deck-nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                nextCard(type, totalCards);
              }}
              aria-label="Next card"
            >
              <ChevronRightIcon size={16} />
            </button>
          </div>
        )}
      </div>
    );
  };

  // Desktop: Render as adaptive grid with Smart Decks
  // 🟢 DESKTOP: 3 Columns Side-by-Side
  return (
    <div className={`timeline-river-row timeline-river-row--${columnCount}-col`}>
      {hasThoughts && renderSmartDeck(thoughts, 'thoughts')}
      {hasMedia && renderSmartDeck(media, 'media')}
      {hasMilestones && renderSmartDeck(milestones, 'milestones')}
      
      {/* Desktop navigation controls - only show for stacked 3-col layout when a card is active */}
      {columnCount === 3 && activeColumnType && (
        <div className="desktop-stack-nav">
          <button 
            className="desktop-stack-close"
            onClick={handleCloseActiveColumn}
            title="Close (Esc)"
          >
            ×
          </button>
          <button 
            className="desktop-stack-btn desktop-stack-btn--prev"
            onClick={handlePrevColumn}
            title="Previous card"
          >
            <ChevronLeftIcon size={20} />
          </button>
          <button 
            className="desktop-stack-btn desktop-stack-btn--next"
            onClick={handleNextColumn}
            title="Next card"
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
      )}

       {/* Media Lightbox (fullscreen image view) */}
      <MediaLightbox 
        post={expandedMediaPost ? (posts.find(p => p.id === expandedMediaPost.id) || expandedMediaPost) : null}
        onClose={() => setExpandedMediaPost(null)}
        commentText={commentText}
        setCommentText={setCommentText}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalPostId !== null}
        onClose={() => {
          setDeleteModalPostId(null);
          setDeleteModalParentId(null);
        }}
        onConfirm={async () => {
          console.log('Delete confirm clicked', { deleteModalPostId, deleteModalParentId });
          setIsDeleting(true);
          
          if (deleteModalParentId) {
            // Deleting a reply - use deletePost from context and update local state
            console.log('Deleting reply:', deleteModalPostId, 'from parent:', deleteModalParentId);
            const result = await deletePost(deleteModalPostId);
            console.log('Delete result:', result);
            if (result.success) {
              // Remove reply from local threadReplies state
              setThreadReplies(prev => ({
                ...prev,
                [deleteModalParentId]: (prev[deleteModalParentId] || []).filter(r => r.id !== deleteModalPostId)
              }));
            }
          } else {
            // Deleting a main post
            await onDeletePost(deleteModalPostId);
          }
          
          setIsDeleting(false);
          setDeleteModalPostId(null);
          setDeleteModalParentId(null);
        }}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default TimelineRiverRow;
